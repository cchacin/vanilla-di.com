---
layout: page
title: Vanilla Result - Errors as values, because try/catch is so 2004
---

<div class="hero-section">
  <h1>📦 Vanilla Result</h1>
  <p class="hero-subtitle">Railway-oriented programming without the framework baggage</p>
</div>

## The Problem

You've seen the enterprise codebases. The try/catch pyramids. The swallowed exceptions. The `throws Exception` methods that make your API a minefield.

```java
// The exception nightmare
public User getUserById(String id) throws UserNotFoundException, DatabaseException, ValidationException {
    try {
        validateId(id);
        return database.findUser(id);
    } catch (ValidationException e) {
        logger.error("Validation failed", e);
        throw e;
    } catch (SQLException e) {
        logger.error("Database error", e);
        throw new DatabaseException("Failed to fetch user", e);
    }
}
```

So you reached for **Vavr** (50,000+ lines of Scala-inspired Java). Or maybe **Arrow-kt** (for those who dream in Kotlin). Perhaps you considered **Resilience4j** just for its `Try` type.

All you wanted was to **treat errors as data**. But instead, you got:
- 📦 Another 2-5MB JAR dependency
- 📚 200 pages of documentation about monadic composition
- 🤯 Explaining to your team what "left-biased Either" means
- 🐌 Framework overhead in your hot paths

## The Solution

**157 lines of modern Java.** That's it. Copy, paste, own it forever.

<div id="result-code-block" style="position: relative;" markdown="1">

```java
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

public sealed interface Result<T, E> permits Result.Success, Result.Failure {

    record Success<T, E>(T value) implements Result<T, E> {}
    record Failure<T, E>(E error) implements Result<T, E> {}

    // Factory methods
    static <T, E> Result<T, E> success(T value) {
        return new Success<>(value);
    }

    static <T, E> Result<T, E> failure(E error) {
        return new Failure<>(error);
    }

    static <T, E extends Exception> Result<T, E> of(ThrowingSupplier<T, E> supplier) {
        try {
            return success(supplier.get());
        } catch (Exception e) {
            @SuppressWarnings("unchecked")
            E error = (E) e;
            return failure(error);
        }
    }

    // Predicates
    default boolean isSuccess() {
        return this instanceof Success<T, E>;
    }

    default boolean isFailure() {
        return this instanceof Failure<T, E>;
    }

    // Transform success value
    default <U> Result<U, E> map(Function<? super T, ? extends U> mapper) {
        return switch (this) {
            case Success<T, E>(var value) -> new Success<>(mapper.apply(value));
            case Failure<T, E>(var error) -> new Failure<>(error);
        };
    }

    // Transform error value
    default <F> Result<T, F> mapError(Function<? super E, ? extends F> mapper) {
        return switch (this) {
            case Success<T, E>(var value) -> new Success<>(value);
            case Failure<T, E>(var error) -> new Failure<>(mapper.apply(error));
        };
    }

    // Chain operations that return Result
    default <U> Result<U, E> flatMap(Function<? super T, ? extends Result<U, E>> mapper) {
        return switch (this) {
            case Success<T, E>(var value) -> mapper.apply(value);
            case Failure<T, E>(var error) -> new Failure<>(error);
        };
    }

    // Pattern match with handlers
    default <U> U fold(Function<? super T, ? extends U> onSuccess,
                       Function<? super E, ? extends U> onFailure) {
        return switch (this) {
            case Success<T, E>(var value) -> onSuccess.apply(value);
            case Failure<T, E>(var error) -> onFailure.apply(error);
        };
    }

    // Recover from error with fallback value
    default T recover(Function<? super E, ? extends T> recovery) {
        return switch (this) {
            case Success<T, E>(var value) -> value;
            case Failure<T, E>(var error) -> recovery.apply(error);
        };
    }

    // Recover from error with alternative Result
    default Result<T, E> recoverWith(Function<? super E, ? extends Result<T, E>> recovery) {
        return switch (this) {
            case Success<T, E> s -> s;
            case Failure<T, E>(var error) -> recovery.apply(error);
        };
    }

    // Get value or throw
    default T orElseThrow() {
        return switch (this) {
            case Success<T, E>(var value) -> value;
            case Failure<T, E>(var error) -> {
                if (error instanceof Exception e) {
                    throw new RuntimeException(e);
                }
                throw new RuntimeException("Result failed with error: " + error);
            }
        };
    }

    // Get value or use default
    default T orElse(T defaultValue) {
        return switch (this) {
            case Success<T, E>(var value) -> value;
            case Failure<T, E> ignored -> defaultValue;
        };
    }

    // Get value or compute default
    default T orElseGet(Supplier<? extends T> supplier) {
        return switch (this) {
            case Success<T, E>(var value) -> value;
            case Failure<T, E> ignored -> supplier.get();
        };
    }

    // Peek at success value (for side effects)
    default Result<T, E> peek(Consumer<? super T> consumer) {
        if (this instanceof Success<T, E>(var value)) {
            consumer.accept(value);
        }
        return this;
    }

    // Peek at error value (for side effects)
    default Result<T, E> peekError(Consumer<? super E> consumer) {
        if (this instanceof Failure<T, E>(var error)) {
            consumer.accept(error);
        }
        return this;
    }

    // Functional interface for throwing operations
    @FunctionalInterface
    interface ThrowingSupplier<T, E extends Exception> {
        T get() throws E;
    }
}
```
</div>

## Usage Examples

{% include comparison.html file="result-basic-error-handling" %}

{% include comparison.html file="result-railway-oriented" %}

{% include comparison.html file="result-exception-wrapping" %}

{% include comparison.html file="result-pattern-matching" %}

{% include comparison.html file="result-error-recovery" %}

## Why Vanilla Result?

<div class="features-grid">
  <div class="feature-card">
    <h3 data-emoji="📏">Just 157 Lines</h3>
    <p>Vavr: 50,000+ lines. Arrow-kt: Requires Kotlin. You: 157 lines you can read in 5 minutes.</p>
  </div>

  <div class="feature-card">
    <h3 data-emoji="🎯">Zero Dependencies</h3>
    <p>No Maven coordinates. No version conflicts. No transitive dependency surprises. Just Java.</p>
  </div>

  <div class="feature-card">
    <h3 data-emoji="🔍">Debug Friendly</h3>
    <p>Stack traces point to YOUR code. No framework internals. Your IDE autocompletes everything.</p>
  </div>

  <div class="feature-card">
    <h3 data-emoji="⚡">Modern Java</h3>
    <p>Sealed interfaces, records, pattern matching, switch expressions. Uses the Java you're already paying Oracle for.</p>
  </div>
</div>

## Requirements

- **Java 21+** for sealed interfaces, records, and pattern matching
- **Java 25** recommended for latest pattern matching enhancements
- That's it. No frameworks, no libraries, no build plugins.

## Installation

1. **Copy the code above**
2. **Paste into your project** (e.g., `src/main/java/yourpackage/Result.java`)
3. **Start using it**

No Maven coordinates, no Gradle dependencies, no framework configuration.

**Congratulations!** You now have a production-ready Result type and you understand every line of it.

## Real-World Benefits

<div class="comparison-grid">
  <div class="code-example framework-example">
    <div class="example-header">
      <h4>Before Vanilla Result</h4>
      <span class="complexity-badge">😓 Pain Points</span>
    </div>
    <div class="code-block">
      <ul>
        <li>🔴 Exception handling scattered across codebase</li>
        <li>🔴 Silent failures from swallowed exceptions</li>
        <li>🔴 Unclear API contracts (<code>throws Exception</code>?)</li>
        <li>🔴 Framework dependency for simple error handling</li>
      </ul>
    </div>
  </div>

  <div class="code-example vanilla-example">
    <div class="example-header">
      <h4>After Vanilla Result</h4>
      <span class="complexity-badge vanilla">✨ Benefits</span>
    </div>
    <div class="code-block">
      <ul>
        <li>✅ Explicit error handling in type signatures</li>
        <li>✅ Compiler-enforced error handling</li>
        <li>✅ Clear API contracts (<code>Result&lt;User, UserError&gt;</code>)</li>
        <li>✅ Complete control over your error handling code</li>
      </ul>
    </div>
  </div>
</div>

---

<div class="support-section">
  <p><em>Part of the <a href="/libraries/">Vanilla Libraries</a> collection</em></p>
  <p><em>Because sometimes the best framework is 157 lines of code you actually understand</em></p>
</div>
