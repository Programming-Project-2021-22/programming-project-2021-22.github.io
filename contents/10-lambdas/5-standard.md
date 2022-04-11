---
slug: /lambdas/standard
course: Programming Project 2021/22
module: Lambda Expressions
title: Standard Functional Interfaces
subtitle: null
chapter: 10
section: 5
previous: /lambdas/local-variables
next: /lambdas/sorting
---

## Standard functional interfaces

The `java.util.function` package provide a collection of general purpose functional interfaces:
- `Function<T,R>`
- `Predicate<T>`
- `BiPredicate<T,U>`
- `Consumer<T>`

- They cover most common use cases and are used throughout the JDK. Luckily for us, we can also reuse them!

See more [here](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/package-summary.html).

## `Consumer<T>`

[`Consumer`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/Consumer.html) represents an operation that accepts a single input argument and returns no result.

Unlike most other functional interfaces, it is expected to operate via side-effects.

This is a functional interface whose functional method is `void accept(T t)`.

Type parameters:
- `T`: the type of the input to the operation

`Consumer` is used with the `forEach()` method available in all iterables:

```java
public static void main(String[] args) {
  List.of(1, 2, 3, 4).forEach(x -> System.out.println(x));
}
```

```output
1
2
3
4
```

Here is an example. The side-effect of the consumer below is increasing the value of the accumulator:

```java
import java.util.List;

class Accumulator {
  int value;

  public Accumulator(int value) {
    this.value = value;
  }

  void add(int value) {
    this.value += value;
  }
}

public class ModifyingObjects {
  public static void main(String[] args) {
    Accumulator acc = new Accumulator(0);
    List.of(1, 2, 3, 4).forEach(x -> acc.add(x));
    System.out.println(acc.value);
  }
}
```

```output
10
```

Here is another example:

```java
public class Shape {
  String type;
  String id;

  public Shape(String type, String id) {
    this.type = type;
    this.id = id;
  }

  void draw() {
    System.out.println("Drawing " + type + ": " + id);
  }
}
```

```java
public class Drawing {
  public static void main(String[] args) {
    Shape rectangle = new Shape("rectangle", "123");
    Shape circle = new Shape("circle", "456");
    Shape triangle = new Shape("triangle", "789");

    List<Shape> shapes = List.of(rectangle,circle,triangle);
    shapes.forEach(x -> x.draw());
  }
}
```

```output
Drawing rectangle: 123
Drawing circle: 456
Drawing triangle: 789
```

## `BiConsumer<T,U>`

[`BiConsumer<T,U>`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/BiConsumer.html) represents an operation that accepts two input arguments and returns no result.

This is the two-arity variation of `Consumer`.

This is a functional interface whose functional method is `void accept(T t, U u)`.

Type parameters:
- `T`: the type of the first argument to the operation
- `U`: the type of the second argument to the operation


```java
import java.util.HashMap;
import java.util.Map;

public class BiConsumerDemo {
  public static void main(String[] args) {
    Map<String, String> map = new HashMap<>();

    map.put("Reverse Giraffe", "parasite");
    map.put("Morty", "person");
    map.put("Sleepy Gary", "parasite");
    map.put("Beth", "person");
    map.put("Hamuray", "parasite");

    map.forEach(
        (character, nature) ->
            System.out.println(
                character + ": I'm not a parasite! (" + !nature.equals("parasite") + ")"));
  }
}
```

```output
Morty: I'm not a parasite! (true)
Hamuray: I'm not a parasite! (false)
Beth: I'm not a parasite! (true)
Reverse Giraffe: I'm not a parasite! (false)
Sleepy Gary: I'm not a parasite! (false)
```

## `Predicate<T>`

[`Predicate<T>`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/Predicate.html) represents a predicate (boolean-valued function) of one argument.

This is a functional interface whose functional method is `boolean test(T t)`.

Type parameters:
- `T`: the type of the input to the predicate

```java
public static void main(String[] args) {
  List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6, 7, 8));
  System.out.println("All numbers: " + numbers);

  numbers.removeIf(number -> number % 2 != 0);
  System.out.println("Only even numbers: " + numbers);
}
```

```output
All numbers: [1, 2, 3, 4, 5, 6, 7, 8]
Only even numbers: [2, 4, 6, 8]
```

## Exercise 1

Using the `Predicate<T>` interface, create a class than offers 3 static methods
- `all()`: returns true if all elements in a collection pass a given test
- `exists()`: returns true if at least one element in a collection pass a given test
- `none()`: returns true if at no element in a collection pass a given test

Your methods should accept as input collections holding any type of object.

Create a `Main` class in which you test the methods using collections holding different types of objects

<!-- ## `Predicate<T>`: Exercise

```java
import java.util.Collection;
import java.util.function.Predicate;

public class LogicalOperator {
  public static <T> boolean all(Collection<? extends T> collection, Predicate<T> predicate) {
    for (T t : collection) {
      if (!predicate.test(t))
        return false;
    }

    return true;
  }

  public static <T> boolean exists(Collection<? extends T> collection, Predicate<T> predicate) {
    for (T t : collection) {
      if (predicate.test(t))
        return true;
    }

    return false;
  }

  public static <T> boolean none(Collection<? extends T> collection, Predicate<T> predicate) {
    for (T t : collection) {
      if (predicate.test(t))
        return false;
    }

    return true;
  }
}
```

```java
import java.util.List;

public class ExerciseMain {
  public static void main(String[] args) {
    List<Integer> numbers = List.of(1, 2, 3, 4, 5);

    boolean allLessThanTen = LogicalOperator.all(numbers, x -> x < 10);
    System.out.println("All numbers are lesser than 10: " + allLessThanTen);

    boolean allEven = LogicalOperator.all(numbers, x -> x % 2 == 0);
    System.out.println("All numbers are even: " + allEven);

    boolean existsMultipleFive = LogicalOperator.exists(numbers, x -> x % 5 == 0);
    System.out.println("There is a multiple of 5: " + existsMultipleFive);

    boolean existsTen = LogicalOperator.exists(numbers, x -> x == 10);
    System.out.println("There is a 10: " + existsTen);

    boolean noNegative = LogicalOperator.none(numbers, x -> x < 0);
    System.out.println("There are no negative numbers: " + noNegative);

    boolean noZero = LogicalOperator.none(numbers, x -> x == 0);
    System.out.println("There are no zeroes: " + noZero);
  }
}
```

```output
All numbers are lesser than 10: true
All numbers are even: false
There is a multiple of 5: true
There is a 10: false
There are no negative numbers: true
There are no zeroes: true
``` -->

## `BiPredicate<T,U>`

[`BiPredicate<T,U>`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/BiPredicate.html) represents a predicate (boolean-valued function) of two arguments.

This is the two-arity version of `Predicate<T>`.

This is a functional interface whose functional method is `test(T t, U u)`.

Type parameters:
- `T`: the type of the first argument to the predicate
- `U`: the type of the second argument the predicate

Here is an example:

```java
public class MapOperators {
  static <T, U> void filter(Map<T, U> map, BiPredicate<T, U> predicate) {
    Iterator<Map.Entry<T, U>> iterator = map.entrySet().iterator();
    while (iterator.hasNext()) {
      Map.Entry<T, U> entry = iterator.next();
      T key = entry.getKey();
      U value = entry.getValue();

      if (predicate.test(key, value)) {
        iterator.remove();
      }
    }
  }

  static <T, U> Map<T, U> copyIf(Map<T, U> map, BiPredicate<T, U> predicate) {
    Map<T, U> copy = new HashMap<>();
    for (Map.Entry<T, U> entry : map.entrySet()) {
      T key = entry.getKey();
      U value = entry.getValue();

      if (predicate.test(key, value)) {
        copy.put(key, value);
      }
    }
    return copy;
  }
}
```

```java
public class Main {
  public static void main(String[] args) {
    Map<String, String> map = new HashMap<>();

    map.put("Reverse Giraffe", "parasite");
    map.put("Morty", "person");
    map.put("Sleepy Gary", "parasite");
    map.put("Beth", "person");
    map.put("Hamuray", "parasite");

    System.out.println("Original: " + map);

    Map<String, String> parasiteMap = MapOperators.copyIf(map, (name, nature) -> nature.equals("parasite"));
    System.out.println("Copy (if parasite): " + parasiteMap);

    MapOperators.filter(map, (name, nature) -> !name.equals("Morty") || !nature.equals("person"));
    System.out.println("Map without a Morty: " + map);
  }
}
```

```output
Original: {Morty=person, Hamuray=parasite, Beth=person, Reverse Giraffe=parasite, Sleepy Gary=parasite}
Copy (if parasite): {hamuray=parasite, Reverse Giraffe=parasite, Sleepy Gary=parasite}
Map without a Morty: {Morty=person}
```

## `Function<T,R>`

[`Function<T,R>`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/Function.html) represents a function that accepts one argument and produces a result.

This is a functional interface whose functional method is `U apply(T)`.

Type parameters:
- `T`: the type of the input to the function
- `R`: the type of the result of the function

Here is an example:

```java
public class Main {
  public static void main(String[] args) {
    List<Integer> numbers = List.of(1, 2, 3, 4, 5);
    System.out.println("Original: " + numbers);

    List<Integer> successors = transform(numbers, x -> x + 1);
    System.out.println("+1: " + successors);

    List<Integer> triples = transform(numbers, x -> 3 * x);
    System.out.println("x3: " + triples);
  }

  static <T, R> List<R> transform(List<? extends T> list, Function<T, R> function) {
    List<R> newList = new ArrayList<>();
    for (T t : list) {
      newList.add(function.apply(t));
    }
    return newList;
  }
}
```

```output
Original: [1, 2, 3, 4, 5]
+1: [2, 3, 4, 5, 6]
x3: [3, 6, 9, 12, 15]
```

## `UnaryOperator<T>`

[`UnaryOperator<T>`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/UnaryOperator.html) represents an operation on a single operand that produces a result of the same type as its operand.

This is a specialization of `Function<T,R>` for the case where the operand and result are of the same type.

This is a functional interface whose functional method is `U apply(T)`.

Type parameters:
- `T`: the type of the operand and result of the operator

```java
public static void main(String[] args) {
  List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3, 4, 5));
  System.out.println("Original: " + numbers);

  numbers.replaceAll(x -> x + 1);
  System.out.println("+1: " + numbers);

  numbers.replaceAll(x -> x * 3);
  System.out.println("x3: " + numbers);
}
```

## `BiFunction<T,U,R>`


[`BiFunction<T,U,R>`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/BiFunction.html) represents a function that accepts two arguments and produces a result.

This is the two-arity version of `Function`.

This is a functional interface whose functional method is `R apply(T t, U u)`.

Type parameters:
- `T`: the type of the first argument to the function
- `U`: the type of the second argument to the function
- `R`: the type of the result of the function
  
## Exercise 2

- Write a method that merges two lists by combining the elements in each position
- Use a `BiFunction` to combine the elements from the two lists

<!-- ## `BiFunction<T,U,R>`: Solution

```java
import java.util.ArrayList;
import java.util.List;
import java.util.function.BiFunction;

public class ListOperations {
  public static <T, U, R> List<R> combine(
      List<? extends T> list1, List<? extends U> list2, BiFunction<T, U, R> function) {

    if (list1.size() != list2.size())
      throw new IllegalArgumentException("Lists must have the same size");

    List<R> combined = new ArrayList<>();

    for (int i = 0; i < list1.size(); i++) {
      T t = list1.get(i);
      U u = list2.get(i);
      R r = function.apply(t, u);
      combined.add(r);
    }

    return combined;
  }
}
```

```java
public class Main {
  public static void main(String[] args) {
    List<String> names = List.of("Tiago", "Camila", "Davi");
    List<Integer> ages = List.of(31, 32, 0);

    List<String> nameAgeList =
        ListOperations.combine(names, ages, (name, age) -> name + ": " + age);
    System.out.println(nameAgeList);

    List<Boolean> booleans = List.of(true, false, true);
    List<String> duplicates =
        ListOperations.combine(
            names, booleans, (name, shouldDuplicate) -> shouldDuplicate ? name + " " + name : name);

    System.out.println(duplicates);
  }
}
```

```output
[Tiago: 31, Camila: 32, Davi: 0]
[Tiago Tiago, Camila, Davi Davi]
``` -->

## `BinaryOperator<T>`

[`BinaryOperator<T>`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/function/BinaryOperator.html) represents an operation upon two operands of the same type, producing a result of the same type as the operands.

This is a specialization of `BiFunction` for the case where the operands and the result are all of the same type.

This is a functional interface whose functional method is `T apply(T t1, T t2)`.

Type parameters:
- `T`: the type of the operands and result of the operator

Here is an example:

```java
import java.util.function.BinaryOperator;

public class Main {
  public static void main(String[] args) {
    int[] values = {1, 2, 3, 4};

    int sum = reduce(values, 0, (x, y) -> x + y);
    System.out.println("Sum: " + sum);

    int product = reduce(values, 1, (x, y) -> x * y);
    System.out.println("Product: " + product);

    int sumOfSquares =
            reduce(
                    values,
                    0,
                    (x, y) -> {
                      int ySquared = (int) Math.pow(y, 2);
                      return x + ySquared;
                    });

    System.out.println("Sum of squares: " + sumOfSquares);
  }

  static int reduce(int[] array, int initial, BinaryOperator<Integer> operator) {
    for (int value : array) {
      initial = operator.apply(initial, value);
    }

    return initial;
  }
}
```
