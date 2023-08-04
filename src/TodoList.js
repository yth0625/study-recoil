import {
    useRecoilValue,
    selector,
} from 'recoil';

import TodoItemCreator from './TodoItemCreator';
import TodoItem from './TodoItem';
import TodoListFilters from './TodoListFillters';
import TodoListStats from './TodoListStats';
import { todoListState, todoListFilterState } from './store';

const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case 'Show Completed':
            return list.filter((item) => item.isComplete);
            case 'Show Uncompleted':
            return list.filter((item) => !item.isComplete);
            default:
            return list;
        }
    },
});

function TodoList() {
    // const todoList = useRecoilValue(todoListState);
    const todoList = useRecoilValue(filteredTodoListState);

    return (
    <>
        <TodoListStats />
        <TodoListFilters />
        <TodoItemCreator />

        {todoList.map((todoItem) => (
            <TodoItem key={todoItem.id} item={todoItem} />
        ))}
    </>
    );
}

export default TodoList;