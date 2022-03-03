---
slug: /java/memory-model
course: Programming Project 2021/22
module: How Java Works
title: Java Memory Model
subtitle: null
chapter: 4
section: 4
previous: /java/variables-parameters
next: null
---

## JVM's Memory Area

![](../../figures/jvm-architecture.jpg) 

[Image source](https://www.geeksforgeeks.org/how-many-types-of-memory-areas-are-allocated-by-jvm/)

## The stack

Each thread running in the Java virtual machine has its own thread stack, which contains information about which methods the thread has called (the call stack)

It also contains **all the local variables** and parameters.

Primitive local variables are fully stored on the thread stack.

Reference local variables point to objects in the heap

## The heap

The heap contains all objects created in your Java application, regardless of which thread created the object.

It does not matter if an object was created and assigned to a local variable, or created as a member variable of another object, it will be stored on the heap.

If an object is not referenced by any reference variable, it becomes garbage!

From time to time, the JVM will trigger the garbage collector to remove these unused objects from memory.
