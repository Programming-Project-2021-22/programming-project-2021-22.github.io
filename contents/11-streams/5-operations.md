---
slug: /streams/operations
course: Programming Project 2021/22
module: Streams
title: Operations
subtitle: null
chapter: 11
section: 5
previous: /streams/optionals
next: null
---

Consider the following class:

```java
public class TVShow {
   String name;
   String category;
   int rating;
   int year;

   public TVShow(String name, int year, String category, int rating) {
      this.name = name;
      this.year = year;
      this.category = category;
      this.rating = rating;
   }

   public String getQualifiedName(){
      return String.format("%s (%d)", name, year);
   }

   @Override
   public String toString() {
      return String.format("%-25s  Category: %-6s   Rating: %s", getQualifiedName(), category, rating);
   }

   // getters and setters
}
```

## Filtering a stream

```java
public class ProcessingShows {

   public static void main(String[] args) {
      TVShow[] shows = {
              new TVShow("Rick and Morty", 2013, "Comedy", 100),
              new TVShow("Game of Thrones", 2011, "Drama", 92),
              new TVShow("Stranger Things", 2016, "Terror", 90),
              new TVShow("Friends", 1994, "Comedy", 99),
              new TVShow("House of Cards", 2013, "Drama", 85),
              new TVShow("The Walking Dead", 2010, "Terror", 78),
              new TVShow("The Good Place", 2016, "Comedy", 86),
      };

      List<TVShow> list = Arrays.asList(shows);

      // Displays all shows
      System.out.printf("TV shows:%n");
      list.stream().forEach(System.out::println);

      // Predicate that returns true for ratings greater than 90
      Predicate<TVShow> highRatings = tvShow -> tvShow.getRating() > 90;

      // Displays only shows rated over 90 sorted by rating (ascending)
      System.out.printf("%nShows rated over 90:%n");
      list.stream()
              .filter(highRatings)
              .sorted(Comparator.comparing(TVShow::getRating))
              .forEach(System.out::println);

      // Displays a show rated over 90
      System.out.printf("%nA show rated over 90:%n%s",
              list.stream()
                      .filter(highRatings)
                      .findAny()
                      .get());
   }
}
```

```output
TV shows:
Rick and Morty (2013)      Category: Comedy   Rating: 100
Game of Thrones (2011)     Category: Drama    Rating: 92
Stranger Things (2016)     Category: Terror   Rating: 90
Friends (1994)             Category: Comedy   Rating: 99
House of Cards (2013)      Category: Drama    Rating: 85
The Walking Dead (2010)    Category: Terror   Rating: 78
The Good Place (2016)      Category: Comedy   Rating: 86

Shows rated over 90:
Game of Thrones (2011)     Category: Drama    Rating: 92
Friends (1994)             Category: Comedy   Rating: 99
Rick and Morty (2013)      Category: Comedy   Rating: 100

A show rated over 90:
Rick and Morty (2013)      Category: Comedy   Rating: 100
```

## Sorting shows by multiple fields

```java
Function<TVShow, String> byCategory = TVShow::getCategory;
Function<TVShow, Integer> byRating = TVShow::getRating;

Comparator<TVShow> categoryThenRating =
        Comparator.comparing(byCategory).thenComparing(byRating);

System.out.printf("%nShows in ascending order by category and then rating: %n");
list.stream()
        .sorted(categoryThenRating)
        .forEach(System.out::println);

System.out.printf("%nShows in descending order by category and then rating: %n");
list.stream()
        .sorted(categoryThenRating.reversed())
        .forEach(System.out::println);
```

```output
Shows in ascending order by category and then rating: 
The Good Place (2016)      Category: Comedy   Rating: 86
Friends (1994)             Category: Comedy   Rating: 99
Rick and Morty (2013)      Category: Comedy   Rating: 100
House of Cards (2013)      Category: Drama    Rating: 85
Game of Thrones (2011)     Category: Drama    Rating: 92
The Walking Dead (2010)    Category: Terror   Rating: 78
Stranger Things (2016)     Category: Terror   Rating: 90

Shows in descending order by category and then rating: 
Stranger Things (2016)     Category: Terror   Rating: 90
The Walking Dead (2010)    Category: Terror   Rating: 78
Game of Thrones (2011)     Category: Drama    Rating: 92
House of Cards (2013)      Category: Drama    Rating: 85
Rick and Morty (2013)      Category: Comedy   Rating: 100
Friends (1994)             Category: Comedy   Rating: 99
The Good Place (2016)      Category: Comedy   Rating: 86
```

## Mapping shows to unique category strings

```java
System.out.printf("%nUnique categories in ascending order: %n");
list.stream()
        .map(TVShow::getCategory)
        .distinct()
        .sorted()
        .forEach(System.out::println);

System.out.printf("%nDisplay title and year, but sorted by rating: %n");
list.stream()
        .sorted(Comparator.comparing(TVShow::getRating).reversed())
        .map(TVShow::getQualifiedName)
        .forEach(System.out::println);
```

```output
Unique categories in ascending order: 
Comedy
Drama
Terror

Display title and year, but sorted by rating: 
Rick and Morty (2013)
Friends (1994)
Game of Thrones (2011)
Stranger Things (2016)
The Good Place (2016)
House of Cards (2013)
The Walking Dead (2010)
```

## Grouping shows by categories

```java
System.out.printf("%nShows grouped by category:%n");
Map<String, List<TVShow>> map = list.stream()
        .collect(Collectors.groupingBy(TVShow::getCategory));

map.forEach((category, tvShows) -> {
    System.out.printf(
            "%s: %s%n",
            category,
            tvShows.stream()
                    .map(TVShow::getQualifiedName)
                    .collect(Collectors.joining(", ", "", ""))
    );
});
```

```output
Shows grouped by category:
Drama: Game of Thrones (2011), House of Cards (2013)
Comedy: Rick and Morty (2013), Friends (1994), The Good Place (2016)
Terror: Stranger Things (2016), The Walking Dead (2010)

```

## Counting shows per categories

```java
System.out.printf("%nCount shows per category:%n");
Map<String, Long> showCountByCategory = list.stream()
        .collect(Collectors.groupingBy(TVShow::getCategory, TreeMap::new, Collectors.counting()));

showCountByCategory.forEach((category, count) -> {
    System.out.printf("%s: %d%n", category, count);
});
```

```output
Count shows per category:
Comedy: 3
Drama: 2
Terror: 2
```
<!-- 
## Counting shows using a custom counter

```java
public class ShowCountCollector implements Collector<TVShow, TreeMap<String, Integer>, Map<String, Integer>> {
   @Override
   public Supplier<TreeMap<String, Integer>> supplier() { return () -> new TreeMap<>(); }

   @Override
   public BiConsumer<TreeMap<String, Integer>, TVShow> accumulator() {
      return (map, show) -> {
         String category = show.getCategory();

         if (!map.containsKey(category))
            map.put(category, 0);

         map.put(category, map.get(category) + 1);
      };
   }

   @Override
   public BinaryOperator<TreeMap<String, Integer>> combiner() {
      return (map1, map2) -> {
         map1.forEach((category, count) -> map2.merge(category, count, Integer::sum));
         return map1;
      };
   }

   @Override
   public Function<TreeMap<String, Integer>, Map<String, Integer>> finisher() {
      return map -> map;
   }

   @Override
   public Set<Collector.Characteristics> characteristics() {
      return EnumSet.of(Collector.Characteristics.IDENTITY_FINISH);
   }
}
```

## Counting shows using a custom counter

```java
public class TVShowCustomCollector {
   
   public static void main(String[] args) {
      TVShow[] shows = {
              new TVShow("Rick and Morty", 2013, "Comedy", 100),
              new TVShow("Game of Thrones", 2011, "Drama", 92),
              new TVShow("Stranger Things", 2016, "Terror", 90),
              new TVShow("Friends", 1994, "Comedy", 99),
              new TVShow("House of Cards", 2013, "Drama", 85),
              new TVShow("The Walking Dead", 2010, "Terror", 78),
              new TVShow("The Good Place", 2016, "Comedy", 86),
      };

      List<TVShow> list = Arrays.asList(shows);

      Map<String, Integer> showsPerCategory = list.stream().collect(new ShowCountCollector());
      System.out.println(showsPerCategory);
   }

}
```

```output
{Comedy=3, Drama=2, Terror=2}
```

## Counting shows using a custom counter - simplified

```java
public class TVShowCustomCollector {
   public static void main(String[] args) {
      TVShow[] shows = {
              new TVShow("Rick and Morty", 2013, "Comedy", 100),
              new TVShow("Game of Thrones", 2011, "Drama", 92),
              new TVShow("Stranger Things", 2016, "Terror", 90),
              new TVShow("Friends", 1994, "Comedy", 99),
              new TVShow("House of Cards", 2013, "Drama", 85),
              new TVShow("The Walking Dead", 2010, "Terror", 78),
              new TVShow("The Good Place", 2016, "Comedy", 86),
      };

      List<TVShow> list = Arrays.asList(shows);
      Collector<TVShow, TreeMap<String, Integer>, Map<String, Integer>> showCounter =
              Collector.of(
                      TreeMap::new,
                      (map, show) -> {
                         String category = show.getCategory();

                         if (!map.containsKey(category))
                            map.put(category, 0);

                         int count = map.get(category) + 1;
                         map.put(category, count);
                      },
                      (map1, map2) -> {
                         map1.forEach((category, count) -> map2.merge(category, count, Integer::sum));
                         return map1;
                      },
                      map -> map);

      // CONTINUES
```

## Counting shows using a custom counter - simplified

```java

      Map<String, Integer> showsPerCategory = list.stream().collect(showCounter);
      System.out.println(showsPerCategory2);
   }
}
```

```output
{Comedy=3, Drama=2, Terror=2}
``` -->

## Summing and averaging show ratings

```java
System.out.printf(
        "%nAverage show rating: %.2f%n",
        list.stream()
                .mapToInt(TVShow::getRating)
                .average()
                .orElse(0)
);

System.out.printf(
        "%nSum of show ratings: %d of %d",
        list.stream()
                .mapToInt(TVShow::getRating)
                .reduce(0, (aggregated, value) -> aggregated + value),
        list.size() * 100
);
```

```output
Average show rating: 90,00

Sum of show ratings: 630 of 700
```