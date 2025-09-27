---
title: "Basic Service Injection"
framework_name: "Spring Framework"
complexity: 8
description: "Marvel at this breakthrough in software engineering: dependencies are simply passed to constructors! No advanced degrees in framework archaeology required."
---

## Framework Code

```java
@Service
class UserService {
  @Autowired
  UserRepository userRepository;

  User findUser(Long id) {
    return userRepository.findById(id);
  }
}

@Repository
class UserRepository {
  @Autowired
  EntityManager entityManager;

  User findById(Long id) {
    return entityManager.find(User.class, id);
  }
}

@Configuration
@ComponentScan
@EnableJpaRepositories
class AppConfig {
  // Complex configuration...
}
```

## Vanilla DI Code

```java
class UserService {
  UserRepository userRepository;

  UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  User findUser(Long id) {
    return userRepository.findById(id);
  }
}

class UserRepository {
  EntityManager entityManager;

  UserRepository(EntityManager entityManager) {
    this.entityManager = entityManager;
  }

  User findById(Long id) {
    return entityManager.find(User.class, id);
  }
}

// In your main method or factory:
var entityManager = createEntityManager();
var repository = new UserRepository(entityManager);
var service = new UserService(repository);
```