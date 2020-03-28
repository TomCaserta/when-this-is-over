import { User } from '~/components/user/user.model';
import { Request, Response } from 'express';
import config from 'config';
import fetch from 'node-fetch';
import { stringify } from 'querystring';
import consola from 'consola';

/** TODO: Move to a more appropriate place */
const makePlaceRequest = async (
    key: string,
    input: string,
    token: string,
    offset: number,
    type: 'establishment' | '(cities)'
) => {
    const params = stringify({
        key,
        input,
        sessiontoken: token,
        offset,
        types: type,
    });

    const request = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`,
    );

    return request.json();
};

export default class AutoCompleteController {

    /**
     * Returns autocomplete places and cities based on the
     * input given.
     */
    static async place (req: Request, res: Response) {
        const apiKey = config.get('google.api_key') as string;
        const { input, tokens, offset } = req.body;

        // TODO: use some real validation library here and move tokens to server side, this is temporary.
        const isInputValid = typeof input === 'string' && input.length >= 3;
        const isTokensValid = Array.isArray(tokens) && tokens.length === 2 && tokens.every((token) => typeof token === 'string');
        const isOffsetValid = typeof offset === 'number';

        if (!isInputValid || !isTokensValid || !isOffsetValid) {
            return res.status(401).json({
                error: 'autocomplete.invalid-parameters'
            });
        }

        try {
            const [ cities, establishments ] = await Promise.all([
                makePlaceRequest(apiKey, input, tokens[0], offset, '(cities)'),
                makePlaceRequest(apiKey, input, tokens[1], offset, 'establishment'),
            ]);

            return res.json({
                res: {
                    cities: Array.isArray(cities.predictions) ? cities.predictions : [],
                    establishments: Array.isArray(establishments.predictions) ? establishments.predictions : [],
                },
            });
        } catch {
            return res.status(500).json({
                error: 'autocomplete.api-error',
            });
        }
    }

}
