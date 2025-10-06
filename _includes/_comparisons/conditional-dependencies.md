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
class MockEmailService implements EmailService {
  void sendEmail(String to, String message) {
    System.out.println("Mock email: " + message);
  }
}

@Service
@Profile("production")
class SmtpEmailService implements EmailService {
  @Value("${smtp.host}")
  String smtpHost;

  @Value("${smtp.port}")
  int smtpPort;

  void sendEmail(String to, String message) {
    // Real SMTP implementation
  }
}

@RestController
class NotificationController {
  @Autowired
  EmailService emailService; // Magic injection

  @PostMapping("/notify")
  void notify(@RequestBody NotificationRequest request) {
    emailService.sendEmail(request.getEmail(), request.getMessage());
  }
}

# Plus separate property files for each environment
```

## Vanilla DI Code

```java
interface EmailService {
  void sendEmail(String to, String message);
}

class MockEmailService implements EmailService {
  void sendEmail(String to, String message) {
    System.out.println("Mock email: " + message);
  }
}

class SmtpEmailService implements EmailService {
  String smtpHost;
  int smtpPort;

  SmtpEmailService(String smtpHost, int smtpPort) {
    this.smtpHost = smtpHost;
    this.smtpPort = smtpPort;
  }

  void sendEmail(String to, String message) {
    // Real SMTP implementation
  }
}

class NotificationController {
  EmailService emailService;

  NotificationController(EmailService emailService) {
    this.emailService = emailService;
  }

  void notify(NotificationRequest request) {
    emailService.sendEmail(request.getEmail(), request.getMessage());
  }
}

// In your application factory:
class ApplicationFactory {
  static NotificationController createController(boolean isDevelopment) {
    var emailService = isDevelopment ?
      new MockEmailService() :
      new SmtpEmailService("smtp.company.com", 587);

    return new NotificationController(emailService);
  }
}
```