---
title: Initialize method
sidebar_position: 4
---

# Understanding the initialize method

When you create a new class in Pharo (for example, a class representing an agent, a cell, or a model in Cormas), that class can have a special method called `initialize`. This method is used to **set up** your object when it is first created and to assign default values to its attributes.

## What is initialize?

Every time you create a new object in Pharo, it's born empty - it doesn't yet know what values it should have. The `initialize` method is where you give your new object its first settings.

### Example

```smalltalk title="Duck"
initialize
    super initialize.
    energy := 50.
    state := #baby
```

Here, we make sure that every instance of a `Duck` will have energy 50 and state `#baby`. When Pharo creates a new `Duck`, it automatically calls this method.

## Why we always write super initialize

If your class inherits from another one (for example, `Duck` inherits from `CMAgent`), then that parent class might also have some important setup to do. To make sure that setup is not lost, we always call:

```smalltalk
super initialize.
```

It means: "Run the initialize method of my parent first, then do my own setup."

If you forget to add `super initialize`, your object might not work correctly - it could miss important data from its superclass.

### Example of what can go wrong

```smalltalk title="Duck"
initialize
    energy := 50
```

If the superclass (`CMAgent`) defines things like its position or size in its own `initialize` method, skipping `super initialize` means your duck agent will be missing that information!

So remember:

:::tip
Always start your `initialize` method with `super initialize.`
:::

## When initialize is called

In Pharo, `initialize` is automatically called when you create a new instance using:

```smalltalk
Duck new
```

This automatically runs:

1. The `initialize` of all superclasses (through `super initialize`),
2. Then your class's own `initialize`.

You don't have to call it yourself - Pharo does it for you.

## Difference between Pharo's initialize and Cormas' init methods

Cormas uses its own special `init` methods, such as `initBigForest`, `initUrbanArea`, etc., to prepare a model for simulation. These are **not the same** as Pharo's `initialize`.

| Purpose | When It Runs | Example |
|---|---|---|
| `initialize` | When you create a new *object* (like an agent, cell, or model). | `duck := Duck new.`   |
| **Cormas** `init` methods | When you start or restart a *simulation scenario* | `self initBigForest.` |

### Think of it like this:

- `initialize` gives life to a new object (sets its default values).
- `init` prepares your whole model world before running the simulation.

You can define an `initialize` method in any class, but there can be only one `initialize` method per class. In contrast, `init` methods are defined only in the model class, and it can contain several different `init` methods for different initialization scenarios.

## Example from a Cormas model

Let's look at how both methods might appear together. First, we add an `initialize` method to `Duck` class, defining the default energy and state values for each new duck.

```smalltalk title="Duck"
initialize
    super initialize.
    energy := 50.
    state := #baby
```

Then we add an initialize method to `DuckModel` class setting the default value for the `numberOfDucks` attribute.

```smalltalk title="DuckModel"
initialize
    super initialize.
    numberOfDucks := 10
```

Finally, we create an `initForest` method defining the initial configuration for the simulation. It will create 10 ducks, each duck will have `energy = 50` and `state = #baby` (`createN:entity:` method creates new ducks with `Duck new` and that method executes our `initialize`).

```smalltalk title="DuckModel"
initForest
    <init>
    self createN: numberOfDuck entity: Duck
```

## Key takeaways

- `initialize` is called automatically when an object is created.
- Always include `super initialize` at the beginning.
- Use `initialize` for setting default values of your object.
- Use `initScenario`, `initSimulation`, or similar in Cormas to prepare the model world.
- Don't mix the two - `initialize` is for objects; `init` is for model setup.

