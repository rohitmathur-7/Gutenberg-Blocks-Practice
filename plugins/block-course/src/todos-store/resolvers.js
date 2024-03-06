import { fetchTodos } from './controls';
import { populateTodos } from './actions';
import { dispatch } from '@wordpress/data';

export function* getTodos() {
	try {
		const todos = yield fetchTodos();
		return populateTodos(todos);
	} catch (error) {
		return dispatch('core/notices').createErrorNotice(
			error.message || 'Could not fetch Todos'
		);
	}
}
