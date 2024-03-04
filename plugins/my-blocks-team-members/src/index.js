import { registerBlockType, createBlock } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './team-member';

registerBlockType(metadata.name, {
	edit: Edit,
	save,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/gallery'],
				transform: ({ images, columns }) => {
					const innerBlocks = images.map(({ url, alt, id }) => {
						return createBlock('my-blocks/team-member', {
							alt,
							id,
							url,
						});
					});
					return createBlock(
						'my-blocks/team-members',
						{
							columns: columns || 2,
						},
						innerBlocks
					);
				},
			},
			{
				type: 'block',
				blocks: ['core/image'],
				isMultiBlock: true,
				transform: (attributes) => {
					const innerBlocks = attributes.map(({ url, alt, id }) => {
						return createBlock('my-blocks/team-member', {
							alt,
							id,
							url,
						});
					});
					return createBlock(
						'my-blocks/team-members',
						{
							columns:
								attributes.length > 2 ? 2 : attributes.length,
						},
						innerBlocks
					);
				},
			},
		],
	},
});
