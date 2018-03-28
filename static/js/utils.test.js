import {find} from './utils';


describe('The find util', () => {

	beforeEach(() => {
		document.body.innerHTML = `
			<div class="test" id="one"></div>
			<div class="test" id="two"></div>
			<div class="test" id="three"></div>
			<div class="inner">
				<div class="test" id="four"></div>
				<div class="test" id="five"></div>
				<div class="test" id="six"></div>
			</div>
		`;
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('should find elements', () => {
		expect(find('.test')).toEqual([
			document.getElementById('one'),
			document.getElementById('two'),
			document.getElementById('three'),
			document.getElementById('four'),
			document.getElementById('five'),
			document.getElementById('six')
		]);
	});

	test('should find elements by specific root', () => {
		var root = document.getElementsByClassName('inner')[0];
		expect(find('.test', root)).toEqual([
			document.getElementById('four'),
			document.getElementById('five'),
			document.getElementById('six')
		]);
	});

});
