import {
	useBlockProps,
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
	const {
		text,
		textAlignment,
		backgroundColor,
		textColor,
		customBackgroundColor,
		customTextColor,
		shadow,
		shadowOpacity,
	} = attributes;

	const classes = classnames(`text-box-align-${textAlignment}`, {
		'has-shadow': shadow,
		[`shadow-opacity-${shadowOpacity}`]: shadow && shadowOpacity,
	});

	return (
		<RichText.Content
			{...useBlockProps.save({
				className: classes,
			})}
			tagName="p"
			value={text}
		/>
	);
}
