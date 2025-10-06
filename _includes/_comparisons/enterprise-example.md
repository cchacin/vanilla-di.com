---
title: "Enterprise Java Stack"
framework_name: "Jakarta EE + CDI"
complexity: 10
description: "Experience the jaw-dropping simplicity of creating objects with 'new' and passing them around. No application servers, no JNDI wizardry, no enterprise consultants required!"
---

## Framework Code

```java
@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
class OrderProcessingService {
  @EJB
  InventoryService inventoryService;

  @EJB
  PaymentService paymentService;

  @Inject
  AuditLogger auditLogger;

  @Resource
  UserTransaction userTransaction;

  @PersistenceContext(unitName = "ordersPU")
  EntityManager entityManager;

  @Resource(lookup = "jms/OrderQueue")
  Queue orderQueue;

  @Resource(lookup = "jms/QueueConnectionFactory")
  QueueConnectionFactory queueConnectionFactory;

  @Asynchronous
  @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
  Future<OrderResult> processOrderAsync(
          @Valid OrderRequest request,
          @NotNull SecurityContext securityContext) {

    try {
      // Framework manages transactions, security, validation
      Order order = new Order(request);
      entityManager.persist(order);

      inventoryService.reserveItems(order.getItems());
      PaymentResult payment = paymentService.processPayment(order);

      sendOrderNotification(order);
      auditLogger.logOrderProcessed(order, securityContext.getUserPrincipal());

      return new AsyncResult<>(new OrderResult(order, payment));
    } catch (Exception e) {
      // Container handles rollback
      throw new EJBException("Order processing failed", e);
    }
  }

  void sendOrderNotification(Order order) throws JMSException {
    try (QueueConnection connection = queueConnectionFactory.createQueueConnection()) {
      QueueSession session = connection.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
      QueueSender sender = session.createSender(orderQueue);

      ObjectMessage message = session.createObjectMessage(new OrderNotification(order));
      sender.send(message);
    }
  }
}

// Plus: persistence.xml, ejb-jar.xml, web.xml configuration
// Plus: Application server deployment descriptors
// Plus: JNDI resource configuration
```

## Vanilla DI Code

```java
class OrderProcessingService {
  InventoryService inventoryService;
  PaymentService paymentService;
  AuditLogger auditLogger;
  TransactionManager transactionManager;
  EntityManager entityManager;
  MessageProducer messageProducer;
  ExecutorService executorService;

  OrderProcessingService(
          InventoryService inventoryService,
          PaymentService paymentService,
          AuditLogger auditLogger,
          TransactionManager transactionManager,
          EntityManager entityManager,
          MessageProducer messageProducer,
          ExecutorService executorService) {
    this.inventoryService = inventoryService;
    this.paymentService = paymentService;
    this.auditLogger = auditLogger;
    this.transactionManager = transactionManager;
    this.entityManager = entityManager;
    this.messageProducer = messageProducer;
    this.executorService = executorService;
  }

  CompletableFuture<OrderResult> processOrderAsync(
          OrderRequest request,
          User currentUser) {

    return CompletableFuture.supplyAsync(() -> {
      return transactionManager.executeInTransaction(() -> {
        // Validate request manually (or use bean validation)
        validateOrderRequest(request);

        var order = new Order(request);
        entityManager.persist(order);

        inventoryService.reserveItems(order.getItems());
        var payment = paymentService.processPayment(order);

        messageProducer.sendOrderNotification(new OrderNotification(order));
        auditLogger.logOrderProcessed(order, currentUser);

        return new OrderResult(order, payment);
      });
    }, executorService);
  }

  void validateOrderRequest(OrderRequest request) {
    if (request == null || request.getItems().isEmpty()) {
      throw new IllegalArgumentException("Invalid order request");
    }
  }
}

// In your application factory:
var orderService = new OrderProcessingService(
  new DatabaseInventoryService(dataSource),
  new StripePaymentService(stripeApiKey),
  new DatabaseAuditLogger(dataSource),
  new JpaTransactionManager(entityManager),
  entityManager,
  new JmsMessageProducer(connectionFactory, orderQueue),
  Executors.newFixedThreadPool(20)
);
```