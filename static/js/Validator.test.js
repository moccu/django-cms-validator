import {Validator} from './Validator';
import {Rule} from './rules/Base';


class NoLinkTitleRule extends Rule {

	get name() {
		return 'noLinkTitle';
	}

	get label() {
		return 'The link has no title';
	}

	get selector() {
		return 'a';
	}

	validate(element) {
		return element.title !== undefined && element.title !== '';
	}
}

class NoLinkRelRule extends Rule {

	get name() {
		return 'NoLinkRel';
	}

	get label() {
		return 'The link has no rel-Attribute but uses target="_blank"';
	}

	get selector() {
		return 'a';
	}

	validate(element) {
		return !(element.target.toLowerCase() === '_blank' && element.rel === '');
	}
}



describe('The validator', () => {

	beforeEach(() => {
		document.body.innerHTML = `
			<div class="cms" id="cms">
				<div class="container" id="container">
					<button class="cms-btn-publish" id="button">Publish</button>
				</div>
			</div>
			<a href="/" id="link-title">I have no title</a>
			<a href="/" id="link-target" title="I have a title but no rel" target="_blank">I have no rel</a>
		`;
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('should have expected defaults', () => {
		const validator = new Validator();
		expect(Object.keys(validator.options)).toEqual([
			'rules',
			'selectors',
			'labels',
			'templates'
		]);
	});

	test('should have expected default rules', () => {
		const validator = new Validator();
		expect(validator.options.rules).toEqual([]);
	});

	test('should have expected default selectors', () => {
		const validator = new Validator();
		expect(validator.options.selectors).toEqual({
			publish: '.cms-btn-publish'
		});
	});

	test('should have expected default labels', () => {
		const validator = new Validator();
		expect(validator.options.labels).toEqual({
			layerTitle: 'Errors found',
			layerCheckboxLabel: 'I want to publish the site...'
		});
	});

	test('should have expected default templates', () => {
		const validator = new Validator();
		expect(validator.options.templates).toEqual({
			// Pass same reference but test object structure
			layer: validator.options.templates.layer
		});
	});

	test('should not add click listener on publish button when not call setup()', () => {
		const
			button = document.getElementById('button'),
			spy = jest.spyOn(button, 'addEventListener')
		;

		new Validator();
		expect(spy).not.toHaveBeenCalled();
	});

	test('should setup click listener on publish button', () => {
		var
			validator = new Validator(),
			button = document.getElementById('button'),
			spy = jest.spyOn(button, 'addEventListener')
		;

		validator.setup();
		expect(spy).toHaveBeenCalled();
	});

	test('should validate using given rules', () => {
		const validator = new Validator({rules: [NoLinkTitleRule, NoLinkRelRule]});

		expect(validator.validate()).toEqual([
			{
				element: document.getElementById('link-title'),
				label: 'The link has no title'
			},
			{
				element: document.getElementById('link-target'),
				label: 'The link has no rel-Attribute but uses target="_blank"'
			}
		]);
	});

	test('should create layer when user clicks on publish', () => {
		var validator = new Validator({rules: [NoLinkTitleRule, NoLinkRelRule]});
		validator.setup();

		document.getElementById('button').click();
		expect(document.querySelectorAll('.container.cms-validation-layer-container')).toHaveLength(1);
		expect(document.querySelectorAll('.cms-validation-layer-container .cms-validation-layer')).toHaveLength(1);
	});

	test('should create layer with title when user clicks on publish', () => {
		const validator = new Validator({rules: [NoLinkTitleRule, NoLinkRelRule]});

		validator.setup();
		document.getElementById('button').click();

		let title = document.querySelectorAll('.cms-validation-layer > p')
		expect(title).toHaveLength(1);
		expect(title[0].textContent).toBe('Errors found');
	});

	test('should create layer with rule labels when user clicks on publish', () => {
		const validator = new Validator({rules: [NoLinkTitleRule, NoLinkRelRule]});

		validator.setup();
		document.getElementById('button').click();

		let items = document.querySelectorAll('.cms-validation-layer > ul > li');
		expect(items).toHaveLength(2);
		expect(items[0].textContent).toBe('The link has no title');
		expect(items[1].textContent).toBe( 'The link has no rel-Attribute but uses target="_blank"');
	});

	test('should create layer with checkbox when user clicks on publish', () => {
		const validator = new Validator({rules: [NoLinkTitleRule, NoLinkRelRule]});

		validator.setup();
		document.getElementById('button').click();

		let
			label = document.querySelectorAll('.cms-validation-layer > label'),
			checkbox = document.querySelectorAll('.cms-validation-layer > label > input[type="checkbox"]'),
			span = document.querySelectorAll('.cms-validation-layer > label > span')
		;

		expect(label).toHaveLength(1);
		expect(label[0].getAttribute('for')).toBe('cms-validator-ignore');

		expect(checkbox).toHaveLength(1);
		expect(checkbox[0].id).toBe('cms-validator-ignore');
		expect(checkbox[0].name).toBe('cms-validator-ignore');
		expect(checkbox[0].value).toBe('ignore');

		expect(span).toHaveLength(1);
		expect(span[0].textContent).toBe('I want to publish the site...');
	});

	test('should prevent user from publish the page when contains errors', () => {
		const
			validator = new Validator({rules: [NoLinkTitleRule, NoLinkRelRule]}),
			button = document.getElementById('button'),
			helper = {callback: () => {}},
			spy = jest.spyOn(helper, 'callback')
		;

		validator.setup();
		button.addEventListener('click', helper.callback);
		button.click();

		expect(spy).not.toHaveBeenCalled();
	});

	test('should publish the page when not contains errors', () => {
		const
			validator = new Validator({rules: []}),
			button = document.getElementById('button'),
			helper = {callback: () => {}},
			spy = jest.spyOn(helper, 'callback')
		;

		validator.setup();
		button.addEventListener('click', helper.callback);
		button.click();

		expect(spy).toHaveBeenCalled();
	});

	test('should publish the page when the user forces publishing by checking the checkbox in layer', () => {
		const
			validator = new Validator({rules: [NoLinkTitleRule, NoLinkRelRule]}),
			button = document.getElementById('button'),
			helper = {callback: () => {}},
			spy = jest.spyOn(helper, 'callback')
		;

		validator.setup();
		button.addEventListener('click', helper.callback);
		button.click();

		expect(spy).not.toHaveBeenCalled();

		document.querySelectorAll('.cms-validation-layer > label > input[type="checkbox"]')[0].checked = true;
		button.click();

		expect(spy).toHaveBeenCalled();
	});

	test('should update layer when user fixes errors', () => {
		const
			validator = new Validator({rules: [NoLinkTitleRule, NoLinkRelRule]}),
			button = document.getElementById('button')
		;

		validator.setup();
		button.click();

		let items = document.querySelectorAll('.cms-validation-layer > ul > li');
		expect(items).toHaveLength(2);
		expect(items[0].textContent).toBe('The link has no title');
		expect(items[1].textContent).toBe( 'The link has no rel-Attribute but uses target="_blank"');

		document.getElementById('link-title').title = 'A title fixes this rule';
		button.click();
		items = document.querySelectorAll('.cms-validation-layer > ul > li');
		expect(items).toHaveLength(1);
		expect(items[0].textContent).toBe( 'The link has no rel-Attribute but uses target="_blank"');
	});

});
