import {
    ISignUpResponse,
    ISignUpParams,
    IAddTodoParams,
    ISignUpVerifyResponse,
    ISignUpVerifyParams,
    ILoginParams,
    IAuthorizeParams,
    IGetTodosResponse,
    IGetTodosParams,
    IAddTodoResponse
} from './sdk.interface';

export class SdkService {
    constructor(
        private url: string,
    ) {}

    signUp(email: string, country: string, initialTodo?: IAddTodoParams) {
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
        const resp = await this.request<ISignUpVerifyResponse, ISignUpVerifyParams>(
            'users/sign-up-verify',
            {
                token,
            }
        );

        if (resp.initialTodo) {
            await this.addTodo(resp.initialTodo);
        }

        return resp;
    }

    login(email: string) {
        return this.request<null, ILoginParams>(
            'users/login',
            {
                email,
            }
        );
    }

    authorize(token: string) {
        return this.request<null, IAuthorizeParams>(
            'users/authorize',
            {
                token,
            }
        );
    }

    getTodos() {
        return this.request<IGetTodosResponse, IGetTodosParams>(
            'todos/get',
            {},
        );
    }

    addTodo(todo: IAddTodoParams) {
        return this.request<IAddTodoResponse, IAddTodoParams>(
            'todos/create',
            todo,
        );
    }

    private async request<T, P>(path: string, params: P): Promise<T> {
        const request = await fetch(
            `${this.url}/${path}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            }
        );

        const json: { error: string | boolean, res: T } = await request.json();

        if (json.error) {
            throw json.error;
        }

        return json.res;
    }
}

export const sdk = new SdkService(process.env.API_URL!);
