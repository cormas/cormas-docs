---
title: Custom Grid
sidebar_position: 2
slug: /custom-grid
---

import ImgGrid from './img/grid.png';

This tutorial will teach you how to create custom maps for your models by assigning different states to the cells. This is useful if you want, for example, to create a forest in one corner of your grid, a village on the other side, or any other spatial configuration that fits your scenario.

Here is the general idea:

1. Define a matrix of integers representing different land types (e.g., 0 = empty, 1 = forest).

2. Write a method that applies the matrix to your grid cells.

3. Integrate it into your scenario initialization so that the map is reproducible.

We will illustrate the approach with the Firefighters model. The same approach works for farmland/urban maps, roads/water networks, protected areas, and more.

## Step 0 - Load the Firefighters model

This tutorial is based on the Firefighters model. To follow along, first install the model by opening `Cormas > Models` in your Cormas image, selecting the _Firefighters_ model from the _Model library_, and clicking _Load_.

The Firefighters model has one cell class called `FMPlot`. A cell can have three states: `#empty`, `#forest` and `#fire`. The `FMPlot` class provides three boolean (true / false)  methods to check the state of a cell: `isEmpty`, `isForest`, `isFire` and three methods that can be used to change the state: `beEmpty`, `beForest` and `beFire`.

:::tip
It is not a good practice to expose the state variable of an entity. If you directly assign symbols such as `#forest` to your state instance variable from outside of the entity class, this can lead to all kinds of different errors that are difficult to debug (for example, if you type `#Forest` or `#forst` instead of `#forest`). A good practice is to keep your state variable private and provide methods such as `isForest` and `beForest` to get and set the state from other classes.
:::

Here is an example of how those methods can be used:

```smalltalk title="Playground"
plot := FMPlot new.
plot isEmpty. "true - the default state of a new plot is #empty"

plot beForest. "we change the state to #forest"

plot isEmpty. "false - now the plot is not empty"
plot isForest. "true - now it is forested"
```

The  existing init methods of the Firefighters model create a 30x30 grid with randomly distributed forest cells. **In this tutorial, we will add a new init method called `initMap` that will create forested cells in a specific pattern.**

## Step 1 — Define a state matrix

Add a method to `FMFirefightersModel` that returns a matrix of numbers. Each row is an Array of `0` (representing an empty plot) or `1`(representing a forested plot):

```smalltalk title="FMFirefightersModel"
stateMatrix
    "Return a sample map: 1 = forest, 0 = empty"
    ^ #(
        (1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0)
        (1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0 0)
        (1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 0 0 0 0)
        (1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0)
        (1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0)
        (1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0)
        (1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0)
        (1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 1 1 1 1 1 0 0 0 0 0 0 0 0 0)
        (1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0)
        (1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 0 0 0 0)
        (1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0 0 0)
        (1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1)
        (1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1)
        (1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1)
        (1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1)
        (1 1 1 1 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1)
        (1 1 1 1 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1)
        (1 1 1 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 1 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
        (1 1 0 0 0 0 0 0 0 0 0 1 1 1 1 1 0 0 0 0 1 1 1 1 1 1 1 1 1 1)
    )
```

:::danger Important
The matrix must match your grid size (rows x columns).
:::
:::tip
Here is an example query that you can use to ask ChatGPT or any other LLM to generate a nice-looking map for you:

```
Generate 30 lines of numbers. Each line must contain 30 numbers separated by spaces. Each number must be 0 (representing an empty area) or 1 (representing a forest). Use Perlin noise to make the pattern look natural. Around 60% of numbers must be 1. Each line must begin with 8 spaces and an opening parenthesis (. Each line must end with a closing parenthesis ).
```

[Perlin noise](https://en.wikipedia.org/wiki/Perlin_noise) is a type of gradient noise used to procedurally generating random terrains or patterns and making them look natural.
:::

## Step 2 — Apply the matrix to grid cells

Create a method that iterates over the matrix and assigns states to each cell:

```smalltalk title="FMFirefightersModel"
applyStatesFromMatrix: aMatrix

    | rows cols value cell |
    rows := aMatrix size.
    cols := (aMatrix first) size.

    1 to: rows do: [ :i |
        1 to: cols do: [ :j |
            cell := self cellAt: i at: j.
            value := (aMatrix at: i) at: j.
        
            value = 0 ifTrue: [ cell beEmpty ].
            value = 1 ifTrue: [ cell beForest ] ] ].
```

## Step 3 — Integrate into initialization

Finally, we will create a new init method that will create a 30x30 grid (just like the default init method of the Firefighters model) and then call our new `applyStatesFromMatrix:` method passing the matrix as an argument.

```smalltalk title="FMFirefightersModel"
initMap

    <init>
    self
        createGridNumberOfRows: 30
        numberOfColumns: 30
        neighbourhood: 8
        closed: true.
        
    self applyStatesFromMatrix: self stateMatrix.
```

Now if you open the simulation and select `initMap` as the init method, you should see a grid like this.

<img src={ImgGrid} style={{width: 350}} />

And that's it! Now you have anice custom map that can be easily modfied by changing the numbers in the `stateMatrix` method.

:::tip
You can use more than 2 states by using more numbers in the `stateMatrix` method (for example, 0 = empty, 1 = forest, 2 = sand, 3 = water) and adding more conditions to the `applyStatesFromMatrix:` to treat those cases:

```smalltalk
value = 0 ifTrue: [ cell beEmpty ].
value = 1 ifTrue: [ cell beForest ].
value = 2 ifTrue: [ cell beSand ].
value = 3 ifTrue: [ cell beWater ].
```

Remember that you must also define `beSand` and `beWater` in your cell class.
:::

