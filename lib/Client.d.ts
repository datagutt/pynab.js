import "isomorphic-fetch";
/**
 * wrapper class of fetch API
 */
export declare class Client {
    private baseUrl;
    constructor(baseUrl: string);
    /**
     * HTTP header hash
     */
    private headers;
    /**
     * get value in HTTP header by key
     * @param key field name
     */
    getHeader(key: string): string;
    /**
     * set value in HTTP header by key
     * @param key   field name
     * @param value value of field
     */
    setHeader(key: string, value: string): void;
    /**
     * set access token to header.
     * This method equivalent to `pynab.client.setHeader("Authorization", "Bearer <token>");
     * @param token access token
     */
    setToken(token: string): void;
    /**
     * execute fetch for URL
     * @param url   request URL
     */
    private _baseFetch;
    /**
     * execute GET method for URL
     * @param url   request URL
     * @param query query object in form of key-value
     */
    get(url: string, query?: {
        [key: string]: any;
    }): Promise<Response>;
    /**
     * execute POST method for URL
     * @param url   request URL
     * @param body  request body object
     */
    post(url: string, body: any): Promise<Response>;
    /**
     * execute PUT method for URL
     * @param url   request URL
     * @param body  request body object
     */
    put(url: string, body: any): Promise<Response>;
    /**
     * execute PATCH method for URL
     * @param url   request URL
     * @param body  request body object
     */
    patch(url: string, body: any): Promise<Response>;
    /**
     * execute DELETE method for URL
     * @param url request URL
     */
    delete(url: string): Promise<Response>;
}
