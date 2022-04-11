---
slug: /streams/optionals
course: Programming Project 2021/22
module: Streams
title: Optionals
subtitle: null
chapter: 11
section: 4
previous: /streams/int-stream
next: /streams/operations
---

## Optional class

A container object which may or may not contain a non-null value. 

If a value is present:
- `isPresent()` will return `true`
- `get()` will return the value

Additional methods that depend on the presence or absence of a contained value are provided: 
- `orElse()`: return a default value if value not present
- `ifPresent()`: execute a block of code if the value is present

## Main methods

```java
public class OptionalDemo {
   public static void main(String[] args) {
      Optional<Integer> container = Optional.of(10);

      System.out.printf("Is value present? %b%n", container.isPresent());
      System.out.printf("Value: %d%n", container.get());
      System.out.printf("Value or else: %d%n", container.orElse(0));
      System.out.printf("Value or else get: %d%n", container.orElseGet(() -> 1));
      container.ifPresent(value -> System.out.printf("Value is present: %d%n", value));

      Optional<Integer> emptyContainer = Optional.empty();

      System.out.printf("%nIs value present? %b%n", emptyContainer.isPresent());

      try {
         System.out.printf("Value: %d%n", emptyContainer.get());
      } catch (NoSuchElementException e) {
         System.out.printf("%s: %s%n", e.getClass().getName(), e.getMessage());
      }

      System.out.printf("Value or else: %d%n", emptyContainer.orElse(0));
      System.out.printf("Value or else get: %d%n", emptyContainer.orElseGet(() -> 1));
      emptyContainer.ifPresent(value -> System.out.printf("Value is present: %d", value));
   }
}
```

## Optionals returned on stream operations

```java
public class IntStreamOptional {

   public static void main(String[] args) {
      OptionalDouble averageContainer = IntStream.of(3, 13, 6, 1, 4, 8, 9)
              .average();

      System.out.printf("Is average present: %b%n", averageContainer.isPresent());

      try {
         double average = averageContainer.getAsDouble();
         System.out.printf("Average: %f%n", average);
      } catch (NoSuchElementException e) {
         System.out.println("Exception thrown because there is no average!");
      }

      double orElseAverage = averageContainer.orElse(-1);
      System.out.printf("Average or else: %f%n", orElseAverage);
   }

}
```

```output
Is average present: true
Average: 6,285714
Average or else: 6,285714
```

