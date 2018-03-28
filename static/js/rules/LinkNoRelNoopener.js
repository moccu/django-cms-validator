import {Rule} from './Base';


export class LinkNoRelNoopenerRule extends Rule {

	get name() {
		return 'linkNoRelNoopener';
	}

	get selector() {
		return 'a';
	}

	get label() {
		return 'The <a> with target="_blank" needs a rel attribute with "noopener"';
	}

	validate(element) {
		var
			target = element.target.toLowerCase(),
			rel = element.rel.toLowerCase()
		;

		return (target !== '_blank' || (target === '_blank' && rel.indexOf('noopener') > -1));
	}

}
