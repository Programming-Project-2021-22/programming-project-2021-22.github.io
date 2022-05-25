---
slug: /io/streams
course: Programming Project 2021/22
module: I/O
title: I/O Streams
subtitle: null
chapter: 16
section: 2
previous: /io/file-manipulation
next: /io/reading-file-reader
---

We have seen how to manipulate files as a whole, now let's see how to manipulate their content!

We will start by discussing input and output (I/O) using the `java.io` package. 
  - I/O is done using streams
  - A stream is a sequence of data flowing from a source to a destination
  - I/O streams can be connected to a wide variety of data sources and destinations

## Input and output streams

Data for a program may come from several sources and may be sent to several destinations. 

The connection between a program and a data source or destination is called a **stream.**
- An **input stream** handles data flowing into a program. 
- An **output stream** handles data flowing out of a program.

In the picture, each "O" is a piece of data. The data is streaming from the source into the program. Computed results are streaming from the program to the destination.

![](../../figures/IOStreams.gif)


## I/O devices

There are many types of I/O devices. Some can be a source, others a destination, and some can be both! 

Some devices switch roles depending on what program is running. For example a disk file might be the destination for the output of one program, and later it may be the source for another program.

Often the destination for one stream is the source for another. 

Here are some examples:

| Object              | Source, Destination or Both? |
|---------------------|-------------------------------|
| disk file           |              Both             |
| running program     |              Both             |
| monitor             |              Destination      |
| keyboard            |              Source           |
| Internet connection |              Both             |
| image scanner       |              Source           |

## Types of Streams

A stream object may be classified according to several dimensions:
- an **input** or an **output** stream
- a **character-oriented** or a **byte-oriented** stream
- a **processing** or an **ordinary** stream

These dimensions can be combined to form many kinds of stream objects:
- an input character-oriented processing stream
- an output byte-oriented ordinary stream

Not only are there many types of streams, there are also many ways to combine them!

## Processing Streams

A processing stream operates on the data supplied by another stream.

Often a processing stream acts as a buffer for the data coming from another stream. A buffer is a block of main memory used as a work area.  For example, disks usually deliver data in blocks of 512 bytes, no matter how few bytes a program has asked for. Usually the blocks of data are buffered and delivered from the buffer to the program in the amount the program asked for.

In the picture:
- the keyboard sends data to the `InputStream System.in`, which 
- is connected to a `InputStreamReader` stream, which 
- is connected to a `BufferedReader` stream. 

`System.in` is a stream object that the Java system automatically creates when your program starts running.

![](../../figures/connectedStreams.gif)

The data is transformed along the way. 

The raw bytes from the keyboard are grouped together into a String object that the program reads using `stdin.readLine()`.
A program can set all this up by declaring a `BufferedReader` as follows:

```java
BufferedReader stdin = 
  new BufferedReader ( 
    new  InputStreamReader (System.in) );
```

This may seem like an unnecessary complication, but `java.io` gives you a collection of parts that can be assembled to do nearly any I/O task you need.

## Character Streams and Byte Streams

**Character streams** are intended exclusively for character data.
- Intended for character data.
- Data is transformed from/to 16 bit Java char used inside programs to the format used externally.


**Byte streams** are intended for general purpose input and output.
- Intended for general-purpose input and output.
- Data may be primitive data types or raw bytes.

Fundamentally all data consist of patterns of bits grouped into 8-bit bytes. So, logically, all streams could be called "byte streams". However, streams that are intended for bytes that represent characters are called **character streams** and all others are called **byte streams**.

Character streams are optimized for character data and perform some other useful character-oriented tasks. 
Often the source or destination of a character stream is a text file--a file that contains bytes that represent characters.

Data sources and destinations often contain non-character data. For example, the bytecode file created by the Java compiler contains machine instructions for the Java virtual machine. These are not intended to represent characters, and input and output of them must use byte streams.

## I/O Class Hierarchy

The diagram below shows the top of the hierarchy for the `java.io` package. The dotted clouds are abstract classes, which act as base classes for specialized streams.

![](../../figures/ioHierarchyTop.gif)

- `InputStream`: byte-oriented input stream
- `OutputStream`: byte-oriented output stream
- `Reader`: character-oriented input stream
- `Writer`: character-oriented output stream

We will not instantiate these classes directly, but its subclasses. For example, a `BufferedReader` is a `Reader`.

## Readers

`Reader` is an abstract class from which all character-oriented input streams are derived. 

Readers deliver **16-bit char data to a program** which may come from a variety of sources and formats, such as UTF format on a disk file. 

The diagram below shows several concrete `Reader` classes.

![](../../figures/reader-taxonomy.jpg)

## Writer

`Writer` is an abstract class from which all character-oriented output streams are derived. 

Writers **receive 16-bit char data from a program** and sending it to some destination, which may use a different character formats, such as UTF format on a disk file.

The diagram below shows several concrete `Writer` classes.

![](../../figures/writer-taxonomy.jpg)

## InputStream

`InputStream` is an abstract class from which all byte-oriented input streams are derived. 

Its descendant classes are used for general-purpose input (non-character input). 

These streams deliver **data to a program in groups of 8-bit bytes**, but these bytes can be grouped into the size necessary for the type of data.
For example, if a disk file contains 32-bit int data, data can be delivered to the program in 4-byte groups in the same format as Java primitive type `int`.

![](../../figures/inputHierarchy.gif)

## OutputStream

`OutputStream` is an abstract class from which all byte-oriented output streams are derived. 

Its descendant classes are used for general-purpose (non-character output). 

These streams are aimed at **writing groups of 8-bit bytes to output destinations**. The bytes are in the same format as Java primitive types.  For example, 4-byte groups corresponding to type int can be written to a disk file.

We have used PrintStream many times already, because System.out is an object of that type.

![](../../figures/outputStreams.gif)
<!-- ## Object Streams

You may have noticed the class **ObjectOutputStream** in the previous diagram. 
Streams of that class write objects to a destination such as a disk file. 
**ObjectInputStream** streams read objects from a source. 
So far in our programs objects have existed only in main memory and lasted only as long the program that created them was running. When the program stopped running (or earlier), they were garbage collected.
With an ObjectOutputStream an object can be written to disk and will remain there even after the program stops. This is the topic of **object serialization** 

## I/O Class Hierarchy wrap up

![](../../figures/ioHierarchyTop.gif)

Streams are byte-oriented or character-oriented. Each type has input streams and output streams.
Byte-oriented streams.
	- Intended for general-purpose input and output.
    - Data may be primitive data types or raw bytes.
Character-oriented streams.
	- Intended for character data.
	- Data is transformed from/to 16 bit Java char used inside programs to the UTF format used externally. -->
