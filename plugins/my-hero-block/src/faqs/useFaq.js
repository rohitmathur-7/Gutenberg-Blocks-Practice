import { useState, useEffect } from 'react';

const useFaq = (url, numberOfPosts) => {
	const [faqData, setFaqData] = useState();

	useEffect(() => {
		fetchData();
	}, [url, numberOfPosts]);

	const fetchData = async () => {
		try {
			url = url + '?_limit=' + numberOfPosts;
			console.log('🚀 ~ fetchData ~ url:', url);
			const data = await fetch(url);
			if (!data.ok) {
				throw new Error('Network response was not ok');
			}
			const json = await data.json();
			setFaqData(json);
		} catch (error) {
			console.error('There was a problem fetching the data:', error);
		}
	};

	return faqData;
};

export default useFaq;
