---
slug: /serialization/json
course: Programming Project 2021/22
module: Serialization
title: JSON
subtitle: null
chapter: 17
section: 3
previous: /serialization/csv
next: /serialization/jackson
---

The **JavaScript Object Notation (JSON)** is a *lightweight text-based* format for serializing and transmitting structured data over network connections.

It originates from the [Javascript](https://en.wikipedia.org/wiki/JavaScript) programming language, having been designed to be human-readable. You will see that **JSON is easy to read and write**.

Despite its Javascript roots, JSON can be easily used with many programming languages, including Java and Python.

## JSON Example

This is what a JSON object looks like:

```json
{
   "book": [
      {
         "id":"01",
         "language": "Java",
         "edition": "third",
         "author": "Herbert Schildt"
      },
      {
         "id":"07",
         "language": "C++",
         "edition": "second",
         "author": "E.Balagurusamy"
      }
   ]
}
```

## Usage

JSON is widely used in web APIs:
- Spotify
- Facebbok 
- Slack
- Fitbit
- ...

Here are some open examples we can easily inspect:
- [COVID 19 API](https://api.covid19api.com/)
- [Cat Facts API](https://cat-fact.herokuapp.com/facts)
- [OpenDataHub API](http://tourism.opendatahub.bz.it/api)*


## Syntax

JSON supports the following data structures: 
- **Map**
- **List**

A map, usually called an object in JSON, is represented with curly braces (`{}`). 
- Each key/value pair in an object is represented by a quoted key, followed by a colon (`:`), and then a value.
- Key/value pairs are separated by commas (`,`)

```json
{
  "id": 1,
  "language": "Java",
  "edition": "third",
  "author": "Herbert Schildt",
}
```

A list, usually called an array in JSON, is represented with square brackets (`[]`)
- Its elements are separated by commas (`,`).

We can create lists of strings:

```json
[ "My", "name", "is", "JSON" ]
```

Lists of numbers:

```json
[ 1, 100, 1000 ]
```

Lists of objects:

```json
[
  {
    "id": 1,
    "language": "Java",
    "edition": "third",
    "author": "Herbert Schildt",
  },
  {
    "id": 7,
    "language": "C++",
    "edition": "second",
    "author": "E.Balagurusamy",
  }
]
```

And even a mix of datatypes:

```json
[1, "Tiago", true, [0, 1], { "id": 1 }, null ]
```

## DataTypes

JSON supports the following data types:

| Type       | Description                                           |
|------------|-------------------------------------------------------|
| Number     | double- precision floating-point format in JavaScript |
| String     | double-quoted Unicode with backslash escaping         |
| Boolean    | true or false                                         |
| Array      | an ordered sequence of values                         |
| Value      | it can be a string, a number, true or false, null etc |
| Object     | an unordered collection of key:value pairs            |
| null       | empty                                                 |


## JSON versus XML

This JSON document...

```json
{
  "book": [
    {
      "id": "01",
      "language": "Java",
      "edition": "third",
      "author": "Herbert Schildt"
    },
    {
      "id": "07",
      "language": "C++",
      "edition": "second",
      "author": "E.Balagurusamy"
    }
  ]
}
```

... is equivalent to this XML document:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<book>
  <id>01</id>
  <language>Java</language>
  <edition>third</edition>
  <author>Herbert Schildt</author>
</book>
<book>
  <id>07</id>
  <language>C++</language>
  <edition>second</edition>
  <author>E.Balagurusamy</author>
</book>
```
