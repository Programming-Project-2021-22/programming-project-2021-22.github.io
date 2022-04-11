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

The [`Collections`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Collections.html) class consists exclusively of static methods that operate on or return collections.

It contains:
- polymorphic algorithms that operate on collections;
- "wrappers", which return a new collection backed by a specified collection;
- a few other odds and ends.

## `fill()`, `frequency()`

- `static <T> void fill(List<? super T> list, T obj)`: Replaces all of the elements of the specified list with the specified element.
- `static int frequency(Collection<?> c, Object o)`: Returns the number of elements in the specified collection equal to the specified object.

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

- `static <T extends Comparable<? super T>> void sort(List<T> list)`: Sorts the specified list into ascending order, according to the natural ordering of its elements.
- `static void reverse(List<?> list)`: Reverses the order of the elements in the specified list.
- `static void shuffle(List<?> list)`: Randomly permutes the specified list using a default source of randomness.

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

- `static <T extends Object & Comparable<? super T>> T min(Collection<? extends T> coll)`: Returns the minimum element of the given collection, according to the natural ordering of its elements.
- `static <T extends Object & Comparable<? super T>> T max(Collection<? extends T> coll)`: Returns the maximum element of the given collection, according to the natural ordering of its elements.

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

- `static <T> boolean addAll(Collection<? super T> c, T... elements)`: Adds all of the specified elements to the specified collection.
- `static <T> void copy(List<? super T> dest, List<? extends T> src)`: Copies all of the elements from one list into another.
- `static boolean disjoint(Collection<?> c1, Collection<?> c2)`: Returns true if the two specified collections have no elements in common.

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

- `static final <T> List<T> emptyList()`: Returns an empty list (immutable).
- `static final <T> Set<T> emptySet()`: Returns an empty set (immutable).
- `static <E> SortedSet<E> emptySortedSet()`: Returns an empty sorted set (immutable).
- `static <T> Iterator<T> emptyIterator()`: Returns an iterator that has no elements.

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

- `static <T> Set<T> singleton(T o)`: Returns an immutable set containing only the specified object.
- `static <T> List<T> singletonList(T o)`: Returns an immutable list containing only the specified object.

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













