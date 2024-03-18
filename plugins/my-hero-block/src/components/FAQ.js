import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { ToggleControl } from '@wordpress/components';
import { Button } from '@wordpress/components';
import { useState } from 'react';
import FaqItem from './FaqItem';

const FAQ = ({ item, showItem, setShowItem }) => {
	const handleOnClickFaq = () => {
		setShowItem();
	};

	return (
		<div onClick={handleOnClickFaq}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<Button isPrimary>+</Button>
				<h2>{item.title}</h2>
			</div>
			{showItem && <FaqItem item={item} />}
		</div>
	);
};

export default FAQ;
