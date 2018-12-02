# webpack-output-transform-plugin

> A plugin to transform to output files

This plugin allows you to make arbitrary last-minute changes to webpack build files before they are output.

## Usage

The plugin works by calling a user-defined function and passing it the output value as a string. It then takes the return value of that function and re-assigns it as the new output value.

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

If your build has one entry point or you want to apply the same change to all output files, use the `all` field as demonstrated above. If you want to apply different changes to different output files, use the `entries` field:

```javascript
const OutputTransformPlugin = require('webpack-output-transform-plugin');

module.exports = {
	...
	plugins: [
		new OutputTransformPlugin({
			entries: {
				'main.build.js': (code) => { return change1(code); },
				'search.build.js': (code) => { return change2(code); },
				...
			}
		})
	]
};
```

### Options

|Name|Type|Description|
|----|----|-----------|
|`all`|`function`|Applies to all builds. If this field is set, it takes precedence over `entries`.|
|`entries`|`object`|Key-value pairs where the key is the name of the output file, and the value is the function to use when transforming the code.|
