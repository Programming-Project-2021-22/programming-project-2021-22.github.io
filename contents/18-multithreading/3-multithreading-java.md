---
slug: /multithreading/multithreading-java
course: Programming Project 2021/22
module: Multithreading
title: Multithreading in Java
subtitle: null
chapter: 18
section: 3
previous: /multithreading/processes-threads
next: /multithreading/synchronization
---

## Thread object

Each thread is associated with an instance of the class `Thread`, which provides the code that will run in the thread.

We can do that in two ways:
- by implementing the `Runnable` interface
- by extending the `Thread` class
	
## Approach #1: Implementing `Runnable`

A class must implement `Runnable` for its instances to to be executed by a thread: 

```java
import java.util.Random;

public class PrintTask implements Runnable {
  private final String name;
  private final int sleepTime;

  public PrintTask(String name) {
    this.name = name;
    this.sleepTime = (new Random()).nextInt(5000);
  }

  @Override
  public void run() {
    System.out.printf("%s: I'm going to sleep for %d milliseconds.%n", name, sleepTime);

    try {
      Thread.sleep(sleepTime);
    } catch (InterruptedException e) {
      e.printStackTrace();
      Thread.currentThread().interrupt();
    }

    System.out.printf(
        "%s: I woke up and finished executing.%n", name);
  }
}
```

## Executing a `Runnable` with an `ExecutorService`

Executors provide methods to create thread pools and run our tasks:s

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorMain {

   public static void main(String[] args) throws InterruptedException {
      System.out.printf("%s: Starting executor%n", Thread.currentThread().getName());

      PrintTask task1 = new PrintTask("Task1");
      PrintTask task2 = new PrintTask("Task2");
      PrintTask task3 = new PrintTask("Task3");

      ExecutorService executor = Executors.newCachedThreadPool();

      executor.execute(task1);
      executor.execute(task2);
      executor.execute(task3);

      executor.shutdown();

      System.out.printf("%s: Executor terminated%n", Thread.currentThread().getName());
   }

}
```

By running this the program once, we get the following output:

```output
main: Starting executor
pool-1-thread-1: Task1 going to sleep for 621 milliseconds
main: Executor terminated
pool-1-thread-3: Task3 going to sleep for 4671 milliseconds
pool-1-thread-2: Task2 going to sleep for 34 milliseconds
pool-1-thread-2: Task2 woke up and finished executing
pool-1-thread-1: Task1 woke up and finished executing
pool-1-thread-3: Task3 woke up and finished executing
```

If we run it again, we get:

```output
main: Starting executor
pool-1-thread-1: Task1 going to sleep for 3371 milliseconds
pool-1-thread-2: Task2 going to sleep for 2174 milliseconds
pool-1-thread-3: Task3 going to sleep for 774 milliseconds
main: Executor terminated
pool-1-thread-3: Task3 woke up and finished executing
pool-1-thread-2: Task2 woke up and finished executing
pool-1-thread-1: Task1 woke up and finished executing
```

Why are the outputs different?

## Executing a runnable with a Thread

Alternatively, we can create and start threads ourselves:

```java
public class ThreadMain {

	public static void main(String[] args) {
		System.out.printf("%s: Starting ThreadMain%n", Thread.currentThread().getName());

		PrintTask task0 = new PrintTask("Task0");
		PrintTask task1 = new PrintTask("Task1");
		PrintTask task2 = new PrintTask("Task2");

		Thread thread0 = new Thread(task0);
		Thread thread1 = new Thread(task1);
		Thread thread2 = new Thread(task2);

		thread0.start();
		thread1.start();
		thread2.start();

		System.out.printf("%s: ThreadMain terminated%n", Thread.currentThread().getName());
	}
}
```

## Approach #2: Extending `Thread`

The second approach consists of extending the `Thread` class and overriding the `run()` method.

```java
import java.util.Random;

class PrintThread extends Thread {
   private int sleepTime;

   public PrintThread(String name) {
      super(name);

      Random rand = new Random();
      this.sleepTime =  rand.nextInt(5000);
   }

   @Override
   public void run() {
      System.out.printf("%s: going to sleep for %d milliseconds%n", this.getName(), sleepTime);

      try {
         Thread.sleep(sleepTime);
      } catch (InterruptedException e) {
         e.printStackTrace();
         Thread.currentThread().interrupt();
      }

      System.out.printf("%s: woke up and finished executing%n", this.getName());
   }
}
```

## Running our custom `Thread`

Then, we running by invoking `start()`

```java
public class ExtendThread {

   public static void main(String[] args) {
      System.out.printf("%s: Starting ExtendThread%n", Thread.currentThread().getName());

      PrintThread thread0 = new PrintThread("Thread0");
      PrintThread thread1 = new PrintThread("Thread1");
      PrintThread thread2 = new PrintThread("Thread2");

      thread0.start();
      thread1.start();
      thread2.start();

      System.out.printf("%s: ThreadMain terminated%n", Thread.currentThread().getName());
   }
}
```

## Comparing the two approaches

Implementing the `Runnable` interface
- More flexible
- Your task class that implements Runnable can extend any other class

Extending the `Thread` class
- "Easier" to use in simple applications
- Your task class cannot extend another class in addition to Thread

Remember inheritance?
- extending means adding details to a more general object, e.g. car **IS A** vehicle
- implementing is more a **HAS A** relationship

When creating a thread we usually want to **HAVE** the thread functionality but have some other functionality as well

Look from this perspective:
- inherit only if you want to override some behavior
- inherit less, interface more

From now on, we will focus on implementing the `Runnable` interface.

## start() vs run()

What is the difference between the first and the second implementations? In both cases, `task0`, `task1`, and `task2` are instances of a class that implements the `Runnable` interface. 

```java
public static void main(String[] args) {
  System.out.printf("%s: Starting ThreadMain%n",
      Thread.currentThread().getName());

  PrintTask task0 = new PrintTask("Task0");
  PrintTask task1 = new PrintTask("Task1");
  PrintTask task2 = new PrintTask("Task2");

  task0.run();
  task1.run();
  task2.run();

  System.out.printf("%s: ThreadMain terminated%n",
      Thread.currentThread().getName());
}
```

```java
public static void main(String[] args) {
  System.out.printf("%s: Starting ThreadMain%n", 
      Thread.currentThread().getName());

  PrintTask task0 = new PrintTask("Task0");
  PrintTask task1 = new PrintTask("Task1");
  PrintTask task2 = new PrintTask("Task2");

  Thread thread0 = new Thread(task0);
  Thread thread1 = new Thread(task1);
  Thread thread2 = new Thread(task2);

  thread0.start();
  thread1.start();
  thread2.start();

  System.out.printf("%s: ThreadMain terminated%n", 
      Thread.currentThread().getName());
}
```


When we call `task0.run()` we are executing the method **in the current thread**.

When we call `thread0.start()`, **the JVM starts a new thread** and calls the `run()` method of `task0` internally within that new thread.

The same thing happens for `task1`, `task2`, `thread1`, and `thread2`.

## Naming threads

Threads can be given a custom name:

```java
public class NamedThread {
   public static void main(String[] args) {
      String mainThreadName = Thread.currentThread().getName();
      System.out.printf("%s: Starting ThreadMain%n", mainThreadName);

      PrintTask task0 = new PrintTask("Task0");
      Thread thread0 = new Thread(task0, "my-thread");
      System.out.printf("%s: starting%n", thread0.getName());
      thread0.start();

      System.out.printf("%s: ThreadMain terminated%n", mainThreadName);
   }
}
```

## Thread Priority

Each thread has a priority
- Values range from 1 to 10
- The default value is 5

In most cases, the thread scheduler schedules the threads according to their priority

```java
Thread th1 = new Thread(t1, "HI");
th1.setPriority(10);
```

Run this code several times and check the output:

```java
public class PrioritizedThreads {
   public static void main(String[] args) {

      class T1 implements Runnable {
         @Override
         public void run() {
            String name = Thread.currentThread().getName();
            for (int i = 0; i < 30; i++)
               System.out.printf("%s: %d%n", name, i);

            System.out.printf("%s: finalized!%n", name);
         }
      }

      Thread th1 = new Thread(new T1(), "HI");
      th1.setPriority(10);
      Thread th2 = new Thread(new T1(), "MID");
      th1.setPriority(5);
      Thread th3 = new Thread(new T1(), "LOW");
      th1.setPriority(1);

      th1.start();
      th2.start();
      th3.start();
   }
}
```

## Thread states

Which states do our threads go through?

![](../../figures/thread-life-cycle.jpg)

- **New**: after we created an instance of Thread but before we invoke `start()`
- **Runnable**: after we invoked `start()`
- **Blocked**: blocked while waiting to enter a `synchronized` block/method
- **Waiting**: after calling `wait()` and before receiving a `notify()`
- **Timed Waiting**: after calling `sleep()` 
- **Terminated**: when its `run()` method exits

## Checking the state of a thread

Use the `getState()` method on a `Thread` object:

```java
public class ThreadStatesMain {

   public static void main(String[] args) throws InterruptedException {
      System.out.printf("%s: Starting ThreadStatesMain%n", Thread.currentThread().getName());

      PrintTask task0 = new PrintTask("Task0");
      PrintTask task1 = new PrintTask("Task1");
      PrintTask task2 = new PrintTask("Task2");

      Thread thread0 = new Thread(task0);
      Thread thread1 = new Thread(task1);
      Thread thread2 = new Thread(task2);

      System.out.printf("%s: State: %s%n", thread0.getName(), thread0.getState());

      thread0.start();
      thread1.start();
      thread2.start();

      System.out.printf("%s: State: %s%n", thread0.getName(), thread0.getState());

      thread0.join();
      System.out.printf("%s: State: %s%n", thread0.getName(), thread0.getState());

      System.out.printf("%s: ThreadStatesMain terminated%n", Thread.currentThread().getName());
   }

}
```

## Pausing the execution of a Thread

`Thread.sleep` causes the current thread to suspend execution for a specified period.

An efficient means of making processor time available to the other threads
- For pacing
- Waiting for another thread with duties that are understood to have time requirements

`sleep` is available in two versions:
- time in milliseconds `Thread.sleep(long millis);`
- time in nanoseconds: `Thread.sleep(long millis, long nanos);`
- it's not necessarily precise

Here is a demonstration of how to use it:

```java
public class SleepMessage {

   public static void main(String args[]) throws InterruptedException {
      String message[] = {
              "The reason anyone would do this is, ",
              "if they could, ",
              "which they can't, ",
              "would be because they could, ",
              "which they can't."
      };

      for (int i = 0; i < message.length; i++) {
         System.out.println(message[i]);
         Thread.sleep(2000);
      }
   }

}
```

## Waiting for a thread to terminate

Consider the code below:

```java
class JoinMe implements Runnable {
   @Override
   public void run() {
      System.out.println("Started thread JoinMe");
      try {
         Thread.sleep(1000);
      } catch (InterruptedException e) {
         e.printStackTrace();
         Thread.currentThread().interrupt();
      }
      System.out.println("Ended thread JoinMe");
   }

   public static void main(String[] args) throws InterruptedException {
      JoinMe joinMe = new JoinMe();
      Thread tt1 = new Thread(joinMe);
      tt1.start();
      System.out.println("Main thread continues to run.");
   }
}
```

What will the output of this code likely be?

```output
Main thread continues to run.
Started thread T1
Ended thread T1
```

The `join()` method allows one thread to wait for the completion of another

```java
class JoinMe implements Runnable {
   @Override
   public void run() {
      System.out.println("Started thread JoinMe");
      try {
         Thread.sleep(1000);
      } catch (InterruptedException e) {
         e.printStackTrace();
         Thread.currentThread().interrupt();
      }
      System.out.println("Ended thread JoinMe");
   }

   public static void main(String[] args) throws InterruptedException {
      JoinMe joinMe = new JoinMe();
      Thread tt1 = new Thread(joinMe);
      tt1.start();
      tt1.join();
      System.out.println("Main thread continues to run.");
   }
}
```

What will the output of this code be?

```output
Started thread T1
Ended thread T1
Main thread continues to run.
```

## Waiting for multiple threads

We can use `join()` for multiple threads:

```java
public class JoinThreads {
   public static void main(String[] args) throws InterruptedException {
      System.out.printf("%s: Starting ThreadMain%n", Thread.currentThread().getName());

      PrintTask task0 = new PrintTask("Task0");
      PrintTask task1 = new PrintTask("Task1");
      PrintTask task2 = new PrintTask("Task2");

      Thread thread0 = new Thread(task0);
      Thread thread1 = new Thread(task1);
      Thread thread2 = new Thread(task2);

      thread0.start();
      thread1.start();
      thread2.start();

      thread0.join();
      thread1.join();
      thread2.join();

      System.out.printf("%s: ThreadMain terminated%n", Thread.currentThread().getName());
   }
}
```

## Exercise

- Pick your favorite song, the first 8 lines of the lyrics
- Make two classes that implement Runnable
	- T1: prints the first four lines
	- T2: prints the last four lines
- Runner class:
	- start first thread (T1)
	- wait for it to finish with join
	- start second thread (T2)

<!-- ## Solution

```java
class L1 implements Runnable {
   @Override
   public void run() {
      System.out.println("1. Is this the real life?");
      System.out.println("Is this just fantasy?");
      System.out.println("Caught in a landslide");
      System.out.println("No escape from reality");
   }
}
class L2 implements Runnable {
   @Override
   public void run() {
      System.out.println("2. Open your eyes");
      System.out.println("Look up to the skies and see");
      System.out.println("I'm just a poor boy");
      System.out.println("I need no sympathy");
      System.out.println("Because I'm easy come, easy go");
      System.out.println("Little high, little low");
      System.out.println("Anyway the wind blows");
      System.out.println("Doesn't really matter to me");
      System.out.println("To me");
   }
}
public class Lyrics {
   public static void main(String[] args) throws InterruptedException {
      L1 l1 = new L1();
      L2 l2 = new L2();
      Thread tt1 = new Thread(l1);
      Thread tt2 = new Thread(l2);
      tt1.start();
      tt1.join();
      tt2.start();
   }
}
``` -->

## Waiting for a thread to terminate - `ExecutorService`

If we are running tasks using an `ExecutorService`, we can use `awaitTermination()`:

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ExecutorWaitMain {

   public static void main(String[] args) throws InterruptedException {
      System.out.printf("%s: Starting executor%n", Thread.currentThread().getName());

      PrintTask task1 = new PrintTask("Task1");
      PrintTask task2 = new PrintTask("Task2");
      PrintTask task3 = new PrintTask("Task3");

      ExecutorService executor = Executors.newCachedThreadPool();

      executor.execute(task1);
      executor.execute(task2);
      executor.execute(task3);

      executor.shutdown();
      executor.awaitTermination(1, TimeUnit.MINUTES);

      System.out.printf("%s: Executor terminated%n", Thread.currentThread().getName());
   }

}
```

In this case, there is no guarantee that the threads will terminate in a given order.

## Interrupting threads

Interrupting a thread is an indication to it that it should **stop what it is doing and do something else**
- It's up to us to decide what to do
- Usually we terminate the thread

A thread interrupts another by **invoking the interrupt() method on it**
- the interrupt mechanism is implemented using an **internal flag** known as the **interrupt status**
- invoking `interrupt()` sets this flag

A thread checks for its interrupt status by invoking the static method `Thread.interrupted()`
- After invoking this method, the interrupt status is cleared

The non-static `isInterrupted()` method is used by one thread to query the interrupt status of another
- It does not change the interrupt status flag

For the interrupt mechanism to work correctly, the interrupted thread must support its own interruption.

## How to support interruption?

There are 2 options:

Catch `InterruptedException` in your run method
1. It requires using a method that throws InterruptedException
    - Thread.sleep()
    - thread.join()
    - Object.wait()
2. Periodically check `Thread.interrupted`
    - We get to choose how often to check for an interruption

## Non interrupable task

```java
class NonInterrupableTask implements Runnable {
   @Override
   public void run() {
      System.out.printf("Non-interrupable task: running...%n");
      for (int i = 0; i < 100; i++) {
         System.out.printf("Non-interrupable task: %d%n", i);
      }
      System.out.printf("Non-interrupable task: terminated%n");
   }
}

public class CantInterrupt {
   public static void main(String[] args) throws InterruptedException {
      String threadName = Thread.currentThread().getName();
      System.out.printf("%s: Starting...%n", threadName);

      NonInterrupableTask t = new NonInterrupableTask();
      Thread th = new Thread(t);
      th.start();

      System.out.printf("%s: Interrupting child thread.%n", threadName);
      th.interrupt();

      System.out.printf("%s: Terminated.%n", threadName);
   }
}
```

## Checking `interrupted()`

```java
class InterrupableTask implements Runnable {
   @Override
   public void run() {
      System.out.printf("Interrupable task: running...%n");
      for (int i = 0; i < 10000; i++) {
         System.out.printf("Interrupable task: %d%n", i);
         if(Thread.interrupted()){
            System.out.println("Interrupable task: I was told to stop");
            return;
         }
      }
      System.out.printf("Interrupable task: terminated%n");
   }
}

public class CanInterrupt {
   public static void main(String[] args) throws InterruptedException {
      String threadName = Thread.currentThread().getName();
      System.out.printf("%s: Starting...%n", threadName);

      InterrupableTask t = new InterrupableTask();
      Thread th = new Thread(t);
      th.start();

      Thread.sleep(100);
      System.out.printf("%s: Interrupting child thread.%n", threadName);
      th.interrupt();

      System.out.printf("%s: Terminated.%n", threadName);
   }
}
```

## Catching an `InterruptedException`

```java
class MyTask implements Runnable {
   String name;
   boolean canGoBackToSleep;

   public MyTask(String name, boolean canGoBackToSleep) {
      this.name = name;
      this.canGoBackToSleep = canGoBackToSleep;
   }

   @Override
   public void run() {
      while (true) {
         try {
            System.out.printf("%s: I'm going to sleep...%n", name);
            Thread.sleep(5000);
            System.out.printf("%s: I finished sleeping. :)%n", name);
            return;
         } catch (InterruptedException e) {
            System.out.printf("%s: My sleep has been interrupted. :(%n", name);
            if (!this.canGoBackToSleep)
               return;
         }
      }
   }
}
```

```java 
public class Interruptor {
   public static void main(String[] args) throws InterruptedException {
      System.out.printf("%s: Starting...%n", Thread.currentThread().getName());

      MyTask t0 = new MyTask("Task0", true);
      Thread th0 = new Thread(t0);
      th0.start();
      Thread.sleep(2000);
      th0.interrupt();

      MyTask t1 = new MyTask("Task1", false);
      Thread th1 = new Thread(t1);
      th1.start();
      Thread.sleep(2000);
      th1.interrupt();

      System.out.printf("%s: Terminated.%n", Thread.currentThread().getName());
   }
}
```

## References

Part of the material has been taken from the following sources. The usage of the referenced copyrighted work is in line with fair use since it is for nonprofit educational purposes.

- https://www.journaldev.com/1079/multithreading-in-java
- http://tutorials.jenkov.com/java-concurrency/index.html
- https://www.javatpoint.com/multithreading-in-java
- http://amrelroumy.github.io/posts/2013/06/concurrency-in-cpp-prologue.html
- https://stackoverflow.com/questions/541487/implements-runnable-vs-extends-thread
- https://stackoverflow.com/questions/8579657/whats-the-difference-between-thread-start-and-runnable-run
- https://www.tutorialspoint.com/java/java_multithreading.htm
- https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html
- http://www.vogella.com/tutorials/JavaConcurrency/article.html
- http://winterbe.com/posts/2015/04/07/java8-concurrency-tutorial-thread-executor-examples/
- https://www.guru99.com/multithreading-java.html
