---
title: Understanding Messages in Pharo
sidebar_position: 4
---

In Pharo (and therefore in **Cormas**), *everything is an object* - agents, cells, plots, and even numbers and strings. Objects **interact** by *sending messages* to each other. Messages are how we tell an object what to do.

For eample:

```smalltalk
plot burn.
```

Here we send the message `burn` to the object `plot`.\
If the object knows how to respond to `burn`, it performs an action - for example, it may change its color to red and mark itself as burned.

## 1. What is a Message?

A **message** in Pharo is similar to a "function call" in other languages, but it's more natural to read:

> *receiver message arguments*

For instance:

```Smalltalk
forest countTrees
```

means _"Ask the forest to count its trees."_\
Here:

- `forest` is the **receiver** (an object),
- `countTrees` is the **message** (a request),
- and the **response** would be the number of trees (a value returned by the `countTrees` method).

Another example of a message with one argument:

```Smalltalk
farmer moveTo: newPlot.
```

means: _"Ask the farmer to move to a new plot"_.\
Here:

- `farmer` is the **receiver** 
- `moveTo:` is the **message** 
- `newPlot` is an **argument** 

## 2. Everything Happens by Sending Messages

Objects never access another object's data directly.\
They always **communicate by sending messages**.

```smalltalk
tree height  "Ask a tree for its height"
plot isEmpty  "Ask if the plot is empty"
farmer moveTo: newPlot  "Ask the farmer to move to another plot"
```

This means that when you design a Cormas model, you define:

- **the messages your agents understand** (their behavior),
- and **the messages you send** to make them act or query information.

## 3. Messages vs. Methods

It's important to understand that **messages** and **methods** are not the same thing.

- A **message** is a request you send to an object.
- A **method** is the piece of code inside the object that defines how it should respond to that message.

When you write:

```Smalltalk
farmer moveTo: newPlot.
```

You are **sending a message** `moveTo:` to the object `farmer`. Pharo then looks inside the farmer's class to find a **method** with the same name. That method then executes the instructions that make the farmer move.

If no method with that name exists, Pharo searches for it in the superclass, then in the superclass of that superclass, and so on up the inheritance chain. If none of the superclasses define a matching method, Pharo raises an error called _"Message not understood"_ - meaning the object and its ancestors didn't know how to respond.

In short:

- **Message**: what you send.
- **Method**: what the object does when it receives that message.

## 4. Messages Can Have Arguments

Some messages require extra information, called *arguments*.

```smalltalk
vegetationUnit biomass: 0.5.
farmer moveTo: villageCell.
forest addTree: aTree.
```

Here `biomass:`, `moveTo:` and `addTree:` are *keyword messages* that take arguments (`0.5`,  `villageCell`, and `aTree`).

Notice the colon (`:`) - it indicates that the message expects a value.

## 5. Messages Return Values

Each message returns a result, which can be stored or used in another message:

```smalltalk
numberOfTrees := forest countTrees.
averageHeight := forest averageTreeHeight.
```

:::tip

The result of a message is the object returned by the method that is being executed - whatever comes after the `^` symbol. If a method returns no value explicitly, it always returns the message receiver.

For example, if method `growBiomass` is implemented like this (there is no return statement):

```smalltalk
growBiomass
    biomass := biomass + 1
```

Then the message `cell growBiomass` will increase the biomass by 1 and return cell. You can imagine that there is an invisible `^ self` at the end of each method.
:::

## 6. Nested Messages

You can also *nest* messages to combine multiple requests in one expression:

```smalltalk
forest largestTree height
```

This means:

1. Ask the forest for its largest tree.
2. Then ask that tree for its height.

## 7. Messages Can Be Chained

You can send several messages to the same object in sequence by using a semicolon (`;`):

```smalltalk
counter increment; increment; decrement.
```

This reads naturally: *"Increment, increment, then decrement the counter."*

This is a key idea in Pharo - code is readable and close to natural language.

## 8. Message Types

In Pharo, there are three kinds of messages. These are just different ways of writing instructions for objects, depending on how many arguments (extra pieces of information) they need.

### Unary messages

A **unary message** is the simplest kind: it has no arguments - you just ask an object to do something or tell you something.

```smalltalk
plot burn.
cell isEmpty.
forest countTrees.
```

Each of these messages consists of a **receiver** (the object) and a **message name**. For example, `plot burn` means *"Tell the plot to burn."*

### Binary messages

A **binary message** uses a symbol such as `+`, `-`, `*`, `@`, `<`, or `>` between two objects. Binary messages are often used for arithmetic or comparisons.

```smalltalk
3 + 4.
10 > 5.
(2 @ 3) + (4 @ 2).   "Add two points"
```

Here, `+` and `>` are message names, not operators as in other languages. For instance, `3 + 4` means *"Send the message **``** to the number 3."*

### Keyword messages

A **keyword message** can take one or more arguments. Each argument is separated by a space, but all the parts together form a *single message name* ending with colons.

For example, a message with one argument:

```smalltalk
farmer moveTo: newPlot.
```

The full message name is `moveTo:` - the colon (`:`) indicates that the message expects a value.

A message with two arguments:

```smalltalk
cell changeStateTo: #burned atTime: 10.
```

Even though there are spaces, this is still **one single message** whose full name is `changeStateTo:atTime:`. The arguments are `#burned` and `10`.

You can read it like a sentence: *"Ask the cell to change its state to burned at time 10."*

### Message order and precedence

When several kinds of messages appear in the same expression, Pharo evaluates them in a specific order:

1. **Unary messages** first.
2. **Then binary messages**.
3. **Then keyword messages.**

For example:

```smalltalk
3 + 4 * 5
```

This is read as `(3 + 4) * 5`? No - Pharo reads binary messages left to right, so it's equivalent to `(3 + 4) * 5` = `35`.

Parentheses can change the order:

```smalltalk
3 + (4 * 5)   "Now equals 23"
```

## Summary

- Objects communicate only through **messages**.
- Messages can have **no arguments (unary)**, **symbols (binary)**, or **keywords (with colons)**.
- You can **chain messages** with `;`.

Learning to "think in messages" is the key to feeling at home in Pharo - and to designing expressive, natural models in Cormas.

