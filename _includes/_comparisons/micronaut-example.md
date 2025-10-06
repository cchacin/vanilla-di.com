---
title: "Cloud-Native Framework Comparison"
framework_name: "Micronaut"
complexity: 5
description: "Discover the radical concept of reading configuration values and passing them to constructors - a technique so simple it predates cloud computing!"
---

## Framework Code

```java
@Singleton
class UserService {
  UserRepository userRepository;
  NotificationService notificationService;

  UserService(UserRepository userRepository,
              NotificationService notificationService) {
    this.userRepository = userRepository;
    this.notificationService = notificationService;
  }

  @Executable
  CompletableFuture<User> createUserAsync(CreateUserRequest request) {
    return CompletableFuture.supplyAsync(() -> {
      User user = new User(request.getName(), request.getEmail());
      User savedUser = userRepository.save(user);
      notificationService.sendWelcomeEmail(savedUser);
      return savedUser;
    });
  }
}

@Singleton
@Requires(property = "app.notifications.enabled", value = "true")
class EmailNotificationService implements NotificationService {
  @Value("${smtp.host}")
  String smtpHost;

  @PostConstruct
  void init() {
    // Initialize SMTP connection
  }
}

// Application startup
@Application
class MicronautApp {
  void main() {
    // Framework handles dependency injection
    Micronaut.run(MicronautApp.class, args);
  }
}
```

## Vanilla DI Code

```java
class UserService {
  UserRepository userRepository;
  NotificationService notificationService;
  ExecutorService executorService;

  UserService(UserRepository userRepository,
              NotificationService notificationService,
              ExecutorService executorService) {
    this.userRepository = userRepository;
    this.notificationService = notificationService;
    this.executorService = executorService;
  }

  CompletableFuture<User> createUserAsync(CreateUserRequest request) {
    return CompletableFuture.supplyAsync(() -> {
      User user = new User(request.getName(), request.getEmail());
      User savedUser = userRepository.save(user);
      notificationService.sendWelcomeEmail(savedUser);
      return savedUser;
    }, executorService);
  }
}

class EmailNotificationService implements NotificationService {
  String smtpHost;

  EmailNotificationService(String smtpHost) {
    this.smtpHost = smtpHost;
    // Initialize SMTP connection in constructor
  }
}

// Application startup
class Application {
  void main() {
    // Explicit dependency creation and injection
    var smtpHost = System.getProperty("smtp.host", "localhost");
    var notificationsEnabled = Boolean.parseBoolean(
      System.getProperty("app.notifications.enabled", "true"));

    var notificationService = notificationsEnabled ?
      new EmailNotificationService(smtpHost) :
      new NoOpNotificationService();

    var executorService = Executors.newFixedThreadPool(10);
    var userRepository = new JpaUserRepository();

    var userService = new UserService(
      userRepository,
      notificationService,
      executorService);

    startServer(userService);
  }
}
```