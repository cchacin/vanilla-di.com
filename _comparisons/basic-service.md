---
title: "Basic Service Injection"
framework_name: "Spring Framework"
complexity: 8
description: "Marvel at this breakthrough in software engineering: dependencies are simply passed to constructors! No advanced degrees in framework archaeology required."
---

## Framework Code

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

## Vanilla DI Code

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