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
interface ApplicationComponent {
  UserService userService();
}

@Module
class TestDatabaseModule {
  @Provides
  @Singleton
  UserRepository provideUserRepository() {
    return Mockito.mock(UserRepository.class);
  }
}

class UserServiceTest {
  @Test
  void testFindUser() {
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
class UserServiceTest {
  @Test
  void testFindUser() {
    // Create test dependencies
    var mockRepository = Mockito.mock(UserRepository.class);
    var expectedUser = new User(1L, "John");

    when(mockRepository.findById(1L)).thenReturn(expectedUser);

    // Create service with test dependencies
    var service = new UserService(mockRepository);

    // Test
    var result = service.findUser(1L);

    // Verify
    assertEquals(expectedUser, result);
    verify(mockRepository).findById(1L);
  }
}
```