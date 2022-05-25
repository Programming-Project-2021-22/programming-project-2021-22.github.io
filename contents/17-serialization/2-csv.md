---
slug: /serialization/csv
course: Programming Project 2021/22
module: Serialization
title: CSV
subtitle: null
chapter: 17
section: 2
previous: /serialization/introduction
next: /serialization/json
---


[**Comma-separated values**](https://en.wikipedia.org/wiki/Comma-separated_values) (CSV) is a serialization format that has been used for exchanging and converting data between various spreadsheet programs for quite some time.
  
It can be described quite succinctly:
- Each line is a record
- Each record consists of one or more fields
- Fields are separated by commas (hence the name)

**Other separators** are also used in practice: 
- semicolon
- tab
- space

## Example

This is what CSV data looks like:

```csv
id,R,G,B,color
1,105,30,255,blue
2,255,183,17,orange
3,255,53,221,violet
4,244,254,100,yellow
5,251,255,48,yellow
6,158,255,155,green
7,255,106,108,red
8,159,150,255,blue
9,71,228,109,green
10,255,45,178,violet
11,120,255,30,green
12,214,50,250,violet
13,255,176,40,orange
14,255,79,79,red
15,255,162,22,orange
16,255,247,114,yellow
17,61,180,254,blue
18,255,97,12,red
```

## IETF RFC 4180

CSV has never been officially standardized:
- What to do if the field contains commas?
- Or line breaks?

Back in 2005, a request for comment (RFC) was published by the [Internet Engineering Task Force](https://www.ietf.org/)

[RFC 4180](https://tools.ietf.org/html/rfc4180):
- Proposes a specification for the CSV format
- It is often what people assume as the CSV's definition

RFC 4180 is **not a standard**:
> This memo provides information for the Internet community.  It does not specify an Internet standard of any kind.  Distribution of this memo is unlimited.

## CSV Specification

1. Each record is located on a separate line, delimited by a line break (CRLF). 
  
    For example:

    ```output
    aaa,bbb,ccc CRLF
    zzz,yyy,xxx CRLF
    ```
    

2. The last record in the file may or may not have an ending line break. 

    For example:

    ```output
    aaa,bbb,ccc CRLF
    zzz,yyy,xxx
    ```
    

3. There may be an optional header line appearing as the first line of the file with the same format as normal record lines. This header will *contain names corresponding to the fields* in the file and *should contain the same number of fields as the records* in the rest of the file  
    
    For example:

    ```output
    field_name,field_name,field_name CRLF
    aaa,bbb,ccc CRLF
    zzz,yyy,xxx CRLF
    ```

4. Within the header and each record, there may be one or more fields, separated by commas. Each line should contain the same number of fields throughout the file. Spaces are considered part of a field and should not be ignored. The last field in the record must not be followed by a comma.
        
    For example:

    ```output
    aaa,bbb,ccc
    ```
    

5. Each field may or may not be enclosed in double quotes (however some programs, such as Microsoft Excel, do not use double quotes at all).  If fields are not enclosed with double quotes, then double quotes may not appear inside the fields.
    
    For example:

    ```output
    "aaa","bbb","ccc" CRLF
    zzz,yyy,xxx
    ```

6. Fields containing line breaks (CRLF), double quotes, and commas should be enclosed in double-quotes.

    For example:

    ```output
    "aaa","b CRLF
       bb","ccc" CRLF
    zzz,yyy,xxx
    ```
    

7.  If double-quotes are used to enclose fields, then a double-quote appearing inside a field must be escaped by preceding it with another double quote.

    For example:

    ```output
    "aaa","b""bb","ccc"
    ```


## CSV in the real world

In popular usage, "CSV" is not a single, well-defined format. As a result, in practice, the term "CSV" might refer to any file that:
- is plain text using a character set such as ASCII or UTF-8
- consists of records, typically one per line
- records are divided into fields separated by delimiters 
  - typically a single reserved character such as comma, semicolon, or tab; 
  - sometimes the delimiter may include optional spaces
- every record has the same sequence of fields

Within these general constraints, many variations are in use.

[Source](https://en.wikipedia.org/wiki/Comma-separated_values )

## Example

The tabular data below:

| Year | Make  | Model                                  | Description                      | Price   |
|------|-------|----------------------------------------|----------------------------------|---------|
| 1997 | Ford  | E350                                   | ac, abs, moon                    | 3000.00 |
| 1999 | Chevy | Venture "Extended Edition"             |                                  | 4900.00 |
| 1999 | Chevy | Venture "Extended Edition, Very Large" |                                  | 5000.00 |
| 1996 | Jeep  | Grand Cherokee                         | MUST SELL!air, moon roof, loaded | 4799.00 |

Is represented in CSV as follows:

```csv
Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.00
1999,Chevy,"Venture ""Extended Edition""","",4900.00
1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
1996,Jeep,Grand Cherokee,"MUST SELL!air, moon roof, loaded",4799.00
```

Note how we dealt with: 
- missing values (line 4)
- quotes ```"``` in the values (lines 3 and 4)
- commas within the values (lines 2, 4 and 5)

## Decimal delimiter

- USA/UK CSV:

  ```output
  Year,Make,Model,Length
  1997,Ford,E350,2.34
  2000,Mercury,Cougar,2.38
  ```

- European CSV:

  ```output
  Year;Make;Model;Length
  1997;Ford;E350;2,34
  2000;Mercury;Cougar;2,38
  ```

## Parsing

Parsing is the process of transforming input data (usually text) into a data structure:
- single-variable (int, float, String, etc.)
- tree
- array (List, Map, Set, etc.)

![](../../figures/Parsing_Example.png)

## Parsing CSV files

```java
"1.0.0.0","1.0.0.255","16777216","16777471","AU","Australia"
"1.0.1.0","1.0.3.255","16777472","16778239","CN","China"
"1.0.4.0","1.0.7.255","16778240","16779263","AU","Australia"
"1.0.8.0","1.0.15.255","16779264","16781311","CN","China"
"1.0.16.0","1.0.31.255","16781312","16785407","JP","Japan"
"1.0.32.0","1.0.63.255","16785408","16793599","CN","China"
"1.0.64.0","1.0.127.255","16793600","16809983","JP","Japan"
"1.0.128.0","1.0.255.255","16809984","16842751","TH","Thailand"
```

```java
String csvFile = "./src/test.csv";
String line = "";
String separator = ",";

try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
    while ((line = br.readLine()) != null) {
        // use comma as separator
        String[] token = line.split(separator);

        System.out.println("Country [code= " + token[4] + " , name=" + token[5] + "]");
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

```output
Country [code= "AU" , name="Australia"]
Country [code= "CN" , name="China"]
Country [code= "AU" , name="Australia"]
Country [code= "CN" , name="China"]
Country [code= "JP" , name="Japan"]
Country [code= "CN" , name="China"]
Country [code= "JP" , name="Japan"]
Country [code= "TH" , name="Thailand"]
```

## Exercise 1

In a text editor create a CSV file (`test.csv`) with the data below:

```csv
1,105,30,255,blue
2,255,183,17,orange
3,255,53,221,violet
4,244,254,100,yellow
5,251,255,48,yellow
```

Using the previous example, write a program that, for each line, prints the sum of the values of the first two columns.

<!-- ## Solution

```java
public class Runner {

	public static void main(String[] args) {
		String csvFile = "./test.csv";
		String line = "";
		String separator = ",";

		try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
		    while ((line = br.readLine()) != null) {
		        String[] token = line.split(separator);
		        Integer a = Integer.valueOf(token[1])  ; 
		        Integer b = Integer.valueOf(token[2])  ; 
		        Integer sum  = a+b;
		        System.out.println("Sum= " + sum);
		    }
		} catch (IOException e) {
		    e.printStackTrace();
		}
	}
}

``` -->

## Exercise 2

Write a CSV parser that can handle:
- different separators
- separators within field values
- quotes within field values

Follow the conventions defined in the [RFC 4180](https://tools.ietf.org/html/rfc4180).

<!-- ## Solution

```java
	public static List<String> parseLine(String cvsLine, char separators, char customQuote) {
        List<String> result = new ArrayList<>();
        StringBuffer curVal = new StringBuffer();
        boolean inQuotes = false;
        boolean startCollectChar = false;
        boolean doubleQuotesInColumn = false;

        char[] chars = cvsLine.toCharArray();

        for (char ch : chars) {
            if (inQuotes) {
                startCollectChar = true;
                if (ch == customQuote) {
                    inQuotes = false;
                    doubleQuotesInColumn = false;
                } else {
                    if (ch == '\"') {
                        if (!doubleQuotesInColumn) {
                            curVal.append(ch);
                            doubleQuotesInColumn = true;
                        }
                    } else {
                        curVal.append(ch);
                    }
                }             
            } else {
                if (ch == customQuote) {
                    inQuotes = true;
                    if (chars[0] != '"' && customQuote == '\"') {
                        curVal.append('"');
                    }
                    if (startCollectChar) {
                        curVal.append('"');
                    }
                } else if (ch == separators) {
                    result.add(curVal.toString());
                    curVal = new StringBuffer();
                    startCollectChar = false;
                } else if (ch == '\r') {
                    //ignore LF characters
                    continue;
                } else if (ch == '\n') {
                    //the end, break!
                    break;
                } else {
                    curVal.append(ch);
                }
            }
        }
        result.add(curVal.toString());
        return result;
	}
``` -->


## Java CSV Parsers

You don't have to write your own CSV parser, as there are several available:

- **Apache Commons CSV**: [http://commons.apache.org/proper/commons-csv/user-guide.html](http://commons.apache.org/proper/commons-csv/user-guide.html)
- **opencsv**: [http://opencsv.sourceforge.net/](http://opencsv.sourceforge.net/)
- **Super CSV**: [https://super-csv.github.io/super-csv/](https://super-csv.github.io/super-csv/)
- **Jackson Dataformat CSV**: [https://github.com/FasterXML/jackson-dataformats-text](https://github.com/FasterXML/jackson-dataformats-text)

<!-- - Exercise: 
  - Pick one of the parsers above
  - Create a new Maven project and declare its latest release as a dependency
  - Redo the examples in the previous slides
  - For each example, use the parsers to write similar data to another file -->
