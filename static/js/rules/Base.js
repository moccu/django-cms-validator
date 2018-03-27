export class Rule {

	get name() {
		throw new Error('Define a rule name.');
	}

	test() {
		throw new Error('Define rule test.');
	}

}
