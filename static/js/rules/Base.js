import {find} from '../utils';


export class Rule {

	constructor(options = {}) {
		this.options = options;
	}

	get name() {
		throw new Error('Define a name for rule.');
	}

	get label() {
		throw new Error('Define a message label for rule.');
	}

	get selector() {
		throw new Error('Define a selector for rule.');
	}

	get excludeSelector() {
		return '.cms';
	}

	_log(element) {
		const
			{labels} = this.options,
			label = (labels || {})[this.name] || this.label
		;

		return {element, label};
	}

	test() {
		const excludes = find(this.excludeSelector);
		let errors = [];

		find(this.selector).forEach(element => {
			let contains = false;
			excludes.forEach(exclude => contains = contains || exclude.contains(element));

			if (!contains && !this.validate(element)) {
				errors.push(this._log(element));
			}
		});

		return errors;
	}

	validate(/* element */) {
		throw new Error('Define validation for rule.');
	}

}
