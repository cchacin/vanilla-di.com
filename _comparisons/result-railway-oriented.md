---
title: "Railway-Oriented Programming"
framework_name: "Try/Catch Chaos"
complexity: 9
description: "Chain operations that can fail without drowning in nested try/catch blocks. Each operation flows seamlessly to the next!"
---

## Framework Code

```java
public OrderConfirmation processOrder(OrderRequest request)
    throws ValidationException, InventoryException, PaymentException, ShipmentException {
    try {
        ValidOrder order = validateOrder(request);
        try {
            OrderWithInventory withInventory = checkInventory(order);
            try {
                OrderWithPayment withPayment = processPayment(withInventory);
                try {
                    Shipment shipment = createShipment(withPayment);
                    return generateConfirmation(shipment);
                } catch (ShipmentException e) {
                    logger.error("Shipment failed", e);
                    throw e;
                }
            } catch (PaymentException e) {
                logger.error("Payment failed", e);
                throw e;
            }
        } catch (InventoryException e) {
            logger.error("Inventory check failed", e);
            throw e;
        }
    } catch (ValidationException e) {
        logger.error("Validation failed", e);
        throw e;
    }
}
```

## Vanilla DI Code

```java
public Result<OrderConfirmation, String> processOrder(OrderRequest request) {
    return validateOrder(request)
        .flatMap(this::checkInventory)
        .flatMap(this::processPayment)
        .flatMap(this::createShipment)
        .map(this::generateConfirmation)
        .peekError(error -> logger.error("Order failed: {}", error));
}

// Each step returns Result<T, String>
private Result<ValidOrder, String> validateOrder(OrderRequest request) {
    if (request.items().isEmpty()) {
        return Result.failure("Order has no items");
    }
    return Result.success(new ValidOrder(request));
}

private Result<OrderWithInventory, String> checkInventory(ValidOrder order) {
    return inventoryService.check(order.items())
        .map(inventory -> new OrderWithInventory(order, inventory));
}
```
