# pandat - universal data conversion

pandat converts all the things!


# ALPHA WARNING

pandat development is just beginning. Star/watch the project to find out when it's good to go!

## pandat story

Imagine you have a data file, that can be represented in two formats, `A` and `B`.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/anb.png)

You'd like to convert from one format to the other `A -> B`, so you look for a program to convert the file. If there isn't one, you write your own.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/a2b.png)

Maybe your program is smart enough to convert in both directions, but maybe that means an entirely different program

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/b2a.png)


Say you have a _third_ format `C`. Uh oh, that could mean up to _four more_ programs.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/4conv.png)

So, though sometimes there are smart programs that will leverage intermediate conversions (say, `A -> C` expands to `A -> B -> C`), this is generally inefficient, potentially causing a `N to N^2` blowup in the number of programs to write.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/inefficient.png)

This is particularly annoying because often the conversions are simple transformations

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/types1.png)

Or even simpler, just re-arrangements

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/types2.png)

There's got to be a better way. What if there was some way to represent _all_ data, and build converters between _that one format_ and all others?

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/hub.png)

This is how [Pandoc](http://johnmacfarlane.net/pandoc/) (document converter) and [LLVM](http://llvm.org) (compiler) work:

![](http://jbenet.static.s3.amazonaws.com/f44a8a0/llvm-three-phase-design.png)

The problem is that picking _THE universal data format_ is hard. In a way, all data is part of the same hyperspace, and a particular dataset is just a projection into a subspace. So it's just a matter of finding to the right _dimensions_. For example, the simple transformation earlier is really just a projection from one set of dimensions to another. The _values_ of the data are  the same. The dimensions are the _types_.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/types1.png)

So what if we already have our magical _universal data representation_, and it is just the combination of all others? What if our magical multi-format conversion tool is just a matter of defining the right _types_ and their _conversions_? Imagine if we had a massive library of types and conversion functions:

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/typesnfuncs.png)

We should be able to build larger types that uniquely match each format -- let's call these `schemas`. The conversion between two formats would just be the aggregate conversions between the component types:

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/schemaswtypes.png)


So, given the (a) types, (b) type conversion functions, and (c) schemas, _one_ dumb tool should be able to convert two formats.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/schema1.png)

If the tool needed to convert between a brand new format, it would just be a matter of defining the schema, and potentially some new types and functions. Most formats reuse types, so this gets easier over time.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/schema2.png)

[Pandat](http://github.com/jbenet/pandat) is this _dumb_ but super-efficient multi-format conversion tool.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/efficient.png)

The secret sauce is in the shared library of (a) types, (b) conversion functions, and (c) schemas.

![](https://raw.githubusercontent.com/jbenet/pandat/master/dev/img/library.png)
