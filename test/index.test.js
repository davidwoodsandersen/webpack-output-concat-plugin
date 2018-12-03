import OutputTransformPlugin from '../src/index.js';

function createCompilerStub() {
	return {
		hooks: {
			emit: {
				tap: (name, callback) => {
					callback({});
				}
			}
		}
	};
}

describe('input validation', () => {
	it('if no "all" or "rules" field is present, an error is thrown', () => {
		expect(() => {
			new OutputTransformPlugin({});
		}).toThrow();
	});
	it('if the "all" field is not a function, an error is thrown', () => {
		expect(() => {
			new OutputTransformPlugin({ all: 1 });
		}).toThrow();
	});
	it('if the "rules" field is not an array, an error is thrown', () => {
		expect(() => {
			new OutputTransformPlugin({ rules: 1 });
		}).toThrow();
	});
	it('if input is valid, an error is not thrown', () => {
		expect(() => {
			new OutputTransformPlugin({ rules: [] });
		}).not.toThrow();
		expect(() => {
			new OutputTransformPlugin({ all: () => {} });
		}).not.toThrow();
	});
});

describe('transformations', () => {
	it('transformAll() is called when the "all" flag is present', () => {
		var compilerStub = createCompilerStub();
		jest.spyOn(OutputTransformPlugin.prototype, 'transformAll')
			.mockImplementation(() => {});

		var plugin = new OutputTransformPlugin({
			all: () => {}
		});

		plugin.apply(compilerStub);

		expect(plugin.transformAll).toHaveBeenCalled();
	});
	it('transformByRule() is called when the "rules" flag is present', () => {
		var compilerStub = createCompilerStub();
		jest.spyOn(OutputTransformPlugin.prototype, 'transformByRule')
			.mockImplementation(() => {});

		var plugin = new OutputTransformPlugin({
			rules: []
		});

		plugin.apply(compilerStub);

		expect(plugin.transformByRule).toHaveBeenCalled();
	});
});
