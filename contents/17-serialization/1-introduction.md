---
slug: /serialization/introduction
course: Programming Project 2021/22
module: Serialization
title: Introduction
subtitle: null
chapter: 17
section: 1
previous: /io/writing
next: /serialization/csv
---

When data is saved to a file or transmitted over a network, it must be represented somehow.

We want to represent it in a way that allows us to rebuilt it later, when the file is read or the transmission is received.

There are two main groups of file serialization formats:
- Binary:
  - Protocol Buffers: [https://developers.google.com/protocol-buffers](https://developers.google.com/protocol-buffers)
  - BSON: [http://bsonspec.org/](http://bsonspec.org/)
  - MessagePack: [https://msgpack.org/](https://msgpack.org/) 
- Character-based:
  - CSV: [https://en.wikipedia.org/wiki/Comma-separated_values](https://en.wikipedia.org/wiki/Comma-separated_values)
  - XML: [https://www.w3schools.com/xml/default.asp](https://www.w3schools.com/xml/default.asp)
  - JSON: [https://www.json.org/](https://www.json.org/)
  - YAML: [https://yaml.org/](https://yaml.org/)

You can find a more complete list at [https://en.wikipedia.org/wiki/Comparison_of_data-serialization_formats](https://en.wikipedia.org/wiki/Comparison_of_data-serialization_formats)

As is often the case in Computer Science (and in life) there is no absolutely better option. *There is the right tool for the right job!*

## Character-based formats

There are good reasons to use character-based serialization formats:
- You can actually read files
- You can write them without any additional tools
- The formats are simpler to implement and work with

Their main disadvantages are: 
- They are usually a lot larger
- Manipulating data specified in them may be inefficient if compared to binary-based alternatives

That is why some database systems accept data in JSON, but store them in BSON (e.g. [MongoDB](https://www.mongodb.com/json-and-bson))

[Source](https://www.stat.auckland.ac.nz/~paul/ItDT/HTML/node38.htmls)
