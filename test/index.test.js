import OutputTransformPlugin from '../src/index.js';

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
