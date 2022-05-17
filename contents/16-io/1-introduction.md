---
slug: /io/
course: Programming Project 2021/22
module: I/O
title: Introduction
subtitle: null
chapter: 16
section: 1
previous: /design-patterns/gof
next: /io/reading-file-reader
---



## File manipulation

Apps often interact with a file system and need to:
- create files and directories,
- rename files and directories, 
- delete files and directories
- checks if a file or a directory exists, 
- alter some of their properties. 

These operations can be performed using:
- **`java.io.File`**;
- **`java.nio.Path`** and **`java.nio.Files`**


##  The `File` and `Path` objects

- A **``File``** or a **`Path`** object:
  - **is NOT the actual file or directory** 
  - holds information about a file or a directory
  - does not contain the data that the file holds
  - holds methods that affect a particular file or directory
  - works as an interface between a program and the OS functions that do the actual file manipulation

- Different operating systems organize their file system in different ways 
- By using File objects, Java programs can uniformly handle files on all operating systems
- Your program can invoke a File method, and exactly what needs to be done for the particular OS the program is running on will be done.

##  Constructing objects

- Creating a `File` object:

  ```java 
  File file = new File("src/main/resources/names.txt");
  ```

- Creating a `Path` object:

  ```java
  Path path1 = Path.of("src/main/resources/names.txt");
  Path path2 =  Path path2 = Path.of("src", "main", "resources", "names.txt");
  Path path3 = Path.of("src", "main", "resources").resolve("names.txt");
  ```

## Paths

- A path specifies a unique location in a file system. 

- A path points to a file system location by following the directory tree hierarchy expressed in a string of characters in which path components, separated by a delimiting character, represent each directory. 

- The delimiting character is most commonly the slash ("/"), the backslash character ("\"), or colon (":"), though some operating systems may use a different delimiter. 

- **`/Applications/Visual Paradigm/Contents/Resources/app`**
  - the root directory symbol: **`/`**
  - directory names: **`Applications`**, **`Visual Paradigm`**, **`Contents`**, **`Resources`**
  - separator: **`/`**, 
  - the file or directory name: **`app`**.

- **`C:\Program Files\Visual Paradigm CE 16.1`**
  - the path with drive specifier: **`C:`**:
  - the root directory symbol: **`\`**, 
  - directory names: **`Program`**, 
  - separator character **`\`**, 
  - file name **`x.dat`** (although x.dat might refer to a directory). 
  
##  Path types

- **Absolute** pathname:
  - Consists of a complete chain of directories from the root directory to the file
  - Starts at the root directory (/)
  - No other information is required to locate the file/directory that it denotes

- **Relative** pathname:
  - Starts with any directory in the chain and continues to the file
  - Does not start with the root directory symbol; 
  - It’s interpreted via information taken from another path (e.g. the current directory)

- **Canonical** pathname:
  - An absolute path
  - Simplest possible (does not contain . or ..)
  - Unique for a given file or directory

## Learning about stored abstract paths

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

## Checking if a file exists

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

## Getting metadata about a file/directory

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

## Listing directory contents: `java.io`

```java
import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;

public class DirectoryContentsFile {
  public static void main(final String[] args) throws IOException {
    String dir = "src/main/java/file_manipulation";
    String extension = "java";

    File file = new File(dir);

    System.out.println("Listing files in directory: " + file.getCanonicalPath());
    System.out.println("Filtering files with extension: " + extension);

    FilenameFilter fnf = (File _dir, String name) -> name.endsWith(extension);

    File[] files = file.listFiles(fnf);
    if (files != null)
      for (File f : files)
        System.out.println(f.getName());
  }
}
```

## Listing directory contents: `java.nio`

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

## Obtaining disk space information

```java
import java.io.*;
import java.nio.file.*;

public class PartitionSpace {
  public static void main(String[] args) throws IOException {
    File root = File.listRoots()[0];
    System.out.println("Partition: " + root);
    System.out.println("Usable space on this partition = " + root.getUsableSpace());
    System.out.println("Total space on this partition = " + root.getTotalSpace());
    System.out.println("---\n");

    Path path = Path.of("");
    FileStore fileStore = Files.getFileStore(path);
    System.out.println(fileStore);
    System.out.println("Usable space on this partition = " + fileStore.getUsableSpace());
    System.out.println("Total space on this partition = " + fileStore.getTotalSpace());
  }
}
```