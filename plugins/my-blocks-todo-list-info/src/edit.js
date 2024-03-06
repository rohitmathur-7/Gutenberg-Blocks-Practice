import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit() {
	const data = useSelect((select) => {
		const store = select('blocks-course/todos');

		if (!store) return null;

		return {
			total: store.getTodosNumer(),
			done: store.getDoneTodos(),
			undone: store.getUnDoneTodos(),
		};
	});

	return (
		<div {...useBlockProps()}>
			{!data && (
				<p>
					{__(
						'Please make sute the data store plugin is active',
						'todo-list-info'
					)}
				</p>
			)}
			{data && (
				<ul>
					<li>
						{__('Done:', 'todo-list-info')}
						{data.done}
					</li>
					<li>
						{__('Un-Done:', 'todo-list-info')}
						{data.undone}
					</li>
					<li>
						{__('Total:', 'todo-list-info')}
						{data.total}
					</li>
				</ul>
			)}
		</div>
	);
}
