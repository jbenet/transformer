# transformer - universal data conversion

`transformer` converts all the things!

- See [transform.datadex.io](http://transform.datadex.io)
- Try it out: [transformer in the browser!](http://transform.datadex.io/browser)

[![dat](http://img.shields.io/badge/Development%20sponsored%20by-dat-green.svg?style=flat)](http://dat-data.com)

[![NPM](https://nodei.co/npm/dat-transformer.png?downloads=true&stars=true)](https://nodei.co/npm/dat-transformer/)

# ALPHA WARNING

transformer development is just beginning. Star/watch the project to find out when it's good to go!

## Usage

### transformer from the command line

Install transformer globally:

    npm install -g dat-transformer


Need to convert from unix-time to iso-date?

```
# install the types + conversions (globally)
> transformer install -g string number integer unix-time js-date iso-date string
Installed:
- transformer.string
- transformer.string-to-number
- transformer.number
- transformer.number-to-integer
- transformer.integer
- transformer.unix-time
- transformer.unix-time-to-js-date
- transformer.js-date
- transformer.js-date-to-iso-date
- transformer.iso-date

> echo 1398810849 | transform -g number integer unix-time js-date iso-date
2014-04-29T22:34:09.000Z
```

Or an IP address to its hex value?

```
> transformer install -g string ip-address buffer hex string
Installed:
- transformer.string
- transformer.hex
- transformer.hex-to-buffer
- transformer.buffer
- transformer.buffer-to-ip-address
- transformer.ip-address

> echo "127.0.0.1" | transform -g ip-address buffer hex
7f000001
```

Show description for type:

```
# transformer src <type>
> transformer src iso-date
{
 "@context": "http://transformer.io/context/transformer.jsonld",
 "id": "transformer/iso-date",
 "description": "ISO 8601 date format: 2006-01-02T15:04:05Z07:00"
}
```

Boom.


### transformer from javascript

Install transformer module:

    npm install transformer

Converter from one format to another:

```js
var transformer = require('transformer');
var a2b = transformer(formatA, formatB);
var b_data = a2b(a_data);
```

Convert data from one format to another (shorthand):

```js
var transformer = require('transformer');
var b_data = transformer(formatA, formatB, a_data);
```

For example:

```js
// convert unixtime date to iso date
var transformer = require('transformer');
var unix2iso = transformer('unix-time','iso-date')
var unix = 1397788143
var iso = unix2iso(unix)
//'2014-04-18T02:29:03'

// convert iso date to unixtime date
var iso2unix = transformer('iso-date','unix-time')
var unix2 = iso2unix(iso)
// 1397788143
```

### more examples

I'll use command-line syntax here, because it's cleaner. But everything
is available in the command-line, in js, and (soon!) in the browser.
Note that these examples are longer than intended, as they are the full
pipelines of the type conversions (`string | iso-date | js-date | unix-time |
integer | number`). Once type inference is built, this will be a lot nicer
(see second set of examples below).

```
> echo '2014-05-02T09:51:03.000Z' | transform iso-date js-date unix-time integer number
1399024263

> echo 1399024263 | transform number integer unix-time js-date iso-date
2014-05-02T09:51:03.000Z

> echo 1234.3123 | transform number integer number
1234

> echo '127.0.0.1' | transform ip-address buffer hex
7f000001

> echo '127.0.0.1' | transform ip-address buffer base32
c9gq6t9k68

> echo '127.0.0.1' | transform ip-address buffer base64
fwAAAQ==

> echo 'fwAAAQ==' | transform base64 buffer ip-address
127.0.0.1

> echo "<foo>bar</foo>" | transform xml-string jsonml json
["foo","bar"]
```

Once https://github.com/jbenet/transformer/issues/8 is addressed, these should
be expressible as:

```
> echo '2014-05-02T09:51:03.000Z' | transform iso-date unix-time
1399024263

> echo 1399024263 | transform unix-time iso-date
2014-05-02T09:51:03.000Z

> echo 1234.3123 | transform integer
1234

> echo '127.0.0.1' | transform ip-address hex
7f000001

> echo '127.0.0.1' | transform ip-address base32
c9gq6t9k68

> echo '127.0.0.1' | transform ip-address base64
fwAAAQ==

> echo 'fwAAAQ==' | transform base64 ip-address
127.0.0.1

> echo "<foo>bar</foo>" | transform xml-string json
["foo","bar"]
```

## Development

Transformer is part of [Dat Project](http://dat-data.com). It is designed to be modular. All types and conversions are npm modules.

Transformer's core is modular itself. See:

- [transformer-type](https://github.com/jbenet/transformer-type) - use it to make a transformer type
- [transformer-conversion](https://github.com/jbenet/transformer-conversion) - use it to make a transformer conversion
- [transformer-compose](https://github.com/jbenet/transformer-compose) - composes conversions
- [transformer-resolve](https://github.com/jbenet/transformer-resolve) - resolves types into the conversion pipeline between them. (dumb atm)
- [transformer-loader](https://github.com/jbenet/transformer-loader) - dynamic loading of transformer modules
- [transformer-compile](https://github.com/jbenet/transformer-loader) - compiles a conversion pipeline into a single module (uses requires).
  - Bundle compiled transformers with [browserify](https://github.com/substack/node-browserify)
- [transformer](https://github.com/jbenet/transformer) (this module) - all core as one library, and two command line tools:
  - `transformer` - utility to install, resolve, and compile transformer modules
  - `transform <types> < <infile> > <outfile>` - expose any transformer as a pipe-loving unix utility

For making your own types and conversions:

- [transformer-pkg](https://github.com/jbenet/transformer-pkg) - cli tool to make, test, publish types + conversions in under one minute (ACT NOW!!!)
- [transformer-test](https://github.com/jbenet/transformer-test) - tests your types + conversions (used by `transformer-pkg`)

Other:

- [transformer-website](https://github.com/jbenet/transformer-website) - the website: http://transform.datadex.io



## transformer story

Imagine you have a data file, that can be represented in two formats, `A` and `B`.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/anb.png)

You'd like to convert from one format to the other `A -> B`, so you look for a program to convert the file. If there isn't one, you write your own.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/a2b.png)

Maybe your program is smart enough to convert in both directions, but maybe that means an entirely different program

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/b2a.png)


Say you have a _third_ format `C`. Uh oh, that could mean up to _four more_ programs.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/4conv.png)

So, though sometimes there are smart programs that will leverage intermediate conversions (say, `A -> C` expands to `A -> B -> C`), this is generally inefficient, potentially causing a `N to N^2` blowup in the number of programs to write.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/inefficient.png)

This is particularly annoying because often the conversions are simple transformations

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/types1.png)

Or even simpler, just re-arrangements

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/types2.png)

There's got to be a better way. What if there was some way to represent _all_ data, and build converters between _that one format_ and all others?

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/hub.png)

This is how [Pandoc](http://johnmacfarlane.net/pandoc/) (document converter) and [LLVM](http://llvm.org) (compiler) work:

![](http://jbenet.static.s3.amazonaws.com/f44a8a0/llvm-three-phase-design.png)

The problem is that picking _THE universal data format_ is hard. In a way, all data is part of the same hyperspace, and a particular dataset is just a projection into a subspace. So it's just a matter of finding to the right _dimensions_. For example, the simple transformation earlier is really just a projection from one set of dimensions to another. The _values_ of the data are  the same. The dimensions are the _types_.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/types1.png)

So what if we already have our magical _universal data representation_, and it is just the combination of all others? What if our magical multi-format conversion tool is just a matter of defining the right _types_ and their _conversions_? Imagine if we had a massive library of types and conversion functions:

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/typesnfuncs.png)

We should be able to build larger types that uniquely match each format -- let's call these `schemas`. The conversion between two formats would just be the aggregate conversions between the component types:

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/schemaswtypes.png)


So, given the (a) types, (b) type conversion functions, and (c) schemas, _one_ dumb tool should be able to convert two formats.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/schema1.png)

If the tool needed to convert between a brand new format, it would just be a matter of defining the schema, and potentially some new types and functions. Most formats reuse types, so this gets easier over time.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/schema2.png)

[transformer](http://github.com/jbenet/transformer) is this _dumb_ but super-efficient multi-format conversion tool.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/efficient.png)

The secret sauce is in the shared library of (a) types, (b) conversion functions, and (c) schemas.

![](https://raw.githubusercontent.com/jbenet/transformer/master/dev/img/library.png)


## transformer formats -- an example

How does transformer know what formats are? It has a large library of Types (formats), and Conversion functions. These compose. They are specified using JSON-LD documents and javascript code (conversions).

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

This is completely doable given format schemas and type conversions. All transformer needs is the right formats.

### the types (formats)

(Common fields `[@context, id, type]` in formats omitted for simplicity).

The input type for the contacts:

```json
{
  "codec": "json",
  "schema": [ {
    "name": "person-name",
    "email": "email-address",
    "phone": "phone-number-usa-dotted"
  } ]
}
```


The input type for the call records:

```json
{
  "codec": "csv",
  "schema": {
    "FROM": "phone-number-usa-parens",
    "TO": "phone-number-usa-parens",
    "DATE": "date",
    "TIME": "time-of-day",
    "DURATION": "time-hms",
  }
}
```

The input type for the location records:

```json
{
  "codec": "xml",
  "schema": {
    "readings": [ {
      "reading": {
        "lat": "latitude",
        "lon": "longitude",
        "time": "iso-date"
      }
    } ]
  }
}
```

The output type you want:

```json
{
  "codec": "json",
  "schema": {
    "owner": "phone-number-usa-dotted",
    "history": [ {
      "to": "person-name",
      "from": "person-name",
      "number": "phone-number-usa-dotted",
      "date": "iso-date-space",
      "location": "us-city-name"
    } ]
  }
}
```

Each of the `transformer/<name>` `types` are transformer modules that link transformer objects and allow transformer to find the relevant functions. The `transformer/` part here shows anyone can publish new conversions or types to transformer's index.

### the conversions

All the types referenced above (e.g. `transformer/person-name` and `transformer/iso-date`) have their own format description registered in transformer's index. For example

```json
{
  "id": "https://transformer.io/transformer/iso-date",
  "type": "string"
}
```

# work in progress



## FAQ

### Why javascript? Why not `<favorite other platform>`?


transformer aims to be widely adopted, easy to use for non-programers, and extremely portable. There are many other systems which are much better tuned -- or in Haskell's case, precisely the right tool -- for solving this particular problem. However, these are unfortunately not as portable or flexible as javascript.  If having to learn obscure syntax or installing obscure platforms were prerequisites, transformer would never be adoped by most users.

Besides, transformer should be able to run on websites :)

### How do you write modules?

A longer description will be available, but for now see: https://github.com/jbenet/transformer-pkg

