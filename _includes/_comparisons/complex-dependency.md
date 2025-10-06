---
title: "Complex Dependency Graph"
framework_name: "Google Guice"
complexity: 6
description: "Behold the revolutionary concept of 'new' - a cutting-edge Java keyword that creates objects! No PhD in Guice binding semantics required."
---

## Framework Code

```java
class DatabaseModule extends AbstractModule {
  @Override
  void configure() {
    bind(UserRepository.class).to(JpaUserRepository.class);
    bind(OrderRepository.class).to(JpaOrderRepository.class);
    bind(EmailService.class).to(SmtpEmailService.class);
  }

  @Provides
  @Singleton
  DataSource provideDataSource() {
    // Complex datasource configuration
  }
}

class OrderService {
  @Inject
  UserRepository userRepository;

  @Inject
  OrderRepository orderRepository;

  @Inject
  EmailService emailService;

  void processOrder(Order order) {
    // Business logic
  }
}

// Bootstrap
Injector injector = Guice.createInjector(new DatabaseModule());
OrderService orderService = injector.getInstance(OrderService.class);
```

## Vanilla DI Code

```java
class OrderService {
  UserRepository userRepository;
  OrderRepository orderRepository;
  EmailService emailService;

  OrderService(UserRepository userRepository,
               OrderRepository orderRepository,
               EmailService emailService) {
    this.userRepository = userRepository;
    this.orderRepository = orderRepository;
    this.emailService = emailService;
  }

  void processOrder(Order order) {
    // Business logic
  }
}

// In your application factory:
var dataSource = createDataSource();
var userRepository = new JpaUserRepository(dataSource);
var orderRepository = new JpaOrderRepository(dataSource);
var emailService = new SmtpEmailService();

var orderService = new OrderService(
  userRepository,
  orderRepository,
  emailService
);
```