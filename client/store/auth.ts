import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { sdk } from '~/services/sdk.service';
import { IAuthorizeResponse } from '~/services/sdk.interface';

export const state = (): {
    email: string | null,
    country: IAuthorizeResponse['country'],
    countryData: {
        endDate: string | null,
        totalDays: number | null,
    },
} => ({
    email: null,
    country: null,
    countryData: {
        endDate: null,
        totalDays: null,
    },
});

export enum AuthMutations {
    SET_USER_DATA = 'SET_USER_DATA',
    CLEAR_DATA = 'CLEAR_DATA',
}

export type AuthState = ReturnType<typeof state>

export const getters: GetterTree<AuthState, AuthState> = {
    email: (state) => state.email,
    isLoggedIn: (state) => !!state.email,
    country: (state) => state.country,
    countryData: (state) => (
        state.countryData
    ),
};

export const mutations: MutationTree<AuthState> = {
    [AuthMutations.SET_USER_DATA]: (
        state,
        params: Exclude<IAuthorizeResponse, 'sessionToken'>
    ) => {
        state.email = params.email;
        state.country = params.country;
        state.countryData = {
            endDate: params.countryData?.endDate || null,
            totalDays: params.countryData?.totalDays || null,
        };
    },
    [AuthMutations.CLEAR_DATA]: (state) => {
        state.email = null;
        state.country = null;
        state.countryData = {
            endDate: null,
            totalDays: null,
        };
    }
};

export const actions: ActionTree<AuthState, AuthState> = {
    async authorize({ commit }, token: string) {
        const user = await sdk.use(this.$axios).authorize(token);

        commit(AuthMutations.SET_USER_DATA, user);
    },
    async logout({ commit }) {
        await sdk.use(this.$axios).logout();

        commit(AuthMutations.CLEAR_DATA);
    }
};
