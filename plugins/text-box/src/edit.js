import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	withColors,
} from '@wordpress/block-editor';
// import {
// 	ToolbarGroup,
// 	ToolbarButton,
// 	ToolbarDropdownMenu,
// } from '@wordpress/components';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	ColorPicker,
	ColorPalette,
} from '@wordpress/components';
import './editor.scss';

export default function Edit(props) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;
	const { text, alignment, checked } = attributes;

	const onChangeAlignment = (newAlignment) => {
		setAttributes({ alignment: newAlignment });
	};

	const onChangeText = (nexText) => {
		setAttributes({ text: nexText });
	};

	// const onChangeChecked = (newChecked) => {
	// 	setAttributes({ checked: newChecked });
	// };

	// const onChangeBackgroundColor = (newBackgroundColor) => {
	// 	setAttributes({ backgroundColor: newBackgroundColor });
	// };

	// const onChangeTextColor = (newTextColor) => {
	// 	setAttributes({ textColor: newTextColor });
	// };

	return (
		<>
			{/* <InspectorControls> */}
			{/* <PanelColorSettings
					title={__('Color Settings New', 'text-box')}
					icon="admin-appearance"
					initialOpen
					disableCustomColors={false}
					colorSettings={[
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __('Background Color', 'text-box'),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __('Text Color', 'text-box'),
						},
					]}
				>
					<ContrastChecker
						textColor={textColor.color}
						backgroundColor={backgroundColor.color}
					/>
				</PanelColorSettings> */}
			{/* <PanelBody
					title={__('Color Settings', 'text-box')}
					icon="admin-appearance"
					initialOpen
				>
					<TextControl
						label="Input Label"
						value={text}
						onChange={onChangeText}
						help="help text"
					></TextControl>
					<TextareaControl
						label="Input text area Label"
						value={text}
						onChange={onChangeText}
						help="help text"
					></TextareaControl>
					<ToggleControl
						label="Toggle Label"
						checked={checked}
						onChange={onChangeChecked}
					/>
					<ColorPicker color={'#F03'} />
				</PanelBody>
				<ColorPalette
					colors={[
						{
							name: 'red',
							color: '#F00',
						},
						{
							name: 'black',
							color: '#000',
						},
					]}
					onChange={onChangeBackgroundColor}
				/> */}
			{/* </InspectorControls> */}
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={onChangeAlignment}
				/>
			</BlockControls>
			<RichText
				{...useBlockProps({
					className: `text-box-align-${alignment}`,
					// style: {
					// 	backgroundColor: backgroundColor.color,
					// 	color: textColor.color,
					// },
				})}
				placeholder={__('Your text', 'text-box')}
				onChange={onChangeText}
				value={text}
				tagName="h1"
				allowedFormats={[]}
			/>
		</>
	);
}

// export default withColors({
// 	backgroundColor: 'backgroundColor',
// 	textColor: 'color',
// })(Edit); // withColors is a function and it returns another function.

// {
/* <BlockControls group="inline">
				<p>Inlne controls</p>
			</BlockControls>
			<BlockControls group="block">
				<p>Block controls</p>
			</BlockControls>
			<BlockControls
				group="other"
				controls={[
					{
						title: 'Button 1',
						icon: 'admin-generic',
						isActive: true,
						onClick: () => console.log('Button 1 clicked'),
					},
					{
						title: 'Button 2',
						icon: 'admin-collapse',
						onClick: () => console.log('Button 2 clicked'),
					},
				]}
			>
				{text && (
					<ToolbarGroup>
						<ToolbarButton
							title="Align Left"
							icon="editor-alignleft"
							onClick={() => console.log('Align Left clicked')}
						></ToolbarButton>
						<ToolbarButton
							title="Align Center"
							icon="editor-aligncenter"
							onClick={() => console.log('Align Center clicked')}
						></ToolbarButton>
						<ToolbarButton
							title="Align Right"
							icon="editor-alignright"
							onClick={() => console.log('Align Right clicked')}
						></ToolbarButton>
						<ToolbarDropdownMenu
							icon="arrow-down-alt2"
							label={__('More Alignments', 'text-box')}
							controls={[
								{
									title: __('Wide', 'text-box'),
									icon: 'align-wide',
								},
								{
									title: __('Full', 'text-box'),
									icon: 'align-full-width',
								},
							]}
						/>
					</ToolbarGroup>
				)}
			</BlockControls> */
// }
