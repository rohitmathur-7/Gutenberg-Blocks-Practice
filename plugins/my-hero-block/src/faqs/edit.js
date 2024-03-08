import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { TextControl } from '@wordpress/components';
import useFaq from './useFaq';
import { RangeControl } from '@wordpress/components';
import FAQ from './Faq';
import { useState } from 'react';

export default function Edit({ attributes, setAttributes }) {
	const [showItem, setShowItem] = useState(null);
	const { url, numberOfPosts } = attributes;

	const faqData = useFaq(url, numberOfPosts);
	console.log('🚀 ~ Edit ~ faqData:', faqData);

	const onChangeURL = (newURL) => {
		setAttributes({ url: newURL });
	};

	const onChangeNumberOfPosts = (newNumber) => {
		setAttributes({ numberOfPosts: newNumber });
	};

	const handleShowItem = (index) => {
		index === showItem ? setShowItem(null) : setShowItem(index);
	};

	return (
		<div {...useBlockProps()}>
			FAQs List
			<InspectorControls>
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
			</InspectorControls>
			<div>
				{faqData &&
					faqData.map((item, index) => (
						<FAQ
							item={item}
							showItem={showItem === index && true}
							setShowItem={() => handleShowItem(index)}
						/>
					))}
			</div>
		</div>
	);
}
