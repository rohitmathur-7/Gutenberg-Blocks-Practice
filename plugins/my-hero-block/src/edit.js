import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { ColorPicker, FontSizePicker } from '@wordpress/components';
import { useState } from 'react';
import './editor.scss';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
	const { heading, description, color1, color2, descriptionFontSize } =
		attributes;

	const [showPanelBody1, setShowPanelBody1] = useState(false);
	const [showPanelBody2, setShowPanelBody2] = useState(false);

	const onChangeHeading = (newHeading) => {
		setAttributes({ heading: newHeading });
	};

	const onChangeDescription = (newDescription) => {
		setAttributes({ description: newDescription });
	};

	const handleChangeColor1 = (newColor) => {
		setAttributes({ color1: newColor });
	};

	const handleChangeColor2 = (newColor) => {
		setAttributes({ color2: newColor });
	};

	const fontSizes = useSelect((select) => {
		return select('core/block-editor').getSettings().fontSizes;
	});

	const handleChangeDescriptionFontSize = (newSize) => {
		setAttributes({ descriptionFontSize: newSize });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				{showPanelBody1 && (
					<PanelBody title="Heading Settings">
						<ColorPicker
							color={color1}
							onChange={handleChangeColor1}
						/>
					</PanelBody>
				)}
				{showPanelBody2 && (
					<PanelBody title="Description Settings">
						<ColorPicker
							color={color2}
							onChange={handleChangeColor2}
						/>
						<FontSizePicker
							fontSizes={fontSizes}
							onChange={handleChangeDescriptionFontSize}
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
					setShowPanelBody1(true);
					setShowPanelBody2(false);
				}}
				style={{ color: color1 }}
			/>
			<RichText
				tagName="p"
				placeholder={__('Description', 'my-hero-block')}
				value={description}
				onChange={onChangeDescription}
				onFocus={() => {
					setShowPanelBody1(false);
					setShowPanelBody2(true);
				}}
				style={{ color: color2, fontSize: descriptionFontSize }}
			/>
		</div>
	);
}
