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
	Icon,
	Tooltip,
	TextControl,
	Button,
} from '@wordpress/components';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { usePrevious } from '@wordpress/compose';
import {
	DndContext,
	useSensor,
	useSensors,
	PointerSensor,
} from '@dnd-kit/core';
import {
	SortableContext,
	horizontalListSortingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';
import SortableItem from './sortable-item';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

function Edit({
	attributes,
	setAttributes,
	noticeUI,
	noticeOperations,
	isSelected,
}) {
	const { name, bio, url, alt, id, socialLinks } = attributes;
	const [blobURL, setBlobURL] = useState();
	const [selectedLink, setSelectedLink] = useState();

	const prevURL = usePrevious(url);
	const prevIsSelected = usePrevious(isSelected);

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

	const addNewSocialItem = () => {
		setAttributes({
			socialLinks: [...socialLinks, { icon: 'wordpress', link: '' }],
		});
		setSelectedLink(socialLinks.length);
	};

	const updateSocialItem = (type, value) => {
		const socialLinksCopy = [...socialLinks];
		socialLinksCopy[selectedLink][type] = value;
		setAttributes({ socialLinks: socialLinksCopy });
	};

	const removeSocialItem = () => {
		setAttributes({
			socialLinks: [
				...socialLinks.slice(0, selectedLink),
				...socialLinks.slice(selectedLink + 1),
			],
		});
		setSelectedLink();
	};

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 },
		})
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (active && over && active.id !== over.id) {
			const oldIndex = socialLinks.findIndex(
				(i) => active.id === `${i.icon}-${i.link}`
			);
			const newIndex = socialLinks.findIndex(
				(i) => over.id === `${i.icon}-${i.link}`
			);
			setAttributes({
				socialLinks: arrayMove(socialLinks, oldIndex, newIndex),
			});
			setSelectedLink(newIndex);
		}
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
		if (url && !prevURL && isSelected) titleRef.current.focus();
	}, [url, prevURL]);

	useEffect(() => {
		if (prevIsSelected && !isSelected) {
			setSelectedLink();
		}
	}, [isSelected, prevIsSelected]);

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
				<div className="wp-block-my-blocks-team-member-social-links">
					<ul>
						<DndContext
							sensors={sensors}
							onDragEnd={handleDragEnd}
							modifiers={[restrictToHorizontalAxis]}
						>
							<SortableContext
								items={socialLinks.map(
									(item) => `${item.icon}-${item.link}`
								)}
								strategy={horizontalListSortingStrategy}
							>
								{socialLinks.map((item, index) => {
									return (
										<SortableItem
											key={`${item.icon}-${item.link}`}
											id={`${item.icon}-${item.link}`}
											index={index}
											selectedLink={selectedLink}
											setSelectedLink={setSelectedLink}
											icon={item.icon}
										/>
									);
								})}
							</SortableContext>
						</DndContext>
						{isSelected && (
							<li className="wp-block-my-blocks-team-member-add-icon-li">
								<Tooltip
									text={__('Add Social Link', 'team-members')}
								>
									<button
										aria-label={__(
											'Add Social Link',
											'team-members'
										)}
										onClick={addNewSocialItem}
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						)}
					</ul>
				</div>
				{selectedLink !== undefined && (
					<div className="wp-block-my-blocks-team-member-link-form">
						<TextControl
							label={__('Icon', 'team-members')}
							value={socialLinks[selectedLink].icon}
							onChange={(icon) => {
								updateSocialItem('icon', icon);
							}}
						/>
						<TextControl
							label={__('URL', 'team-members')}
							value={socialLinks[selectedLink].link}
							onChange={(link) => {
								updateSocialItem('link', link);
							}}
						/>
						<br />
						<Button isDestructive onClick={removeSocialItem}>
							{__('Remove Link', 'team-members')}
						</Button>
					</div>
				)}
			</div>
		</>
	);
}

export default withNotices(Edit);
