---
slug: /multithreading/synchronization
course: Programming Project 2021/22
module: Multithreading
title: "Thread Synchronization"
subtitle: null
chapter: 18
section: 4
previous: /multithreading/multithreading-java
next: /multithreading/signaling
---

How do threads communicate with each other?

Remember that **threads share their processes' resources, including memory and open files**? Well, this is what they primarily use to communicate!


## Race conditions

**Race conditions** occur when the behavior of a system depends on the sequence or timing of uncontrollable events

Two kinds of errors are of particular interest to us: 
- **Thread interference:** when multiple threads access shared data 
- **Memory consistency errors:** inconsistent views of shared memory

## Thread interference

What does this code do?

```java
class Counter {
    private int c = 0;

    public void increment() {
        c++;
    }

    public void decrement() {
        c--;
    }

    public int value() {
        return c;
    }
}
```

1. `increment()` adds 1 to c
2. `decrement()` subtracts 1 from c

Note that one Java line, such as `c++;` and `c--;` can be translated into several steps at the bytecode level.

For instance, `c++;` may become:

```output
Retrieve the current value of c
Increment the retrieved value by 1
Store the incremented value back in c
```

## Thread interference

Interference happens when two operations, running in different threads, but acting on the same data, **interleave**.

If a `Counter` object is used by two threads, Thread A and Thread B, such a problem might occur. 

Imagine the following scenario: Thread A invokes increment at about the same time Thread B invokes decrement.


```output
Thread A: 										Thread B:
1. Retrieve c.
												2. Retrieve c.
3. Increment retrieved value; result is 1.
												4. Decrement retrieved value; result is -1.
5. Store result in c; c is now 1.
												6. Store result in c; c is now -1.
```

**Thread A's result is lost, overwritten by Thread B**

Under different circumstances it might be Thread B's result that gets lost, or there could be no error at all. Because they are unpredictable, thread interference bugs can be difficult to detect and fix.

## Thread interference in practice

```java
class Counter {
   private int c = 0;

   public void increment() { c++; }

   public void decrement() { c--; }

   public int value() { return c; }
}

class RunCounter implements Runnable {
   Counter c;
   int times;

   public RunCounter(Counter c, int times) {
      this.c = c;
      this.times = times;
   }

   @Override
   public void run() {
      for (int i=0; i<times; i++){
         c.increment();
      }
   }
}

public class CounterRunner {
   public static void main(String[] args) throws InterruptedException {
      Counter c = new Counter();
      RunCounter rc0 = new RunCounter(c, 100000);
      RunCounter rc1 = new RunCounter(c, 100000);
      RunCounter rc2 = new RunCounter(c, 100000);

      System.out.printf("Running counters...%n");

      ExecutorService executor = Executors.newCachedThreadPool();
      executor.execute(rc0);
      executor.execute(rc1);
      executor.execute(rc2);

      executor.shutdown();

      System.out.printf("Waiting for counters to finish...%n");
      executor.awaitTermination(1, TimeUnit.MINUTES);

      System.out.printf("Final value: %d%n", c.value());
   }
}
```

Here is an example of what we can get as an output:

```output
Running counters...
Waiting for counters to finish...
Final value: 131010
```

## Memory consistency errors

A [memory consistency error](https://docs.oracle.com/javase/tutorial/essential/concurrency/memconsist.html) occurs when different threads have inconsistent views of what should be the same data.

The causes of these errors are complex and beyond the scope of this course. We just need a strategy for avoiding them!

The strategy is to ensure the **happens-before relationship**
- a guarantee that memory written to by statement A is visible to statement B
- i.e. that statement A completes its write before statement B starts its read

Here is an example: 
- `int c = 0;` is shared between threads A and B
- thread A: `c++;`
- thread B: `System.out.println(c);`

If the statements were executed in the same thread, the printout would be `1`.

```output
Thread A: 										Thread B:
1. Retrieve c, value is 0
												2. Retrieve c, value is 0
3. Increment retrieved value; result is 1.
												4. Print c ; printed value is 0
5. Store result in c; c is now 1.
```

There's no guarantee that thread A's change to c will be visible to thread B - unless the programmer has established a happens-before relationship between these two statements.

## Memory consistency error in practice

```java
class Accumulator {
   public int value;

   public int getValue() { return value; }
   public void setValue(int value) { this.value = value; }
}

class Adder implements Runnable {
   Accumulator a = null;

   public Adder(Accumulator a) { this.a = a; }

   @Override
   public void run() {
      for (int i = 0; i < 100; i++) {
         int nextValue = a.getValue() + 1;
         a.setValue(nextValue);
         System.out.println(a.getValue());
      }
   }
}

class Printer implements Runnable {
   Accumulator a;

	public Printer(Accumulator a) { this.a = a; }

	@Override
   public void run() {
      System.out.println("Printer:" + a.getValue());
   }
}

public class MemoryConsistencyErrorDemo {
   public static void main(String[] args) {
      Accumulator a = new Accumulator();
      Adder adder = new Adder(a);
      Printer printer = new Printer(a);

      Thread tt1 = new Thread(adder);
      Thread tt2 = new Thread(printer);

      tt1.start();
      tt2.start();
   }
}
```

```output
1
2
3
4
5
...
96
97
98
99
100
Printer:6
```

## Synchronization

To deal with interference and memory consistency problems, we can use **thread synchronization**.

There are two ways to do that in Java:
- synchronized methods
- synchronized statements

## Synchronized methods 

To make a method synchronized, add the `synchronized` keyword to its declaration

```java
class SyncCounter {
  private int c = 0;

  synchronized public void increment() {
      c++;
  }

  synchronized public void decrement() {
      c--;
  }

  synchronized public int value() {
      return c;
  }
}
```

## What happens when we declare a method as `synchronized`

It is not possible for two invocations of synchronized methods on the same object to interleave. 
  
When one thread is executing a synchronized method for an object, all other threads that invoke synchronized methods for the same object block (suspend execution) until the first thread is done with the object

When a synchronized method exits, it automatically establishes a happens-before relationship with any subsequent invocation of a synchronized method for the same object. 
  
This guarantees that changes to the state of the object are visible to all threads.

Important: constructors cannot be synchronized!

[Source](https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html)

## How does synchronization work? 

Every object has an **intrinsic lock** associated with it.

A thread that needs exclusive access to an object:
- **acquires** the intrinsic lock to start operating on the object
- **releases** the intrinsic lock when it is done

In **synchronized methods**:
- The thread automatically acquires the intrinsic lock of **the current object (`this`)** when the method is invoked
- The thread automatically releases the intrinsic lock of **the current object (`this`)** when the method returns (even if the return was caused by an exception)

In static synchronized methods, a thread acquires/releases the lock of the `Class` object associated with the class.

## Revisiting the thread interference example

```java
class SyncCounter {
   private int c = 0;

   synchronized public void increment() {
      c++;
   }

   synchronized public void decrement() {
      c--;
   }

   synchronized public int value() {
      return c;
   }
}

class RunSyncCounter implements Runnable {
   SyncCounter c;
   int times;

   public RunSyncCounter(SyncCounter c, int times) {
      this.c = c;
      this.times = times;
   }

   @Override
   public void run() {
      for (int i = 0; i < times; i++) {
         c.increment();
      }
   }
}

public class SolvingThreadInterference {
   public static void main(String[] args) throws InterruptedException {
      SyncCounter c = new SyncCounter();
      RunSyncCounter rc0 = new RunSyncCounter(c, 100000);
      RunSyncCounter rc1 = new RunSyncCounter(c, 100000);
      RunSyncCounter rc2 = new RunSyncCounter(c, 100000);

      System.out.printf("Running counters...%n");

      ExecutorService executor = Executors.newCachedThreadPool();
      executor.execute(rc0);
      executor.execute(rc1);
      executor.execute(rc2);

      executor.shutdown();

      System.out.printf("Waiting for counters to finish...%n");
      executor.awaitTermination(1, TimeUnit.MINUTES);

      System.out.printf("Final value: %d%n", c.value());
   }
}
```

## Synchronized Statements 

Another way to create synchronized code is with synchronized statements.

Unlike synchronized methods, synchronized statements must **specify the object** that provides the intrinsic lock

```java

public class SyncWhatever {

  public Employee person = null;
  ...
  public void addName(String name) {

      synchronized(this.person) {
          person.lastName = name;
          person.nameCount++;
      }
      ...
  }
}
```

The synchronized block takes one argument, usually called the **mutex**

The two pieces of code below are equivalent:

```java
public synchronized void decrement() {
    c--;
}
```

```java
public void decrement() {
	synchronized(this){
    	c--;
	}
}
```

## Revisiting the memory consistency error example

```java
class Accumulator {
   private int value;

   public int getValue() {
      return value;
   }

   public void setValue(int value) {
      this.value = value;
   }
}

class SyncAdder implements Runnable {
   Accumulator a = null;

   public SyncAdder(Accumulator a) {
      this.a = a;
   }

   @Override
   public void run() {
      for (int i = 0; i < 100; i++) {
         synchronized (a){
            int nextValue = a.getValue() + 1;
            a.setValue(nextValue);
            System.out.println(a.getValue());
         }
      }
   }
}

class SyncPrinter implements Runnable {
   Accumulator a;

   public SyncPrinter(Accumulator a) {
      this.a = a;
   }

   @Override
   public void run() {
      synchronized (a){
         System.out.println("Printer:" + a.getValue());
      }
   }
}

public class SolvingMemoryConsistencyError {
   public static void main(String[] args) {
      Accumulator a = new Accumulator();
      SyncAdder adder = new SyncAdder(a);
      SyncPrinter printer = new SyncPrinter(a);

      Thread tt1 = new Thread(adder);
      Thread tt2 = new Thread(printer);

      tt1.start();
      tt2.start();
   }
}
```

## Exercise 

- Create a Person class
	- String name
	- String surname
	- age
	- override toString()
- Create two tasks
	- T1: changes the values of the shared object 100 times:
		- Rick, Sanchez, 60
		- Morty, Smith, 14
		- add a Thread.sleep with a couple of milliseconds between each change
	- T2: prints to the screen Person.toString() 100 times
		- add a Thread.sleep with a couple of milliseconds between each print
- What do you observe?
- How would you synchronize it?

<!-- 
## Solution: Before Synchronization

```java
public class Person {
   String name = "";
   String surname = "";
   int age = 0;

   public String toString() {
      return this.name + " " + this.surname + " is " + this.age + " years old";
   }

   public void setName(String name) {
      this.name = name;
   }

   public void setSurname(String surname) {
      this.surname = surname;
   }

   public void setAge(int age) {
      this.age = age;
   }
}
```

## Solution: Before Synchronization - cont.

```java
public class T1 implements Runnable {
   public Person p = null;

   @Override
   public void run() {
      try {
         for (int i = 0; i < 100; i++) {
            p.setName("Rick");
            Thread.sleep(10);
            p.setSurname("Sanchez");
            Thread.sleep(10);
            p.setAge(60);

            Thread.sleep(10);
            p.setName("Morty");
            Thread.sleep(10);
            p.setSurname("Smith");
            Thread.sleep(10);
            p.setAge(14);
            Thread.sleep(10);
         }
      } catch (InterruptedException e) {
         e.printStackTrace();
         Thread.currentThread().interrupt();
      }
   }
}
```

## Solution: Before Synchronization - cont.

```java
public class T2 implements Runnable {
   public Person p = null;

   @Override
   public void run() {
      try {
         for (int i = 0; i < 100; i++) {
            Thread.sleep(10);
            System.out.println("T2: " + p.toString());
         }
      } catch (InterruptedException e) {
         e.printStackTrace();
         Thread.currentThread().interrupt();
      }
   }
}
```

```java
public class Runner {
	public static void main(String[] args) {
		Person p = new Person();
		T1 t1 = new T1();
		t1.p = p;
		T2 t2 = new T2();
		t2.p = p;
		Thread tt1 = new Thread(t1);
		Thread tt2 = new Thread(t2);
		tt1.start();
		tt2.start();
	}
}
```

## Solution: After Synchronization

```java
public class T1 implements Runnable {
   public Person p = null;

   @Override
   public void run() {
      try {
         for (int i = 0; i < 100; i++) {
            synchronized (p) {
               p.setName("Rick");
               Thread.sleep(10);
               p.setSurname("Sanchez");
               Thread.sleep(10);
               p.setAge(60);
            }

            Thread.sleep(10);
            synchronized (p) {
               p.setName("Morty");
               Thread.sleep(10);
               p.setSurname("Smith");
               Thread.sleep(10);
               p.setAge(14);
            }
            Thread.sleep(10);
         }
      } catch (InterruptedException e) {
         e.printStackTrace();
         Thread.currentThread().interrupt();
      }
   }
}
```

## Solution: After Synchronization - cont.

```java
public class T2 implements Runnable {
   public Person p = null;

   @Override
   public void run() {
      try {
         for (int i = 0; i < 100; i++) {
            Thread.sleep(10);
            synchronized (p) {
               System.out.println("T2: " + p.toString());
            }
         }
      } catch (InterruptedException e) {
         e.printStackTrace();
         Thread.currentThread().interrupt();
      }
   }
}
``` -->

## Synchronization 

- Always use the lowest level of locking
  - Java Synchronization provides data integrity on the cost of performance, so it should be used only when it's absolutely necessary

- Reentrant synchronization
  - Recall that a thread cannot acquire a lock owned by another thread. 
  - But a thread can acquire a lock that it already owns. 
  - Allowing a thread to acquire the same lock more than once enables reentrant synchronization. 
  - This describes a situation where synchronized code, directly or indirectly, invokes a method that also contains synchronized code, and both sets of code use the same lock. 
  - Without reentrant synchronization, synchronized code would have to take many additional precautions to avoid having a thread cause itself to block.


[Source](https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html)

## Synchronized blocks 

You can use any number of synchronized blocks:

```java
class Shared{
    void method() {
        synchronized (this) {
            //mSynchronized block - 1
        }

        //some other non-synchronized code

        synchronized (this) {
            //Synchronized block - 2
        }
    }
}
```
  
You can even nest synchronized blocks:

```java	
synchronized (smtg){
    synchronized (smtelse) {
        //Nested synchronized blocks
    }
}
```

## Exercise

Write data to a shared array.

