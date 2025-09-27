# Pharo Syntax in a Nutshell

Pharo is a live, object-oriented language. Everything is an object, and you send messages to objects to make them do things. This short guide covers only the essentials you need to read and write the code for Cormas models.

## Running Code in Pharo Playground

Before starting, make sure you already have Pharo installed. If not, follow the Installing Pharo section from our [How to Install Cormas](install) tutorial.

Once Pharo is installed, you will write and try out code in a **Playground**. A Playground is a simple window where you can type pieces of code and run them immediately. To open one, right‑click on the Pharo desktop and choose Playground.

**We encourage you to follow this tutorial hands‑on:** type each example in a Playground and try evaluating, printing, and inspecting it yourself.


### Evaluating (Ctrl+D)

To evaluate an expression (make Pharo run it), select it and press `Ctrl+D` if you are using Windows or Linux, or `Cmd+D` if you are using Mac. Pharo will execute the code but won’t display a value. To see a value, use Print it or Inspect it (next sections).

For example, if you type the following code into the Playground, then select it and press `Ctrl+D`, it will open a cool interactive tutorial called ProfStef that will teach you the basics of Pharo syntax.

```Smalltalk
ProfStef go.
```

### Printing (Ctrl+P)

To evaluate the expression and print the result, use `Ctrl+P` (or `Cmd+P` on Mac). Printing will show the result as a comment next to the code. This is useful when you want to quickly see the value produced by an expression.

Try it by typing the following expressions into your Playground, then selecting each line and pressing `Ctrl+P`. You can also select all three expressions at the same time. In that case, all of them will be evaluated but only the result of the last one will be printed.

```Smalltalk
10 * 4 + 2.
'Hello ', 'world!'.
true not.
```

### Inspecting (Ctrl+I)

To evaluate the expression and inspect the result, use `Ctrl+I` (or `Cmd+I` on Mac). Inspecting opens a new window showing the object in detail. You can explore the object's attributes and send messages to it to make it do things. Inspecting is one of the most powerful tools in Pharo. 

Try inspecting the following expressions one by one.

```Smalltalk
#(apple banana orange).
Color red.
Date today.
Time now.
Smalltalk ui icons.
```

To go further, check our guide [Basics of the Pharo Environment](pharo-environment), where you can learn more about  the Playground, Inspector and several other important tools. 

?> **Tip:** In the same way as in the Playground, you can evaluate, print, or inspect expressions almost anywhere you see source code in Pharo, such as in the System Browser, Inspector, Debugger, and many other tools.


## Classes, Objects and Messages

Before learning syntax, we need to understand three very important ideas: **classes**, **objects**, and **messages**.

- A **class** is like a blueprint or recipe. It describes how a certain kind of thing should look and behave. For example, the class `Wolf` describes what all wolves can do in a model.
- An **object** is a real instance created from a class. If the class is the blueprint for a house, the object is the actual house built from it. Each wolf in a simulation is an object of the class `Wolf`.
- We make objects do things by sending them **messages**. A message is like asking an object to perform an action or give us information.

## Variables

Variables are names that allow us to remember objects so we can use them later. For example, instead of always writing the number 10, we can give it a name like `numberOfRabbits` and reuse it.

In Pharo, variables do not store the object itself, but a **reference** to it. Think of them as labels pointing to objects.

We declare variables so that Pharo knows in advance which names we want to use. Temporary variables inside a method are declared between `| ... |`.

```Smalltalk
| numberOfRabbits numberOfWolves |
numberOfRabbits := 10.
numberOfWolves := 3.
```

> **Note on naming:** In Pharo we use **camelCase** notation: if a name is made of several words, we start with a lowercase letter and capitalize each following word (e.g., `numberOfRabbits`).
>
> - Variable names and method names must **always begin with a lowercase letter**.
> - Class names must **always begin with an uppercase letter** (e.g., `Wolf`, `Rabbit`).
> - A valid name must start with a letter, may contain letters and digits, and may also include underscores. It must not begin with a number, contain spaces, or include punctuation or special symbols.
> 
>These simple rules help keep code readable and consistent.

## Assignment

Use `:=` (colon + equal) to assign a value. Assignment means we give a variable a specific object to remember, so we can use that object later without rewriting it every time:

```Smalltalk
count := 5.
```

> **Note:** In some other programming languages the symbol for assignment is different: for example, in Python, Java or C it is `=`, and in R it is `<-`. In Pharo, **assignment is always** `:=`. The single equals sign `=` is used to **test if two expressions are equal**. Mixing them up is a very common beginner mistake: writing `=` instead of `:=` will not assign a value, it will only check equality.

## Comments

Anything between double quotes is a comment. Comments are notes written for humans, not for the computer: they help explain what the code does, why we wrote it a certain way, or to leave reminders for ourselves or others. Pharo ignores comments when running the program.

```Smalltalk
"this is a comment"
```