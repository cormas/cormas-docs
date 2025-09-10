# Basics of Pharo Environment

In this short guide we will teach you how to use navigate the Pharo environment and use 4 main tools: Playground, Inspector, System Browser, and Debugger. We will also teach you how to search for methods and classes with Spotter and how to browse implementors and senders of different methods and classes.

## TL;DR Useful Shortcuts

Here is the table of keyboard shortcuts that will be presented in this section:

| Action | Windows and Linux | Mac |
|---|---|---|
| Do-it (execute selected piece of code) | Ctrl+D | Cmd+D |
| Print-it (execute selected code and print the result) | Ctrl+P | Cmd+P |
| Inspect-it (execute selected code and open Inspector on the result) | Ctrl+I | Cmd+I |
| Open Playground | Ctrl+OP | Cmd+OP |
| Open Transcript | Ctrl+OT | Cmd+OT |
| Open SystemBroser | Ctrl+OB | Cmd+OB |
| Open Spotter | Shift+Enter | Shift+Enter |
| Browse implementors of selected method or class | Ctrl+M | Cmd+M |
| Browse senders of selected method or users of selected class | Ctrl+N | Cmd+N | 

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

You can also execute one specific line by placing your cursor on it, right clicking and selecting _Do it_ from the menu. Alternatively, you can use a keyboard shortcut _Ctrl+D_ on Windows and Linux or _Cmd+D_ on Mac. If you want to execute multiple lines at one, select them with your mouse and do the same.

![](_media/pharo-environment/playground-do-it.png)

Let's add some more lines, evaluate (execute) them and print the result. Don't worry if the variables are highlighted in red. This happens because they are not explicitly declared. But as soon as you execute your code in the Playground, it will automatically declare all varibles for you. Select the lines that you added, right-click and select _Print it_ from the menu. You can also use the shortcut _Ctrl+P_ or _Cmd+P_ on Mac. 

```smalltalk
a := 25.b := 75.a + b
```
![](_media/pharo-environment/playground-print-it.png)

## Inspector

The second important tool that you must learn is called _"Inspector"_. It is a window that represents an object. The default inspector will show you the propertioes of an object and allow you to interact with it by sending messages. You can also define custom tabs for an inspector to add custom representations (e.g., visualizations, tables, graphs, etc.) for your objects.

Let's start with a simple example. In your Playground, write the following, right-click on in and select _Inspect it_ from the menu. You can also use the keyboard shortcut _Ctrl+I_ or _Cmd+I_ on Mac.

```smalltalk
4@2
```
![](_media/pharo-environment/inspector-menu.png)

This will create a new instance of a Point class which represents a point `(4,2)` and open an inspector for this object. The default inspector tab is called _Raw_. It shows you the names and values of all instance variables. In our case, the object has two variables: `x` which holds the value 4 and `y` which holds the value 2.

![](_media/pharo-environment/inspector.png)

If you click on any variable in this tab, it will split the window and show another inspector on the right for the object that you selected. In the example below, I click on variable `x` and get an inspector of number 4 which is an instance of `Smallinteger`.

![](_media/pharo-environment/inspector-integer.png)

Notice that `Smallinteger` has a custom inspector tab called `Integer` which displays different representations of the number: hexadecimal, octal, binary, etc. Every class can define custom inspector tabs for its objects. For example, `Color indexedColors` returns an array of colors. If you inspect it, you will see a custom inspector tab for `Array` which displays the list of its elements. If you click on one element, you will see a custom inspector tab for `Color` which draws a rectangle of a given color.

![](_media/pharo-environment/inspector-colors.png)

To learn more about Inspector and to learn how to create custom tabs, read the [Inspector](https://github.com/pharo-open-documentation/pharo-wiki/blob/master/General/Inspector.md) article of [Pharo Wiki](https://github.com/pharo-open-documentation/pharo-wiki/).

## Transcript

Transcript is a simple logger that can be used to display string outputs. To open the Transcript window, you can either execute (Do it) `Transcript open`, click on _Browse > Transcript_ in the World Menu, or ue the keyboard shortcut _Ctrl+OT_ or _Cmd+OT_ on Mac. Once the Transcript window opens, it might already have some logs written in it. If you are using Pharo 13 or later, you can clear your Transcript by clicking on the _"Clear"_ button in the top-left corner. If you are on the earlier version of Pharo, execute `Transcript clear` in your Playground.

![](_media/pharo-environment/transcript-clear.png)

The simple way to write something on a Transcript is by sending a message `show:`. You can also send a message `cr` to create a new line. For example:

```smalltalk
Transcript show: 'Hello world!'; cr.
Transcript show: 'Lorem ipsum dolor sit amet'; cr.
```

A better way of doing so inside a method is by using `trace:` and `traceCr:` messages. Why is it better? Because you can override those messages and easily change all the logging in your application (e.g., log to file or disable logging):

```smalltalk
foo
	self traceCr: 'Hello world!'.
	self trace: 'Lorem ipsum '.
	slef traceCr: 'dolor sit amet'.
```

You can also send `trace` and `traceCr` messages to strings:

```smalltalk
'Hello world!' traceCr.
'Lorem ipsum ' trace.
'dolor sit amet' traceCr.
```

All the code spippets above produce the same Transcript log.

![](_media/pharo-environment/transcript-traceCr.png)

?> It is not a good practice to use Transcript for logging in your application. And even when you use it, there are good and bad ways of doing so. We recommend you to read [Transcript: the misunderstood global](https://thepharo.dev/2020/08/11/transcript-the-misunderstood-global/) - a short blog post by Stéphane Ducasse where he explains how not to use Transcript and proposes several alternatives. That being said, even though experienced Pharo programmers don't like Transcript, this tool is still used a by many people, so it's important that you know it.

## System Browser

SystemBrowser is arguably the most used tool in Pharo. Generally speaking, this is the tool where we write all of our code - except for those cases when we code inside a debugge - a powerful practice known as [eXtreme Test-Driven Development (XTDD)](https://rmod-pharo-mooc.lille.inria.fr/AdvancedDesignMooc/Videos/M02_S4_V2.mp4).

To open SystemBrowser, click on _Browse > System Browser_ in the World Menu. You can also use the keyboard shortcut _Ctrl+OB_ or _Cmd+OB_ on Mac. 

![](_media/pharo-environment/system-browser-open.png)

SystemBrowser window conists of 5 main sections:

1. **Packages** - all packages in your image, including those that define Pharo itself: the language, the environment, the graphics - everything is here. Since tere are many packages, you can filter them by name using the text input in the bottom.
2. **Classes** in the selected package.
3. **Protocols** in the selected ckass. Those are just groups of methods that allow us to organize them and quickly navigate large classes.
4. **Methods** in a selected class or protocol. If you click on the class, this section will show all of its methods. If you click on a protocol, you will only see methods from it.
5. **Source code** - if you click on a class, you will see a class definition. If you click on a method, you will see its implementation.

![](_media/pharo-environment/system-browser-sections.png)

Between the top 4 sections and the code section of SystemBrowser, there are some buttons that allow you to change what is displayed:

1. **Flat / Hierararchy** - switch between the flat view (all classes in the selected package) and hierarchy (all superclasses and subclasses of the selected class).
2. **Instance side / Class side** - switch between instance side and class side variables and methods.
3. **Methods / Variables** - by default, methods are selectedm which means that the third section (described above) contains protocols. If you select "Vars", the third section will display all the variables (instance side or class side depending on what you selected) as well as the variable inherited from superclasses. If you click on a variable, the fourth section will display methods that use the selected variable.

![](_media/pharo-environment/system-browser-buttons.png)

### Creating new packages, classes, and methods

To create a new package in a SystemBrowser, right-click on any existing package and select _"New package"_ from the menu. Type the name of your package in the dialog window and click _"OK"_. In this example, I create a package called _"Bookstore"_.

![](_media/pharo-environment/system-browser-new-package.png)

To create new class in an empty package, simply click on the _"New class"_ tab in the code section. You will get a default template of a class definition. Here `Object` is a superclass. `#MyClass` is the name of your class (pay attention that there it starts with a `#` because it is a Symbol). `slots:` accepts an array of instance variables. In the default template, this list is empty.

![](_media/pharo-environment/system-browser-new-class.png)

In this example, I create a class `Book` which is a subclass of `Object` and has two instance variables: `#title` and `#author` (both variable names are Symbols, so they also start with a `#`). When you change anything in the code section, you will see a little orange triangle in the top-right corner and an asterisk (*) at the beginning of the tab name. Those indicate that your changes were not saved. To save your changes, click `Ctrl+S` on Windows or Linux or `Cmd+S` on Mac. You can also right-click anywhere in the code section and select _"Accept"_ in the bottom of the menu.

!> Don't forget to save your code every time you modify a method implementation or class definition. You can do so with `Ctrl+S` on Windows or Linux or `Cmd+S` on Mac.

![](_media/pharo-environment/system-browser-new-class-definition.png)

To add a new instance side method, click on your class in the top part of the SystemBrowser, then click on the _"instance side"_ in the protocols section. The method template will appear in the code section. It will contain a method name (called `methodSelectorAndArgumentNames`), a comment, some temporary variable names, and a placeholder for statements.

![](_media/pharo-environment/system-browser-new-method.png)

Feel free to delete everything and start typing. The first line will be the name of your method (including the argument names). In this example, I will create a method `title:` which takes one argument called `aString` and assigns this value to the `title` variable. Don't forget to save your code after you have typed it.

![](_media/pharo-environment/system-browser-new-method-defined.png)

Pharo is smart, so it recognizes that my new method is an accessor and automatically classifies it into the `accessing` protocol. If you want to add a new protoccol, right-click anywhere in the protocols section, and select _"New protocol"_ in the menu. You can either select one of the existing protocols from the list or type a new protocol name and click _"OK"_. Once your new protocol has been added, you can drag-n-drop your method into it.

![](_media/pharo-environment/system-browser-new-method-defined.png)

?> To add more classes and methods, you can simply modify the code of the existing ones. As soon as you change the name and save it, a new class or method will be added.

## Debugger

## Spotter

## Finder

## Browse Implementors

## Browse Senders



