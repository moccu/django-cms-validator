import {find} from './utils';


const
	DEFAULTS = {
		rules: [],
		selectors: {
			publish: '.cms-btn-publish'
		},
		labels: {
			layerTitle: 'Errors found',
			layerCheckboxLabel: 'I want to publish the site...'
		},
		templates: {
			layer: ({errors, options}) => {
				return `
					<p>${options.labels.layerTitle}</p>
					<ul>${errors.map(error => {
						return `<li>${error.label}</li>`;
					}).join('')}</ul>
					<label for="cms-validator-ignore">
						<input type="checkbox" name="cms-validator-ignore" id="cms-validator-ignore" value="ignore" />
						<span>${options.labels.layerCheckboxLabel}</span>
					</label>
				`;
			}
		}
	}
;


export class Validator {

	constructor(options = {}) {
		this.options = {...DEFAULTS, ...options};
		this._layer = null;
	}

	setup() {
		this._onPublish = this._onPublish.bind(this);
		this._publish = find(this.options.selectors.publish);
		this._publish.forEach(button => button.addEventListener('click', this._onPublish, true));
		return this;
	}

	validate() {
		let errors = [];

		this.options.rules.forEach(Rule => {
			const rule = new Rule(this.options);
			errors = errors.concat(rule.test());
		});

		return errors;
	}

	_buildLayer(target, errors) {
		const
			container = document.createElement('div'),
			{options} = this
		;
		container.className = 'cms-validation-layer';
		container.innerHTML = this.options.templates.layer({errors, options});
		target.className += ' cms-validation-layer-container';
		target.appendChild(container);

		return {
			container: container,
			checkbox: container.getElementsByTagName('input')[0]
		};
	}

	_onPublish(event) {
		const
			errors = this.validate(),
			parent = event.currentTarget.parentElement
		;

		if (errors.length === 0) {
			return;
		}

		if (this._layer) {
			if (this._layer.checkbox.checked) {
				return;
			}

			parent.removeChild(this._layer.container);
		}

		event.stopImmediatePropagation();
		event.preventDefault();
		this._layer = this._buildLayer(parent, errors);
	}

}
