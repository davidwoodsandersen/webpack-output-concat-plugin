/**
 * @file webpack-output-transform-plugin
 * @author davidwoodsandersen
 */

/**
 * Creates a new plugin instance.
 * @class
 */
class OutputTransformPlugin {
	/**
	 * @constructs
	 */
	constructor(options) {
		this.options = options;
	}

	/**
	 * Apply a transformation to all output files.
	 * @param {object} assets
	 * @param {function} transform
	 */
	transformAll(assets, transform) {
		for (var asset in assets) {
			if (assets.hasOwnProperty(asset)) {
				assets[asset]._value = transform(assets[asset]._value);
			}
		}
	}

	/**
	 * Apply a transformation to files whose names
	 * match a RegEx rule.
	 * @param {object} assets
	 * @param {array} rules
	 */
	transformByRule(assets, rules) {
		rules.forEach((rule) => {
			for (var asset in assets) {
				if (assets.hasOwnProperty(asset) && rule.test.test(asset)) {
					assets[asset]._value = rule['transform'](assets[asset]._value);
				}
			}
		});
	}

	/**
	 * Called by webpack.
	 * @param {object} compiler
	 */
	apply(compiler) {
		compiler.hooks.emit.tap('OutputTransformPlugin', params => {
			if (typeof this.options.all === 'function') {
				this.transformAll(params.assets, this.options.all);
			} else if (Array.isArray(this.options.rules)) {
				this.transformByRule(params.assets, this.options.rules);
			} else {
				throw new Error('Must include an "all" field or an "entries" field.');
			}
		});
	}
}

module.exports = OutputTransformPlugin;
