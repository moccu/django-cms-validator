import {Rule} from './Base';


export class LinkNoLabelRule extends Rule {

	get name() {
		return 'linkNoLabel';
	}

	get selector() {
		return 'a';
	}

	get label() {
		return 'The <a> has no text label or aria-label.';
	}

	validate(element) {
		var
			text = element.text.trim(),
			aria = element.getAttribute('aria-label')
		;

		return ((text && text !== '') || (aria && aria !== ''));
	}

}
