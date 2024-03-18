import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow,
	BlockControls,
	InnerBlocks,
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
import { Toolbar } from '@wordpress/components';
import { ToolbarButton, TextControl } from '@wordpress/components';

import useFaq from './components/useFaq';
import FAQ from './components/FAQ';

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
		id,
		alt,
		url,
		faqLeftTemplateWidth,
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
		setAttributes({ descriptionLineHeight: newHeight });
	};

	const onSelectImage = (image) => {
		setAttributes({ id: image.id, alt: image.alt, url: image.url });
	};

	const onSelectURL = (url) => {
		setAttributes({ id: undefined, alt: '', url: url });
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	const removeImage = () => {
		setAttributes({ id: undefined, alt: '', url: undefined });
	};

	const defaultFaqLeftTemplate = [
		[
			'core/paragraph',
			{
				placeholder: __('Description', 'my-hero-block'),
			},
		],
		['core/buttons', ['core/button']],
		['core/image'],
	];

	const { numberOfPosts, userFaqs } = attributes;
	const [showItem, setShowItem] = useState(null);
	const [showItemUserAdded, setShowItemUserAdded] = useState(null);
	const [showAddNewItem, setShowAddNewItem] = useState(false);
	const [headingContent, setHeadingContent] = useState('');
	const [descriptionContent, setDescriptionContent] = useState('');

	const faqData = useFaq(url, numberOfPosts);

	const onChangeURL = (newURL) => {
		setAttributes({ url: newURL });
	};

	const onChangeNumberOfPosts = (newNumber) => {
		setAttributes({ numberOfPosts: newNumber });
	};

	const handleShowItem = (index) => {
		index === showItem ? setShowItem(null) : setShowItem(index);
		setShowItemUserAdded(null);
	};

	const handleShowItemUserAdded = (index) => {
		index === showItemUserAdded
			? setShowItemUserAdded(null)
			: setShowItemUserAdded(index);
		setShowItem(null);
	};

	const addNewFaq = () => {
		setShowAddNewItem(true);
	};

	const saveFaq = () => {
		console.log('In save faq');
		if (userFaqs !== undefined) {
			setAttributes({
				userFaqs: [
					...userFaqs,
					{ title: headingContent, body: descriptionContent },
				],
			});
		} else {
			setAttributes({
				userFaqs: [{ title: headingContent, body: descriptionContent }],
			});
		}
		setShowAddNewItem(false);
		setHeadingContent('');
		setDescriptionContent('');
	};

	const cancelFaq = () => {
		setShowAddNewItem(false);
		setHeadingContent('');
		setDescriptionContent('');
	};

	const handleFaqDelete = (index) => {
		const updatedUserFaqs = [...userFaqs];
		updatedUserFaqs.splice(index, 1);
		setAttributes({ userFaqs: updatedUserFaqs });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('General Settings', 'my-hero-block')}>
					<RangeControl
						label={__('Left Section Width', 'my-hero-block')}
					/>
				</PanelBody>
				<PanelBody title={__('FAQ Settings', 'my-hero-block')}>
					<TextControl
						label={__('Enter URL', 'my-hero-block')}
						value={url}
						onChange={onChangeURL}
					></TextControl>
					<RangeControl
						label={__('Number of posts', 'my-hero-block')}
						value={numberOfPosts}
						onChange={onChangeNumberOfPosts}
						min={1}
						max={100}
					></RangeControl>
				</PanelBody>
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
							label={__('Line Height', 'my-hero-block')}
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

			{/* <div style={{ display: 'flex' }}>
				<div> */}
			{/* <RichText
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
					<Button
						isPrimary
						style={{ backgroundColor: buttonBgColor }}
					>
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
					</Button> */}
			{/* {url && (
						<div>
							<img src={url} alt={alt}></img>
						</div>
					)}
					<MediaPlaceholder
						accept="image/*"
						allowedTypes={['image']}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
					/> */}
			{/* </div>
			</div> */}
			<div style={{ display: 'flex' }}>
				<div>
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
					<InnerBlocks
						template={defaultFaqLeftTemplate}
						templateLock="all"
					/>
				</div>
				{/* <InnerBlocks
				allowedBlocks={['my-blocks/faqs-list']}
				template={[['my-blocks/faqs-list']]}
			/> */}
				<div>
					{faqData &&
						faqData.map((item, index) => (
							<FAQ
								item={item}
								showItem={showItem === index && true}
								setShowItem={() => handleShowItem(index)}
							/>
						))}
					{userFaqs &&
						userFaqs.map((item, index) => (
							<>
								<FAQ
									item={item}
									showItem={
										showItemUserAdded === index && true
									}
									setShowItem={() =>
										handleShowItemUserAdded(index)
									}
								/>
								<Button
									isSecondary
									isDestructive
									icon="trash"
									onClick={() => handleFaqDelete(index)}
								/>
							</>
						))}
					{showAddNewItem ? (
						<>
							<div>
								<RichText
									tagName="h2"
									value={headingContent}
									onChange={(value) =>
										setHeadingContent(value)
									}
									placeholder="FAQ Title"
								/>
								<RichText
									tagName="p"
									value={descriptionContent}
									onChange={(value) =>
										setDescriptionContent(value)
									}
									placeholder="FAQ Description"
								/>
							</div>
							<Button isPrimary onClick={saveFaq}>
								Save
							</Button>
							<Button onClick={cancelFaq}>Cancel</Button>
						</>
					) : (
						<div style={{ marginTop: '20px' }}>
							<Button isPrimary onClick={addNewFaq}>
								Add New
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
