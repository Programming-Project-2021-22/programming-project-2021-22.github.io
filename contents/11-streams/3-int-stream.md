---
slug: /streams/int-stream
course: Programming Project 2021/22
module: Streams
title: IntStream
subtitle: null
chapter: 11
section: 3
previous: /streams/pipelines
next: /streams/optionals
---

## Creating int streams

```java
public class IntStreamRange {

   public static void main(String[] args) {
      IntStream.range(0, 10)
               .forEach(x -> System.out.print(x + " "));
      System.out.println();

      IntStream.rangeClosed(0, 10)
               .forEach(x -> System.out.print(x + " "));
      System.out.println();
   }

}
```

```output
0 1 2 3 4 5 6 7 8 9 
0 1 2 3 4 5 6 7 8 9 10 
```

## Creating int streams with `iterate` and `generate`

```java
public class IntStreamIterateGenerate {

   public static void main(String[] args) {
      IntStream.iterate(1, x -> x * 2)
               .limit(5)
               .forEach(x -> System.out.print(x + " "));

      System.out.println();

      IntStream.iterate(0, x -> x + 3)
               .limit(5)
               .forEach(x -> System.out.print(x + " "));

      System.out.println();

      Random r = new Random();
      IntStream.generate( () -> r.nextInt(50))
               .limit(5)
               .forEach(x -> System.out.print(x + " "));
   }

}
```

```output
1 2 4 8 16 
0 3 6 9 12 
36 41 28 33 24 
```

## Creating int streams from arrays

```java
public class IntStreamFromArray {

   public static void main(String[] args) {
      int[] values = {3, 13, 6, -1, 4, 8, 2, 5, 9};
      IntStream.of(values)
               .forEach(x -> System.out.print(x + " "));

      System.out.println();

      IntStream.of(2, 7, 8, 1)
               .forEach(x -> System.out.print(x + " "));

      System.out.println();
      
      ArrayList<Integer> list = new ArrayList<>();
      list.add(9);
      list.add(2);
      list.add(5);

      list.stream()
          .forEach(x -> System.out.print(x + " "));
   }

}
```

```output
3 13 6 -1 4 8 2 5 9 
2 7 8 1 
9 2 5 
```

## Building streams manually

```java
public class IntStreamBuilder {

   public static void main(String[] args) {
      IntStream.builder()
              .add(0)
              .add(1)
              .add(2)
              .build()
              .forEach(x -> System.out.print(x + " "));
   }

}
```

```output
0 1 2 
```

## IntStream basic operations

```java
public class IntStreamOperations {
   public static void main(String[] args) {
      int[] values = {3, 13, 6, -1, 4, 8, 2, 5, 9};

      // Display original values
      System.out.print("Original values: ");
      IntStream.of(values).forEach(value -> System.out.printf("%d ", value));

      // count, min, max, sum, and average of the values
      long count = IntStream.of(values).count();
      System.out.printf("%nCount: %d%n", count);

      int min = IntStream.of(values).min().getAsInt();
      System.out.printf("Min: %d%n", min);

      int max = IntStream.of(values).max().getAsInt();
      System.out.printf("Max: %d%n", max);

      int sum = IntStream.of(values).sum();
      System.out.printf("Sum: %d%n", sum);

      double average = IntStream.of(values).average().getAsDouble();
      System.out.printf("Average: %f%n", average);
   }
}
```

```output
Original values: 3 13 6 -1 4 8 2 5 9 
Count: 9
Min: -1
Max: 13
Sum: 49
Average: 5,444444
```

## IntStream summary

```java
public class IntStreamSummary {
   public static void main(String[] args) {
      int[] values = {3, 13, 6, -1, 4, 8, 2, 5, 9};

      // Display original values
      System.out.print("Original values: ");
      IntStream.of(values)
               .forEach(value -> System.out.printf("%d ", value));

      // count, min, max, sum, and average of the values
      IntSummaryStatistics stat = IntStream.of(values).summaryStatistics();

      System.out.printf("%nCount: %d%n", stat.getCount());
      System.out.printf("Min: %d%n", stat.getMin());
      System.out.printf("Max: %d%n", stat.getMax());
      System.out.printf("Sum: %d%n", stat.getSum());
      System.out.printf("Average: %f%n", stat.getAverage());
   }
}
```

```output
Original values: 3 13 6 -1 4 8 2 5 9 
Count: 9
Min: -1
Max: 13
Sum: 49
Average: 5,444444
```

## IntStream reduce

```java
public class IntStreamReduce {

   public static void main(String[] args) {
      int[] values = {1, 2, 3, 4, 5};

      int sum = IntStream.of(values)
                         .reduce(0, (x, y) -> x + y);
      System.out.println("Sum: " + sum);

      int sumOfSquares = IntStream.of(values)
                                  .reduce(0, (x, y) -> x + y * y);
      System.out.println("Sum of squares: " + sumOfSquares);

      int product = IntStream.of(values)
                             .reduce(1, (x, y) -> x * y);
      System.out.println("Product: " + product);
   }

}
```

```output
Sum: 15
Sum of squares: 55
Product: 120
```


## Filtering, mapping, and sorting

```java
public class IntStreamFilterSortMap {

   public static void main(String[] args) {
      int[] values = {8, 3, 1, 4, 7, 6, 5, 2};

      IntStream.of(values)
               .filter(i -> i % 2 == 0)
               .map(i -> i * i)
               .sorted()
               .forEach(i -> System.out.printf("%d ", i));
   }

}
```

```output
4 16 36 64 
```

## Finding and matching

```java
public class IntStreamMatchFind {
  
   public static void main(String[] args) {
      boolean allEven = IntStream.range(0, 10)
              .allMatch(value -> value % 2 == 0);
      System.out.printf("All numbers are even: %b%n", allEven);

      boolean anyEven = IntStream.range(0, 10)
              .anyMatch(value -> value % 2 == 0);
      System.out.printf("Some number is even: %b%n", anyEven);

      int first = IntStream.range(0, 10)
              .findFirst()
              .getAsInt();
      System.out.printf("First number: %d%n", first);

      int any = IntStream.range(0, 10)
              .findAny()
              .getAsInt();
      System.out.printf("Any number: %d%n", any);
   }
   
}
```

```output
All numbers are even: false
Some number is even: true
First number: 0
Any number: 0
```

## Mapping int streams

```java
public class IntStreamMapping {
   public static void main(String[] args) {
      IntStream.range(0, 4)
              .map(i -> i * i * i)
              .forEach(i -> System.out.printf("%d ", i));
      
      System.out.println();
      IntStream.range(0, 4)
              .mapToDouble(i -> i)
              .forEach(d -> System.out.printf("%f ", d));

      System.out.println();
      IntStream.range(0, 4)
              .mapToLong(i -> i)
              .forEach(l -> System.out.printf("%d ", l));

      System.out.println();
      IntStream.range(0, 4)
              .mapToObj(String::valueOf)
              .forEach(s -> System.out.printf("%s ", s));
   }
}
```

```output
0 1 8 27 
0,000000 1,000000 2,000000 3,000000 
0 1 2 3 
0 1 2 3 
```

## Collecting int streams

```java
public class IntStreamCollect {

   public static void main(String[] args) {
      List<Integer> values = IntStream.range(0, 10)
              .boxed()
              .collect(Collectors.toList());

      System.out.println(values);

      String s = IntStream.range(0, 10)
              .mapToObj(x -> String.valueOf(x))
              .collect(Collectors.joining(" - ", "{", "}"));

      System.out.println(s);
   }

}
```

```output
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
{0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9}
```
<!-- 
## Custom collectors: anonymous implementation

```java
ArrayList<Integer> list = IntStream.range(0, 10)
        .boxed()
        .collect(new Collector<Integer, ArrayList<Integer>, ArrayList<Integer>>() {
            @Override
            public Supplier<ArrayList<Integer>> supplier() {
              return () -> new ArrayList<>();
            }

            @Override
            public BiConsumer<ArrayList<Integer>, Integer> accumulator() {
              return (list, integer) -> list.add(integer);
            }

            @Override
            public BinaryOperator<ArrayList<Integer>> combiner() {
              return (list1, list2) -> {
                  list1.addAll(list2);
                  return list1;
              };
            }

            @Override
            public Function<ArrayList<Integer>, ArrayList<Integer>> finisher() {
              return list -> list;
            }

            @Override
            public Set<Characteristics> characteristics() {
              return EnumSet.of(Characteristics.IDENTITY_FINISH);
            }
        });

System.out.println(list);
```

## Custom collectors: lambda syntax

```java
public class IntStreamCustomCollector {
   public static void main(String[] args) {
      ArrayList<Integer> list = IntStream.range(0, 10)
              .boxed()
              .collect(Collector.of(
                      () -> new ArrayList<>(),
                      (integers, i) -> integers.add(i),
                      (integers1, integers2) -> {
                         integers1.addAll(integers2);
                         return integers1;
                      })
              );

      System.out.println(list);

      list = IntStream.range(0, 10)
              .boxed()
              .collect(Collector.of(
                      ArrayList::new,
                      ArrayList::add,
                      (integers1, integers2) -> {
                         integers1.addAll(integers2);
                         return integers1;
                      })
              );

      System.out.println(list);
   }
}
```

```output
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
``` -->


## Exercise

1. Without using streams, write a program that emulates throwning a dice 6.000.000 times, while keeping track of the results.

<!-- 

```java
public class RollingDicesForLoop {
   public static void main(String[] args) {
      SecureRandom randomNumbers = new SecureRandom();

      int[] frequency = new int[7];

      for (int roll = 0; roll < 6000000; roll++) {
         int result = randomNumbers.nextInt(6);
         frequency[result+1]++;
      }

      for (int i = 1; i<7; i++){
         System.out.printf("%d: %d%n", i, frequency[i]);
      }
   }
}
```

```output
1: 998947
2: 1001871
3: 1000300
4: 1000091
5: 1000249
6: 998542
``` -->

2. Now, write an equivalent program using streams

<!-- 

```java
public class RollingDicesStream {
  public static void main(String[] args) {
      SecureRandom randomNumbers = new SecureRandom();

      IntStream.generate(() -> randomNumbers.nextInt(6) + 1)
              .limit(6000000)
              .boxed()
              .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
              .forEach((side, count) -> System.out.printf("%s: %s%n", side, count));
  }
}
```

```output
1: 1000616
2: 1000169
3: 999697
4: 1001069
5: 998791
6: 999658
``` -->

