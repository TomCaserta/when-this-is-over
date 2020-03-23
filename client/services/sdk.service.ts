export class SdkService {
    constructor(
        private url: string,
    ) {}

    private async request<T>(path: string, params: Record<string, any>): Promise<T> {
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
