import {
	useBlockProps,
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
	const {
		text,
		alignment,
		backgroundColor,
		textColor,
		customBackgroundColor,
		customTextColor,
	} = attributes;

	const classes = classnames(`text-box-align-${alignment}`);

	return (
		<RichText.Content
			{...useBlockProps.save({
				className: classes,
			})}
			tagName="h4"
			value={text}
		/>
	);
}
