import {Rule} from './Base';


export class LinkNoRelNoreferrerRule extends Rule {

	get name() {
		return 'linkNoRelNoreferrer';
	}

	get selector() {
		return 'a';
	}

	get label() {
		return 'The <a> with target="_blank" needs a rel attribute with "noreferrer"';
	}

	validate(element) {
		var
			target = element.target.toLowerCase(),
			rel = element.rel.toLowerCase()
		;

		return (target !== '_blank' || (target === '_blank' && rel.indexOf('noreferrer') > -1));
	}

}
