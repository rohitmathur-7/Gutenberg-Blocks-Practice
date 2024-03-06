import { registerPlugin } from '@wordpress/plugins';
import {
	PluginSidebar,
	PluginDocumentSettingPanel,
	PluginPostStatusInfo,
	PluginPrePublishPanel,
	PluginPostPublishPanel,
	PluginMoreMenuItem,
	PluginBlockSettingsMenuItem,
} from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

const MetaFieldsInputs = () => {
	const subtitleValue = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('meta')
			._blocks_course_post_subtitle;
	});

	const { editPost } = useDispatch('core/editor');

	return (
		<PanelBody title={__('Subtitle Options', 'blocks-course')}>
			<TextControl
				label={__('Subtitle', 'blocks-course')}
				value={subtitleValue}
				onChange={(value) => {
					editPost({
						meta: { _blocks_course_post_subtitle: value },
					});
				}}
			/>
		</PanelBody>
	);
};

registerPlugin('blocks-course-plugin', {
	render: () => {
		return (
			<>
				<PluginDocumentSettingPanel
					title="My Panel"
					icon="admin-collapse"
				>
					<p>Document Setting Panel</p>
				</PluginDocumentSettingPanel>
				<PluginPostStatusInfo>
					<p>Staus info</p>
				</PluginPostStatusInfo>
				<PluginPrePublishPanel title="pre publish">
					Pre publish
				</PluginPrePublishPanel>
				<PluginPostPublishPanel title="post publish">
					Post publish
				</PluginPostPublishPanel>
				<PluginMoreMenuItem
					icon="admin-customizer"
					onClick={() => alert(true)}
				>
					Plugin Item
				</PluginMoreMenuItem>
				<PluginBlockSettingsMenuItem
					allowedBlocks={['core/paragraph']}
					icon="admin-home"
					label="New Item"
					onClick={() => alert(true)}
				/>
				<PluginSidebar
					name="meta-fields-sidebar"
					icon="admin-settings"
					title={__('Post Options', 'blocks-course')}
				>
					<MetaFieldsInputs />
				</PluginSidebar>
			</>
		);
	},
});
