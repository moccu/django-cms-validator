import {Rule} from './Base';


export class NoLinkTitleRule extends Rule {

	get name() {
		return 'noLinkLabel';
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
