import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { Spinner, withNotices } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

function Edit({ attributes, setAttributes, noticeUI, noticeOperations }) {
	const { name, bio, url, alt, id } = attributes;
	const [blobURL, setBlobURL] = useState();

	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};
	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};

	const onSelectImage = (image) => {
		if (!image || !image.url)
			setAttributes({ id: undefined, alt: '', url: undefined });
		setAttributes({ id: image.id, alt: image.alt, url: image.url });
	};

	const onSelectURL = (url) => {
		setAttributes({ id: undefined, alt: '', url: url });
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	useEffect(() => {
		if (!id && isBlobURL(url)) {
			setAttributes({ url: undefined, alt: '' });
		}
	}, []);

	useEffect(() => {
		if (isBlobURL(url)) {
			setBlobURL(url);
		} else {
			revokeBlobURL(blobURL);
			setBlobURL();
		}
	}, [url]);

	return (
		<div {...useBlockProps()}>
			{url && (
				<div
					className={`wp-block-my-blocks-team-members-img${isBlobURL(url) ? ' is-loading' : ''}`}
				>
					<img src={url} alt={alt}></img>
					{isBlobURL(url) && <Spinner />}
				</div>
			)}
			<MediaPlaceholder
				icon="admin-users"
				onSelect={onSelectImage}
				onSelectURL={onSelectURL}
				onError={onUploadError}
				accept="image/*"
				allowedTypes={['image']}
				disableMediaButtons={url}
				notices={noticeUI}
			/>
			<RichText
				placeholder={__('Member name', 'team-members')}
				tagName="h4"
				value={name}
				onChange={onChangeName}
				allowedFormats={[]}
			/>
			<RichText
				placeholder={__('Member bio', 'team-members')}
				tagName="p"
				value={bio}
				onChange={onChangeBio}
				allowedFormats={[]}
			/>
		</div>
	);
}

export default withNotices(Edit);
