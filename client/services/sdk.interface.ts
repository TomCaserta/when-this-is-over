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
     * The actual server response. For any new
     * API endpoint, the IResponse interface must
     * be inherited.
     */
    res: IResponse | null;
}

/**
 * General response interface sent by the API.
 */
export interface IResponse {}

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
     * their first to-do item. Store this data so
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
     * The initial to-do sent in the sign up request.
     * It can be deleted from the backend at this point.
     *
     * FE will call the add to-do endpoint separately to
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

export interface IAuthorizeResponse extends IResponse {
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
     * Unique ID of the to-do item
     */
    id: string;

    /**
     * Title of the to-do item.
     *
     * @example "Ride a bike!"
     */
    title: string;

    /**
     * Further description of the to-do
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
     * Unique ID for the to-do item group.
     */
    id: string;

    /**
     * Title of the to-do group.
     * TODO: This should be a translation key.
     * @example "Places to visit"
     */
    title: string;

    /**
     * To-do items within this list
     */
    items: ITodoItem[];

    /**
     * The type of list this represents.
     */
    groupType: TodoGroupType;
}

export interface IGetTodosParams { }

export interface IGetTodosResponse extends IResponse {
    /**
     * Groups of to-do items by category.
     */
    groups: ITodoItemGroup[];
}

// ----------------------------------------------------------------------------

export interface IAddTodoParams {
    /**
     * Group to insert this to-do into
     */
    groupType: TodoGroupType;

    /**
     * Title of the to-do
     */
    title: string;

    /**
     * Description of the to-do
     */
    description: string;

    /**
     * Optional image for the to-do
     */
    image?: string;
}

export type IAddTodoResponse = ITodoItem;
