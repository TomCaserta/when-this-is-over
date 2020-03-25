import { NuxtAxiosInstance } from '@nuxtjs/axios';

import {
    ISignUpResponse,
    ISignUpParams,
    IAddTodoParams,
    ISignUpVerifyResponse,
    ISignUpVerifyParams,
    ILoginParams,
    IAuthorizeParams,
    IAuthorizeResponse,
    IGetTodosResponse,
    IGetTodosParams,
    IAddTodoResponse,
    ILogoutParams,
    ILogoutResponse
} from './sdk.interface';

export class SdkService {
    private sessionToken: string | null = null;
    private axios: NuxtAxiosInstance | null = null;

    constructor(
        private url: string,
    ) {}

    use(axios: NuxtAxiosInstance) {
        this.axios = axios;
        return this;
    }

    signUp(email: string, country: string, initialTodo?: IAddTodoParams) {
        this.guardAuth(false);

        return this.request<ISignUpResponse, ISignUpParams>(
            'users/sign-up',
            {
                email,
                country,
                initialTodo,
            }
        );
    }

    async signUpVerify(token: string) {
        this.guardAuth(false);

        const resp = await this.request<ISignUpVerifyResponse, ISignUpVerifyParams>(
            'users/sign-up-verify',
            {
                token,
            }
        );

        if (resp.initialTodo) {
            await this.addTodo(resp.initialTodo);
        }

        this.sessionToken = resp.sessionToken;
        return resp;
    }

    login(email: string) {
        this.guardAuth(false);

        return this.request<null, ILoginParams>(
            'users/login',
            {
                email,
            }
        );
    }

    logout() {
        this.guardAuth();

        return this.request<ILogoutResponse, ILogoutParams>(
            'users/logout',
            {}
        );
    }

    async authorize(token: string) {
        this.guardAuth(false);

        const authResp = await this.request<IAuthorizeResponse, IAuthorizeParams>(
            'users/authorize',
            {
                token,
            }
        );

        this.sessionToken = authResp.sessionToken;
        return authResp;
    }

    getTodos() {
        this.guardAuth();

        return this.request<IGetTodosResponse, IGetTodosParams>(
            'todos/get',
            {},
        );
    }

    addTodo(todo: IAddTodoParams) {
        this.guardAuth();

        return this.request<IAddTodoResponse, IAddTodoParams>(
            'todos/create',
            todo,
        );
    }

    isLoggedIn() {
        return !!this.sessionToken;
    }

    private guardAuth(isRequired: boolean = true) {
        const isLoggedIn = this.isLoggedIn();

        if (
            (!isLoggedIn && isRequired) ||
            (isLoggedIn && !isRequired)
        ) {
            throw new Error(isRequired ? 'User is not logged in.' : 'User is already logged in');
        }
    }

    private async request<T, P>(path: string, params: P): Promise<T> {
        const headers: Record<string, string> = {};

        if (this.sessionToken) {
            headers['X-AuthorizationToken'] = this.sessionToken;
        }

        const response = await this.axios?.$post(
            `${this.url}/${path}`,
            params,
            {
                headers,
            }
        );

        const json: { error: string | boolean, res: T } = response;

        if (json.error) {
            throw json.error;
        }

        return json.res;
    }
}

export const sdk = new SdkService(process.env.API_URL!);
