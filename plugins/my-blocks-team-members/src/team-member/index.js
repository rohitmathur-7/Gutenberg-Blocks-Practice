import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType('my-blocks/team-member', {
	title: __('Team Member', 'team-members'),
	description: __('Team member item', 'team-members'),
	icon: 'admin-users',
	parent: ['my-blocks/team-members'],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		name: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		bio: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		socialLinks: {
			type: 'array',
			default: [
				{
					link: 'https://facbook.com/',
					icon: 'facebook',
				},
				{
					link: 'https://instagram.com/',
					icon: 'instagram',
				},
			],
			source: 'query',
			selector: 'wp-block-my-blocks-team-member-social-links ul li',
			query: {
				icon: {
					source: 'attribute',
					attribute: 'data-icon',
				},
				link: {
					source: 'attribute',
					selector: 'a',
					attribute: 'href',
				},
			},
		},
	},
	edit: Edit,
	save: Save,
});
