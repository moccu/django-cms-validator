import {Rule} from './Base';


class TestRule extends Rule {

	get name() {
		return 'test-rule';
	}

	get label() {
		return 'Do not use .test elements in body!';
	}

	get selector() {
		return '.test';
	}

	validate(element) {
		return element.parentElement !== document.body;
	}
}


describe('The base rule', () => {

	beforeEach(() => {
		document.body.innerHTML = `
			<div class="test" id="one"></div>
			<div class="test" id="two"></div>
			<div class="test" id="three"></div>
			<div class="cms">
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
			</div>
			<div class="test" id="four"></div>
			<div class="cms">
				<div class="test"></div>
				<div class="test"></div>
				<div class="test"></div>
			</div>
		`;
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('should throw an error when no valid name getter is defined', () => {
		var rule = new Rule();
		expect(() => {rule.name}).toThrowError('Define a name for rule.');
	});

	test('should throw an error when no valid label getter is defined', () => {
		var rule = new Rule();
		expect(() => {rule.label}).toThrowError('Define a message label for rule.');
	});

	test('should throw an error when no valid selector getter is defined', () => {
		var rule = new Rule();
		expect(() => {rule.selector}).toThrowError('Define a selector for rule.');
	});

	test('should throw an error when no validation function is set', () => {
		var rule = new Rule();
		expect(rule.validate).toThrowError('Define validation for rule.');
	});

	test('should return default exclude selector', () => {
		var rule = new Rule();
		expect(rule.excludeSelector).toBe('.cms');
	});

	test('should exclude elements inside exclude selector from validation', () => {
		var
			rule = new TestRule(),
			spy = jest.spyOn(rule, 'validate')
		;

		rule.test();
		expect(spy).toHaveBeenCalledTimes(4);
	});

	test('should return element and label in errors', () => {
		var rule = new TestRule();
		expect(rule.test()).toEqual([
			{element: document.getElementById('one'), label: rule.label},
			{element: document.getElementById('two'), label: rule.label},
			{element: document.getElementById('three'), label: rule.label},
			{element: document.getElementById('four'), label: rule.label}
		]);
	});

	test('should use custom label for test from options', () => {
		var
			label = 'This is a custom label by name',
			rule = new TestRule({labels: {'test-rule': label}})
		;

		expect(rule.test()).toEqual([
			{element: document.getElementById('one'), label},
			{element: document.getElementById('two'), label},
			{element: document.getElementById('three'), label},
			{element: document.getElementById('four'), label}
		]);
	});

});
