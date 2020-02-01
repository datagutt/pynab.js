import 'isomorphic-fetch';
import * as qs from 'qs';

/**
 * wrapper class of fetch API
 */
export class Client {
    constructor(private baseUrl: string) { }

    /**
     * HTTP header hash
     */
    private headers: { [index: string]: string } = {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'pynab.js',
    };

    /**
     * get value in HTTP header by key
     * @param key field name
     */
    getHeader(key: string): string {
        return this.headers[key];
    }

    /**
     * set value in HTTP header by key
     * @param key   field name
     * @param value value of field
     */
    setHeader(key: string, value: string): void {
        this.headers[key] = value;
    }

    /**
     * set access token to header.
     * This method equivalent to `pynab.client.setHeader("Authorization", "Bearer <token>");
     * @param token access token
     */
    setToken(token: string): void {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    /**
     * execute fetch for URL
     * @param url   request URL
     */
    private _baseFetch(url: string, params: object): Promise<Response> {
        // Add baseUrl to url
        const fullUrl = (url.indexOf(this.baseUrl) === -1) ? this.baseUrl + url : url;
console.log(fullUrl, params);
        // Add headers
        return fetch(fullUrl,
            Object.assign(
                {
                    headers: this.headers,
                },
                params
            )
        ).then((res) => {
            console.log('status', res.status);
            return res;
        });
    }

    /**
     * execute GET method for URL
     * @param url   request URL
     * @param query query object in form of key-value
     */
    get(url: string, query?: { [key: string]: any }): Promise<Response> {
        if (query) {
            url += '?' + qs.stringify(query, { arrayFormat: 'repeat' });
        }

        return this._baseFetch(url, {
            method: 'GET'
        });
    }

    /**
     * execute POST method for URL
     * @param url   request URL
     * @param body  request body object
     */
    post(url: string, body: any): Promise<Response> {
        return this._baseFetch(url, {
            method: 'POST',
            body: new URLSearchParams(body).toString(),
        });
    }
    /**
     * execute PUT method for URL
     * @param url   request URL
     * @param body  request body object
     */
    put(url: string, body: any): Promise<Response> {
        return this._baseFetch(url, {
            method: 'PUT',
            body: new URLSearchParams(body).toString(),
        });
    }

    /**
     * execute PATCH method for URL
     * @param url   request URL
     * @param body  request body object
     */
    patch(url: string, body: any): Promise<Response> {
        return this._baseFetch(url, {
            method: 'PATCH',
            body: new URLSearchParams(body).toString(),
        });
    }

    /**
     * execute DELETE method for URL
     * @param url request URL
     */
    delete(url: string): Promise<Response> {
        return this._baseFetch(url, {
            method: 'DELETE',
        });
    }
}
