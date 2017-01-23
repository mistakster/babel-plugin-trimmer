# Babel plugin to remove unwanted code

[![Build Status](https://travis-ci.org/mistakster/babel-plugin-trimmer.svg?branch=master)](https://travis-ci.org/mistakster/babel-plugin-trimmer)

You can do “conditional compilation” with this plugin.
Babel can produce different output, which depends on directives inside JS file.

## Directives

Plugin directives are single line or block comments.

### trim-below

**Source:**

```js
const a = 1;
// trim-below
const b = 2;
```

**Result:**

```js
var a = 1;
```

### trim-above

**Source:**

```js
const a = 1;
// trim-above
const b = 2;
```

**Result:**

```js
const b = 2;
```

You can use both `trim-below` and `trim-above` directives at
the same time to cut middle part of the file.

## Advanced Techniques

Sometimes, you may want to remove actual “rendering” code but keep links to some external dependencies.
Here is an example of the component which depends on LESS-file.

```js
import styles from './testimonial.less';

// trim-below
import React, {Component} from 'react';

export default class Testimonial extends Component {
  render() {
    return (
      <div className="testimonial">
        {this.props.text}
      </div>
    );
  }
}
```

So, we keep that reference and build CSS styles for our component.
But at the same time we got rid of React things.

## Installation

```
npm install --save-dev babel-plugin-trimmer
```

## Usage

### Via .babelrc (Recommended)

**.babelrc**

```json
{
  "plugins": ["trimmer"]  
}
```

### Via CLI

```
babel --plugins trimmer script.js
```

### Via Node API

```
require('babel-core').transform('code', {
  plugins: ['trimmer']
});
```

## Links

* [AST Explorer](https://astexplorer.net/)
* [Babel Plugin Handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md)

## License

ISC
