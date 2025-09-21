---
layout: default
title: Vanilla DI - A fast, lightweight, cross-platform Java Dependency Injection framework
---

# Vanilla DI

**A fast, lightweight, cross-platform Java Dependency Injection framework**

## The numbers don't lie!

**Vanilla DI** is already used by more Java applications than Spring, Spring Boot, Guice, Dagger, CDI, and PicoContainer - *combined*.

Vanilla DI has the most comprehensive support with 100% of all Java environments, and has perfect compatibility with all existing Java code.

## Ready to make the switch?

Stop spending hours learning complex DI frameworks. Choose the superior Vanilla DI framework!

**Final JAR size:** 0 bytes uncompressed, 0 bytes compressed
Your application will have Vanilla DI loaded into memory before it even requests dependencies.

## Why choose Vanilla DI?

### 🚀 Blazing Fast
Zero reflection overhead. Zero proxy creation. Zero annotation scanning. Just pure Java performance.

### 📦 Zero Dependencies
No external JARs. No classpath pollution. No version conflicts. Just your code.

### 🎯 Explicit and Clear
No magic. No hidden behavior. You can see exactly what's happening in your dependency graph.

### 🔧 No Configuration
No XML files. No annotations to learn. No framework-specific concepts. Just Java constructors.

## See how simple it is!

Here are some examples of common dependency injection tasks in **Vanilla DI** and other frameworks:

### Basic Service Injection

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

### Complex Dependency Graph

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

### Conditional Dependencies

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

### Enterprise Java (Jakarta EE / Java EE)

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

### Testing with Mocks

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

---

The **Vanilla DI** team maintains every line of code in the framework and works hard each day to make sure it stays simple and intuitive.

Made with ❤️ for Java developers who appreciate simplicity.

*Inspired by the excellent [Vanilla JS](http://vanilla-js.com)*