# Basics of Pharo Environment

In this short guide we will teach you how to use navigate the Pharo environment and use 4 main tools: Playground, Inspector, System Browser, and Debugger. We will also teach you how to search for methods and classes with Spotter and how to browse implementors and senders of different methods and classes.

## Welcome Window

When you first open a Pharo image, you will be presented with a Welcome window. It contains a lot of useful information, including links to our learning resources, `ProfStef` tutorial, different themes for Pharo, etc.

![](_media/pharo-environment/welcome-window.png)

You can navigate through the Welcome Window by clicking on little arrows on the left and right sides.

![](_media/pharo-environment/welcome-window-arrows.png)

If you close the Welcome Window and want to open it again later, you can do so by clicking on _About > Welcome to Pharo_.

![](_media/pharo-environment/welcome-window-menu.png)

## World Menu

Once you close the welcome window, you will be presented with an empty environment with a Pharo logo in the top-left corner. This space is called _"Pharo World"_. On top of your world, you wll see a menu which we call _"World Menu"_. It allows us to access all the main tools of Pharo, manage Pharo image, access image settings, etc.

![](_media/pharo-environment/world-menu-top.png)

You can also access World Menu by right-clicking anwhere in your world. It will be exactly the same menu.

![](_media/pharo-environment/world-menu-context.png)

## Playground

The first tool that you will learn is called _"Playground"_. It allows us to execute code and try different code snippets. As a general rule, **we don't program in Playground**. As the name suggests, it is only used for trying out different things. The actual code is written in _"System Browser"_, a tool that will be presented in the following sections. To open Playground, you can select _Browse > Playground_ in your world menu. You can also use a keyboard shortcut _Ctrl+OP_ on Windows or Linux or _Cmd+OP_ on Mac.

![](_media/pharo-environment/playground-open.png)

Copy the following two lines to your Playground and click on _"Do it all"_ button in the top-left corner.

```smalltalk
StWelcomeBrowser open.Transcript open.
```

![](_media/pharo-environment/playground-do-it-all.png)

This button executes the entire contents of your Playground. In this case, it will execute two lines that we wrote: first it will open the Welcome Window, then it will open a Transcript (another tool that you will learn in the following sections). _"Do it all"_ button will also open an inspector in the right half of your Playground on the object returned by the last line. We will explain Inspector in the next sections. For now, you can just close it by clicking on the little cross in the top-right corner.

![](_media/pharo-environment/playground-close-inspector.png)

## Inspector

## System Browser

## Debugger

## Spotter

## Finder

## Browse Implementors

## Browse Senders

