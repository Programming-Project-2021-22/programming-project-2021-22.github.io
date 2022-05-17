---
slug: /regex/regex-string
course: Programming Project 2021/22
module: Regular Expressions
title: Using Regular Expressions in String Methods
subtitle: null
chapter: 14
section: 3
previous: /regex/writing
next: /regex/api
---


## Backslashes with RegExp & Java

The backslash `\` is an escape character in Java Strings. 

You have to use double backslash `\\` in a String to define a single backslash. 

If you want to define `\w`, then you must be using `"\\w"` in your regex. 

If you want to use backslash as a literal, you have to type `\\\\` as `\` is also an escape character in regular expressions.          

## Using regular expressions with String methods

Strings have four built-in methods for regular expressions:
- `matches()`
- `split()`
- `replaceFirst()`
- `replaceAll()`

The `replace()` method we have seen before **does NOT support regular expressions**

Remember that these methods are not optimized for performance (more on this in the next class)

## Using regular expressions with String methods

`s.matches(regex)`: 
  - Evaluates if `regex` matches `s`. 
  - Returns only true if the WHOLE string can be matched
`s.split(regex)`: 
  - Creates an array with substrings of `s` divided at occurrences of `regex`
`s.replaceFirst(regex, replacement)`: 
  - Replaces the first occurrence of `regex` with `replacement`
`s.replaceAll(regex replacement)`: 
  - Replaces all occurrences of `regex` with `replacement`

## Matching string segments

The `matches()` method checks if the entire string matches the regex:

   ```java
   public class RegexMatch {
    public static void main(String[] args) {
        String phrase = "What, so everyone’s supposed to sleep every single night now? " +
                "You realize that nighttime makes up half of all time?";

        // Does the phrase contain the same two letters in a row?
        boolean matched = phrase.matches(".*(\\w)\\1.*");
        System.out.println("Matched /.*(\\w)\\1.*/: " + matched);

        // Does the phrase equal "night"?
        matched = phrase.matches("night");
        System.out.println("Matched /night/: " + matched);

        // Does the phrase contain the word "night"?
        matched = phrase.matches(".*night.*");
        System.out.println("Matched /.*night.*/: " + matched);
    }
  }
   ```

   ```output
   Matched /.*(.)\1.*/: true
   Matched /night/: false
   Matched /.*night.*/: true
   ```

## Splitting strings using regular expressions

The code below splits the phrase by empty spaces (remember that `\s` is equivalent  to `[\r\n\t\f\v ]`)

```java
public class RegexSplit {

   public static void main(String[] args) {
      String phrase = "What,\tso everyone’s supposed to sleep every single night now?\n" +
              "You realize that nighttime makes up half of all time?";

      String[] words = phrase.split("\\s");
      for (String word : words)
         System.out.println(word);

   }

}
```

```output
What,
so
everyone’s
supposed
to
sleep
every
single
night
now?
You
realize
that
nighttime
makes
up
half
of
all
time?
```

## Replacing string segments using regular expressions

```java
public class RegexReplace {
   
   public static void main(String[] args) {
      String phrase = "What, so everyone’s supposed to sleep every single night now? " +
				"You realize that nighttime makes up half of all time?";
		
		String replacedFirst = phrase.replaceFirst("\\b\\w{3}\\b", "333");
		System.out.println(replacedFirst);

		String replacedAll = phrase.replaceAll("\\b\\w{3}\\b", "333");
		System.out.println(replacedAll);

		String noPunctuation = phrase.replaceAll("[\\.,'’!?\\-]", "");
		System.out.println(noPunctuation);
	}

}
```

```output
What, so everyone’s supposed to sleep every single night 333? You realize that nighttime makes up half of all time?
What, so everyone’s supposed to sleep every single night 333? 333 realize that nighttime makes up half of 333 time?
What so everyones supposed to sleep every single night now You realize that nighttime makes up half of all time
```

## Grouping and back reference

You can group parts of your regular expression by using parenthesis: `()`

This allows you to assign a repetition operator to a complete group:

   ```output
   (abc){3} 
   ```

The regex above matches `abcabcabc`

Groups create a **back reference** to part of the regular expression

A back reference stores the part of the String which matched the group

It allows you to use this part in the **replacement**

Via the dollar sign `$` you can refer to a group. 

$1 is the first group, $2 the second, etc.


## Replacing string segments using back references

```java
public class RegexReplaceGroup {

   public static void main(String[] args) {
      String s = "The windows are open. The apples are green.";
      String s2 = s.replaceAll("(\\w+)s\\s+are", "$1 is");
      System.out.println(s2);
   }

}
```

```output
The window is open. The apple is green.
```

## Grouping and back reference

You can refer to a group in a regex itself

The regex below matches repeated letters:
   
   `([a-z])\1`

If ran against string `"My email address is tiago.princesales@unibz.it"`, the regex matches:

   - `dd`
   - `ss`

## Exercise 1

1. Write a program that transforms a comma-separated-value string into a semi-colon-separated-value string. Given the following input:  

    ```output
    id,name,grade
    1,Rick,30
    2,Morty,18
    3,Summer,24
    ```

    It should produce the following output:
      
    ```output
    id;name;grade
    1;Rick;30
    2;Morty;18
    3;Summer;24
    ```
<!-- 
## Solution

```java
public class CsvTransformer {

   public static void main(String[] args) {

      String csv = "id,name,grade\n" +
                   "1,Rick,30\n" +
                   "2,Morty,18\n" +
                   "3,Summer,24";

      String result = csv.replaceAll(",", ";");
      System.out.println(result);

   }
}
```

```output
id;name;grade
1;Rick;30
2;Morty;18
3;Summer;24
``` -->

2. Now, your output should have quotes for each value between semi-colons  

    ```output
    "id";"name";"grade"
    "1;"Rick";"30"
    "2";"Morty";"18"
    "3";"Summer";"24"
    ```


<!-- ## Solution

```java
public class CsvTransformer {

   public static void main(String[] args) {

      String csv = "id,name,grade\n" +
                   "1,Rick,30\n" +
                   "2,Morty,18\n" +
                   "3,Summer,24";

      String semiColonCsv = csv.replaceAll(",", ";");
      System.out.println(semiColonCsv + "\n");

      String quotedCsv = semiColonCsv.replaceAll("(\\w+)","\"$1\"");
      System.out.println(quotedCsv);

   }
}
```

```output
id;name;grade
1;Rick;30
2;Morty;18
3;Summer;24

"id";"name";"grade"
"1";"Rick";"30"
"2";"Morty";"18"
"3";"Summer";"24"
``` -->

## Exercise 2

Using regular expressions, remove all tags from the HTML string below:

```html
<p>
  <i><b>Rick and Morty</b></i>
  is an American
  <a href="/wiki/Adult_animation" title="Adult animation">adult animated</a>
  <a href="/wiki/Science_fiction" title="Science fiction">science fiction</a>
  <a href="/wiki/Animated_sitcom" title="Animated sitcom">sitcom</a> created by
  <a href="/wiki/Justin_Roiland" title="Justin Roiland">Justin Roiland</a> and
  <a href="/wiki/Dan_Harmon" title="Dan Harmon">Dan Harmon</a> for
  <a href="/wiki/Cartoon_Network" title="Cartoon Network">Cartoon Network</a>'s late-night programming block
  <a href="/wiki/Adult_Swim" title="Adult Swim">Adult Swim</a>.
  The series follows the misadventures of cynical
  <a href="/wiki/Mad_scientist" title="Mad scientist">mad scientist</a>
  <a href="/wiki/Rick_Sanchez_(Rick_and_Morty)" title="Rick Sanchez (Rick and Morty)">Rick Sanchez</a>
  and his good-hearted but fretful grandson
  <a href="/wiki/Morty_Smith" title="Morty Smith">Morty Smith</a>,
  who split their time between domestic life and interdimensional adventures.
</p>
```
<!-- 
## Solution

```java
public class HTMLSanitize {
   public static void main(String[] args) {
      String html = "<p>\n" +
              "<i><b>Rick and Morty</b></i>\n" +
              "is an American\n" +
              "<a href=\"/wiki/Adult_animation\" title=\"Adult animation\">adult animated</a>\n" +
              "<a href=\"/wiki/Science_fiction\" title=\"Science fiction\">science fiction</a>\n" +
              "<a href=\"/wiki/Animated_sitcom\" title=\"Animated sitcom\">sitcom</a> created by\n" +
              "<a href=\"/wiki/Justin_Roiland\" title=\"Justin Roiland\">Justin Roiland</a> and\n" +
              "<a href=\"/wiki/Dan_Harmon\" title=\"Dan Harmon\">Dan Harmon</a> for\n" +
              "<a href=\"/wiki/Cartoon_Network\" title=\"Cartoon Network\">Cartoon Network</a>'s late-night programming block\n" +
              "<a href=\"/wiki/Adult_Swim\" title=\"Adult Swim\">Adult Swim</a>.\n" +
              "The series follows the misadventures of cynical\n" +
              "<a href=\"/wiki/Mad_scientist\" title=\"Mad scientist\">mad scientist</a>\n" +
              "<a href=\"/wiki/Rick_Sanchez_(Rick_and_Morty)\" title=\"Rick Sanchez (Rick and Morty)\">Rick Sanchez</a>\n" +
              "and his good-hearted but fretful grandson\n" +
              "<a href=\"/wiki/Morty_Smith\" title=\"Morty Smith\">Morty Smith</a>,\n" +
              "who split their time between domestic life and interdimensional adventures.\n" +
              "</p>";

      String noTags = html.replaceAll("<.+?>", "");
      String noLineBreaks = noTags.replaceAll("([^\\.])\n", "$1 ");
      System.out.println(noLineBreaks);
   }
}
```

```output
Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon 
for Cartoon Network's late-night programming block Adult Swim.
The series follows the misadventures of cynical mad scientist Rick Sanchez and his good-hearted but fretful 
grandson Morty Smith, who split their time between domestic life and interdimensional adventures.
``` -->

## Let's practice writing regular expressions?

Here are some games that can help you practice regular expressions:

- [RegexPlay](http://play.inginf.units.it)
- [Regex Crossword](https://regexcrossword.com/)
- [Regex Golf](https://alf.nu/RegexGolf)
- [Regex One](https://regexone.com/)

## References

Part of the material has been taken from the following sources. The usage of the referenced copyrighted work is in line with fair use since it is for nonprofit educational purposes.

- https://docs.oracle.com/javase/tutorial/essential/regex/intro.html
- http://www.regular-expressions.info/tutorial.html
- http://www.vogella.com/tutorials/JavaRegularExpressions/article.html
- https://www.tutorialspoint.com/java/java_regular_expressions.htm
- http://www.javatpoint.com/java-regex
- http://www.ocpsoft.org/opensource/guide-to-regular-expressions-in-java-part-1/
- http://stackoverflow.com/questions/1788796/what-is-parsing




