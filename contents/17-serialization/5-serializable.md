---
slug: /serialization/serializable
course: Programming Project 2021/22
module: Serialization
title: Binary serialization
subtitle: null
chapter: 17
section: 5
previous: /serialization/jackson
next: null
---

Java provides a mechanis to **represent an object as a sequence of bytes**, including:
- the object's data
- information about the object's type and the types of data stored in the object

After a serialized object has been written into a file, it can be read from the file and deserialized.
	
The entire process is JVM independent, meaning an object can be serialized on one platform and deserialized on an entirely different platform.

It's all about:
- taking something complicated and turning it into a flat sequence of 1s and 0s,
- and then taking that sequence of 1s and 0s and reconstructing the original complicated "something"

## `ObjectInputStream` and `ObjectOutputStream`

The classes `ObjectInputStream` and `ObjectOutputStream` are high-level streams that contain the methods for serializing and deserializing an object.

`ObjectOutputStream` has a method to serialize an `Object` and sends it to the output stream. 

```java
public final void writeObject(Object x) throws IOException
```

Similarly, `ObjectInputStream` contains the following method to deserialize an object from an input stream:

```java
public final Object readObject() throws IOException, ClassNotFoundException
```

The return value is `Object`, so you **will need to cast it** to its appropriate data type.

## `Serializable`

To serialize instances of a class, we need to:
- Make the class implement the [`Serializable`](https://docs.oracle.com/en/java/javase/17/docs/api//java.base/java/io/Serializable.html) interface.
- Make sure all fields in the class are serializable. If a field is not serializable, it must be marked transient.

```java
public class Employee implements java.io.Serializable {
  public String name;
  public transient int SSN;

  public Employee(String name, int SSN) {
      this.name = name;
      this.SSN = SSN;
  }

  public void mailCheck() {
      System.out.println("Mailing a check to " + name + ". ");
  }
}
```

## Serialization example

When serializing an object to a file, the standard convention in Java is to give the file a `.ser` extension.

```java
import java.io.*;

public class SerializerDemo {

  public static void main(String [] args) {
      String fileName = "resources/employee.ser";
      Employee e1 = new Employee("Rick", 131241);
      Employee e2 = new Employee("Morty", 12314);
      Employee e3 = new Employee("Summer", 512512);

      try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(fileName))){
        out.writeObject(e1);
        out.writeObject(e2);
        out.writeObject(e3);
        System.out.printf("Serialized data is saved in %s",fileName);
      }catch(IOException i) {
        i.printStackTrace();
      }
  }
}
```

## Deserialization example

The return value of `readObject()` is cast to an `Employee` reference.

If the JVM can't find a class during the deserialization of an object, it throws a `ClassNotFoundException`

The deserialized employees all have their SSNs set to 0 because the SSN field is `transient`

```java
public class DeserializerDemo {
  public static void main(String[] args) {
      ArrayList<Employee> employees = new ArrayList<>();
      String fileName = "resources/employee.ser";
      try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(fileName))) {
        try {
            while (true)
              employees.add((Employee) in.readObject());
        } catch (IOException e) {
            System.out.println("Finished reading file.");
        } catch (ClassNotFoundException e) {
            System.out.println("Employee class not found");
            e.printStackTrace();
            return;
        }
      } catch (IOException i) {
        i.printStackTrace();
        return;
      }
      System.out.println("Deserialized employees...");
      employees.forEach(e -> System.out.printf("Name: %s, SSN: %s%n", e.name, e.SSN));
  }
} 
``` 

