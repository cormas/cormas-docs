---
title: Understanding Messages in Pharo
sidebar_position: 4
---

In Pharo (and therefore in **Cormas**), *everything is an object* — agents, cells, plots, and even numbers and strings. Objects **interact** by *sending messages* to each other. Messages are how we tell an object what to do.

For eample:

```smalltalk
plot burn.
```

Here we send the message `burn` to the object `plot`.\
If the object knows how to respond to `burn`, it performs an action — for example, it may change its color to red and mark itself as burned.

---

## 1. What is a Message?

A **message** in Pharo is similar to a “function call” in other languages, but it’s more natural to read:

> *receiver message arguments*

For instance:

```smalltalk
forest countTrees
```

means *“Ask the forest to count its trees.”*\
Here:

- `forest` is the **receiver** (an object),
- `countTrees` is the **message** (a request),
- and the **response** is the result the object returns.

---

## 2. Everything Happens by Sending Messages

Objects never access another object’s data directly.\
They always **communicate by sending messages**.

```smalltalk
tree height  "Ask a tree for its height"
plot isEmpty  "Ask if the plot is empty"
farmer moveTo: newPlot  "Ask the farmer to move to another plot"
```

This means that when you design a Cormas model, you define:

- **the messages your agents understand** (their behavior),
- and **the messages you send** to make them act or query information.

---

## 3. Messages Can Have Arguments

Some messages require extra information, called *arguments*.

```smalltalk
vegetationUnit biomass: 0.5.
farmer moveTo: villageCell.
forest addTree: aTree.
```

Here `biomass:`, `moveTo:` and `addTree:` are *keyword messages* that take arguments (`0.5`,  `villageCell`, and `aTree`).

Notice the colon (`:`) — it indicates that the message expects a value.

---

## 4. Messages Can Be Chained

You can send several messages to the same object in sequence by using a semicolon (`;`):

```smalltalk
counter increment; increment; decrement.
```

This reads naturally: *“Increment, increment, then decrement the counter.”*

This is a key idea in Pharo — code is readable and close to natural language.

---

## 5. Messages Return Values

Each message returns a result, which can be stored or used in another message:

```smalltalk
numberOfTrees := forest countTrees.
averageHeight := forest averageTreeHeight.
```

:::tip

The result of a message is the object returned by the method that is being executed — whatever comes after the `^` symbol. If a method returns no value explicitly, it always returns the message receiver.

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

---

## 7. Message Types

Pharo has three main kinds of messages:

| Type        | Example               | Meaning                                                       |
| ----------- | --------------------- | ------------------------------------------------------------- |
| **Unary**   | `counter reset`       | No argument                                                   |
| **Binary**  | `5 + 3`               | One symbol (like `+`, `>`, `@`) between receiver and argument |
| **Keyword** | `agent moveTo: aCell` | One or more words ending with `:` and followed by arguments   |

For example:

```smalltalk
3 + 4 * 5
```

is interpreted as `(3 + 4) * 5`?\
No — because **unary > binary > keyword** is the order of precedence.\
Here, binary messages like `+` and `*` are evaluated left to right:\
→ `(3 + 4) * 5` = `35`

---

## Summary

- Objects communicate only through **messages**.
- Messages can have **no arguments (unary)**, **symbols (binary)**, or **keywords (with colons)**.
- You can **chain messages** with `;`.

Learning to “think in messages” is the key to feeling at home in Pharo — and to designing expressive, natural models in Cormas.

