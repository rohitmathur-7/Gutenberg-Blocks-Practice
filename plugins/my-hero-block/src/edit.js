import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	BlockControls,
} from '@wordpress/block-editor';
import {
	ColorPicker,
	FontSizePicker,
	RangeControl,
} from '@wordpress/components';
import { useState } from 'react';
import './editor.scss';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		heading,
		description,
		headingColor,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		buttonText,
		buttonBgColor,
	} = attributes;

	const [showHeadingPanelBody, setShowHeadingPanelBody] = useState(false);
	const [showDescriptionPanelBody, setShowDescriptionPanelBody] =
		useState(false);
	const [showButtonPanelBody, setShowButtonPanelBody] = useState(false);

	const onChangeHeading = (newHeading) => {
		setAttributes({ heading: newHeading });
	};

	const onChangeDescription = (newDescription) => {
		setAttributes({ description: newDescription });
	};

	const handleChangeColor1 = (newColor) => {
		setAttributes({ headingColor: newColor });
	};

	const handleChangeColor2 = (newColor) => {
		setAttributes({ descriptionColor: newColor });
	};

	const handleChangeButtonText = (newText) => {
		setAttributes({ buttonText: newText });
	};

	const handleChangeButtonBgColor = (newColor) => {
		setAttributes({ buttonBgColor: newColor });
	};

	const fontSizes = useSelect((select) => {
		return select('core/block-editor').getSettings().fontSizes;
	});

	const handleChangeDescriptionFontSize = (newSize) => {
		setAttributes({ descriptionFontSize: newSize });
	};

	const handleChangeDescriptionLineHeight = (newHeight) => {
		console.log(
			'🚀 ~ handleChangeDescriptionLineHeight ~ newHeight:',
			newHeight
		);
		setAttributes({ descriptionLineHeight: newHeight });
	};

	const onChangeButtonText = (newText) => {
		setAttributes({ buttonText: newText });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				{showHeadingPanelBody && (
					<PanelBody title="Heading Settings">
						<p>Font Color: </p>
						<ColorPicker
							color={headingColor}
							onChange={handleChangeColor1}
						/>
					</PanelBody>
				)}
				{showDescriptionPanelBody && (
					<PanelBody title="Description Settings">
						<p>Font Color: </p>
						<ColorPicker
							color={descriptionColor}
							onChange={handleChangeColor2}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							onChange={handleChangeDescriptionFontSize}
						/>
						<RangeControl
							label={__('Line Height', 'my-hero-block"')}
							value={descriptionLineHeight}
							onChange={handleChangeDescriptionLineHeight}
							step={0.1}
						/>
					</PanelBody>
				)}
				{showButtonPanelBody && (
					<PanelBody title="Button Settings">
						<p>Button Background Color: </p>
						<ColorPicker
							color={buttonBgColor}
							onChange={handleChangeButtonBgColor}
						/>
					</PanelBody>
				)}
			</InspectorControls>
			<RichText
				{...useBlockProps()}
				tagName="h1"
				placeholder={__('Heading', 'my-hero-block')}
				value={heading}
				onChange={onChangeHeading}
				onFocus={() => {
					setShowHeadingPanelBody(true);
					setShowDescriptionPanelBody(false);
					setShowButtonPanelBody(false);
				}}
				style={{ color: headingColor }}
			/>
			<RichText
				tagName="p"
				placeholder={__('Description', 'my-hero-block')}
				value={description}
				onChange={onChangeDescription}
				onFocus={() => {
					setShowHeadingPanelBody(false);
					setShowDescriptionPanelBody(true);
					setShowButtonPanelBody(false);
				}}
				style={{
					color: descriptionColor,
					fontSize: descriptionFontSize,
					lineHeight: descriptionLineHeight,
				}}
			/>
			<Button isPrimary style={{ backgroundColor: buttonBgColor }}>
				<RichText
					placeholder={__('Button Text', 'my-block')}
					value={buttonText}
					onChange={handleChangeButtonText}
					onFocus={() => {
						setShowHeadingPanelBody(false);
						setShowDescriptionPanelBody(false);
						setShowButtonPanelBody(true);
					}}
				/>
			</Button>
		</div>
	);
}
