import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		heading,
		description,
		color1,
		color2,
		descriptionFontSize,
		descriptionLineHeight,
	} = attributes;

	return (
		<div {...useBlockProps.save()}>
			<RichText.Content
				tagName="h1"
				value={heading}
				style={{ color: color1 }}
			/>
			<RichText.Content
				tagName="p"
				value={description}
				style={{
					color: color2,
					fontSize: descriptionFontSize,
					lineHeight: descriptionLineHeight,
				}}
			/>
		</div>
	);
}
