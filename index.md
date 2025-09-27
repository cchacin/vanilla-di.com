---
layout: default
title: Vanilla DI - A fast, lightweight, cross-platform Java Dependency Injection framework
---

# Vanilla DI

**A fast, lightweight, cross-platform Java Dependency Injection framework**

<div class="numbers-highlight">

## The numbers don't lie!

**Vanilla DI** is already used by more Java applications than Spring, Spring Boot, Guice, Dagger, CDI, and PicoContainer - *combined*.

Vanilla DI has the most comprehensive support with 100% of all Java environments, and has perfect compatibility with all existing Java code.

</div>

## Ready to make the switch?

Stop spending hours learning complex DI frameworks. Choose the superior Vanilla DI framework!

**Final JAR size:** 0 bytes uncompressed, 0 bytes compressed
Your application will have Vanilla DI loaded into memory before it even requests dependencies.

<div class="getting-started">

## Getting Started

Add Vanilla DI to your project in seconds:

### Maven
```xml
<dependency>
    <groupId>org.acme</groupId>
    <artifactId>vanilla-di</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Gradle
```gradle
implementation 'org.acme:vanilla-di:1.0.0'
```

### Going to Production?

When you're ready to deploy to production, simply remove the dependency from your `pom.xml` or `build.gradle`.

**That's it!**

Vanilla DI is so lightweight and well-integrated with the JVM that removing the dependency actually *improves* performance. Your IDE and runtime already have everything they need.

### Advanced Configuration

For enterprise deployments, you may want to configure Vanilla DI's advanced features:

```java
// This is literally all the configuration you need
public class MyApplication {
    public static void main(String[] args) {
        // Vanilla DI is automatically configured
        // No XML files, no annotations, no magic
    }
}
```

**Pro tip:** The more dependencies you remove, the faster Vanilla DI becomes!

</div>

## Why choose Vanilla DI?

<div class="features">

<div class="feature-item">

### 🚀 Blazing Fast
Zero reflection overhead. Zero proxy creation. Zero annotation scanning. Just pure Java performance.

</div>

<div class="feature-item">

### 📦 Zero Dependencies
No external JARs. No classpath pollution. No version conflicts. Just your code.

</div>

<div class="feature-item">

### 🎯 Explicit and Clear
No magic. No hidden behavior. You can see exactly what's happening in your dependency graph.

</div>

<div class="feature-item">

### 🔧 No Configuration
No XML files. No annotations to learn. No framework-specific concepts. Just Java constructors.

</div>

</div>

## Performance Comparison

Don't just take our word for it! Here's how **Vanilla DI** stacks up against other "popular" frameworks based on actual benchmark data:

<div class="table-container">

{: .performance-table}
| Framework | Startup Time* | Memory Usage** | JAR Size*** | Reflection Calls | Magic Level |
|-----------|---------------|-----------------|----------|------------------|-------------|
| **Vanilla DI** | **3ms** | **~22MB base** | **0 bytes** | **0** | **None** ✅ |
| Dagger 2 | 46ms | ~25MB + app | ~1-3MB | Zero**** | Low 🃏 |
| Google Guice | 458ms | ~30-40MB + app | ~2-5MB | Hundreds | Medium 🎩 |
| Quarkus | 0.5-1.5 seconds | ~180MB heap | 15-25MB JAR | Minimal***** | Medium-Low 🎭 |
| Micronaut | 1-2 seconds | 254MB heap | 12MB JAR | Minimal | Medium 🎪 |
| Spring Framework | 7-13 seconds | 305MB heap | 24MB+ JAR | Thousands | High 🪄 |
| Spring Boot | 3-7 seconds | 305MB+ heap | 24-50MB JAR | Thousands | Very High 🔮 |
| CDI/Jakarta EE | 10-20 seconds | 400-600MB+ | 50-200MB+ | Thousands | Extreme 🧙‍♂️ |

### Data Sources & Disclaimers

*\*Startup times from [DI Framework Benchmarks](https://github.com/greenlaw110/di-benchmark) and various 2024 performance studies*

*\*\*Memory usage includes heap allocation after startup for simple applications (Spring Boot data from official benchmarks)*

*\*\*\*JAR sizes for minimal applications with basic DI functionality*

*\*\*\*\*Dagger 2 uses compile-time generation, so runtime reflection is zero, but requires annotation processing*

*\*\*\*\*\*Quarkus performs CDI processing at build time, significantly reducing runtime reflection compared to traditional CDI*

**Important Notes:**
- Numbers vary significantly based on application complexity, dependencies, and JVM settings
- Vanilla DI baseline includes minimal JVM overhead for object creation
- Framework memory includes both heap and non-heap usage
- Performance can be optimized through configuration and architectural choices
- Real-world applications may see different results based on usage patterns

### What these numbers really mean:

- **Startup Time**: How long you wait before your application actually starts doing work
- **Memory Overhead**: RAM consumed by the framework itself (not your business logic)
- **JAR Size**: Additional bloat in your deployment artifacts
- **Reflection Calls**: Runtime introspection that slows down your code
- **Magic Level**: How much invisible behavior happens behind your back

### Real-world Impact:

```java
// Vanilla DI application startup (benchmarked at ~3ms for DI container creation)
public static void main(String[] args) {
    // ~3ms: Create your objects (actual measured time)
    DatabaseConfig config = new DatabaseConfig("jdbc:postgresql://localhost/mydb");
    UserRepository repository = new UserRepository(config);
    UserService service = new UserService(repository);

    // Additional time for server startup (not DI-related)
    startServer(service);
    System.out.println("Application ready!"); // <- DI part is nearly instant
}

// Spring Boot application startup (benchmarked at 3-7 seconds typical)
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        // Based on actual Spring Boot benchmark measurements:
        // 0-1000ms: JVM startup and class loading
        // 1000-3000ms: Scanning classpath for components
        // 3000-4000ms: Creating bean definitions and resolving dependencies
        // 4000-5000ms: Initializing application context and proxies
        // 5000-7000ms: Post-processors and auto-configuration
        SpringApplication.run(Application.class, args);
        // 7000ms+: Application ready (measured on simple apps)
    }
}
```

**Benchmark Context:** These measurements come from controlled benchmarks on minimal applications. Real applications with databases, web servers, and business logic will have additional startup overhead beyond just the DI framework initialization.

</div>

## See how simple it is!

Here are some examples of common dependency injection tasks in **Vanilla DI** and other frameworks:

### Basic Service Injection

<div class="framework-comparison">

#### Spring Framework
```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findUser(Long id) {
        return userRepository.findById(id);
    }
}

@Repository
public class UserRepository {
    @Autowired
    private EntityManager entityManager;

    public User findById(Long id) {
        return entityManager.find(User.class, id);
    }
}

@Configuration
@ComponentScan
@EnableJpaRepositories
public class AppConfig {
    // Complex configuration...
}
```

#### Vanilla DI
```java
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUser(Long id) {
        return userRepository.findById(id);
    }
}

public class UserRepository {
    private final EntityManager entityManager;

    public UserRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public User findById(Long id) {
        return entityManager.find(User.class, id);
    }
}

// In your main method or factory:
EntityManager entityManager = createEntityManager();
UserRepository repository = new UserRepository(entityManager);
UserService service = new UserService(repository);
```

</div>

### Complex Dependency Graph

<div class="framework-comparison">

#### Google Guice
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

#### Vanilla DI
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

</div>

### Conditional Dependencies

<div class="framework-comparison">

#### Spring Boot with Profiles
```java
@Service
@Profile("development")
public class MockEmailService implements EmailService {
    public void sendEmail(String to, String message) {
        System.out.println("Mock email: " + message);
    }
}

@Service
@Profile("production")
public class SmtpEmailService implements EmailService {
    @Value("${smtp.host}")
    private String smtpHost;

    @Value("${smtp.port}")
    private int smtpPort;

    public void sendEmail(String to, String message) {
        // Real SMTP implementation
    }
}

@RestController
public class NotificationController {
    @Autowired
    private EmailService emailService; // Magic injection

    @PostMapping("/notify")
    public void notify(@RequestBody NotificationRequest request) {
        emailService.sendEmail(request.getEmail(), request.getMessage());
    }
}

# application-development.properties
smtp.host=localhost
smtp.port=1025

# application-production.properties
smtp.host=smtp.company.com
smtp.port=587
```

#### Vanilla DI
```java
public interface EmailService {
    void sendEmail(String to, String message);
}

public class MockEmailService implements EmailService {
    public void sendEmail(String to, String message) {
        System.out.println("Mock email: " + message);
    }
}

public class SmtpEmailService implements EmailService {
    private final String smtpHost;
    private final int smtpPort;

    public SmtpEmailService(String smtpHost, int smtpPort) {
        this.smtpHost = smtpHost;
        this.smtpPort = smtpPort;
    }

    public void sendEmail(String to, String message) {
        // Real SMTP implementation
    }
}

public class NotificationController {
    private final EmailService emailService;

    public NotificationController(EmailService emailService) {
        this.emailService = emailService;
    }

    public void notify(NotificationRequest request) {
        emailService.sendEmail(request.getEmail(), request.getMessage());
    }
}

// In your application factory:
public class ApplicationFactory {
    public static NotificationController createController(boolean isDevelopment) {
        EmailService emailService;

        if (isDevelopment) {
            emailService = new MockEmailService();
        } else {
            emailService = new SmtpEmailService("smtp.company.com", 587);
        }

        return new NotificationController(emailService);
    }
}
```

</div>

### Enterprise Java (Jakarta EE / Java EE)

<div class="framework-comparison">

#### CDI (Contexts and Dependency Injection)
```java
@Stateless
@Named("userService")
public class UserService {
    @EJB
    private UserRepository userRepository;

    @Inject
    private Logger logger;

    @Resource
    private UserTransaction userTransaction;

    public void createUser(User user) {
        try {
            userTransaction.begin();
            userRepository.save(user);
            userTransaction.commit();
            logger.info("User created: " + user.getId());
        } catch (Exception e) {
            userTransaction.rollback();
            throw e;
        }
    }
}

@Singleton
@Startup
public class UserRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public void save(User user) {
        entityManager.persist(user);
    }
}

// META-INF/beans.xml required
// Complex application server configuration required
```

#### Vanilla DI
```java
public class UserService {
    private final UserRepository userRepository;
    private final Logger logger;
    private final TransactionManager transactionManager;

    public UserService(UserRepository userRepository,
                      Logger logger,
                      TransactionManager transactionManager) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.transactionManager = transactionManager;
    }

    public void createUser(User user) {
        transactionManager.executeInTransaction(() -> {
            userRepository.save(user);
            logger.info("User created: " + user.getId());
        });
    }
}

public class UserRepository {
    private final EntityManager entityManager;

    public UserRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(User user) {
        entityManager.persist(user);
    }
}

// In your application:
Logger logger = LoggerFactory.getLogger(UserService.class);
EntityManager entityManager = createEntityManager();
TransactionManager transactionManager = new JpaTransactionManager(entityManager);
UserRepository repository = new UserRepository(entityManager);
UserService service = new UserService(repository, logger, transactionManager);
```

</div>

### Testing with Mocks

<div class="framework-comparison">

#### Dagger 2 with Testing
```java
@Component(modules = {DatabaseModule.class})
@Singleton
public interface ApplicationComponent {
    UserService userService();
}

@Module
public class DatabaseModule {
    @Provides
    @Singleton
    UserRepository provideUserRepository() {
        return new DatabaseUserRepository();
    }
}

@Module
public class TestDatabaseModule {
    @Provides
    @Singleton
    UserRepository provideUserRepository() {
        return Mockito.mock(UserRepository.class);
    }
}

public class UserServiceTest {
    @Test
    public void testFindUser() {
        // Complex test component setup
        ApplicationComponent component = DaggerApplicationComponent.builder()
            .databaseModule(new TestDatabaseModule())
            .build();

        UserService service = component.userService();
        // Test logic...
    }
}
```

#### Vanilla DI
```java
public class UserServiceTest {
    @Test
    public void testFindUser() {
        // Create test dependencies
        UserRepository mockRepository = Mockito.mock(UserRepository.class);
        User expectedUser = new User(1L, "John");

        when(mockRepository.findById(1L)).thenReturn(expectedUser);

        // Create service with test dependencies
        UserService service = new UserService(mockRepository);

        // Test
        User result = service.findUser(1L);

        // Verify
        assertEquals(expectedUser, result);
        verify(mockRepository).findById(1L);
    }
}
```

</div>

### Cloud-Native Framework

<div class="framework-comparison">

#### Quarkus (CDI with Build-time Optimization)
```java
@ApplicationScoped
public class UserService {
    @Inject
    UserRepository userRepository;

    @Inject
    Logger logger;

    public User findUser(Long id) {
        logger.info("Finding user: " + id);
        return userRepository.findById(id);
    }
}

@ApplicationScoped
public class UserRepository {
    @Inject
    EntityManager entityManager;

    public User findById(Long id) {
        return entityManager.find(User.class, id);
    }
}

// Configuration with conditional injection
@ApplicationScoped
public class EmailServiceProducer {
    @ConfigProperty(name = "email.mode")
    String emailMode;

    @Produces
    @ApplicationScoped
    public EmailService createEmailService() {
        return "mock".equals(emailMode) ?
            new MockEmailService() : new SmtpEmailService();
    }
}

// Application bootstrap
@QuarkusMain
public class Application {
    public static void main(String[] args) {
        // Quarkus CDI processed at build-time
        // Runtime startup: ~500ms-1.5s
        Quarkus.run(args);
    }
}
```

#### Vanilla DI
```java
public class UserService {
    private final UserRepository userRepository;
    private final Logger logger;

    public UserService(UserRepository userRepository, Logger logger) {
        this.userRepository = userRepository;
        this.logger = logger;
    }

    public User findUser(Long id) {
        logger.info("Finding user: " + id);
        return userRepository.findById(id);
    }
}

public class UserRepository {
    private final EntityManager entityManager;

    public UserRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public User findById(Long id) {
        return entityManager.find(User.class, id);
    }
}

// Configuration factory
public class ApplicationFactory {
    public static UserService createUserService(String emailMode) {
        Logger logger = LoggerFactory.getLogger(UserService.class);
        EntityManager entityManager = createEntityManager();
        UserRepository repository = new UserRepository(entityManager);

        return new UserService(repository, logger);
    }
}

// Application bootstrap
public class Application {
    public static void main(String[] args) {
        // No framework overhead: ~3ms for DI
        UserService service = ApplicationFactory.createUserService(getEmailMode());
        startServer(service);
    }
}
```

</div>

---

<div class="coffee-section">

## Support Vanilla DI Development

Developing the world's most lightweight DI framework is hard work! Help us maintain our 0-byte codebase and continue delivering blazing-fast performance improvements.

<a href="https://www.buymeacoffee.com/cchacin" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" />
</a>

**Your contribution helps us:**
- Keep the framework dependency-free ✅
- Maintain zero compilation overhead ✅
- Continue delivering sub-millisecond startup times ✅
- Fund our extensive "no-documentation" documentation ✅
- Support our team of 0 full-time developers ✅

*Fun fact: 100% of donations go directly toward not adding features to Vanilla DI!*

</div>

---

The **Vanilla DI** team maintains every line of code in the framework and works hard each day to make sure it stays simple and intuitive.

Made with ❤️ for Java developers who appreciate simplicity.

*Inspired by the excellent [Vanilla JS](http://vanilla-js.com)*