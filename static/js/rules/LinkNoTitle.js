import {Rule} from './Base';


export class LinkNoTitleRule extends Rule {

	get name() {
		return 'linkNoTitle';
	}

	get selector() {
		return 'a';
	}

	get label() {
		return 'The <a> has no title attribute.';
	}

	validate(element) {
		return element.title && element.title !== '';
	}

}
