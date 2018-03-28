import {Rule} from './Base';


export class NoLinkTitleRule extends Rule {

	get name() {
		return 'noLinkTitle';
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
