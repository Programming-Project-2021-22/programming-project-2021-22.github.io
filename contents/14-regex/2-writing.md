---
slug: /regex/writing
course: Programming Project 2021/22
module: Regular Expressions
title: Writing Regular Expressions
subtitle: null
chapter: 14
section: 2
previous: /regex/string-manipulation
next: /regex/regex-string
---

A regular expression (aka regex) defines a search pattern to be applied to strings.

A search pattern can be anything from :
- a simple character
- a fixed string 
- a complex expression containing special characters describing the pattern

A pattern defined by the regex may match: 
- one
- several times
- not at all

Regular expressions can be used to:
- Search text
- Edit text
- Manipulate text

The pattern defined by the regex is applied on the text from left to right [[Vogella](http://www.vogella.com/tutorials/JavaRegularExpressions/article.html)].

## Online tools

- https://regex101.com/
- https://regexr.com/
- https://www.regextester.com/

 
## Regex examples

Here are some regex examples:

| Regex  | Matches  |
|-------------|-----------------------------------------------|
| `this is text`  |  Matches exactly "this is text"  |
| ```this\s+is\s+text`  |  Matches the word "this" followed by **one or more (`+`) whitespace characters (`\s`)** followed by the word "is" followed by one or more whitespace characters followed by the word "text". |
|  `^\d+(\.\d+)?` |  `^` defines that the pattern **must start at beginning of a new line**. `\d+` matches **one or more digits**. The ? makes the statement in brackets **optional (i.e. zero or more times**. `\.` matches ".", parentheses are used for **grouping**. Matches for example "5", "1.5" and "2.21". |


## Common matching symbols

| Regular Expression | Description                                                          |
|-------------------------------|-----------------------------------------------------------|
| `.`                  | Matches any character                                              |
| `^regex`             | Finds regex that must match at the beginning of the line.          |
| `regex$`             | Finds regex that must match at the end of the line.                |
| `[abc]`              | Set definition, can match the letter a or b or c.                  |
| `[abc][vz]`          | Set definition, can match a or b or c followed by either v or z.   |
| `[^abc]`             | When a caret appears as the first character inside square brackets, it negates the pattern. This pattern matches any character except a or b or c. |
| `[a-d1-7]`           | Ranges: matches a letter between a and d and digits from 1 to 7, but not d1. |
| `X\|Z`               | Finds X or Z.                                                      |
| `XZ`                 | Finds X directly followed by Z.                                    |
| `$`                  | Checks if a line end follows.                                      |



## Meta characters

The following meta characters have a pre-defined meaning and make certain common patterns easier to use, e.g., \d instead of [0-9].

| Regular Expression | Description                                                    |
|--------------------|----------------------------------------------------------------|
| `\d`                 | Any digit, short for `[0-9]`                                     |
| `\D`                 | A non-digit, short for `[^0-9]`                                  |
| `\s`                 | A whitespace character, short for `[ \t\n\x0b\r\f]`              |
| `\S`                 | A non-whitespace character, short for `[^\t\n\x0b\r\f]`        |
| `\w`                 | A word character, short for `[a-zA-Z_0-9]`                       |
| `\W`                 | A non-word character `[^\w]`                                     |
| `\S+`                | Several non-whitespace characters                              |
| `\b`                 | **Asserts** a word boundary where a word character is `[a-zA-Z0-9_]` |

Meta characters have the same first letter as their representation, e.g., digit, space, word, and boundary

Uppercase symbols define the opposite.

## Quantifier

A quantifier defines how often an element can occur. 

| RegExp | Description            | Examples                      |
|-----------|---------------------------------------------------------|------------------------------------------|
| `{X}`  | Occurs X number of times, `{}`   | `\d{3}` searches for three digits, `.{10}`  for any character sequence of length 10. |
| `{X,Y}`   | Occurs between X and Y times,      | `\d{1,4}` means `\d` must occur at least once and max four times.   |
| `*` | Occurs zero or more times, is short for `{0,}`| `X*`  finds no or several letter X,  `.*` finds any character sequence        |
| `+`   | Occurs one or more times, is short for `{1,}`| `X+`  Finds one or several letter X                                               |
| `?`    | Occurs no or one times, `?`  is short for `{0,1}`       | ` X?`  finds no or exactly one letter X       |
| `*?`  | `?` after a quantifier makes it a **lazy/reluctant quantifier**. It tries to find the smallest match. This makes the regular expression stop at the first match. |    


## Exercise

1. Open https://regex101.com/ in your browser.
2. Set `My email address is tiago.princesales@unibz.it` as the text to be searched
3. Write a regex that matches each occurrence of the letter `"a"`
4. Write a regex that matches each occurrence of the letter `"d"`
5. Write a regex that matches each occurrence of the double letters `"dd"`
6. Write a regex that matches each occurrence of an `"i"` followed by either an `"s"` or a `"t"`
7. Write a regex that matches any word followed by a period.
8. Write a regex that matches only the email address in the string





