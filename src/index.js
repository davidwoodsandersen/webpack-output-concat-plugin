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
	 * Returns a map of output asset
	 * filenames to their transform action.
	 * @param {object} assets
	 * @returns {object}
	 */
	getTargetMap(assets) {
		var map = {};

		if (typeof this.options.all === 'function') {
			Object.keys(assets).forEach((asset) => {
				map[asset] = this.options.all;
			});
		} else if (Array.isArray(this.options.entries)) {
			this.options.entries.forEach((entry) => {
				map[entry] = this.entries[entry];
			});
		} else {
			throw new Error('Must include an "all" field or an "entries" field.');
		}

		return map;
	}

	/**
	 * Called by webpack.
	 * @param {object} compiler
	 */
	apply(compiler) {
		compiler.hooks.emit.tap('OutputTransformPlugin', params => {
			var map = this.getTargetMap(params.assets);

			for (var entry in map) {
				if (map.hasOwnProperty(entry)) {
					params.assets[entry]._value = map[entry](params.assets[entry]._value);
				}
			}
		});
	}
}

module.exports = OutputTransformPlugin;
