import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		heading,
		description,
		headingColor,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
	} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<RichText.Content
				tagName="h1"
				value={heading}
				style={{ color: headingColor }}
			/>
			<RichText.Content
				tagName="p"
				value={description}
				style={{
					color: descriptionColor,
					fontSize: descriptionFontSize,
					lineHeight: descriptionLineHeight,
				}}
			/>
			<InnerBlocks.Content />
		</div>
	);
}
