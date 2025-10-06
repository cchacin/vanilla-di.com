---
title: "Error Recovery Strategies"
framework_name: "Nested Try/Catch"
complexity: 8
description: "Chain multiple fallback strategies elegantly. No more nested try/catch pyramids when you have multiple recovery options!"
---

## Framework Code

```java
User getUser(String id) {
    // Try primary source
    try {
        return getUserById(id);
    } catch (UserNotFoundException e) {
        // Try cache fallback
        try {
            return getUserFromCache(id);
        } catch (CacheException ce) {
            // Use anonymous fallback
            logger.warn("Failed to get user, using anonymous", e);
            return User.anonymous();
        }
    } catch (DatabaseException e) {
        logger.error("Database error", e);
        throw new RuntimeException(e);
    }
}

Config loadConfiguration() {
    // Try file
    try {
        return loadFromFile();
    } catch (IOException e) {
        // Try environment
        try {
            return loadFromEnvironment();
        } catch (ConfigException ce) {
            // Try defaults
            try {
                return loadFromDefaults();
            } catch (Exception de) {
                throw new RuntimeException("No config source available", de);
            }
        }
    }
}
```

## Vanilla DI Code

```java
User getUser(String id) {
    return getUserById(id)
        .recoverWith(error -> getUserFromCache(id))
        .recover(error -> User.anonymous());
}

Config loadConfiguration() {
    return loadFromFile()
        .recoverWith(err -> loadFromEnvironment())
        .recoverWith(err -> loadFromDefaults())
        .orElseThrow();
}
```
