/**
 * Response format sent by the API.
 */
export interface IApiResponse {
    /**
     * Optional error, return a truthy value
     * if an error occurred. Return string for
     * debugging information.
     */
    error?: string | boolean;

    /**
     * Actual response.
     */
    res: ISignUpResponse |
         ISignUpVerifyResponse |
         ILoginResponse |
         IAuthorizeResponse |
         IGetTodosResponse |
         IAddTodoResponse |
         ILogoutResponse |
         null;
}

// ----------------------------------------------------------------------------

export interface ILoginParams {
    /**
     * Email to send a login link to.
     */
    email: string;
}

// Null response, don't hint that an email does/doesn't exist for security purposes
export type ILoginResponse = null;

// ----------------------------------------------------------------------------

export interface ILogoutParams {}

export type ILogoutResponse = null;

// ----------------------------------------------------------------------------

export interface ISignUpParams {
    /**
     * Email to send a verification link to.
     */
    email: string;

    /**
     * ISO Country code for the user.
     *
     * @example 'ES' or 'BR'
     */
    country: string;

    /**
     * To begin the sign up process a user adds
     * their first todo item. Store this data so
     * it can be picked up later.
     */
    initialTodo?: IAddTodoParams;
}

// Null response, don't hint that an email does/doesn't is already in use for security purposes.
// If an account already exists, do not send the verification/login email.
export type ISignUpResponse = null;

// ----------------------------------------------------------------------------

export interface ISignUpVerifyParams {
    /**
     * Token sent to the user in the initial sign up
     * request to verify the user.
     */
    token: string;
}

export interface ISignUpVerifyResponse extends IAuthorizeResponse {
    /**
     * The initial TODO sent in the sign up request.
     * It can be deleted from the backend at this point.
     *
     * FE will call the add todo endpoint separately to
     * actually add it to the list.
     */
    initialTodo: IAddTodoParams;
}

// ----------------------------------------------------------------------------

export interface IAuthorizeParams {
    /**
     * Token the user received in their email
     * to log them in.
     */
    token: string;
}

export interface IAuthorizeResponse {
    /**
     * ISO Country code that the user signed
     * up with.
     *
     * @example 'ES' or 'BR'
     */
    country: string | null;

    /**
     * The email the user signed up with
     * just in case it's formatted differently?
     */
    email: string;

    /**
     * If [country] is further quarantine info
     * is available.
     */
    countryData?: {
        /**
         * End quarantine date in JS ISO string
         *
         * @example 2020-03-23T22:59:26.041Z
         */
        endDate: string;

        /**
         * Total days of the quarantine.
         */
        totalDays: number;
    };

    /**
     * Session token to be sent as `X-AuthorizationToken` in
     * the headers of all future requests.
     */
    sessionToken: string;
}

// ----------------------------------------------------------------------------

export interface ITodoItem {
    /**
     * Unique ID of the todo item
     */
    id: string;

    /**
     * Title of the todo item.
     *
     * @example "Ride a bike!"
     */
    title: string;

    /**
     * Further description of the todo
     * item
     */
    description: string;

    /**
     * Whether this item has been completed or
     * not.
     */
    isComplete: boolean;

    /**
     * Image URL to use for the item.
     * (will be fetched from some external API based on place/restaurant etc)
     */
    image?: string;
}

export enum TodoGroupType {
    PLACE,
    RESTAURANT,
    ITEM,
}

export interface ITodoItemGroup {
    /**
     * Unique ID for the todo item group.
     */
    id: string;

    /**
     * Title of the TODO group.
     * TODO: This should be a translation key.
     * @example "Places to visit"
     */
    title: string;

    /**
     * Todo items within this list
     */
    items: ITodoItem[];

    /**
     * The type of list this represents.
     */
    groupType: TodoGroupType;
}

export interface IGetTodosParams { }

export interface IGetTodosResponse {
    /**
     * Groups of TODO items by category.
     */
    groups: ITodoItemGroup[];
}

// ----------------------------------------------------------------------------

export interface IAddTodoParams {
    /**
     * Group to insert this TODO into
     */
    groupType: TodoGroupType;

    /**
     * Title of the todo
     */
    title: string;

    /**
     * Description of the todo
     */
    description: string;

    /**
     * Optional image for the todo
     */
    image?: string;
}

export type IAddTodoResponse = ITodoItem;
