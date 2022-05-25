---
slug: /serialization/jackson
course: Programming Project 2021/22
module: Serialization
title: Reading and writing JSON with Jackson
subtitle: null
chapter: 17
section: 4
previous: /serialization/json
next: /serialization/serializable
---

## JSON libraries for Java

There are several libraries we can adopt to work with JSON in Java:
  
1. [**Jackson**](https://github.com/FasterXML/jackson-databind) 
2. [**Gson**](https://github.com/google/gson) 
3. [**org.json**](https://github.com/stleary/JSON-java)
4. [**Fastjson**](https://github.com/alibaba/fastjson)
5. [**JSON-B**](https://javaee.github.io/jsonb-spec/) & [**JSON-P**](https://javaee.github.io/jsonp/)
6. [**json-simple**](https://github.com/fangyidong/json-simple)
7. [**Moshi**](https://github.com/square/moshi)
8. [**Genson**](http://genson.io/)

In the following, you will find some code excerpts to teach you how to use Jackson, one of the most popular and comprehensive JSON libraries for Java.

## Jackson

[Jackson](https://github.com/FasterXML/jackson) is a suite of data-processing tools for Java and the JVM platform:
- a streaming JSON parser / generator library 
- matching data-binding library (POJOs to and from JSON)
- additional data format modules to process data encoded in: Avro, BSON, CBOR, CSV, Smile, (Java) Properties, Protobuf, XML, YAML, etc.

Several tutorials are available for you:
- [Baeldung Jackson JSON Tutorial](https://www.baeldung.com/jackson)
- [Jackson in N minutes](https://github.com/FasterXML/jackson-databind/) 
- [Jenkov.com Jackson Tutorial](http://tutorials.jenkov.com/java-json/index.html)
- [JournalDev JacksonTutorial](https://www.journaldev.com/2324/jackson-json-java-parser-api-example-tutorial#jackson-json-streaming-api-example)
- [LogicBig.com Jackson Tutorial](https://www.logicbig.com/tutorials/misc/jackson.html)
- [Mkyong.com's Jackson Tutorial](https://mkyong.com/java/jackson-how-to-parse-json/)
- [StudyTrails Jackson Introduction](http://www.studytrails.com/java/json/java-jackson-introduction/)

## Jackson Dependency

Let's first add the following dependencies to the `pom.xml`:

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.10.3</version>
</dependency>
```

This dependency will also transitively add the following libraries to the classpath:

- `jackson-databind:2.10.3.jar`
- `jackson-annotations:2.10.3.jar`
- `jackson-core:2.10.3.jar`

## Serialization of basic types

We can serialize different Java types into JSON strings:

```java
ObjectMapper mapper = new ObjectMapper();
      
System.out.println(mapper.writeValueAsString(1));
System.out.println(mapper.writeValueAsString(10L));
System.out.println(mapper.writeValueAsString(10.0));
System.out.println(mapper.writeValueAsString("abcd"));
System.out.println(mapper.writeValueAsString('A'));
System.out.println(mapper.writeValueAsString(false));

int[] values = { 1, 2, 3, 4 };
System.out.println(mapper.writeValueAsString(values));

List<Integer> list = Arrays.asList( 1, 2, 3, 4 );
System.out.println(mapper.writeValueAsString(list));

Map<String, Integer> map = new HashMap<>();
map.put("Rick",1);
map.put("Morty",2);
map.put("Summer",3);
System.out.println(mapper.writeValueAsString(map));
```

```output
1
10
10.0
"abcd"
"A"
false
[1,2,3,4]
[1,2,3,4]
{"Morty":2,"Rick":1,"Summer":3}
```

## Deserialization of basic types

We can deserialize JSON strings into specific types:

```java
ObjectMapper mapper = new ObjectMapper();

int i = mapper.readValue("1", int.class);
System.out.println(i);

long l = mapper.readValue("1", long.class);
System.out.println(l);

double d = mapper.readValue("1", double.class);
System.out.println(d);

String s = mapper.readValue("\"Rick\"", String.class);
System.out.println(s);

char c = mapper.readValue("\"R\"", char.class);
System.out.println(c);

boolean b = mapper.readValue("false", boolean.class);
System.out.println(b);

int[] array = mapper.readValue("[1,2,3,4]", int[].class);
System.out.println(Arrays.toString(array));

List<Integer> list = mapper.readValue("[1,2,3,4]", new TypeReference<List<Integer>>(){});
System.out.println(list);

Map<String, Integer> map = mapper.readValue("{\"Morty\":2,\"Rick\":1,\"Summer\":3}", 
  new TypeReference<Map<String,Integer>>(){});
System.out.println(map);
```

```output
1
1
1.0
Rick
R
false
[1, 2, 3, 4]
[1, 2, 3, 4]
{Morty=2, Rick=1, Summer=3}
```

## Object serialization
 
We can serialize objects in JSON quite easily: 

```java
public class ObjectSerialization {
   
   public static void main(String[] args) throws JsonProcessingException {
  
      class Student {
         public long id;
         public String name;

         public Student(long id, String name) {
            this.id = id;
            this.name = name;
         }
      }

      ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
      Student student = new Student(123124, "John");
      String jsonData = mapper.writeValueAsString(student);
      System.out.println(jsonData);
   }
}
```

```json
{
  "id" : 123124,
  "name" : "John"
}
```

## What does Jackson serialize?

By default, Jackson will serialize:

1. Every public field:

  ```java
  public String name;
  ```

2. Every non-public field with a getter

  ```java
  private String name;
  
  public String getName() {
    return this.name;
  }
  ```

## Object serialization: private fields

Since Jackson **ignores private fields by default**, to serialize the class:

```java
class Student {
  private long id;
  private String name;
  // ...
}
```

We have the following options:
- Declare getters for the fields we want to serialize
- Use the `@JsonAutoDetect` annotation 
- Configure our ObjectMapper's visibility settings

## Serialization with getters

Declare a getter for each field you want to be serialized:

```java
public class SerializingWithGetter {

  public static void main(String[] args) throws JsonProcessingException {

    class Student {

        private long id;
        private String name;

        public Student(long id, String name) {
          this.id = id;
          this.name = name;
        }

        public long getId() { return id; }
    }

    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    Student student = new Student(123124, "John");
    String jsonData = mapper.writeValueAsString(student);
    System.out.println(jsonData);
  }
}
```

```json
{
  "id" : 123124
}
```

## Serialization with @JsonAutoDetect

Annotate the class using **`@JsonAutoDetect`** and set the field visibility to any:

```java
public class SerializationWithAutoDetect {

   public static void main(String[] args) throws JsonProcessingException {

      @JsonAutoDetect(fieldVisibility = Visibility.ANY)
      class Student {

         private long id;
         private String name;

         public Student(long id, String name) {
            this.id = id;
            this.name = name;
         }
      }

      ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
      Student student = new Student(123124, "John");
      String jsonData = mapper.writeValueAsString(student);
      System.out.println(jsonData);
   }
}
```

```json
{
  "id" : 123124,
  "name" : "John"
}
```

## Serialization with a custom `ObjectMapper`

Adjust the settings on your **`ObjectMapper`** so that it uses all fields of **every class**:

```java
public class SerializingWithCustomMapper {

   public static void main(String[] args) throws JsonProcessingException {
      class Student {

         private long id;
         private String name;

         public Student(long id, String name) {
            this.id = id;
            this.name = name;
         }
      }

      ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
      mapper.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);

      Student student = new Student(123124, "John");
      String jsonData = mapper.writeValueAsString(student);
      System.out.println(jsonData);
   }
}
```

```json
{
  "id" : 123124,
  "name" : "John"
}
```

## Object serialization: methods over fields

Note that Jackson will give preference to getters methods over fields when serializing an object:

```java
public class SerializationMethodOverField {

   public static void main(String[] args) throws JsonProcessingException {
      class Student {

         private long id;
         private String name;

         public Student(long id, String name) {
            this.id = id;
            this.name = name;
         }

         public long getId() { return 9999; }
         public String getName() { return name; }
      }

      ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
      Student student = new Student(123124, "John");
      String jsonData = mapper.writeValueAsString(student);
      System.out.println(jsonData);
   }
}
```

```json
{
  "id" : 9999,
  "name" : "John"
}
```

## Object serialization: ignoring fields

We can instruct Jackson to ignore certain fields using the **`@JsonIgnoreProperties`** annotation:

```java
public class SerializationIgnoreFiels {

   public static void main(String[] args) throws JsonProcessingException {

      @JsonIgnoreProperties("id")
      class Student {
         public long id;
         public String name;

         public Student(long id, String name) {
            this.id = id;
            this.name = name;
         }
      }

      ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
      Student student = new Student(123124, "John");
      String jsonData = mapper.writeValueAsString(student);
      System.out.println(jsonData);
   }
}
```

```json
{
  "name" : "John"
}
```

## Object deserialization: Data binding

We can recreate objects from JSON data:

```java
class Student {
   public long id;
   public String name;

   @Override
   public String toString() {
      return String.format("I'm %s (id: %d).", name, id);
   }
}

public class ObjectDeserialization {

   public static void main(String[] args) throws JsonProcessingException {
      ObjectMapper mapper = new ObjectMapper();
      String jsonData = "{\n" +
              "  \"id\" : 123124,\n" +
              "  \"name\" : \"John\"\n" +
              "}";
      Student student = mapper.readValue(jsonData, Student.class);
      System.out.println(student);
   }
}
```

```output
I'm John (id: 123124).
```

## Object deserialization: ignoring fields

The **`@JsonIgnoreProperties`** annotation also works on deserialization:

```java
@JsonIgnoreProperties("id")
class Student {
   public long id;
   public String name;

   @Override
   public String toString() {
      return String.format("I'm %s (id: %d).", name, id);
   }
}

public class DeserializationIgnoreFields {

   public static void main(String[] args) throws JsonProcessingException {
      ObjectMapper mapper = new ObjectMapper();
      String jsonData = "{\n" +
                        "  \"id\" : 123124,\n" +
                        "  \"name\" : \"John\"\n" +
                        "}";
      Student student = mapper.readValue(jsonData, Student.class);
      System.out.println(student);
   }
}
```

```output
I'm John (id: 0).
```

## Serializating a collection of objects

```java
public class CollectionSerialization {

   public static void main(String[] args) throws JsonProcessingException {

      class Student {
         public long id;
         public String name;

         public Student(long id, String name) {
            this.id = id;
            this.name = name;
         }
      }

      ObjectMapper mapper = new ObjectMapper();
      List<Student> students = Arrays.asList(
              new Student(1, "Filippo"),
              new Student(2, "Antonio"),
              new Student(3, "Claudio"));
      String jsonData = mapper.writeValueAsString(students);
      System.out.println(jsonData);
   }
}
```

```json
[ 
  { "id": 1, "name": "Filippo" }, 
  { "id": 2, "name": "Antonio" }, 
  { "id": 3, "name": "Claudio" } 
]
```

## Deserializing a collection of objects

```java
class Student {
   public long id;
   public String name;

   @Override
   public String toString() {
      return String.format("%s:%d", name, id);
   }
}

public class CollectionDeserialization {

   public static void main(String[] args) throws JsonProcessingException {
      ObjectMapper mapper = new ObjectMapper();
      String jsonData = "[ \n" +
              "  { \"id\": 1, \"name\": \"Filippo\" }, \n" +
              "  { \"id\": 2, \"name\": \"Antonio\" }, \n" +
              "  { \"id\": 3, \"name\": \"Claudio\" } \n" +
              "]";
      ArrayList<Student> students = mapper.readValue(jsonData, new TypeReference<ArrayList<Student>>(){});
      System.out.println(students);
   }
}
```

## Object deserialization: Tree traversing 

Most of the time, you will read JSON data whose structure your are familiar with. Eventually, you may need to read "unknown" objects, which you can do using the **`readTree()`** method:

```java 
public class UnknownDeserialization {

   public static void main(String[] args) throws JsonProcessingException {
      ObjectMapper mapper = new ObjectMapper();

      String json = "[ \n" +
                    "  { \"name\" : \"Rick\", \"hair\" : \"blue\" }, \n" +
                    "  { \"name\" : \"Morty\", \"hair\" : \"brown\" }, \n" +
                    "  { \"name\" : \"Summer\", \"hair\" : \"red\" } \n" +
                    "]";

      JsonNode node = mapper.readTree(json);
      System.out.println("Is array: "+node.isArray());
      System.out.println("Value at index 1, field \"name\": "+node.get(1).get("name"));
      System.out.println(node.toPrettyString());
   }
}
```

```output
Is array: true
Value at index 1, field "name": "Morty"
[ 
  { "name" : "Rick", "hair" : "blue" }, 
  { "name" : "Morty", "hair" : "brown" }, 
  { "name" : "Summer", "hair" : "red" } 
]
```

## Creating JSON objects from scratch

```java
public class JsonCreation {

   public static void main(String[] args) throws JsonProcessingException {
      ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

      ObjectNode rick = mapper.createObjectNode();
      rick.put("name", "Rick");
      rick.put("hair", "blue");

      ObjectNode morty = mapper.createObjectNode();
      morty.put("name", "Morty");
      morty.put("hair", "brown");

      ObjectNode summer = mapper.createObjectNode();
      summer.put("name", "Summer");
      summer.put("hair", "red");

      ArrayNode characters = mapper.createArrayNode();
      characters.add(rick);
      characters.add(morty);
      characters.add(summer);

      System.out.println(mapper.writeValueAsString(characters));
   }
}
```

```json
[ 
  { "name" : "Rick", "hair" : "blue" }, 
  { "name" : "Morty", "hair" : "brown" }, 
  { "name" : "Summer", "hair" : "red" } 
]
```

## Writing JSON to a file

To write our JSON directly to a file, we can use the **`writeValue()`** method: 

```java
public class FileSerialization {

   public static void main(String[] args) throws IOException {
      class Student {
         public long id;
         public String name;

         public Student(long id, String name) {
            this.id = id;
            this.name = name;
         }
      }

      ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
      Student student = new Student(123124, "John");
      mapper.writeValue(new File("student.json"), student);
      
      // We could also call writeValue() in the following ways:

      // mapper.writeValue(new FileWriter("student.json"), student);
      // mapper.writeValue(new FileOutputStream("student.json"), student);
   }
   
}
```

## Reading JSON from a file

To read JSON directly from a file, we can use the **`readValue()`** method: 

```java
class Student {
   public long id;
   public String name;

   @Override
   public String toString() {
      return String.format("I'm %s (id: %d).", name, id);
   }
}

public class FileDeserialization {

      public static void main(String[] args) throws IOException {
         ObjectMapper mapper = new ObjectMapper();

         Student student = mapper.readValue(new File("student.json"), Student.class);
         System.out.println(student);
      }

}
```

```output
I'm John (id: 123124).
```
