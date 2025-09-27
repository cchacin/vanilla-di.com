---
title: "Complex Dependency Graph"
framework_name: "Google Guice"
complexity: 6
description: "Behold the revolutionary concept of 'new' - a cutting-edge Java keyword that creates objects! No PhD in Guice binding semantics required."
---

## Framework Code

```java
public class DatabaseModule extends AbstractModule {
    @Override
    protected void configure() {
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

public class OrderService {
    @Inject
    private UserRepository userRepository;

    @Inject
    private OrderRepository orderRepository;

    @Inject
    private EmailService emailService;

    public void processOrder(Order order) {
        // Business logic
    }
}

// Bootstrap
Injector injector = Guice.createInjector(new DatabaseModule());
OrderService orderService = injector.getInstance(OrderService.class);
```

## Vanilla DI Code

```java
public class OrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final EmailService emailService;

    public OrderService(UserRepository userRepository,
                       OrderRepository orderRepository,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.emailService = emailService;
    }

    public void processOrder(Order order) {
        // Business logic
    }
}

// In your application factory:
DataSource dataSource = createDataSource();
UserRepository userRepository = new JpaUserRepository(dataSource);
OrderRepository orderRepository = new JpaOrderRepository(dataSource);
EmailService emailService = new SmtpEmailService();

OrderService orderService = new OrderService(
    userRepository,
    orderRepository,
    emailService
);
```