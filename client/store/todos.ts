import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { sdk } from '~/services/sdk.service';
import { IGetTodosResponse, IAddTodoParams, ITodoItem, TodoGroupType } from '~/services/sdk.interface';

export const state = (): {
    groups: IGetTodosResponse['groups'],
} => ({
    groups: [],
});

export enum TodoMutations {
    SET_TODO_GROUPS = 'SET_TODO_GROUPS',
    ADD_TODO = 'ADD_TODO',
}

export type TodoState = ReturnType<typeof state>

export const getters: GetterTree<TodoState, TodoState> = {
    groups: state => state.groups,
};

export const mutations: MutationTree<TodoState> = {
    [TodoMutations.SET_TODO_GROUPS]: (
        state,
        groups: IGetTodosResponse['groups'],
    ) => {
        state.groups = groups;
    },
    [TodoMutations.ADD_TODO]: (
        state,
        params: { todo: ITodoItem, type: TodoGroupType },
    ) => {
        const group = state.groups.find((group) => {
            return group.groupType === params.type;
        });

        group?.items.push(params.todo);
    },
};

export const actions: ActionTree<TodoState, TodoState> = {
    async fetchTodos({ commit }) {
        const todos = await sdk.getTodos();

        commit(TodoMutations.SET_TODO_GROUPS, todos);
    },
    async addTodo({ commit }, todo: IAddTodoParams) {
        commit(TodoMutations.ADD_TODO, await sdk.addTodo(todo));
    },
};
