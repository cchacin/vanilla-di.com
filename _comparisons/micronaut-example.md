---
title: "Cloud-Native Framework Comparison"
framework_name: "Micronaut"
complexity: 5
description: "Discover the radical concept of reading configuration values and passing them to constructors - a technique so simple it predates cloud computing!"
---

## Framework Code

```java
@Singleton
public class UserService {
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public UserService(UserRepository userRepository,
                       NotificationService notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Executable
    public CompletableFuture<User> createUserAsync(CreateUserRequest request) {
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
public class EmailNotificationService implements NotificationService {
    @Value("${smtp.host}")
    private String smtpHost;

    @PostConstruct
    void init() {
        // Initialize SMTP connection
    }
}

// Application startup
@Application
public class MicronautApp {
    public static void main(String[] args) {
        // Framework handles dependency injection
        Micronaut.run(MicronautApp.class, args);
    }
}
```

## Vanilla DI Code

```java
public class UserService {
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final ExecutorService executorService;

    public UserService(UserRepository userRepository,
                       NotificationService notificationService,
                       ExecutorService executorService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.executorService = executorService;
    }

    public CompletableFuture<User> createUserAsync(CreateUserRequest request) {
        return CompletableFuture.supplyAsync(() -> {
            User user = new User(request.getName(), request.getEmail());
            User savedUser = userRepository.save(user);
            notificationService.sendWelcomeEmail(savedUser);
            return savedUser;
        }, executorService);
    }
}

public class EmailNotificationService implements NotificationService {
    private final String smtpHost;

    public EmailNotificationService(String smtpHost) {
        this.smtpHost = smtpHost;
        // Initialize SMTP connection in constructor
    }
}

// Application startup
public class Application {
    public static void main(String[] args) {
        // Explicit dependency creation and injection
        String smtpHost = System.getProperty("smtp.host", "localhost");
        boolean notificationsEnabled = Boolean.parseBoolean(
            System.getProperty("app.notifications.enabled", "true"));

        NotificationService notificationService = notificationsEnabled ?
            new EmailNotificationService(smtpHost) :
            new NoOpNotificationService();

        ExecutorService executorService = Executors.newFixedThreadPool(10);
        UserRepository userRepository = new JpaUserRepository();

        UserService userService = new UserService(
            userRepository,
            notificationService,
            executorService);

        startServer(userService);
    }
}
```