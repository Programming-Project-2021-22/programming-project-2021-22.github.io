---
slug: /collections/collections-class
course: Programming Project 2021/22
module: Java Collections Framework
title: The Collections Class
subtitle: null
chapter: 9
section: 6
previous: /collections/queue
next: /collections/map
---

The **`Collections`** class consists exclusively of static methods that operate on or return collections.

It contains:
- polymorphic algorithms that operate on collections;
- "wrappers", which return a new collection backed by a specified collection;
- a few other odds and ends.

[Source](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/Collections.html)

## `fill()`, `frequency()`

```java
import java.util.ArrayList;
import java.util.Collections;

public class FillFrequencyDemo {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("Rick");
    list.add("Morty");
    list.add("Summer");

    System.out.println("Original: " + list);
    Collections.fill(list, "Mr. Meeseeks");
    System.out.println("Filled: " + list);

    int frequency = Collections.frequency(list, "Mr. Meeseeks");
    System.out.println("Frequency of \"Mr. Meeseeks\": " + frequency);
  }
}
```
```output
Original: [Rick, Morty, Summer]
Filled: [Mr. Meeseeks, Mr. Meeseeks, Mr. Meeseeks]
Frequency of "Mr. Meeseeks": 3
```

## `sort()`, `reverse()`, `shuffle()`

```java
import java.util.ArrayList;
import java.util.Collections;

public class SortReverseShuffleDemo {
   public static void main(String[] args) {
      ArrayList<String> list = new ArrayList<>();
      list.add("Rick");
      list.add("Morty");
      list.add("Summer");
      list.add("Beth");

      System.out.println("Original: " + list);

      Collections.sort(list);
      System.out.println("Sorted: " + list);

      Collections.reverse(list);
      System.out.println("Reversed: " + list);

      Collections.shuffle(list);
      System.out.println("Shuffled: " + list);
   }
}
```

```output
Original: [Rick, Morty, Summer, Beth]
Sorted: [Beth, Morty, Rick, Summer]
Reversed: [Summer, Rick, Morty, Beth]
Shuffled: [Morty, Beth, Rick, Summer]
```

## `min()`, `max()`

```java
public class MinMaxDemo {

   public static void main(String[] args) {
      ArrayList<String> list = new ArrayList<>();
      list.add("Rick");
      list.add("Morty");
      list.add("Summer");
      list.add("Beth");

      System.out.println(list);

      String min = Collections.min(list);
      System.out.println("Min: " + min);

      String max = Collections.max(list);
      System.out.println("Max: " + max);
   }

}
```

```output
[Rick, Morty, Summer, Beth]
Min: Beth
Max: Summer
```

## `addAll()`, `copy()`, `disjoint()`

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AddAllCopyDisjointDemo {

   public static void main(String[] args) {
      List<String> list = new ArrayList<>();
      System.out.println("List: " + list);
      Collections.addAll(list, "Rick", "Morty", "Summer");
      System.out.println("List: " + list + "\n");

      List<String> list2 = List.of("Beth", "Jerry", "Birdperson");
      System.out.println("List2: " + list2);
      System.out.println("Is list2 disjoint? " + Collections.disjoint(list, list2) + "\n");

      List<String> list3 = new ArrayList<>(list2);
      System.out.println("List3: " + list3);
      System.out.println("Is list3 disjoint? " + Collections.disjoint(list, list3));
      Collections.copy(list3, list);
      System.out.println("List3: " + list3);
      System.out.println("Is list3 disjoint? " + Collections.disjoint(list, list3));
   }
  
}
```

```output
List: []
List: [Rick, Morty, Summer]

List2: [Beth, Jerry, Birdperson]
Is list2 disjoint? true

List3: [Beth, Jerry, Birdperson]
Is list3 disjoint? true
List3: [Rick, Morty, Summer]
Is list3 disjoint? false
```

## `empty()`

```java
import java.util.*;

public class EmptyCollectionFactoryDemo {

   public static void main(String[] args) {
      List<String> list = Collections.emptyList();
      System.out.println("Empty list: " + list);
      // These factory methods create immutable collections.
      // If you try to add a value, the operation will throw an exception
      // list.add("UNIBZ");

      Set<String> set = Collections.emptySet();
      System.out.println("Empty set: " + set);

      SortedSet<String> sortedSet = Collections.emptySortedSet();
      System.out.println("Empty sorted set: " + sortedSet);

      Iterator<String> iterator = Collections.emptyIterator();
      System.out.println("Empty iterator: hasNext()? " + iterator.hasNext());

      ListIterator<String> listIterator = Collections.emptyListIterator();
      System.out.println("Empty list iterator: hasNext()? " + listIterator.hasNext());
   }

}
```

```output
Empty list: []
Empty set: []
Empty sorted set: []
Empty iterator: hasNext()? false
Empty list iterator: hasNext()? false
```

## `singleton()`, `singletonList()`

```java
import java.util.Collections;
import java.util.List;
import java.util.Set;

public class SingletonFactoryDemo {

  public static void main(String[] args) {
    List<String> list = Collections.singletonList("Rick");
    System.out.println("Singleton list: " + list);
    // These factory methods create immutable collections.
    // If you try to add a value, the operation will throw an exception
    // list.add("Potter");

    Set<String> set = Collections.singleton("Rick");
    System.out.println("Singleton set: " + set);
  } 

}
```

```output
Singleton list: [Rick]
Singleton set: [Rick]
```













