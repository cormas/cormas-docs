---
title: Pharo Syntax
sidebar_position: 3
slug: /pharo-syntax
---

# Pharo Syntax in a Nutshell

Pharo is a live, object-oriented language. Everything is an object, and you send messages to objects to make them do things. This short guide covers only the essentials you need to read and write the code for Cormas models.

**We encourage you to follow this tutorial hands‑on:** type each example in a Playground and try evaluating, printing, and inspecting it yourself. If you are new to Playground, check out our tutorial on [Running code in Pharo Playground](run-code-in-playground).

## Classes, Objects and Messages

Before learning syntax, we need to understand three very important ideas: **classes**, **objects**, and **messages**.

- A **class** is like a blueprint or recipe. It describes how a certain kind of thing should look and behave. For example, the class `Wolf` describes what all wolves can do in a model.
- An **object** is a real instance created from a class. If the class is the blueprint for a house, the object is the actual house built from it. Each wolf in a simulation is an object of the class `Wolf`.
- We make objects do things by sending them **messages**. A message is like asking an object to perform an action or give us information.

Here are some examples of sending messages to objects:

```smalltalk
3 + 4          "we send the + message to the number 3, with 4 as the argument"
'Hello' size   "we ask the string 'Hello' for its size"
```

You will use these ideas all the time in Cormas: your agents (wolves, rabbits, trees…) are objects that belong to classes, and you make them act by sending them messages.

## Literal Objects

Literal objects are values that you write directly in your code. They do not need to be created with a message or by calling a class; they simply appear as they are. For example:

- **Numbers:** like `3`, `42`, or `-7`.
- **Characters:** single letter or symbol, written with a leading `$`, like `$a`, `$Z` or `$?`.
- **Strings:** sequences of characters, written between quotes, like `'Hello'` or `'Wolf'`.
- **Symbols:** names written with a leading `#`, like `#wolf` or `#rabbit`. Unlike strings, symbols are unique and used as identifiers or keys rather than text. For example, two strings `'wolf'` and `'wolf'` are two separate objects, but the symbol `#wolf` always refers to the same object.
- **Booleans:** the values `true` and `false`. They are used for yes/no, on/off, or condition checks in your code.
- **Arrays:** fixed-size collections of objects written as `#(item1 item2 item3)`. For example, `#(1 2 3)` is an array of three numbers.

:::note
Even though these are called literal objects, they are still ordinary objects of classes (like `Number`, `String`, `Array`, ...) just like anything else in Pharo.
:::

## Three Types of Messages

In Pharo, **everything happens by sending messages to objects**. A message is like a request: you ask an object to do something or to give you some information. 

There are three kinds of messages in Pharo:

- **Unary messages:** have no arguments. Example: `'Hello' size` asks the string `'Hello'` for its size.
- **Binary messages:** are usually symbols like `+`, `-`, `*`, `<`. Example: `3 + 4` sends the `+` message with `4` as argument to the number `3`.
- **Keyword messages:** contain words ending with colons, each followed by an argument. Example: `rabbit moveTo: forest` sends the message `moveTo:` with the argument `forest`.

:::note
If you combine different kinds of messages in one expression, Pharo always evaluates unary first, then binary, then keyword messages. Parentheses can be used to make the order explicit.
:::

## Variables

Variables are names that allow us to remember objects so we can use them later. For example, instead of always writing the number 10, we can give it a name like `numberOfRabbits` and reuse it.

In Pharo, variables do not store the object itself, but a **reference** to it. Think of them as labels pointing to objects.

We declare variables so that Pharo knows in advance which names we want to use. Temporary variables inside a method are declared between `| ... |`.

```st
| numberOfRabbits numberOfWolves |
numberOfRabbits := 10.
numberOfWolves := 3.
```

:::note
In Pharo we use **camelCase** notation: if a name is made of several words, we start with a lowercase letter and capitalize each following word (e.g., `numberOfRabbits`).

- Variable names and method names must **always begin with a lowercase letter**.
- Class names must **always begin with an uppercase letter** (e.g., `Wolf`, `Rabbit`).
- A valid name must start with a letter, may contain letters and digits, and may also include underscores. It must not begin with a number, contain spaces, or include punctuation or special symbols.

These simple rules help keep code readable and consistent.
:::

## Assignment

Use `:=` (colon + equal) to assign a value. Assignment means we give a variable a specific object to remember, so we can use that object later without rewriting it every time:

```Smalltalk
count := 5.
```

:::note
In some other programming languages the symbol for assignment is different: for example, in Python, Java or C it is `=`, and in R it is `<-`. In Pharo, **assignment is always** `:=`. The single equals sign `=` is used to **test if two expressions are equal**. Mixing them up is a very common beginner mistake: writing `=` instead of `:=` will not assign a value, it will only check equality.
:::

## Comments

Anything between double quotes is a comment. Comments are notes written for humans, not for the computer: they help explain what the code does, why we wrote it a certain way, or to leave reminders for ourselves or others. Pharo ignores comments when running the program.

```Smalltalk
"this is a comment"
```

## Collections

A collection is an object that groups other objects together. Collections are useful when you want to keep track of many things at once: for example, all the wolves in a model, all the cells in a grid, or all the numbers from 1 to 100. Instead of creating a separate variable for each object, you put them into a collection.

```Smalltalk
animals := #(wolf rabbit).	"an Array with two elements"
animals at: 1.      		"first element of a collection"
animals size.       		"size of a collection"
```

:::tip
Collections are very important and often used in Cormas. This is just a short introduction. We cover collections in more detail in the dedicated guide: [Collections](collections).
:::

## Blocks

Blocks are small pieces of code written between square brackets `[ ... ]`. They are also called **anonymous functions** because, unlike methods, they do not have a name. Instead, you can create them on the spot wherever you need them.

We use blocks because they let us:

- Delay the execution of code until we decide to run it.
- Pass behaviour (not just data) as arguments to other methods.

### Evaluating a block

A block is just another object in Pharo. To make a block run, we send it the message `value`:

```Smalltalk
[ 3 + 4 ] value.
```

### Blocks with arguments

Blocks can also take arguments, which are written after a colon at the start of the block:

```Smalltalk
[ :x | x + 2 ] value: 5.
```

Here the block expects one argument `x`. When we send it the message `value:` with `5`, it calculates `5 + 2`.

Blocks can also take two or more arguments:

```Smalltalk
[ :x :y | x * y ] value: 3 value: 4.
```

Here the block expects two arguments. When we send it the message `value:value:` with `3` and `4`, it multiplies them together.

### Blocks are objects

Blocks are objects like anything else in Pharo. This means you can:

- Store them in variables:

```Smalltalk
adder := [ :x | x + 10 ].
adder value: 3.
```

- Pass them as arguments to other messages:

```Smalltalk
#(1 2 3) collect: [ :each | each * 2 ].   "#(2 4 6)"
```

Blocks are especially useful in loops and conditionals, where they define the actions to perform.

## Boolean Logic

Boolean values are special objects that represent logigal values: `true` and `false`. They are Pharo's way of representing yes/no or on/off situations. We need them whenever we want to make decisions in our programs: for example, checking if a rabbit is alive, if a cell is empty, or if one number is bigger than another.

Pharo provides comparison messages that return booleans: `=`, `>`, `<`, `<=`, `>=`, and `~=`. For example, `3 = 3` gives `true`, while `3 < 2` gives `false`. The message `~=` means _"not equal to"_.

Collections also understand useful boolean messages such as isEmpty, which answers true if the collection has no elements and false otherwise.

Booleans can receive messages that combine them with other booleans:

- `and:` means both must be true.
- `or:` means at least one must be true.
- `not` flips the truth value (`true` becomes `false`, `false` becomes `true`).

These are very useful when writing conditions for your agents’ behaviour.

```Smalltalk
(a > b) and: [ b > c ].   "true if both comparisons are true"
(a > b) or: [ b > c ].    "true if at least one comparison is true"
(a > b) not.              "negates the result, true becomes false"
```

## Conditionals

Conditionals let us choose different actions depending on whether something is true or false. In Pharo, we write conditionals by sending messages to booleans. The most common ones are `ifTrue:`, `ifFalse:`, `ifTrue:ifFalse:`, and `ifFalse:ifTrue:`.

Why do we pass blocks as arguments? Because the block contains the code that should run only if the condition matches. Without blocks, the code would run immediately instead of waiting for the condition to decide.

```Smalltalk
5 > 3 ifTrue: [ 'Yes, 5 is greater than 3' ].
5 < 3 ifFalse: [ 'No, 5 is not less than 3' ].

age >= 18 ifTrue: [ 'Adult' ] ifFalse: [ 'Minor' ].

'cat' = 'dog'
	ifFalse: [ 'These are different animals' ]
	ifTrue: [ 'These are the same' ].
```

In these examples, the comparisons produce either true or false. Depending on that value, Pharo decides which block of code to run.

## Loops

Sometimes we want to repeat an action many times. In programming this is called a **loop**. Instead of writing the same instruction again and again, we tell Pharo to repeat it for us.

Here are some common kinds of loops in Pharo:

### Looping a fixed number of times

Use timesRepeat: to run a block several times:

```Smalltalk
"open Transcript to see the output"
Transcript open. 

"print 'Hello' 5 times"
5 timesRepeat: [ 'Hello' traceCr ].
```

### Looping over a range of numbers

Use `to:do:` to go through a range of numbers:

```Smalltalk
1 to: 3 do: [ :i | i squared traceCr ].
```

### Looping while a condition is true or false

Use `whileTrue:` and `whileFalse:` to repeat as long as a condition holds:

```Smalltalk
count := 3.
[count > 0] whileTrue: [ count := count - 1 ].
```

### Looping over collections

We can use `do:` to run a block once for each element in a collection:

```Smalltalk
#(wolf rabbit) do: [ :each | each size traceCr ].
```

:::info
We explain `do:` and other collection-related loops (`select:`, `collect:`, `detect:` ...) in more detail in the [Collections](collections) tutorial.
:::

