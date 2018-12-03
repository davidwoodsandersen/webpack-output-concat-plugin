# webpack-output-transform-plugin
[![CircleCI](https://circleci.com/gh/davidwoodsandersen/webpack-output-transform-plugin.svg?style=shield)](https://circleci.com/gh/davidwoodsandersen/webpack-output-transform-plugin) ![Coverage](./coverage/badge-lines.svg)

> A plugin to apply transformations to output files

## Usage

The plugin works by calling a user-defined function and passing it the output value as a string. It then takes the return value of that function and re-assigns it as the new output value:

```javascript
const OutputTransformPlugin = require('webpack-output-transform-plugin');

module.exports = {
  ...
  plugins: [
    new OutputTransformPlugin({
      all: (code) => { return makeAnyChangeTo(code); }
    })
  ]
};
```

If your build has one entry point or you want to apply the same change to all output files, use the `all` field as demonstrated above. If you want to apply different changes to different output files, use the `rules` field:

```javascript
const OutputTransformPlugin = require('webpack-output-transform-plugin');

module.exports = {
  entries: {
    app: __dirname + '/src/app.js',
    search: __dirname + '/src/search.js',
  },
  plugins: [
    new OutputTransformPlugin({
      rules: [
        {
          test: /app/,
          transform: (code) => { return change1(code); }
        },
        {
          test: /search/,
          transform: (code) => { return change2(code); }
        }
      ]
    })
  ]
};
```

### Options

|Name|Type|Description|
|----|----|-----------|
|`all`|`function`|Applies to all builds. If this field is set, it replaces the `rules` field.|
|`rules`|`array`|A rule includes a `test` (RegExp) and a `transform` (function). Each rule whose test matches an output filename applies its `transform` function to that file's content.|
