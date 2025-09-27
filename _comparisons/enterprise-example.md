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
public class OrderProcessingService {
    @EJB
    private InventoryService inventoryService;

    @EJB
    private PaymentService paymentService;

    @Inject
    private AuditLogger auditLogger;

    @Resource
    private UserTransaction userTransaction;

    @PersistenceContext(unitName = "ordersPU")
    private EntityManager entityManager;

    @Resource(lookup = "jms/OrderQueue")
    private Queue orderQueue;

    @Resource(lookup = "jms/QueueConnectionFactory")
    private QueueConnectionFactory queueConnectionFactory;

    @Asynchronous
    @TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
    public Future<OrderResult> processOrderAsync(
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

    private void sendOrderNotification(Order order) throws JMSException {
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
public class OrderProcessingService {
    private final InventoryService inventoryService;
    private final PaymentService paymentService;
    private final AuditLogger auditLogger;
    private final TransactionManager transactionManager;
    private final EntityManager entityManager;
    private final MessageProducer messageProducer;
    private final ExecutorService executorService;

    public OrderProcessingService(
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

    public CompletableFuture<OrderResult> processOrderAsync(
            OrderRequest request,
            User currentUser) {

        return CompletableFuture.supplyAsync(() -> {
            return transactionManager.executeInTransaction(() -> {
                // Validate request manually (or use bean validation)
                validateOrderRequest(request);

                Order order = new Order(request);
                entityManager.persist(order);

                inventoryService.reserveItems(order.getItems());
                PaymentResult payment = paymentService.processPayment(order);

                messageProducer.sendOrderNotification(new OrderNotification(order));
                auditLogger.logOrderProcessed(order, currentUser);

                return new OrderResult(order, payment);
            });
        }, executorService);
    }

    private void validateOrderRequest(OrderRequest request) {
        if (request == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Invalid order request");
        }
    }
}

// In your application factory:
OrderProcessingService orderService = new OrderProcessingService(
    new DatabaseInventoryService(dataSource),
    new StripePaymentService(stripeApiKey),
    new DatabaseAuditLogger(dataSource),
    new JpaTransactionManager(entityManager),
    entityManager,
    new JmsMessageProducer(connectionFactory, orderQueue),
    Executors.newFixedThreadPool(20)
);
```