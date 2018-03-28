import {Rule} from './Base';


export class LinkNoDescriptiveTitleRule extends Rule {

	get name() {
		return 'linkNoDescriptiveTitle';
	}

	get selector() {
		return 'a';
	}

	get label() {
		return 'The <a> needs a more descriptive title then it’s label.';
	}

	validate(element) {
		var
			title = element.title.trim().toLowerCase(),
			text = element.text.trim().toLowerCase(),
			aria = element.getAttribute('aria-label')
		;

		return (title !== text) && (title !== aria);
	}

}
