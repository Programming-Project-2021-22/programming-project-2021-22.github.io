---
slug: /regex/api
course: Programming Project 2021/22
module: Regular Expressions
title: Regex API
subtitle: null
chapter: 14
section: 4
previous: /regex/
next: /design-patterns/instructions
---

The [Java Regex API](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/regex/package-summary.html) contains the following elements:

### Interface Summary

**[`MatchResult`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/regex/MatchResult.html)**: 
- The result of a match operation
- This interface contains query methods used to determine the results of a match against a regular expression

### Class Summary

**[`Pattern`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/regex/Pattern.html)**: 
- An instance of this class represents a regular expression that is specified in string form

**[`Matcher`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/regex/Matcher.html)**: 
- An engine that performs match operations on a character sequence by interpreting a **`Pattern`**
- A matcher is created from a **`Pattern`**

### Exception Summary
**[`PatternSyntaxException`](https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/regex/PatternSyntaxException.html)**: 
- A subclass of **`RuntimeException`** 
- Thrown to indicate a syntax error in a regular-expression **`Pattern`**

## Quick demo

```java
public class RegexDemo {

  public static void main(String[] args) {
    String text = "The Lord of the Rings is an epic[1] high-fantasy novel " +
            "written by English author and scholar J. R. R. Tolkien. " +
            "The story began as a sequel to Tolkien's 1937 fantasy " +
            "novel The Hobbit, but eventually developed into a much larger work. " +
            "Written in stages between 1937 and 1949, The Lord of the Rings " +
            "is one of the best-selling novels ever written, with over 150 " +
            "million copies sold.[2]";

    // Regex that matches 4-digit numbers
    String regex = "\\d{4}";
    // Creates pattern by compiling regex string
    Pattern pattern = Pattern.compile(regex);
    // Creates a matcher for from the pattern for the text string
    Matcher matcher = pattern.matcher(text);
    // Checks if the text contains an occurrence of the pattern
    System.out.println("Found year? " + matcher.find());
  }

}
```

```output
Found year? true
```

## Alternative styles

```java
public class Styles {

  public static void main(String[] args) {
    //1st way
    Pattern pattern = Pattern.compile("s.*");
    Matcher matcher = pattern.matcher("as");
    boolean hasMatched1 = matcher.matches();

    //2nd way
    boolean hasMatched2 = Pattern.compile("as")
                                 .matcher("as")
                                 .matches();

    //3rd way
    boolean hasMatched3 = Pattern.matches("a.*", "as");

    System.out.println(hasMatched1 + " " + hasMatched2 + " " + hasMatched3);
  }

}
```

```java
false true true
```

## `Matcher`

The `Matcher` class provides three types of methods:
- **Study methods**
- **Index methods**
- **Replacement methods**
   
## `Matcher`: Study methods

Review the input string and return a `boolean` indicating whether the pattern was found.

On success, more information can be obtained via the `start`, `end`, and `group` methods.

- **```public boolean matches()```**
   
   Attempts to match the entire region against the pattern. 

- **```public boolean lookingAt()```**
   
   Attempts to match the input sequence, starting at the beginning of the region, against the pattern.

- **```public boolean find()```**
   
   Attempts to find the next subsequence of the input sequence that matches the pattern.    

- **```public boolean find(int start)```**
   
   Resets this matcher and then attempts to find the next subsequence of the input sequence that matches the pattern, starting at the specified index.

## `matches()`

Checks if the entire string matches against the pattern. Its behavior is similar to `String.matches()`, but when it succeeds, we can obtain more information on the match.

```java
public class Matches {
  public static void main(String[] args) {
    String[] fellowship = {"Frodo", "Gandalf", "Sam", "Aragorn",
            "Legolas", "Gimli", "Pippin", "Merry", "Boromir"};

    // Name starts with uppercase G
    String regex = "G\\w*";
    Pattern pattern = Pattern.compile(regex);

    for (String member : fellowship) {
      Matcher matcher = pattern.matcher(member);
      boolean matched = matcher.matches();
      System.out.printf("Does '%s' match the regex? %B%n", member, matched);
    }

    System.out.println();
    for (String member : fellowship) {
      boolean matched = member.matches(regex);
      System.out.printf("Does '%s' match the regex? %B%n", member, matched);
    }
  }
}
```

```output
Does 'Frodo' match the regex? FALSE
Does 'Gandalf' match the regex? TRUE
Does 'Sam' match the regex? FALSE
Does 'Aragorn' match the regex? FALSE
Does 'Legolas' match the regex? FALSE
Does 'Gimli' match the regex? TRUE
Does 'Pippin' match the regex? FALSE
Does 'Merry' match the regex? FALSE
Does 'Boromir' match the regex? FALSE

Does 'Frodo' match the regex? FALSE
Does 'Gandalf' match the regex? TRUE
Does 'Sam' match the regex? FALSE
Does 'Aragorn' match the regex? FALSE
Does 'Legolas' match the regex? FALSE
Does 'Gimli' match the regex? TRUE
Does 'Pippin' match the regex? FALSE
Does 'Merry' match the regex? FALSE
Does 'Boromir' match the regex? FALSE
```

## Exercise

Write a program that checks if the elements of an array are international phone numbers.

Assume the following rules:
- Numbers start with a + symbol
- Which is followed by a country code (from 1 to 3 digits)
- Which is followed by an empty space
- Which is followed by a national number (from 6 to 14 digits)
- No other characters are allowed

Here is a **valid** example: *+39 0474013600*

Here is an **invalid** example: *+39 0474 013600* (space characters are not allowed within the national number group)

<!-- ## Solution

```java
public class MatchesExercise {

   public static void main(String[] args) {
      String[] phoneNumbers = {"+39 0471 011000", "+55 9559333279", "+1 7528072 (USA)",
              "+ 31 711288782", "This number is from estonia +372 4934650", "+49 30105091948"};

      String regex = "\\+(\\d{1,3})\\s(\\d{6,14})";
      Pattern pattern = Pattern.compile(regex);

      for (String phoneNumber : phoneNumbers) {
         Matcher matcher = pattern.matcher(phoneNumber);
         if (matcher.matches())
            System.out.printf("%s: OK%n", phoneNumber);
         else
            System.out.printf("%s: ERROR%n", phoneNumber);
      }
   }

}
```

```output
+39 0471 011000: ERROR
+55 9559333279: OK
+1 7528072 (USA): ERROR
+ 31 711288782: ERROR
This number is from estonia +372 4934650: ERROR
+49 30105091948: OK
``` -->

## `lookingAt()`

Checks if the string **starts with** a subsequence that matches against the pattern

```java
public class LookingAt {

    public static void main(String[] args) {
      String text = "+39 0471011000 (unibz)";

      // Checks if the text starts with an international phone number:
      String regex = "\\+(\\d{1,3})\\s(\\d{6,14})";
      Pattern pattern = Pattern.compile(regex);

      Matcher matcher = pattern.matcher(text);
      System.out.printf("The text \"%s\" starts with a phone number?%n%B", text, matcher.lookingAt());
    }

}
```

```output
The text "+39 0471011000 (unibz)" starts with a phone number?
TRUE
```

## `find()`

Checks if the string **contains** a subsequence that matches against the pattern

```java
public class Find {
  public static void main(String[] args) {
    String text = "Free University of Bozen-Bolzano\n" +
            "Universitätsplatz 1 - piazza Università, 1\n" +
            "Italy - 39100, Bozen-Bolzano\n" +
            "Tel +39 0471011000";

    String regex = "\\+\\d{1,3}\\s\\d{6,14}";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(text);

    // Checks if the text contains an international phone number:
    String found = matcher.find() ? "Yes" : "No";
    System.out.println(text);
    System.out.println("\nDoes the text above contain a phone number? " + found);
  }
}
```

```output
Free University of Bozen-Bolzano
Universitätsplatz 1 - piazza Università, 1
Italy - 39100, Bozen-Bolzano
Tel +39 0471011000

Does the text above contain a phone number? Yes
```

We can iteratively call **`find()`** to retrieve all matches on a input string. 

After a successful **`find()`**, we can invoke the **`group()`** on the matcher to retrieve the matched string segment:

```java
public class FindAll {
  public static void main(String[] args) {
    String text = "The Lord of the Rings is an epic[1] high-fantasy novel " +
            "written by English author and scholar J. R. R. Tolkien. " +
            "The story began as a sequel to Tolkien's 1937 fantasy " +
            "novel The Hobbit, but eventually developed into a much larger work. " +
            "Written in stages between 1937 and 1949, The Lord of the Rings " +
            "is one of the best-selling novels ever written, with over 150 " +
            "million copies sold.[2]";

    // Regex that matches 4-digit numbers
    String regex = "\\d{4}";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(text);
    // While a new occurrence is found
    while (matcher.find()) {
      // Retrieve and print the found substring 
      System.out.println(matcher.group());
    }
  }
}
```

```output
1937
1937
1949
```

## `find()` vs `matches()` vs `lookingAt()`

Differences:
- ```matches()``` has a fixed start and end 
- ```lookingAt()``` has a fixed start but a variable end
- ```find()``` has a variable start and end

The `find()` is often called multiple times to catch all string segments that match the provided regex

## Using streams

An alternative way to retrieve all matches on a input string is to call `results()`, which returns a `Stream` of matches:

```java
public class MatchStream {
  public static void main(String[] args) {
      String text = "The Lord of the Rings is an epic[1] high-fantasy novel " +
            "written by English author and scholar J. R. R. Tolkien. " +
            "The story began as a sequel to Tolkien's 1937 fantasy " +
            "novel The Hobbit, but eventually developed into a much larger work. " +
            "Written in stages between 1937 and 1949, The Lord of the Rings " +
            "is one of the best-selling novels ever written, with over 150 " +
            "million copies sold.[2]";

      String regex = "\\b(\\w{5})\\b";
      Pattern pattern = Pattern.compile(regex);
      Matcher matcher = pattern.matcher(text);

      matcher.results()
            .forEach(match -> System.out.println(match.group()));
  }
}
```

```output
Rings
novel
story
began
novel
Rings
```

## `Matcher`: Index methods

Return indexes that show precisely where the lasted match was found in the string:

- **```public int start()```**
   
   Returns the start index of the previous match.                                                                             

- **```public int start(int group)```**

   Returns the start index of the subsequence captured by the given group during the previous match operation.    

- **```public int end()```**

   Returns the offset after the last character matched.                                                                       

- **```public int end(int group)```**

   Returns the offset after the last character of the subsequence captured by the given group during the previous match operation. 

## `start()` and `end()`

Finding the indexes of every match of the word "Rings" in the text:

```java
public class IndexMethods {
  public static void main(String[] args) {
      String text = "The Lord of the Rings is an epic[1] high-fantasy novel " +
            "written by English author and scholar J. R. R. Tolkien. " +
            "The story began as a sequel to Tolkien's 1937 fantasy " +
            "novel The Hobbit, but eventually developed into a much larger work. " +
            "Written in stages between 1937 and 1949, The Lord of the Rings " +
            "is one of the best-selling novels ever written, with over 150 " +
            "million copies sold.[2]";

      String regex = "\\bRings\\b";
      Pattern pattern = Pattern.compile(regex);
      Matcher matcher = pattern.matcher(text);

      int count = 0;
      while (matcher.find()) {
        count++;
        int startIndex = matcher.start();
        int endIndex = matcher.end();
        System.out.printf("%d: start=%d, end=%d%n", count, startIndex, endIndex);
      }
  }
}
```

```output
1: start=16, end=21
2: start=290, end=295
```

Finding the indexes of specific matched groups:

```java
public class IndexMethodsGroups {
  public static void main(String[] args) {
    String text = "The Lord of the Rings is an epic[1] high-fantasy novel " +
            "written by English author and scholar J. R. R. Tolkien. " +
            "The story began as a sequel to Tolkien's 1937 fantasy " +
            "novel The Hobbit, but eventually developed into a much larger work. " +
            "Written in stages between 1937 and 1949, The Lord of the Rings " +
            "is one of the best-selling novels ever written, with over 150 " +
            "million copies sold.[2]";

    String regex = "(Lord) (of) (the) (Rings)";
    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(text);

    while (matcher.find()) {
      System.out.printf("Group 0: string=\"%s\", start=%d, end=%d",
              matcher.group(0), matcher.start(0), matcher.end(0));
      System.out.printf("%nGroup 1: string=\"%s\", start=%d, end=%d",
              matcher.group(1), matcher.start(1), matcher.end(1));
      System.out.printf("%nGroup 2: string=\"%s\", start=%d, end=%d",
              matcher.group(2), matcher.start(2), matcher.end(2));
      System.out.printf("%nGroup 3: string=\"%s\", start=%d, end=%d",
              matcher.group(3), matcher.start(3), matcher.end(3));
      System.out.printf("%nGroup 4: string=\"%s\", start=%d, end=%d%n%n",
              matcher.group(4), matcher.start(4), matcher.end(4));
    }
  }
}
```

```output
Group 0: string="Lord of the Rings", start=4, end=21
Group 1: string="Lord", start=4, end=8
Group 2: string="of", start=9, end=11
Group 3: string="the", start=12, end=15
Group 4: string="Rings", start=16, end=21
```

## Exercise

Given the text:

```java
String text = "Never gonna give you up\n" + 
            "Never gonna let you down\n" + 
            "Never gonna run around and desert you\n" + 
            "Never gonna make you cry\n" + 
            "Never gonna say goodbye\n" + 
            "Never gonna tell a lie and hurt you";
```
   
Print out the start and end indexes of any sequence of three words that start with "Never"

<!-- ## Solution

```java
public class IndexExercise {

   public static void main(String[] args) {
      String text = "Never gonna give you up\n" +
              "Never gonna let you down\n" +
              "Never gonna run around and desert you\n" +
              "Never gonna make you cry\n" +
              "Never gonna say goodbye\n" +
              "Never gonna tell a lie and hurt you";

      String regex = "Never\\s\\w+\\s\\w+";
      Pattern pattern = Pattern.compile(regex);
      Matcher matcher = pattern.matcher(text);

      while (matcher.find()) {
         String match = matcher.group();
         int startIndex = matcher.start();
         int endIndex = matcher.end();
         System.out.printf("\"%s\": start=%d, end=%d%n", match, startIndex, endIndex);
      }
   }

}
```

```output
Never gonna give: start=0, end=16
Never gonna let: start=24, end=39
Never gonna run: start=49, end=64
Never gonna make: start=87, end=103
Never gonna say: start=112, end=127
Never gonna tell: start=136, end=152
``` -->

## `Matcher`: Replacement methods

Methods for replacing text in an input string:

- **```public String replaceFirst(String replacement)```** 

   Replaces the first subsequence of the input sequence that matches the pattern with the given replacement string. 

- **```public String replaceAll(String replacement)```**
   
   Replaces every subsequence of the input sequence that matches the pattern with the given replacement string. 

- **```public Matcher appendReplacement(StringBuffer sb, String replacement)```**
   
   Implements a non-terminal append-and-replace step.

- **```public StringBuffer appendTail(StringBuffer sb)```**
   
   Implements a terminal append-and-replace step.

## `replaceFirst()` and `replaceAll()`

```java
public class ReplaceFirstAll {
   public static void main(String[] args) {
      String text = "\"Someone else always has to carry on the story.\"\n" +
              "― J.R.R. Tolkien, The Lord of the Rings";
      System.out.println(text+"\n");

      // Matches the string "J.R.R. Tolkien"
      Pattern pattern = Pattern.compile("J\\.R\\.R\\. Tolkien");
      Matcher matcher = pattern.matcher(text);
      // Returns a copy of the string replacing the first occurrence of the pattern
      String modifiedText = matcher.replaceFirst("J.K. Rowling");
      System.out.println(modifiedText+"\n");

      // Matches the letter "e"
      pattern = Pattern.compile("e");
      matcher = pattern.matcher(modifiedText);
      // Returns a copy of the string replacing all occurrences of the pattern
      modifiedText = matcher.replaceAll("x");
      System.out.println(modifiedText+"\n");
   }
}
```

```output
"Someone else always has to carry on the story."
― J.R.R. Tolkien, The Lord of the Rings

"Someone else always has to carry on the story."
― J.K. Rowling, The Lord of the Rings

"Somxonx xlsx always has to carry on thx story."
― J.K. Rowling, Thx Lord of thx Rings
```

## `replaceFirst()` and `replaceAll()` with lambdas expressions

```java
public class ReplaceFirstAllLambdas {
  public static void main(String[] args) {
    String text = "\"Someone else always has to carry on the story.\"\n" +
            "― J.R.R. Tolkien, The Lord of the Rings";
    System.out.println(text + "\n");

    // Matches the string "J.R.R. Tolkien"
    Pattern pattern = Pattern.compile("J\\.R\\.R\\. Tolkien");
    Matcher matcher = pattern.matcher(text);
    // Returns a copy of the string replacing the first occurrence of the pattern
    String modifiedText = matcher.replaceFirst(match -> match.group().toUpperCase() + " and J.K. Rowling");
    System.out.println(modifiedText + "\n");

    // Matches the letter "e"
    pattern = Pattern.compile("e");
    matcher = pattern.matcher(text);
    // Returns a copy of the string replacing all occurrences of the pattern
    modifiedText = matcher.replaceAll(match -> match.group() + match.group());
    System.out.println(modifiedText + "\n");
  }
}
```

```output
"Someone else always has to carry on the story."
― J.R.R. Tolkien, The Lord of the Rings

"Someone else always has to carry on the story."
― J.R.R. TOLKIEN and J.K. Rowling, The Lord of the Rings

"Someeonee eelsee always has to carry on thee story."
― J.R.R. Tolkieen, Thee Lord of thee Rings
```

## `appendReplacement()` and `appendTail()`

```java
public class ReplaceAppendMethods {

  public static void main(String[] args) {
      String text = "\"Someone else always has to carry on the story.\"\n" +
            "― J.R.R. Tolkien, The Lord of the Rings";
      System.out.println(text + "\n");

      Pattern pattern = Pattern.compile("a");
      Matcher matcher = pattern.matcher(text);

      StringBuffer buffer = new StringBuffer();

      while (matcher.find()) {
        matcher = matcher.appendReplacement(buffer, "ä");
        System.out.printf("start=%d\tgroup=%s\t\t%s%n", matcher.start(), matcher.group(), buffer);
      }

      matcher.appendTail(buffer);
      System.out.println("\n" + buffer);
  }

}
```


```output
"Someone else always has to carry on the story."
― J.R.R. Tolkien, The Lord of the Rings

start=14	group=a		"Someone else ä
start=17	group=a		"Someone else älwä
start=22	group=a		"Someone else älwäys hä
start=29	group=a		"Someone else älwäys häs to cä

"Someone else älwäys häs to cärry on the story."
― J.R.R. Tolkien, The Lord of the Rings
```

## `PatternSyntaxException`

A **`PatternSyntaxException`** is an unchecked exception that indicates a syntax error in a regular expression pattern.

The **`PatternSyntaxException`** class provides the following methods to help you determine what went wrong
- **`String getDescription()`**: Retrieves the description of the error
- **`int getIndex()`**: Retrieves the error index. 
- **`String getPattern()`**: Retrieves the erroneous regular expression pattern.
- **`String getMessage()`**: Returns a multi-line string containing the description of the syntax error and its index, the erroneous regular expression pattern, and a visual indication of the error index within the pattern. 

```java
public class ExceptionDemo {
   public static void main(String[] args) {
      String text = "The Lord of the Rings is an epic[1] high-fantasy novel " +
              "written by English author and scholar J. R. R. Tolkien.";

      try {
         Pattern pattern = Pattern.compile("[][aeiou]");
         Matcher matcher = pattern.matcher(text);

         while (matcher.find())
            System.out.println(matcher.group());
         
      } catch (PatternSyntaxException patternException) {
         System.out.println(patternException.getPattern() + " is invalid!");
         patternException.printStackTrace();
      }
   }
}
```

```output
[][aeiou] is invalid!
java.util.regex.PatternSyntaxException: Unclosed character class near index 8
[][aeiou]
        ^
	at java.base/java.util.regex.Pattern.error(Pattern.java:2027)
	at java.base/java.util.regex.Pattern.clazz(Pattern.java:2696)
	at java.base/java.util.regex.Pattern.sequence(Pattern.java:2138)
	at java.base/java.util.regex.Pattern.expr(Pattern.java:2068)
	at java.base/java.util.regex.Pattern.compile(Pattern.java:1782)
	at java.base/java.util.regex.Pattern.<init>(Pattern.java:1429)
	at java.base/java.util.regex.Pattern.compile(Pattern.java:1069)
	at main.java.regex_api.ExceptionDemo.main(ExceptionDemo.java:14)
```

## Exercises: Write a method that... 

1. Counts occurrences of the word "word" within a text. 
    - It should match `"word"` but not `"words"` or `"aword"`.
2. Transforms every lowercase 1-letter word into uppercase:  
    - `"a dog"` should become `"A dog"`.
3. Returns all uppercase consonants from a text:  
    - `"My name is Tiago Prince Sales. I'm 31 years old."` should return `[M,T,P,S]`
4. Trims excessive empty spaces from a text
   - `"My     name    is  Tiago"` should return `"My name is Tiago"`
5. Replaces duplicate words from a text
   - `"My my name name is Tiago Tiago"` should return `"My name is Tiago"`
6. Validates IP address
    - 4 numbers separated by 3 dots
    - Numbers can go from 0 to 255
    - Examples: `172.16.254.1`, `127.0.0.1`
7. Validates a floating point
    - Two integers separated by a comma or a dot
    - Accept integers
    - Accept a - or a + before the number
    - Allow leading and trailing dots/commas
8. Removes HTML tags from a text
    - `"<h1>Hello!</h1>"` should become `"Hello!"`

<!-- ## Solutions

1. `\bword\b`
2. `\b[A-Z]\b`
3. `[B-DF-HJ-NP-TV-Z]`
4. `\s+`
5. `(\b\w+\b)\s+\1`
6. `((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]|[0-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]|[0-9][0-9]|[0-9])`
7. `^[+-]?((\d)|(\d+[.,]?\d+)|([.,]\d+)|(\d+[.,]))$`
8. `<.*?>` -->

## References

Part of the material has been taken from the following sources. The usage of the referenced copyrighted work is in line with fair use since it is for nonprofit educational purposes.

- https://docs.oracle.com/javase/tutorial/essential/regex/intro.html
- http://www.regular-expressions.info/tutorial.html
- http://www.vogella.com/tutorials/JavaRegularExpressions/article.html
- https://www.tutorialspoint.com/java/java_regular_expressions.htm
- http://www.javatpoint.com/java-regex
- http://www.ocpsoft.org/opensource/guide-to-regular-expressions-in-java-part-1/
- http://stackoverflow.com/questions/1788796/what-is-parsing





