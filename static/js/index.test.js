import {Rule as BaseRule} from './rules/Base';
import {defaults as rules} from './rules/defaults';
import {Validator} from './Validator';
import * as index from './index';


describe('The validator api', () => {

	test('should expose expected api', () => {
		expect(index).toEqual({
			BaseRule,
			Validator,
			rules
		});
	});

});
