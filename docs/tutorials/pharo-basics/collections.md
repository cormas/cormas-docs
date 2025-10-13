# Collections

This guide introduces you to **collections** in Pharo - groups of objects used to organize and manipulate data. You will learn how to create and use arrays, ordered collections, sets, and dictionaries, understand what makes each type special, and explore how to iterate over them with messages like `do:`, `collect:`, `select:`, and others. These operations are essential for building models and handling data effectively in Cormas. 

## 1. What are Collections?

A *collection* is simply a group of things. For example:

- a basket with apples, oranges, and bananas - a collection of fruits,
- a classroom list with student names - a collection of people.

In Pharo, a collection is an object that contains other objects.

Collections are used everywhere in Cormas. For instance:

- The grid of spatial cells is a collection of cell objects.
- Each agent type (such as farmers, herders, or goats) is stored in its own collection.
- You can select all agents that satisfy a condition, collect a property from each agent, or compute aggregate statistics using collection messages.

Understanding collections is essential because most operations in a model involve manipulating groups of objects rather than individual ones.

## 2. Types of Collections

There are many different types of collections. To build models in Cormas, we recommend to learn the forllowing 4 collections:

| Type                  | Description                                  | Example Use                           |
| --------------------- | -------------------------------------------- | ------------------------------------- |
| **Array**             | Fixed-size list of items in a defined order. | A constant list of numbers or names.  |
| **OrderedCollection** | A flexible list that you can grow or shrink. | A list of animals you keep adding to. |
| **Set**               | A bag of unique items (no duplicates).       | A list of unique species.             |
| **Dictionary**        | A table that pairs keys with values.         | A translation table or lookup table.  |

### Arrays

An **Array** is a simple list of items in a fixed order.\
Example:

```smalltalk
#(1 2 3 6 2 1).   "Literal array"
{ 1 . 3 . 5 . 1 }. "Dynamic array"
```

:::tip
Literal arrays are created at compile time and cannot include variables or computed expressions. Dynamic arrays are evaluated at runtime and can contain any expressions or object references.
:::

```smalltalk
numbers := #(3 2 7 1 9 -1 -9 0).

numbers at: 1.      "3 (first element)"
numbers first.      "3"
numbers size.       "8"
numbers isEmpty.    "false"
#() isEmpty.        "true"
numbers size < 10.  "true"
```

Arrays are good for **fixed lists** that you do not plan to change.

### OrderedCollection

An **OrderedCollection** is like an expandable shopping list: you can add or remove items.\
Example: Different ways to create an `OrderedCollection`

```smalltalk
"Option 1: start empty, add items"
fruits := OrderedCollection new.
fruits add: #apple.
fruits add: #orange.
fruits addAll: #(banana avocado mango).

"Option 2: create with items"
animals := OrderedCollection withAll: #(cat dog wildBoar).

"Option 3: convert from array"
people := #(alice bob) asOrderedCollection.
people at: 2 put: #duck.   "Replace bob with duck"
```

Use `OrderedCollection` when your list changes over time.

### Sets

A **Set** is like a basket that only keeps **unique items**. If you add the same thing twice, it will keep only one copy.\
Example:

```smalltalk
"Option 1"
fruits := Set new.
fruits add: #apple.
fruits add: #orange.
fruits add: #apple.   "Duplicate ignored"
fruits add: #banana.

"Option 2"
animals := Set withAll: #(cat dog cat cat).

"Option 3"
people := #(alice bob alice alice) asSet.
```

Use `Set` when you care about uniqueness, not order.

### Dictionaries

A **Dictionary** stores **pairs of keys and values**, like words and translations.\
Example:

```smalltalk
fruits := Dictionary new.
fruits at: #apple put: #pomme.
fruits at: #orange put: #orange.
fruits at: #banana put: #banane.

fruits at: #apple.   "#pomme"
```

Use `Dictionary` when you want to look things up quickly.

## 3. Iterating Over Collections

Pharo collections respond to higher-order messages that take a block. A block is written in square brackets and can accept parameters, for example `[:each | ...]`. You can put multiple statements inside a block separated by periods.

### `do:` - Run a block for each element

- Purpose: perform an action for every element (side effects such as printing, sending a message to each object, accumulating into an external variable).
- Return value: the receiver itself (not a new collection).
- Order: respects the collection's iteration order.

```smalltalk
numbers := #(3 2 7 1 9 -1 -9 0).

"Print each number on its own line"
numbers do: [ :each | each traceCr ].

"Multiple actions inside a block"
numbers do: [ :n |
  (n even) ifTrue: [ 'even: ' , n asString traceCr ].
  (n odd)  ifTrue: [ 'odd:  ' , n asString traceCr ] ].

"Shorthand when sending a unary message to every element"
"goats do: [ :g | g die ]."
"is equivalent to"
"goats do: #die."

"Multiple messages per element"
"goats do: [ :g |
    g move.
    g eat.
    g reproduce ]."
```

:::tip
- Use `do:` when you need effects, not when you want to build a result. For building results, prefer `collect:` or `select:`.
- On a `Dictionary`, `do:` iterates over associations. You can use `keysAndValuesDo:` to get two block arguments.

```smalltalk
translations := #{ #apple -> #pomme. #orange -> #orange } asDictionary.
translations do: [ :assoc | assoc key traceCr ].
translations keysAndValuesDo: [ :k :v | (k asString , ' -> ' , v asString) traceCr ].
```
:::

### `detect:` - Find the first matching element

- Purpose: return the first element satisfying a condition.
- Return value: the element itself. If none is found, it raises an error unless you provide a default.
- Performance: stops at the first match.

```smalltalk
numbers detect: [ :each | each < 0 ].        "-1"

"With a default value or action when nothing matches"
numbers detect: [ :each | each > 100 ] ifNone: [ 'No large numbers' ].

"Typical pattern in models"
"firefighter cell neighbourhood shuffled detect: [ :c | c isOnFire ]."
```

:::tip
- Use `detect:` when you need a single element. If you want all matches, use `select:`.
- To act on the found element without keeping it, you can chain:

```smalltalk
numbers
  detect: [ :n | n > 0 ]
  ifFound: [ :n | ('First positive: ' , n asString) traceCr ]
  ifNone: [ 'None' traceCr ].
```
:::

### `select:` - Keep all elements that match

- Purpose: filter a collection based on a condition.
- Return value: a new collection of the same species when possible.
- Order: preserves iteration order.

```smalltalk
numbers select: [ :each | each < 0 ].              "#(-1 -9)"
(numbers select: [ :each | each < 0 ]) asOrderedCollection.  "an OrderedCollection(-1 -9)"

"Filter domain objects"
"firefighter colleagues select: [ :each | each isBusy ]."
```

:::tip
- On `Set`, the result is a `Set`; on `Array`, the result is an `Array`; when unsure, you can convert explicitly: `asOrderedCollection`, `asSet`, etc.
- Prefer `select:` over manual loops that `add:` conditionally.
:::

### `reject:` - Remove elements that match

- Purpose: the complement of `select:`.
- Return value: a new collection without the elements that satisfy the condition.

```smalltalk
numbers reject: [ :each | each < 0 ].   "#(3 2 7 1 9 0)"
```

:::tip
You can express many conditions both ways. Choose whichever reads clearer:

```smalltalk
numbers select: [ :n | n >= 0 ].
"is equivalent to"
numbers reject: [ :n | n < 0 ].
```
:::

### `collect:` - Transform each element

- Purpose: map each element to a new value.
- Return value: a new collection of the same species when possible, containing the transformed elements.

```smalltalk
numbers collect: [ :each | each * 100 ].
"#(300 200 700 100 900 -100 -900 0)"

numbers collect: [ :each | each * each ].
"#(9 4 49 1 81 1 81 0)"

"From domain objects to their properties"
"firefighter colleagues collect: [ :each | each cell ]."
```

Chaining

```smalltalk
"Square only the positive numbers, then sort"
(numbers select: [ :n | n > 0 ])
  collect: [ :n | n * n ];
  asOrderedCollection;
  sort.
```

:::tip
- `collect:` does not modify the original collection.
- When you only need a sum or count after a transform, consider `sum:` and `count:` to avoid building an intermediate collection.

```smalltalk
herders sum: [ :h | h goats size ].
herders count: [ :h | h hasGoats ].
```
:::

### Choosing between them

- Need to act on each element without producing a new collection - use `do:`.
- Need the first match - use `detect:` (with `ifNone:` when necessary).
- Need all matches - use `select:`; the inverse is `reject:`.
- Need to transform values - use `collect:`.

## 4. Sorting and Shuffling

Sorting and Shuffling

You can reorder collections.

```smalltalk
numbersCopy := numbers asOrderedCollection.

numbersCopy sorted.   "#(-9 -1 0 1 2 3 7 9)"
numbersCopy shuffled. "an OrderedCollection(1 -9 2 -1 3 7 9 0)"
```

You can also sort with your own rule:

```smalltalk
goats sorted: [ :a :b | a energy < b energy ].
goats sort:   [ :a :b | a age > b age ].
```

## 5. Summing and Counting

```smalltalk
numbers sum.   "12"

"Count goats per herder"
(herders collect: [ :each | each goats size ]) sum.
herders sum: [ :each | each goats size ].

"Count only herders that have goats"
herders count: [ :each | each hasGoats ].
```

## 6. Handling Missing Values

What if something is not found? You can provide a fallback.

```smalltalk
numbers
  detect: [ :each | each > 100 ]
  ifNone: [ 'Boooo' traceCr ].

dict at: #apple ifAbsent: [ 'Not found' ].
dict at: #apple ifPresent: [ :val | val traceCr ] ifAbsent: [ '...' ].
```

## Conclusion

Collections are at the heart of how we represent and manipulate data in Pharo and Cormas. In Cormas models, collections store agents, resources, spatial cells, or interactions. Understanding how to iterate, filter, and transform collections allows modelers to express complex dynamics in simple, readable code. Once you master collections, you can easily manage groups of entities, compute indicators, and prepare data for visualization or analysis.

For further information, we encourage you to read:

- *Pharo by Example*, Chapter 5: Collections ([https://books.pharo.org](https://books.pharo.org))
- The *Pharo Collections API* in the Pharo class browser (`Collection` class and its subclasses)
- The *Cormas Developer Guide* for examples of agent lists and neighborhood operations ([https://cormas.org](https://cormas.org))
- *Learning Object-Oriented Programming with Pharo* by Stéphane Ducasse and Damien Cassou, especially the chapters on data structures
- *Smalltalk Best Practice Patterns* by Kent Beck, for insights into idiomatic use of collections

