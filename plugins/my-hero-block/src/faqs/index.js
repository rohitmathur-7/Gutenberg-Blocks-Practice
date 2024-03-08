import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType('my-blocks/faqs', {
	title: __('FAQs', 'my-hero-block'),
	description: __('FAQs Block', 'my-hero-block'),
	icon: 'admin-users',
	parent: ['my-blocks/hero-block'],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		url: {
			type: 'string',
		},
		numberOfPosts: {
			type: 'number',
			default: 10,
		},
	},
	edit: Edit,
	save: Save,
});
