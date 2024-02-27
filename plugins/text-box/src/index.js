import { registerBlockType, createBlock } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import v1 from './v1';

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	deprecated: [v1],
	variations: [
		{
			name: 'my-blocks/gradient-text-box',
			title: 'Gradient Text Box',
			icon: 'superhero-alt',
			attributes: {
				gradient: 'red-to-blue',
			},
		},
	],
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				transform: ({ content, align }) => {
					return createBlock('my-blocks/text-box', {
						text: content,
						alignment: align,
					});
				},
			},
			{
				type: 'enter',
				regExp: /textbox/i,
				transform: () => {
					return createBlock('my-blocks/text-box', {
						shadow: true,
						gradient: 'red-to-blue',
					});
				},
			},
			{
				type: 'prefix',
				prefix: 'textbox',
				transform: () => {
					return createBlock('my-blocks/text-box');
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: ['core/paragraph'],
				isMatch: ({ text }) => {
					return text ? true : false;
				},
				transform: ({ text, alignment }) => {
					return createBlock('core/paragraph', {
						content: text,
						align: alignment,
					});
				},
			},
		],
	},
});
