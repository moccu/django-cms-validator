import {defaults} from './defaults';
import {LinkNoDescriptiveTitleRule} from './LinkNoDescriptiveTitle';
import {LinkNoLabelRule} from './LinkNoLabel';
import {LinkNoRelNoopenerRule} from './LinkNoRelNoopener';
import {LinkNoRelNoreferrerRule} from './LinkNoRelNoreferrer';
import {LinkNoTitleRule} from './LinkNoTitle';


describe('The rules defaults list', () => {

	test('should contain all rules', () => {
		expect(defaults).toEqual([
			LinkNoDescriptiveTitleRule,
			LinkNoLabelRule,
			LinkNoRelNoopenerRule,
			LinkNoRelNoreferrerRule,
			LinkNoTitleRule
		]);
	});

});
