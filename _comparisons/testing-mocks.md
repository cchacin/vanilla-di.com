---
title: "Testing with Mocks"
framework_name: "Dagger 2"
complexity: 4
description: "Shocking revelation: mocks can be passed directly to constructors! This groundbreaking technique eliminates entire test configuration frameworks."
---

## Framework Code

```java
@Component(modules = {DatabaseModule.class})
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
}
```

## Vanilla DI Code

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