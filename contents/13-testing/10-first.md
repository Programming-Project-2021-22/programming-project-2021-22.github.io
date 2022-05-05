---
slug: /testing/first
course: Programming Project 2021/22
module: Testing
title: FIRST Properties of Good Tests
subtitle: null
chapter: 13
section: 10
previous: /testing/assertion-libraries
next: /testing/right-bicep
---

Now that we learned how to write tests with JUnit 5, let us focus on what makes a good unit test.

In this section, we will discuss the FIRST principles, as described in the book: Jeff Langr, Andy Hunt, and Dave Thomas, **[Pragmatic Unit Testing in Java 8 with JUnit](https://ubz-primo.hosted.exlibrisgroup.com/permalink/f/pok0fm/39UBZ_ALMA_DS51260958870001241)**, 2015. 


![](https://images-na.ssl-images-amazon.com/images/I/81EocPQDPiL.jpg)


**Note**: This book adopts JUnit 4. We will use it for *good testing practices*, which are applicable regardless of the version of JUnit you are using (or even your testing framework).

## Properties of Good Unit Tests

Unit tests provide many significant benefits when crafted with care, but your tests also represent *code you must write and maintain*. 

You and your team can lose lots of time with your tests because:
- Tests that make little sense to someone following them
- Tests that fail sporadically
- Tests that don’t prove anything worthwhile
- Tests that require a long time to execute
- Tests that don’t sufficiently cover the code
- Tests that couple too tightly to implementation, meaning that small changes break lots of tests all at once
- Convoluted tests that jump through numerous setup hoops

## The FIRST Principles

A set of principles to avoid common pitfalls in unit testing:
- **F:** Fast
- **I**: Isolated
- **R:** Repeatable
- **S:** Self-validating
- **T:** Timely

## [F]IRST: Fast

It is **fundamental that your unit tests are fast**.

**Fast tests:** 
- Deal solely in code.
- Take a **few milliseconds** at most to execute. 

**Slow tests:** 
- Interact with *code that must handle external evil necessities* such as database access, files, and network calls.
- Take **hundreds or thousands of milliseconds**..

### In a typical Java system

You will probably have a few thousand unit tests.

If an average test takes 200 ms, running 2,500 unit tests takes *8 minutes*

Do not expect developers to run an 8-minute test suite too many times throughout a day.

As your system grows, 8 minutes may easily become 15 or 30 minutes

### How fast is fast?

If it is painful to run your test suite more than a couple times a day, you’ve tipped the scale in the wrong direction

Your test suite should provide **continuous**, **comprehensive**, and **fast** feedback about the health of your system
- This implies that you should run it often
- If you don't, you will start to question the investment you made to create it

### How to keep tests fast?

1. Minimize the dependencies on code that executes slowly.
1. Avoid making database calls
1. Avoid making HTTP requests
1. Avoid open, writing, and closing files

Think of your course project.**What can significantly slow down your tests?**

## F[I]RST: Isolated

Isolated tests have two main characteristics. They are focused and independent.

### Isolated implies focused

Good unit tests focus on a small chunk of code to verify.

When you start to add a second assertion to a test, ask yourself: 

> Does this assertion help to verify a single behavior, or does it represent a behavior that I could describe with a new test name?

If one of your test methods can break for more than one reason, consider splitting it into separate tests. 

When a focused unit test breaks, it’s usually obvious why

### Isolated implies independent

Good unit tests depend as little as possible on other unit tests.

The more code that your test interacts with, directly or indirectly, the more things can break it

Tests that must ultimately depend on a database require you to ensure that the database has the right data: 
- If your data source is shared, you have to worry about external changes breaking your tests
- Don’t forget that other developers are often running their tests at the same time! 
- Simply interacting with an external store increases the likelihood that your test will fail for *availability* or *accessibility* reasons.

Good unit tests also don’t depend on other unit tests (or test cases within the same test method)

**You should be able to run any given test at any time, in any order.**

## FI[R]ST: Repeatable

A **repeatable test** is one that produces the same results each time you run it.

Repeatability often requires isolation.

Avoid the temptation of adding a random value to your tests:

```java
double x = Math.random();
double y = Math.random();
```

Without repeatability, you might be in for some surprises:
- You test may fail while it works as it is supposed to 
- You do not want to waste time chasing down phantom problems

**Each test should produce the same results every time.**

## FIR[S]T: Self-Validating

Tests are not tests unless they **assert that things went as expected**

You write unit tests to save you time, not take more of your time:
  - Manually verifying test results is time-consuming and risky
  - It is easy to overlook important signs when you test manually

### Self-validating implies self-arranging

Your tests should never require manual setups before you can run them.

**You must automate any setup your test requires**

## FIRS[T]: Timely

You can write unit tests at any time, but you are better off focusing on *writing unit tests in a timely fashion*.

The more you defer writing tests, the more defects you will need to deal with.

Once you check code into your git, it is unlikely that you will come back and write tests for it.

Many dev teams have rules around unit testing:
- Review processes 
- Automated tools to reject code without sufficient tests

It pays to write smaller chunks of code:
- It’ll be easier to write the test
- The test will pay off immediately as you flesh out the rest of the behaviors in the surrounding code

