import { Button } from '@wordpress/components';
import FaqItem from './FaqItem';

const FAQ = ({ item, showItem, setShowItem }) => {
	const handleOnClickFaq = () => {
		setShowItem();
	};

	return (
		<>
			<div onClick={handleOnClickFaq}>
				<div>
					<Button isPrimary>+</Button>
					<h1>{item.title}</h1>
				</div>
				{showItem && <FaqItem item={item} />}
			</div>
		</>
	);
};

export default FAQ;
