---
layout: page
title: Vanilla DI - A fast, lightweight, cross-platform Java Dependency Injection framework
---

<div class="hero-section">
  <h1>🍦 Vanilla DI</h1>
  <p class="hero-subtitle">A fast, lightweight, cross-platform Java Dependency Injection framework</p>
</div>

## The numbers don't lie!

**Vanilla DI** is already used by more Java applications than Spring, Spring Boot, Guice, Dagger, CDI, and PicoContainer - *combined*.

Vanilla DI has the most comprehensive support with 100% of all Java environments, and has perfect compatibility with all existing Java code.

## Ready to make the switch?

Stop spending hours learning complex DI frameworks. Choose the superior Vanilla DI framework!

**Final JAR size:** 0 bytes uncompressed, 0 bytes compressed
Your application will have Vanilla DI loaded into memory before it even requests dependencies.

## Getting Started {#getting-started}

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

## Why choose Vanilla DI?

<div class="features-grid">
  <div class="feature-card">
    <h3 data-emoji="🚀">Blazing Fast</h3>
    <p>Zero reflection overhead. Zero proxy creation. Zero annotation scanning. Just pure Java performance.</p>
  </div>

  <div class="feature-card">
    <h3 data-emoji="📦">Zero Dependencies</h3>
    <p>No external JARs. No classpath pollution. No version conflicts. Just your code.</p>
  </div>

  <div class="feature-card">
    <h3 data-emoji="🎯">Explicit and Clear</h3>
    <p>No magic. No hidden behavior. You can see exactly what's happening in your dependency graph.</p>
  </div>

  <div class="feature-card">
    <h3 data-emoji="🔧">No Configuration</h3>
    <p>No XML files. No annotations to learn. No framework-specific concepts. Just Java constructors.</p>
  </div>
</div>

## Performance Comparison {#performance}

Don't just take our word for it! Here's how **Vanilla DI** stacks up against other "popular" frameworks based on actual benchmark data:

<table class="performance-table">
  <thead>
    <tr>
      <th>Framework</th>
      <th>Startup Time*</th>
      <th>Memory Usage**</th>
      <th>JAR Size***</th>
      <th>Reflection Calls</th>
      <th>Magic Level</th>
    </tr>
  </thead>
  <tbody>
    <tr class="vanilla-row">
      <td data-label="Framework"><strong>Vanilla DI</strong></td>
      <td data-label="Startup Time"><strong>3ms</strong></td>
      <td data-label="Memory Usage"><strong>~22MB base</strong></td>
      <td data-label="JAR Size"><strong>0 bytes</strong></td>
      <td data-label="Reflection Calls"><strong>0</strong></td>
      <td data-label="Magic Level"><span class="magic-level"><strong>None</strong> ✅</span></td>
    </tr>
    <tr>
      <td data-label="Framework">Dagger 2</td>
      <td data-label="Startup Time">46ms</td>
      <td data-label="Memory Usage">~25MB + app</td>
      <td data-label="JAR Size">~1-3MB</td>
      <td data-label="Reflection Calls">Zero****</td>
      <td data-label="Magic Level"><span class="magic-level">Low 🃏</span></td>
    </tr>
    <tr>
      <td data-label="Framework">Google Guice</td>
      <td data-label="Startup Time">458ms</td>
      <td data-label="Memory Usage">~30-40MB + app</td>
      <td data-label="JAR Size">~2-5MB</td>
      <td data-label="Reflection Calls">Hundreds</td>
      <td data-label="Magic Level"><span class="magic-level">Medium 🎩</span></td>
    </tr>
    <tr>
      <td data-label="Framework">Quarkus</td>
      <td data-label="Startup Time">0.5-1.5 seconds</td>
      <td data-label="Memory Usage">~180MB heap</td>
      <td data-label="JAR Size">15-25MB JAR</td>
      <td data-label="Reflection Calls">Minimal*****</td>
      <td data-label="Magic Level"><span class="magic-level">Medium-Low 🎭</span></td>
    </tr>
    <tr>
      <td data-label="Framework">Micronaut</td>
      <td data-label="Startup Time">1-2 seconds</td>
      <td data-label="Memory Usage">254MB heap</td>
      <td data-label="JAR Size">12MB JAR</td>
      <td data-label="Reflection Calls">Minimal</td>
      <td data-label="Magic Level"><span class="magic-level">Medium 🎪</span></td>
    </tr>
    <tr>
      <td data-label="Framework">Spring Framework</td>
      <td data-label="Startup Time">7-13 seconds</td>
      <td data-label="Memory Usage">305MB heap</td>
      <td data-label="JAR Size">24MB+ JAR</td>
      <td data-label="Reflection Calls">Thousands</td>
      <td data-label="Magic Level"><span class="magic-level">High 🪄</span></td>
    </tr>
    <tr>
      <td data-label="Framework">Spring Boot</td>
      <td data-label="Startup Time">3-7 seconds</td>
      <td data-label="Memory Usage">305MB+ heap</td>
      <td data-label="JAR Size">24-50MB JAR</td>
      <td data-label="Reflection Calls">Thousands</td>
      <td data-label="Magic Level"><span class="magic-level">Very High 🔮</span></td>
    </tr>
    <tr>
      <td data-label="Framework">CDI/Jakarta EE</td>
      <td data-label="Startup Time">10-20 seconds</td>
      <td data-label="Memory Usage">400-600MB+</td>
      <td data-label="JAR Size">50-200MB+</td>
      <td data-label="Reflection Calls">Thousands</td>
      <td data-label="Magic Level"><span class="magic-level">Extreme 🧙‍♂️</span></td>
    </tr>
  </tbody>
</table>

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

## See how simple it is! {#examples}

Here are some examples of common dependency injection tasks in **Vanilla DI** and other frameworks:

{% include framework-comparison.html
   id="basic-service"
   title="Basic Service Injection"
   framework_name="Spring Framework"
   complexity="8"
   code="@Service
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
}"
   vanilla_code="public class UserService {
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
UserService service = new UserService(repository);"
   description="Notice how Vanilla DI requires zero annotations, configuration classes, or magic autowiring. Just plain constructors and explicit dependencies."
%}

{% include framework-comparison.html
   id="complex-dependency"
   title="Complex Dependency Graph"
   framework_name="Google Guice"
   complexity="6"
   code="public class DatabaseModule extends AbstractModule {
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
OrderService orderService = injector.getInstance(OrderService.class);"
   vanilla_code="public class OrderService {
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
);"
   description="No modules, no binding configuration, no annotations. Just clear constructor dependencies that any Java developer can understand instantly."
%}

{% include framework-comparison.html
   id="conditional-dependencies"
   title="Conditional Dependencies"
   framework_name="Spring Boot"
   complexity="9"
   code="@Service
@Profile(\"development\")
public class MockEmailService implements EmailService {
    public void sendEmail(String to, String message) {
        System.out.println(\"Mock email: \" + message);
    }
}

@Service
@Profile(\"production\")
public class SmtpEmailService implements EmailService {
    @Value(\"${smtp.host}\")
    private String smtpHost;

    @Value(\"${smtp.port}\")
    private int smtpPort;

    public void sendEmail(String to, String message) {
        // Real SMTP implementation
    }
}

@RestController
public class NotificationController {
    @Autowired
    private EmailService emailService; // Magic injection

    @PostMapping(\"/notify\")
    public void notify(@RequestBody NotificationRequest request) {
        emailService.sendEmail(request.getEmail(), request.getMessage());
    }
}

# Plus separate property files for each environment"
   vanilla_code="public interface EmailService {
    void sendEmail(String to, String message);
}

public class MockEmailService implements EmailService {
    public void sendEmail(String to, String message) {
        System.out.println(\"Mock email: \" + message);
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
        EmailService emailService = isDevelopment ?
            new MockEmailService() :
            new SmtpEmailService(\"smtp.company.com\", 587);

        return new NotificationController(emailService);
    }
}"
   description="No profiles, no property injection, no environment-specific configuration files. Just a simple boolean and clean constructor injection."
%}

{% include framework-comparison.html
   id="testing-mocks"
   title="Testing with Mocks"
   framework_name="Dagger 2"
   complexity="4"
   code="@Component(modules = {DatabaseModule.class})
@Singleton
public interface ApplicationComponent {
    UserService userService();
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
}"
   vanilla_code="public class UserServiceTest {
    @Test
    public void testFindUser() {
        // Create test dependencies
        UserRepository mockRepository = Mockito.mock(UserRepository.class);
        User expectedUser = new User(1L, \"John\");

        when(mockRepository.findById(1L)).thenReturn(expectedUser);

        // Create service with test dependencies
        UserService service = new UserService(mockRepository);

        // Test
        User result = service.findUser(1L);

        // Verify
        assertEquals(expectedUser, result);
        verify(mockRepository).findById(1L);
    }
}"
   description="Testing becomes trivial when you just pass the mock in the constructor. No test modules, no component builders, no framework ceremony."
%}

{% include framework-comparison.html
   id="micronaut-example"
   title="Cloud-Native Framework Comparison"
   framework_name="Micronaut"
   complexity="5"
   code="@Singleton
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
@Requires(property = \"app.notifications.enabled\", value = \"true\")
public class EmailNotificationService implements NotificationService {
    @Value(\"${smtp.host}\")
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
}"
   vanilla_code="public class UserService {
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
        String smtpHost = System.getProperty(\"smtp.host\", \"localhost\");
        boolean notificationsEnabled = Boolean.parseBoolean(
            System.getProperty(\"app.notifications.enabled\", \"true\"));

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
}"
   description="No annotations, no magic property injection, no framework lifecycle hooks. Just clear constructor dependencies and explicit configuration logic."
%}

{% include framework-comparison.html
   id="enterprise-example"
   title="Enterprise Java Stack"
   framework_name="Jakarta EE + CDI"
   complexity="10"
   code="@Stateless
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

    @PersistenceContext(unitName = \"ordersPU\")
    private EntityManager entityManager;

    @Resource(lookup = \"jms/OrderQueue\")
    private Queue orderQueue;

    @Resource(lookup = \"jms/QueueConnectionFactory\")
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
            throw new EJBException(\"Order processing failed\", e);
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
// Plus: JNDI resource configuration"
   vanilla_code="public class OrderProcessingService {
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
            throw new IllegalArgumentException(\"Invalid order request\");
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
);"
   description="No application server required, no deployment descriptors, no JNDI lookups, no magic annotations. Just explicit dependencies and clear business logic that any Java developer can understand and test."
%}

---

<div class="support-section">
  <h2>Support Vanilla DI Development</h2>

  <p>Developing the world's most lightweight DI framework is hard work! Help us maintain our 0-byte codebase and continue delivering blazing-fast performance improvements.</p>

  <a href="https://www.buymeacoffee.com/cchacin" target="_blank" class="support-button">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" />
  </a>

  <p><strong>Your contribution helps us:</strong></p>
  <ul class="support-list">
    <li>Keep the framework dependency-free</li>
    <li>Maintain zero compilation overhead</li>
    <li>Continue delivering sub-millisecond startup times</li>
    <li>Fund our extensive "no-documentation" documentation</li>
    <li>Support our team of 0 full-time developers</li>
  </ul>

  <p class="support-note">Fun fact: 100% of donations go directly toward not adding features to Vanilla DI!</p>
</div>

The **Vanilla DI** team maintains every line of code in the framework and works hard each day to make sure it stays simple and intuitive.

Made with ❤️ for Java developers who appreciate simplicity.

*Inspired by the excellent [Vanilla JS](http://vanilla-js.com)*