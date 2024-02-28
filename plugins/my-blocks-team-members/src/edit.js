import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import './editor.scss';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { columns } = attributes;

	const onChangeColumns = (newColumns) => {
		setAttributes({ columns: newColumns });
	};

	return (
		<div
			{...useBlockProps({
				className: `has-${columns}-columns`,
			})}
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={__('Columns', 'team-members')}
						min={1}
						max={6}
						value={columns}
						onChange={onChangeColumns}
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={['my-blocks/team-member']}
				template={[
					['my-blocks/team-member'],
					['my-blocks/team-member'],
					['my-blocks/team-member'],
				]}
				orientation="horizontal"
				// templateLock="all" For locking the template as it is, we cannot insert, remove or change positions of team member block.
			/>
		</div>
	);
}
