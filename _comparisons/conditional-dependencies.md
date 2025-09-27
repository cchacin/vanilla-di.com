---
title: "Conditional Dependencies"
framework_name: "Spring Boot"
complexity: 9
description: "Witness the ancient art of 'if statements' - a mystical Java technique that eliminates the need for @Profile annotations and magical property injection!"
---

## Framework Code

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

# Plus separate property files for each environment
```

## Vanilla DI Code

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
        EmailService emailService = isDevelopment ?
            new MockEmailService() :
            new SmtpEmailService("smtp.company.com", 587);

        return new NotificationController(emailService);
    }
}
```