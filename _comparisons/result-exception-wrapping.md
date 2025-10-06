---
title: "Converting Exceptions to Results"
framework_name: "Exception Wrapping"
complexity: 7
description: "Transform exception-throwing APIs into functional Results without the ceremony. One method call replaces try/catch boilerplate!"
---

## Framework Code

```java
Config loadConfig() {
    String configJson;
    try {
        configJson = Files.readString(Path.of("config.json"));
    } catch (IOException e) {
        logger.error("Failed to load config", e);
        return defaultConfig();
    }

    Config config;
    try {
        config = parseConfig(configJson);
    } catch (JsonException e) {
        logger.error("Failed to parse config", e);
        return defaultConfig();
    }

    logger.info("Loaded config: {}", config);
    return config;
}
```

## Vanilla DI Code

```java
Config loadConfig() {
    return Result.of(() -> Files.readString(Path.of("config.json")))
        .map(this::parseConfig)
        .recover(error -> defaultConfig())
        .peek(config -> logger.info("Loaded config: {}", config));
}
```
