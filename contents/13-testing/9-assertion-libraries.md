---
slug: /testing/assertion-libraries
course: Programming Project 2021/22
module: Testing
title: Third-party Assertion Libraries
subtitle: null
chapter: 13
section: 9
previous: /testing/repeated
next: /testing/first
---

There assertion methods available in JUnit 5 are good, but fairly limited. We may miss something more sophisticated when dealing with more complex data structures and when seeking to write concise and reatidable test code.

To overcome these limitations, third-party assertion libraries have been developed:

- [AssertJ](https://assertj.github.io/doc/)
- [Truth](https://truth.dev/)
- [Hamcrest](http://hamcrest.org/JavaHamcrest/tutorial)

## Exercise

Split into groups, pick a library, and learn what kind of interesting new assertion methods it offers.
Then, solve the following tasks using them. 

When you are done, present your solutions to the class.

## 1. Basic JUnit 5 Assertions

Discover how your library handles the basic assertions we can already do with JUnit 5:

The `org.junit.jupiter.api.Assertions` class offers:
- `assertTrue()`: Assert that condition is true
- `assertFalse()`: Assert that condition is false
- `assertNull()`: Assert that object is null
- `assertNotNull()`: Assert that object is not null
- `assertEquals()`: Assert that expected and actual are equal
- `assertNotEquals()`: Assert that expected and actual are not equal
- `assertArrayEquals()`: Assert that expected and actual arrays are equals
- `assertSame()`: Assert that expected and actual refer to the same object
- `assertNotSame()`: Assert that expected and actual do not refer to the same object

## 2. Strings

Write a test method that asserts that a string:
- contains another
- equal to another ignoring case
- ends with another
- has a certain size
- is empty

## 3. Numbers

Write a test method that asserts that:
- a number is strictly greater than another
- a number is greater or equal to another
- a double is equal to another with a certain degree of precision

## 4. Lists

Write a method that asserts that a list: 
- contains element a given element
- contains only certain elements *in any order*
- contains only certain elements *in a specific order*
- overlaps with another 
- only has elements that matches a certain criteria (e.g. only even numbers)
- has at least one element that matches a certain criteria (e.g. only even numbers)
- has a certain size

## 5. Maps

Write a method that asserts that a map:
- has a certain key
- has a certain value
- has a certain entry (key -> value)

## 6. Exceptions

Write a method that asserts that a method:
- Throws a certain type of exception
- Throws an exception with a certain message
- Throws an exception caused by an exception of a certain type