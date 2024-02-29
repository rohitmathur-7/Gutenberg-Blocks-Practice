import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	MediaReplaceFlow,
	BlockControls,
	InspectorControls,
	store as BlockEditorStore,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	PanelBody,
	TextareaControl,
	SelectControl,
} from '@wordpress/components';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { usePrevious } from '@wordpress/compose';

function Edit({ attributes, setAttributes, noticeUI, noticeOperations }) {
	const { name, bio, url, alt, id } = attributes;
	const [blobURL, setBlobURL] = useState();

	const prevURL = usePrevious(url);

	const titleRef = useRef();
	const imageObject = useSelect(
		(select) => {
			const { getMedia } = select('core');
			return id ? getMedia(id) : null;
		},
		[id]
	);

	const imageSizes = useSelect((select) => {
		return select(BlockEditorStore).getSettings().imageSizes;
	}, []);

	const getImageSizeOptions = () => {
		if (!imageObject) return [];
		const options = [];
		const sizes = imageObject.media_details.sizes;
		for (const key in sizes) {
			const size = sizes[key];
			const imageSize = imageSizes.find((s) => s.slug === key);
			if (imageSize) {
				options.push({
					label: imageSize.name,
					value: size.source_url,
				});
			}
		}

		return options;
	};

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

	const removeImage = () => {
		setAttributes({ id: undefined, alt: '', url: undefined });
	};

	const onChangeAlt = (newAlt) => {
		setAttributes({ alt: newAlt });
	};

	const onChangeImageSize = (newURL) => {
		setAttributes({ url: newURL });
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

	useEffect(() => {
		if (url && !prevURL) titleRef.current.focus();
	}, [url]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Settings', 'team-members')}>
					{id && (
						<SelectControl
							label={__('Image Sizes', 'team-members')}
							options={getImageSizeOptions()}
							value={url}
							onChange={onChangeImageSize}
						/>
					)}
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__('Alt Text', 'team-members')}
							value={alt}
							onChange={onChangeAlt}
							help={__(
								'Alt text of image helps in accessibility',
								'team-members'
							)}
						></TextareaControl>
					)}
				</PanelBody>
			</InspectorControls>
			{url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__('Replace Image', 'team-members')}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={['image']}
						mediaURL={url}
						mediaId={id}
					/>
					<ToolbarButton onClick={removeImage}>
						{__('Remove Image', 'team-members')}
					</ToolbarButton>
				</BlockControls>
			)}

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
					ref={titleRef}
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
		</>
	);
}

export default withNotices(Edit);
