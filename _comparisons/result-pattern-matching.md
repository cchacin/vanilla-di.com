---
title: "Pattern Matching with Fold"
framework_name: "If/Else Chains"
complexity: 6
description: "Replace verbose if/else chains with elegant pattern matching. Java 25 switch expressions make error handling beautiful!"
---

## Framework Code

```java
String getUserMessage(String userId) {
    try {
        User user = getUserById(userId);
        return "Welcome, " + user.name();
    } catch (UserNotFoundException e) {
        return "Error: User not found";
    } catch (DatabaseException e) {
        return "Error: Database error - " + e.getMessage();
    } catch (Exception e) {
        return "Error: Unknown error";
    }
}

int getPaymentStatusCode(Order order) {
    try {
        processPayment(order);
        return 200;
    } catch (PaymentDeclinedException e) {
        return 402;
    } catch (InsufficientFundsException e) {
        return 402;
    } catch (NetworkException e) {
        return 503;
    } catch (Exception e) {
        return 500;
    }
}
```

## Vanilla DI Code

```java
String getUserMessage(String userId) {
    return getUserById(userId).fold(
        user -> "Welcome, " + user.name(),
        error -> "Error: " + error
    );
}

int getPaymentStatusCode(Order order) {
    return processPayment(order).fold(
        success -> 200,
        error -> switch (error) {
            case PaymentDeclined pd -> 402;
            case InsufficientFunds inf -> 402;
            case NetworkError ne -> 503;
            default -> 500;
        }
    );
}
```
