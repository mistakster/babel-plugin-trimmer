# Babel plugin to remove unwanted code

[![Build Status](https://travis-ci.org/mistakster/babel-plugin-trimmer.svg?branch=master)](https://travis-ci.org/mistakster/babel-plugin-trimmer)

It can help to remove a portion of code without changes.

## Example

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

## Using with React components

Sometimes, you may want to remove actual “rendering” code but keep links to some external dependencies.
Here is an example of the component which depends on LESS-file.

```js
import styles from './testimonial.less';

// trim-below
import React from 'react';
import {PureComponent} from 'react-pure-render';

export default class Testimonial extends PureComponent {
  render() {
    return (
      <div className="testimonial">{this.props.text}</div>
    );
  }
}
```

So, we keep that reference and build CSS styles for our component.
But at the same time we got rid of React things.

## Links

* [AST Explorer](https://astexplorer.net/)
* [Babel Plugin Handbook](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/plugin-handbook.md)
