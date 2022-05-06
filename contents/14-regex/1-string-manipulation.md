---
slug: /regex/string-manipulation
course: Programming Project 2021/22
module: Regular Expressions
title: String Manipulation
subtitle: null
chapter: 14
section: 1
previous: /testing/right-bicep
next: /regex/writing
---

You were given the HTML string below: 

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
   

How would you extract the list of all title fields?

```ini
[Adult animation, Science fiction, Animated sitcom, Justin Roiland, Dan Harmon, Cartoon Network, Adult Swim, Mad scientist, Rick Sanchez (Rick and Morty), Morty Smith]
```

## String methods

The String class offers a set of methods that we could use:
- `indexOf()`
- `lastIndexOf()`
- `split()`
- `substring()`
- `replace()`

Let us see how these methods work before we try to solve this challenge....

## Finding string segments: `indexOf()`

```java
public class IndexOf {
   public static void main(String[] args) {
      String phrase = "What, so everyone’s supposed to sleep every single night now?" +
            "You realize that nighttime makes up half of all time?";

      int firstIndex = phrase.indexOf("a");
      System.out.println(firstIndex);

      int secondIndex = phrase.indexOf("a", firstIndex + 1);
      System.out.println(secondIndex);

      int indexOfNight = phrase.indexOf("night");
      System.out.println(indexOfNight);

      int indexOfRick = phrase.indexOf("Rick");
      System.out.println(indexOfRick);
   }
}
```

```output
2
67
51
-1
```

## Finding string segments: `lastIndexOf()`

```java
public class LastIndexOf {
   public static void main(String[] args) {
      String phrase = "What, so everyone’s supposed to sleep every single night now?" +
              "You realize that nighttime makes up half of all time?";

      int lastIndex = phrase.lastIndexOf("a");
      System.out.println(lastIndex);

      int secondLastIndex = phrase.lastIndexOf("a", lastIndex - 1);
      System.out.println(secondLastIndex);

      int lastIndexOfNight = phrase.lastIndexOf("night");
      System.out.println(lastIndexOfNight);

      int lastIndexOfRick = phrase.lastIndexOf("Rick");
      System.out.println(lastIndexOfRick);
   }
}
```

```output
105
98
78
-1
```

## Breaking up strings: `split()`

```java
public class Split {

   public static void main(String[] args) {
      String phrase = "What, so everyone’s supposed to sleep every single night now?" +
              "You realize that nighttime makes up half of all time?";

      String[] words = phrase.split(" ");
      for (String word : words)
         System.out.println(word);

   }

}
```

## Extracting string segments: `substring()`

```java
public class Substring {

   public static void main(String[] args) {
      String phrase = "What, so everyone’s supposed to sleep every single night now? " +
              "You realize that nighttime makes up half of all time?";

      String phraseSegment = phrase.substring(20);
      System.out.println(phraseSegment);

      String middleSegment = phrase.substring(20, 32);
      System.out.println(middleSegment);
   }

}
```

```output
supposed to sleep every single night now? You realize that nighttime makes up half of all time?
supposed to 
```

## Replacing string segments: `replace()`

```java
public class Replace {

   public static void main(String[] args) {
      String phrase = "What, so everyone’s supposed to sleep every single night now? " +
              "You realize that nighttime makes up half of all time?";

      String modifiedPhrase = phrase.replace("night", "day");
      System.out.println(modifiedPhrase);
   }

}
```

```output
What, so everyone’s supposed to sleep every single day now? 
You realize that daytime makes up half of all time?
```

## Challenge

Now that we have seen how these methods work, let us try to solve this challenge.

## Solution

Here is a possible solution to our challenge:

```java
public static List<String> getTitles(String html){
    String prefix = "title=\"";
    int prefixLength = prefix.length();
    int fromIndex = 0;

    List<String> titles = new ArrayList<>();

    while (true) {
      int prefixStartIndex = html.indexOf(prefix, fromIndex);

      if(prefixStartIndex==-1)
          break;

      int titleStartIndex = prefixStartIndex + prefixLength;
      int titleEndIndex = html.indexOf("\"", titleStartIndex);

      String title = html.substring(titleStartIndex, titleEndIndex);
      titles.add(title);

      fromIndex = titleEndIndex + 1;
    }

    return titles;
}
```

```java
public static void main(String[] args) {
   String html = "<p>\n" +
            "    <i><b>Rick and Morty</b></i>\n" +
            "    is an American\n" +
            "    <a href=\"/wiki/Adult_animation\" title=\"Adult animation\">adult animated</a>\n" +
            "    <a href=\"/wiki/Science_fiction\" title=\"Science fiction\">science fiction</a>\n" +
            "    <a href=\"/wiki/Animated_sitcom\" title=\"Animated sitcom\">sitcom</a> created by\n" +
            "    <a href=\"/wiki/Justin_Roiland\" title=\"Justin Roiland\">Justin Roiland</a> and\n" +
            "    <a href=\"/wiki/Dan_Harmon\" title=\"Dan Harmon\">Dan Harmon</a> for\n" +
            "    <a href=\"/wiki/Cartoon_Network\" title=\"Cartoon Network\">Cartoon Network</a>'s late-night programming block\n" +
            "    <a href=\"/wiki/Adult_Swim\" title=\"Adult Swim\">Adult Swim</a>.\n" +
            "    The series follows the misadventures of cynical\n" +
            "    <a href=\"/wiki/Mad_scientist\" title=\"Mad scientist\">mad scientist</a>\n" +
            "    <a href=\"/wiki/Rick_Sanchez_(Rick_and_Morty)\" title=\"Rick Sanchez (Rick and Morty)\">Rick Sanchez</a>\n" +
            "    and his good-hearted but fretful grandson\n" +
            "    <a href=\"/wiki/Morty_Smith\" title=\"Morty Smith\">Morty Smith</a>,\n" +
            "    who split their time between domestic life and interdimensional adventures.\n" +
            "</p>";

   List<String> titles = getTitles(html);
   System.out.println(titles);
}
```

```output
[Adult animation, Science fiction, Animated sitcom, Justin Roiland, Dan Harmon, Cartoon Network, Adult Swim, Mad scientist, Rick Sanchez (Rick and Morty), Morty Smith]
```

## Finding substrings

This is not a very elegant solution, don't you think?

Searching and replacing substrings the way we just did is clumsy and error-prone. I bet you can quickly come up with a test case that would break the method we just wrote!

Wouldn't it be nice if we could issue in Java a command such as:

**Find any sequence of characters following a certain prefix (title=") and terminated by a certain suffix (")**

Luckily, we can do that using regular expressions.

