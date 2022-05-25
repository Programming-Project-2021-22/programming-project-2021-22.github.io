---
slug: /io/file-manipulation
course: Programming Project 2021/22
module: I/O
title: File manipulation
subtitle: null
chapter: 16
section: 1
previous: /design-patterns/gof
next: /io/streams
---

Apps often interact with a file system and need to:
- create files and directories,
- rename files and directories, 
- delete files and directories
- checks if a file or a directory exists, 
- alter some of their properties. 

These operations can be performed using:
- [`java.io.File`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/File.html)
- [`java.nio.Path`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Path.html) and [`java.nio.Files`](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/file/Files.html)


##  The `File` and `Path` objects

A ``File`` or a `Path` object:
- **is NOT the actual file or directory** 
- holds information about a file or a directory
- does not contain the data that the file holds
- holds methods that affect a particular file or directory
- works as an interface between a program and the OS functions that do the actual file manipulation

Different operating systems organize their file system in different ways. By using `File` objects, Java programs can uniformly handle files on all operating systems.

Your program can invoke a `File` method, and exactly what needs to be done for the particular OS the program is running on will be done.

##  Constructing objects

Creating a `File` object:

  ```java 
  File file = new File("src/main/resources/names.txt");
  ```

Creating a `Path` object:

  ```java
  Path path1 = Path.of("src/main/resources/names.txt");
  Path path2 =  Path path2 = Path.of("src", "main", "resources", "names.txt");
  Path path3 = Path.of("src", "main", "resources").resolve("names.txt");
  ```

## Paths

A path specifies a unique location in a file system. 

A path points to a file system location by following the directory tree hierarchy expressed in a string of characters in which path components, separated by a delimiting character, represent each directory. 

The delimiting character is most commonly the slash (`/`), the backslash character (`\`), or colon (`:`), though some operating systems may use a different delimiter. 

`/Applications/Visual Paradigm/Contents/Resources/app`
  - the root directory symbol: `/`
  - directory names: `Applications`, `Visual Paradigm`, `Contents`, `Resources`
  - separator: `/`, 
  - the file or directory name: `app`.

`C:\Program Files\Visual Paradigm CE 16.1`
  - the path with drive specifier: `C:`:
  - the root directory symbol: `\`, 
  - directory names: `Program`, 
  - separator character `\`, 
  - file name `x.dat` (although x.dat might refer to a directory). 
  
##  Path types

**Absolute** path:
  - Consists of a complete chain of directories from the root directory to the file
  - Starts at the root directory (`/`)
  - No other information is required to locate the file/directory that it denotes

**Relative** path:
  - Starts with any directory in the chain and continues to the file
  - Does not start with the root directory symbol; 
  - It’s interpreted via information taken from another path (e.g. the current directory)

**Canonical** path:
  - An absolute path
  - Simplest possible (does not contain `.` or `..`)
  - Unique for a given file or directory

## Manipulating paths

Given a path represented as a `String`, we can use `File` and `Path` to perform some interesting operations, such as:
- Generating the absolute version of the path
- Generating the canonical version of the path
- Verifying if it an absolute path

```java
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;

public class PathInfo {

  public static void main(final String[] args) throws IOException {
    String pathname = "src/main/../main/resources/names.txt";

    File file = new File(pathname);
    System.out.println("Absolute path = " + file.getAbsolutePath());
    System.out.println("Canonical path = " + file.getCanonicalPath());
    System.out.println("File name = " + file.getName());
    System.out.println("Parent directory = " + file.getParent());
    System.out.println("Is absolute = " + file.isAbsolute());
    System.out.println();

    Path path = Path.of(pathname);
    System.out.println("Absolute path = " + path.toAbsolutePath());
    System.out.println("Canonical path = " + path.toRealPath());
    System.out.println("File name = " + path.getFileName());
    System.out.println("Parent directory = " + path.getParent());
    System.out.println("Is absolute = " + path.isAbsolute());
  }
}
```

```output
Absolute path = /Users/tpsales/Repositories/lecture-io/src/main/../main/resources/names.txt
Canonical path = /Users/tpsales/Repositories/lecture-io/src/main/resources/names.txt
File name = names.txt
Parent directory = src/main/../main/resources
Is absolute = false

Absolute path = /Users/tpsales/Repositories/lecture-io/src/main/../main/resources/names.txt
Canonical path = /Users/tpsales/Repositories/lecture-io/src/main/resources/names.txt
File name = names.txt
Parent directory = src/main/../main/resources
Is absolute = false
```

## Special paths

Let us now check what output we get if we set the following paths:
- `.` (the current working dir)
- `""` (the empty path)
- `/Users/tpsales/` (an absolute path)

```java
public class SpecialPaths {

  public static void main(final String[] args) throws IOException {
    printPathInfo( ".");
    printPathInfo( "");
    printPathInfo( "src/..");
  }

  private static void printPathInfo(String pathname) throws IOException {
    Path path = Path.of(pathname);
    System.out.println("Path = " + path);
    System.out.println("Absolute path = " + path.toAbsolutePath());
    System.out.println("Canonical path = " + path.toRealPath());
    System.out.println("File name = " + path.getFileName());
    System.out.println("Parent directory = " + path.getParent());
    System.out.println("Is absolute = " + path.isAbsolute());
    System.out.println("---\n");
  }
}
```

```output
Path = .
Absolute path = /Users/tpsales/Repositories/lecture-io/.
Canonical path = /Users/tpsales/Repositories/lecture-io
File name = .
Parent directory = null
Is absolute = false
---

Path = 
Absolute path = /Users/tpsales/Repositories/lecture-io
Canonical path = /Users/tpsales/Repositories/lecture-io
File name = 
Parent directory = null
Is absolute = false
---

Path = src/..
Absolute path = /Users/tpsales/Repositories/lecture-io/src/..
Canonical path = /Users/tpsales/Repositories/lecture-io
File name = ..
Parent directory = src
Is absolute = false
---
```

## Checking if a file exists

Given a path, we can check if it exists:

```java
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileExists {
  public static void main(String[] args) {
    String pathname = "src/main/resources/names.txt";

    File file = new File(pathname);
    System.out.printf("File '%s' exists? %b%n", file, file.exists());

    Path path = Path.of(pathname);
    System.out.printf("File '%s' exists? %b%n", path, Files.exists(path));
  }
}
```

```java
File 'src/main/resources/names.txt' exists? true
File 'src/main/resources/names.txt' exists? true
```

## Getting metadata about a file/directory

When manipulating a file as a whole, we may need to get its metadata.

In the class below, we will see a number of methods we can use for that:

```java
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;

public class FileDirectoryInfo {
  public static void main(final String[] args) throws IOException {
    File file = new File("src/main/resources/names.txt");
    System.out.println("About `" + file + "` :");
    System.out.println("Exists = " + file.exists());
    System.out.println("Is directory = " + file.isDirectory());
    System.out.println("Is file = " + file.isFile());
    System.out.println("Is hidden = " + file.isHidden());
    System.out.println("Is readable = " + file.canRead());
    System.out.println("Is writable = " + file.canWrite());
    System.out.println("Is executable = " + file.canExecute());
    System.out.println("Last modified = " + new Date(file.lastModified()));
    System.out.println("Length = " + file.length() + " bytes\n");

    Path path = Path.of("src/main/resources");
    System.out.println("About `" + path + "` :");
    System.out.println("Exists = " + Files.exists(path));
    System.out.println("Is directory = " + Files.isDirectory(path));
    System.out.println("Is file = " + Files.isRegularFile(path));
    System.out.println("Is hidden = " + Files.isHidden(path));
    System.out.println("Is readable = " + Files.isReadable(path));
    System.out.println("Is writable = " + Files.isWritable(path));
    System.out.println("Is executable = " + Files.isExecutable(path));
    System.out.println("Last modified = " + Files.getLastModifiedTime(path));
    System.out.println("Length = " + Files.size(path) + " bytes");
  }
}
```

```output
About `src/main/resources/names.txt` :
Exists = true
Is directory = false
Is file = true
Is hidden = false
Is readable = true
Is writable = true
Is executable = false
Last modified = Mon May 17 09:38:12 CEST 2021
Length = 61 bytes

About `src/main/resources` :
Exists = true
Is directory = true
Is file = false
Is hidden = false
Is readable = true
Is writable = true
Is executable = true
Last modified = 2022-05-16T15:37:34.758609564Z
Length = 480 bytes
```

## Listing directory contents: `java.io`

Using the `java.io` package, we can list the contents of a directory with the following code: 

```java
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Stream;

public class DirectoryContentsIo {
  public static void main(final String[] args) throws IOException {
    String dir = "src/main/java/file_manipulation";
    String extension = "java";

    File file = new File(dir);

    System.out.println("Listing files in directory: " + file.getCanonicalPath());
    System.out.println("Filtering files with extension: " + extension);

    FilenameFilter fnf = (File _dir, String name) -> name.endsWith(extension);
    File[] files = file.listFiles(fnf);

    Stream.ofNullable(files)
          .flatMap(Arrays::stream)
          .forEach(System.out::println);
  }
}
```

```output
Listing files in directory: /Users/tpsales/Repositories/lecture-io/src/main/java/file_manipulation
Filtering files with extension: java
src/main/java/file_manipulation/FileExists.java
src/main/java/file_manipulation/DeleteIo.java
src/main/java/file_manipulation/CreateFileDirNio.java
src/main/java/file_manipulation/CreateFileDirIo.java
src/main/java/file_manipulation/DeleteNio.java
src/main/java/file_manipulation/RenameMoveNio.java
src/main/java/file_manipulation/PathInfo.java
src/main/java/file_manipulation/RenameMoveIo.java
src/main/java/file_manipulation/DirectoryContentsNio.java
src/main/java/file_manipulation/FileDirectoryInfo.java
src/main/java/file_manipulation/PartitionSpace.java
src/main/java/file_manipulation/SpecialPaths.java
src/main/java/file_manipulation/DirectoryContentsIo.java
src/main/java/file_manipulation/Constructors.java
```
## Listing directory contents: `java.nio`

Alternatively, we can use classes from the `java.nio` package:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class DirectoryContentsPath {
  public static void main(final String[] args) throws IOException {
    String dir = "src/main/java/file_manipulation";
    String extension = ".java";

    Path path = Path.of(dir);

    System.out.println("Listing files in directory: " + path.toRealPath());
    System.out.println("Filtering files with extension: " + extension);

    Files.list(path)
            .filter(Files::isRegularFile)
            .filter(content -> content.toString().toLowerCase().endsWith(extension))
            .forEach(System.out::println);
  }
}
```

## Creating files and directories: `java.io`

We can create files and directories programmatically:

```java
import java.io.*;

public class CreateFileDirIo {
  public static void main(String[] args) {
    try {
      File folder = new File("io_resources");
      folder.mkdir();

      File subfolder = new File("io_resources/sub1/sub2");
      subfolder.mkdirs();

      File file = new File("io_resources/hello.txt");
      file.createNewFile();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

## Creating files and directories: `java.nio`

With the `java.nio`, the code would look like this:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class CreateFileDirNio {
  public static void main(String[] args) {
    try {
      Path folder = Path.of("nio_resources");
      Files.createDirectory(folder);

      Path subfolder = Path.of("nio_resources/sub1/sub2");
      Files.createDirectories(subfolder);

      Path file = Path.of("nio_resources/hello.txt");
      Files.createFile(file);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

## Renaming and moving files: `java.io`

The code below renames and moves some files:

```java
import java.io.*;

public class RenameMoveIo {
  public static void main(String[] args) {
    try {
      File file = new File("io_resources/hello.txt");
      PrintWriter writer = new PrintWriter(file);
      writer.print("Hello students!");
      writer.close();

      File renamedFile = new File("io_resources/hello2.txt");
      file.renameTo(renamedFile);

      File movedFile = new File("io_resources/sub1/sub2/hello2.txt");
      renamedFile.renameTo(movedFile);

      File copiedFile = new File("io_resources/sub1/sub2/copied.txt");
      BufferedReader reader = new BufferedReader(new FileReader(movedFile));
      BufferedWriter writer2 = new BufferedWriter(new FileWriter(copiedFile));
      int value;
      while(reader.ready()){
        value = reader.read();
        writer2.write(value);
      }
      reader.close();
      writer2.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

## Renaming and moving files: `java.nio`

The code below performs equivalent operations with classes from the `java.nio` package:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class RenameMoveNio {
  public static void main(String[] args) {
    try {
      Path file = Path.of("nio_resources/hello.txt");
      Files.writeString(file, "Hello students!");

      Path renamedFile = Path.of("nio_resources/hello2.txt");
      Files.move(file, renamedFile);

      Path movedFile = Path.of("nio_resources/sub1/sub2/hello2.txt");
      Files.move(renamedFile, movedFile);

      Path copiedFile = Path.of("nio_resources/sub1/sub2/copied.txt");
      Files.copy(movedFile, copiedFile);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

## Deleting files and directories: `java.io`

We may also need to delete files and folders:

```java
import java.io.File;

public class DeleteIo {

  public static void main(String[] args) {
    File copiedFile = new File("io_resources/sub1/sub2/copied.txt");
    copiedFile.delete();

    // File::delete only deletes empty directories
    File folder = new File("io_resources");
    folder.delete();
  }
}
```

## Deleting files and directories: `java.nio`

The code below performs equivalent operations with classes from the `java.nio` package:

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class DeleteNio {

  public static void main(String[] args) {
    try {
      Path copiedFile = Path.of("nio_resources/sub1/sub2/copied.txt");
      Files.delete(copiedFile);

      // Files.delete() only deletes empty directories
      Path folder = Path.of("nio_resources");
      Files.delete(folder);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```