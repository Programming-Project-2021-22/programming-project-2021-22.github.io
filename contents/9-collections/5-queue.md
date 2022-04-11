---
slug: /collections/queue
course: Programming Project 2021/22
module: Java Collections Framework
title: Queues
subtitle: null
chapter: 9
section: 5
previous: /collections/set
next: /collections/collections-class
---

![](../../figures/collection-hierarchy.png)

## Interface: `Queue<E>`

A collection for holding elements prior to processing. Think of the line at the mensa: the first to arrive is the first to get food.

In addition to the basic `Collection` operations, queues provide operations for:
- insertion, 
- removal, 
- inspection  

Each `Queue` method exists in two forms: 
- one throws an exception if the operation fails, and 
- the other returns a special value if the operation fails (either null or false, depending on the operation). 

| Type of Operation | Throws exception | Returns special value |
|-------------------|------------------|-----------------------|
| Insert | `add(e)` | `offer(e)` |
| Remove | `remove()` | `poll()` |
| Examine | `element()` | `peek()` |

Here is an example of how to use a `Queue`:

```java
public class QueueDemo {
  public static void main(String[] args) {
    Queue<String> mensaQueue = new LinkedList<>();

    System.out.println("Monica arrives at the mensa queue");
    mensaQueue.offer("Monica");
    System.out.println("Queue: " + mensaQueue + "\n");

    System.out.println("Joey arrives at the mensa queue");
    mensaQueue.offer("Joey");
    System.out.println("Queue: " + mensaQueue + "\n");

    System.out.println("Serving the next person in the queue: " + mensaQueue.poll());
    System.out.println("Queue: " + mensaQueue + "\n");

    System.out.println("Ross and Rachel arrive at the mensa queue");
    mensaQueue.offer("Ross");
    mensaQueue.offer("Rachel");
    System.out.println("Queue: " + mensaQueue + "\n");

    System.out.println("Ross leaves the queue");
    mensaQueue.remove("Ross");
    System.out.println("Queue: " + mensaQueue + "\n");

    System.out.println("Serving the next person in the queue: " + mensaQueue.poll());
    System.out.println("Queue: " + mensaQueue);
  }
```

```console
Monica arrives at the mensa queue
Queue: [Monica]

Joey arrives at the mensa queue
Queue: [Monica, Joey]

Serving the next person in the queue: Monica
Queue: [Joey]

Ross and Rachel arrive at the mensa queue
Queue: [Joey, Ross, Rachel]

Ross leaves the queue
Queue: [Joey, Rachel]

Serving the next person in the queue: Joey
Queue: [Rachel]
```

## Interface: `Deque<E>`

A `Deque` is **a double-ended-queue**. 

It is a sequence of elements that supports insertion and removal of elements at both end points.

It can be used both as:
- A **last-in-first-out** stack
- A **first-in-first-out** queue

Methods are provided to: ss
- insert, 
- remove, and 
- examine the elements. 


| Type of Operation | First Element (Beginning of the Deque instance) | Last Element (End of the Deque instance) |
|-------------------|-------------------------------------------------|------------------------------------------|
| Insert            | `addFirst(e)`                                     | `addLast(e)`                               |
|                   | `offerFirst(e)`                                   | `offerLast(e)`                             |
| Remove            | `removeFirst()`                                   | `removeLast()`                             |
|                   | `pollFirst()`                                     | `pollLast()`                               |
| Examine           | `getFirst()`                                      | `getLast()`                                |
|                   | `peekFirst()`                                     | `peekLast()`                               |

Here is an example of how to use a `Deque`:

```java
public class DequeDemo {
  public static void main(String[] args) {
    Deque<String> deque = new ArrayDeque<>();

    System.out.println("deque.offer(\"Black\")");
    deque.offer("Black");
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.offer(\"White\")");
    deque.offer("White");
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.offerLast(\"Blue\")");
    deque.offerLast("Blue");
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.offerFirst(\"Red\")");
    deque.offerFirst("Red");
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.poll() => " + deque.poll());
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.pollFirst() => " + deque.pollFirst());
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.pollLast() => " + deque.pollLast());
    System.out.println("deque = " + deque + "\n");
  }
}
```

```console
deque.offer("Black")
deque = [Black]

deque.offer("White")
deque = [Black, White]

deque.offerLast("Blue")
deque = [Black, White, Blue]

deque.offerFirst("Red")
deque = [Red, Black, White, Blue]

deque.poll() => Red
deque = [Black, White, Blue]

deque.pollFirst() => Black
deque = [White, Blue]

deque.pollLast() => Blue
deque = [White]
```

## Using `Deque<E>` as a stack

```java
public class DequeAsStack {
  public static void main(String[] args) {
    Deque<String> deque = new ArrayDeque<>();

    System.out.println("deque.push(\"Black\")");
    deque.push("Black");
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.push(\"White\")");
    deque.push("White");
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.push(\"Blue\")");
    deque.push("Blue");
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.pop() => " + deque.pop());
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.pop() => " + deque.pop());
    System.out.println("deque = " + deque + "\n");

    System.out.println("deque.pop() => " + deque.pop());
    System.out.println("deque = " + deque + "\n");
  }
}
```

```console
deque.push("Black")
deque = [Black]

deque.push("White")
deque = [White, Black]

deque.push("Blue")
deque = [Blue, White, Black]

deque.pop() => Blue
deque = [White, Black]

deque.pop() => White
deque = [Black]

deque.pop() => Black
deque = []
```

## Classes: `PriorityQueue`, `LinkedList`, `ArrayDeque`

[`PriorityQueue`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/PriorityQueue.html)
- Implements the `Queue` interface
- Use a resizable-array implementation 
- Elements are kept in natural ordered (or according to `Comparator`)
- Accepts duplicates
- No null values

[`ArrayDeque`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/ArrayDeque.html)
- Implements the `Deque` interface
- Use a resizable-array implementation 
- Elements are kept in insertion order
- Accepts duplicates
- No null values
- Likely to be faster than `Stack` when used as a stack, and faster than `LinkedList` when used as a queue

[`LinkedList`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/LinkedList.html)
- Implements the `Deque` and the `List` interfaces
- Doubly-linked list implementation
- Elements are kept in insertion order
- Accepts duplicates
- Accepts null values

## Linked list: data structure

A linear collection of data elements, called nodes, each pointing to the next node by means of a pointer.

- Each node points to the next node
- The first node of a list is its **head**
- The last node of a list is its **tail** 
- Note: the term tail may also refer the rest of the list excluding the head

Here is an example of a linked list with 3 elements:

![](../../figures/singly-linked-list.png)

Here is how an element is **added** to a linked list:

![](../../figures/singly-linked-list-add.png)	

Here is how an element is removed from a linked list:

![](../../figures/singly-linked-list-remove.png)	

## Types of linked lists

**Simply linked list:** forward navigation only 

![](../../figures/singly-linked-list.png)


**Doubly linked list**: forward and backward navigation

![](../../figures/doubly-linked-list.png)


**Circularly linked list**: last node points to the first (and the first points to the last if doubly linked)

![](../../figures/circularly-linked-list.png)


This [wikipedia article](https://en.wikipedia.org/wiki/Linked_list) has a nicely detailed description of linked lists.

## Class: `LinkedList<E>`





![](../../figures/linkedlist.png)	



- The Java LinkedList class uses **doubly linked list** to store elements 
- It extends *AbstractList* class and implements *List* and *Deque* interfaces.

- Import aspects:
	- It can contain duplicate elements
	- It maintains insertion order
	- It is non synchronized
	- Manipulation is fast because no shifting needs to occur
	- Can be used as a list, stack or queue



## `LinkedList<E>`: Adding elements

```java
LinkedList<String> list = new LinkedList<>();

// Appends the specified element to the end of this list.
list.add("Sheldon");
list.add("Leonard");
System.out.println(list);

// Adds the specified element as the tail (last element) of this list.
list.offer("Howard");
System.out.println(list);

// Inserts the specified element at the front of this list.
list.offerFirst("Rajesh");
System.out.println(list);

// Inserts the specified element at the end of this list.
list.offerLast("Amy");
System.out.println(list);
```

```console
[Sheldon, Leonard]
[Sheldon, Leonard, Howard]
[Rajesh, Sheldon, Leonard, Howard]
[Rajesh, Sheldon, Leonard, Howard, A
```

## `LinkedList<E>`: Removing elements

```java
LinkedList<String> list = new LinkedList<>();
list.offer("Sheldon");
list.offer("Leonard");
list.offer("Howard");
list.offer("Rajesh");
list.offer("Amy");
list.offer("Penny");
System.out.println(list);

// Removes the first occurrence of the specified element from this list, if it is present.
list.remove("Howard");
System.out.println(list);

// Retrieves and removes the head (first element) of this list.
System.out.println("Polled: " + list.poll());

// Removes and returns the first element from this list. Throws NoSuchElementException if this list is empty
System.out.println("Removed first: " + list.removeFirst());

// Retrieves and removes the first element of this list or returns null if this list is empty.
System.out.println("Polled first: " + list.pollFirst());

// Removes and returns the last element from this list. Throws NoSuchElementException if this list is empty
System.out.println("Removed last:" + list.removeLast());

// Retrieves and removes the last element of this list or returns null if this list is empty.
System.out.println("Polled last:" + list.pollLast());
```

```console
[Sheldon, Leonard, Howard, Rajesh, Amy, Penny]
[Sheldon, Leonard, Rajesh, Amy, Penny]
Polled: Sheldon
Removed first: Leonard
Polled first: Rajesh
Removed last:Penny
Polled last:Amy
```

## `LinkedList<E>`: Retrieving elements

```java
LinkedList<String> list = new LinkedList<>();
list.offer("Sheldon");
list.offer("Leonard");
list.offer("Howard");
list.offer("Rajesh");
System.out.println(list);

// Returns the element at the specified position in this list
System.out.println("The third in the list is " + list.get(2));

// Returns the first element in this list. Throws an exception if list is empty.
System.out.println("The first element in the list is " + list.getFirst());

// Retrieves, but does not remove, the first element of this list, or returns null if this list is empty.
System.out.println("The first element in the list is " + list.peekFirst());

// Returns the last element in this list. Throws an exception if list is empty.
System.out.println("The last element in the list is " + list.getLast());

// Retrieves, but does not remove, the last element of this list, or returns null if this list is empty.
System.out.println("The last element in the list is " + list.peekLast());
```

```console
[Sheldon, Leonard, Howard, Rajesh]
The third in the list is Howard
The first element in the list is Sheldon
The first element in the list is Sheldon
The last element in the list is Rajesh
The last element in the list is Rajesh
```

## `LinkedList<E>`: Additional methods

```java
LinkedList<String> list = new LinkedList<>();

list.offer("Sheldon");
list.offer("Leonard");
list.offer("Howard");
list.offer("Rajesh");
list.offer("Leonard");
System.out.println(list);

// Returns the number of elements in this list
System.out.println("The size of the list is " + list.size());

// Returns true if this list contains the specified element.
System.out.println("Does the list contain Sheldon? " + list.contains("Sheldon"));

// Returns the index of the first occurrence of the specified element
// in this list, or -1 if this list does not contain the element.
System.out.println("First index of Leonard? " + list.indexOf("Leonard"));

// Returns the index of the last occurrence of the specified element
// in this list, or -1 if this list does not contain the element.
System.out.println("Last index of Leonard? " + list.lastIndexOf("Leonard"));
```

```console
[Sheldon, Leonard, Howard, Rajesh, Leonard]
The size of the list is 5
Does the list contain Sheldon? true
First index of Leonard? 1
Last index of Leonard? 4
```

## `ArrayList` vs `LinkedList`

It's an efficiency question:

- `LinkedList` is fast for adding and deleting elements, but slow to access a specific element. 
- `ArrayList` is fast for accessing a specific element but can be slow to add to either end, and especially slow to delete in the middle. 

Implementations:

- `ArrayList` is implemented internally as an array. 
- `LinkedList` is implemented as a double linked list.

