# pandat - universal data conversion

pandat converts all the things!


# ALPHA WARNING

pandat development is just beginning. Star/watch the project to find out when it's good to go!

## Usage

### pandat from the command line

Install pandat globally:

    npm install -g pandat


Convert a file between two formats:

    pandat <FormatA> <FormatB> < <FileA> > <FileB>


Show schema for format:

    pandat <FormatA>


### pandat from javascript

Install pandat module:

    npm install pandat

Converter from one format to another:

```js
var pandat = require('pandat.js');
var a2b = pandat(formatA, formatB);
var b_data = a2b(a_data);
```

Convert data from one format to another (shorthand):

```js
var pandat = require('pandat.js');
var b_data = pandat(formatA, formatB, a_data);
```


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


## pandat formats -- an example

How does pandat know what formats are? It has a large library of formats to convert between. These formats are specified using (a) component types, (b) conversion functions, and (c) encoding/decoding functions. pandat formats are specified using JSON-LD documents.

### the data

Let's look at an example. Say you have a few data sources. You have Contacts, from your email client, in json:

```json
[
  {
    "name": "Juan Benet",
    "email": "juan@benet.ai",
    "phone": "123-456-7890"
  },
  {
    "name": "Molly M",
    "email": "mollym@example.com",
    "phone": "123-456-7890"
  },
  ...
]
```

Call logs, from your phone company, in a csv:
```csv
FROM,TO,DATE,TIME,DURATION
(123) 456-7890,(456) 123-7890,04/01/2013,5:28pm,0:51
(456) 123-7890,(123) 456-7890,04/01/2013,10:15pm,3:27
(123) 456-7890,(456) 123-7890,04/03/2013,2:03pm,9:29
...
```

GPS data, from your intelligence-agency-sponsored homing implant, in XML:
```xml
<?xml version="1.0"?>
<readings>
  <reading>
    <lat>37.447462</lat>
    <lon>-122.160233</lon>
    <time>2013-04-01T20:28:00</time>
  </reading>
  <reading>
    <lat>37.424983</lat>
    <lon>-122.225887</lon>
    <time>2013-04-02T01:15:00</time>
  </reading>
  <reading>
    <lat>37.770498</lat>
    <lon>-122.445065</lon>
    <time>2013-04-03T18:03:00</time>
  </reading>
  ...
</readings>
```

Wouldn't it be nice to get all the data cleaned up and reformatted automatically? And wouldn't it be great to be able to generate a call history with meaningful names and locations? Something like:

```json
{
  "owner": "123.456.7890",
  "history": [
    {
      "to": "Molly M",
      "number": "456.123.7890",
      "date": "2013-04-01 17:28:00",
      "location": "Palo Alto, CA"
    },
    {
      "from": "Molly M",
      "number": "456.123.7890",
      "date": "2013-04-01 22:15:00",
      "location": "Atherton, CA"
    },
    {
      "to": "Molly M",
      "number": "456.123.7890",
      "date": "2013-04-01 22:15:00",
      "location": "San Francisco, CA"
    }
  ]
}
```

This is completely doable given format schemas and type conversions. All pandat needs is the right formats.

### the formats

(Common fields `[@context, @id, @type]` in formats omitted for simplicity).

The input format for the contacts:

```json
{
  "codec": "pandat/json",
  "schema": [ {
    "name": "pandat/person-name",
    "email": "pandat/email",
    "phone": "pandat/phone-number-usa-dotted"
  } ]
}
```


The input format for the call records:

```json
{
  "codec": "pandat/csv",
  "schema": {
    "FROM": "pandat/phone-number-usa-parens",
    "TO": "pandat/phone-number-usa-parens",
    "DATE": "pandat/date",
    "TIME": "pandat/time-of-day",
    "DURATION": "pandat/time-hms",
  }
}
```

The input format for the location records:

```json
{
  "codec": "pandat/xml",
  "schema": {
    "readings": [ {
      "reading": {
        "lat": "pandat/latitude",
        "lon": "pandat/longitude",
        "time": "pandat/date-iso"
      }
    } ]
  }
}
```

The output format you want:

```json
{
  "codec": "pandat/xml",
  "schema": {
    "owner": "pandat/phone-number-usa-dotted",
    "history": [ {
      "to": "pandat/person-name",
      "from": "pandat/person-name",
      "number": "pandat/phone-number-usa-dotted",
      "date": "pandat/date-iso-space",
      "location": "pandat/us-city-name"
    } ]
  }
}
```

Each of the `pandat/<name>` types are pandat modules that provide a type with conversions. The `pandat` part is needed because anyone can publish new codecs or types to pandat's index.

### the conversions

All the types referenced above (e.g. `pandat/person-name` and `pandat/date-iso`) have their own format description registered in pandat's index. For example

```json
{
  "@id": "https://pandat.io/pandat/date-iso",
  "@type": "string"
}
```

# work in progress



## FAQ

### Why javascript? Why not `<favorite other platform>`?


pandat aims to be widely adopted, easy to use for non-programers, and extremely portable. There are many other systems which are much better tuned -- or in Haskell's case, precisely the right tool -- for solving this particular problem. However, these are unfortunately not as portable or flexible as javascript.  If having to learn obscure syntax or installing obscure platforms were prerequisites, pandat would never be adoped by most users.

Besides, pandat should be able to run on websites :)
