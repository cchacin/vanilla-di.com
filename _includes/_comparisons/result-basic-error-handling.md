---
title: "Basic Error Handling"
framework_name: "Exception Hell"
complexity: 8
description: "Witness the dramatic transformation from exception pyramids to functional error handling. No try/catch archaeology required!"
---

## Framework Code

```java
public User getUserById(String id) throws UserNotFoundException, DatabaseException {
    try {
        validateId(id);
        return database.findUser(id);
    } catch (ValidationException e) {
        throw new DatabaseException("Invalid ID", e);
    } catch (SQLException e) {
        throw new DatabaseException("Database error", e);
    }
}

// Caller has to deal with exceptions
try {
    User user = getUserById("123");
    processUser(user);
} catch (UserNotFoundException e) {
    logger.error("User not found", e);
    return defaultUser();
} catch (DatabaseException e) {
    logger.error("Database error", e);
    throw new RuntimeException(e);
}
```

## Vanilla DI Code

```java
public Result<User, String> getUserById(String id) {
    return validateId(id)
        .flatMap(validId -> database.findUser(validId));
}

// Caller handles errors functionally
getUserById("123")
    .peek(user -> logger.info("Found user: {}", user.name()))
    .peekError(error -> logger.error("Failed: {}", error))
    .map(this::processUser)
    .orElse(defaultUser());
```
