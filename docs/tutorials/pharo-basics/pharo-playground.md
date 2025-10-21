---
title: Running Code in Playground
sidebar_position: 2
slug: /run-code-in-playground
---

# Running Code in Pharo Playground

Before starting, make sure you already have Pharo installed. If not, follow the Installing Pharo section from our [How to Install Cormas](/download) tutorial.

Once Pharo is installed, you will write and try out code in a **Playground**. A Playground is a simple window where you can type pieces of code and run them immediately. To open one, right‑click on the Pharo desktop and choose Playground.

**We encourage you to follow this tutorial hands‑on:** type each example in a Playground and try evaluating, printing, and inspecting it yourself.


## Evaluating (Ctrl+D)

To evaluate an expression (make Pharo run it), select it and press `Ctrl+D` if you are using Windows or Linux, or `Cmd+D` if you are using Mac. Pharo will execute the code but won’t display a value. To see a value, use Print it or Inspect it (next sections).

For example, if you type the following code into the Playground, then select it and press `Ctrl+D`, it will open a cool interactive tutorial called ProfStef that will teach you the basics of Pharo syntax.

```Smalltalk
ProfStef go.
```

## Printing (Ctrl+P)

To evaluate the expression and print the result, use `Ctrl+P` (or `Cmd+P` on Mac). Printing will show the result as a comment next to the code. This is useful when you want to quickly see the value produced by an expression.

Try it by typing the following expressions into your Playground, then selecting each line and pressing `Ctrl+P`. You can also select all three expressions at the same time. In that case, all of them will be evaluated but only the result of the last one will be printed.

```Smalltalk
10 * 4 + 2.
'Hello ', 'world!'.
true not.
```

## Inspecting (Ctrl+I)

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

:::tip
In the same way as in the Playground, you can evaluate, print, or inspect expressions almost anywhere you see source code in Pharo, such as in the System Browser, Inspector, Debugger, and many other tools.
:::