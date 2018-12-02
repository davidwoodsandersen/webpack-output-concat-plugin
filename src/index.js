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
		this.validate(options);
		this.options = options;
	}

	/**
	 * Validates input options.
	 * @param {object} options
	 */
	validate(options) {
		if (!options.all && !options.rules)
			throw new Error('"all" or "rules" must be set');

		if (options.all && typeof options.all !== 'function')
			throw new Error('"all" must be a function');

		if (options.rules && !Array.isArray(options.rules))
			throw new Error('"rules" must be an array');
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
			this.options.all ?
				this.transformAll(params.assets, this.options.all) :
				this.transformByRule(params.assets, this.options.rules);
		});
	}
}

module.exports = OutputTransformPlugin;
