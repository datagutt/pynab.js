"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
const qs = require("qs");
/**
 * wrapper class of fetch API
 */
class Client {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        /**
         * HTTP header hash
         */
        this.headers = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "pynab.js",
        };
    }
    /**
     * get value in HTTP header by key
     * @param key field name
     */
    getHeader(key) {
        return this.headers[key];
    }
    /**
     * set value in HTTP header by key
     * @param key   field name
     * @param value value of field
     */
    setHeader(key, value) {
        this.headers[key] = value;
    }
    /**
     * set access token to header.
     * This method equivalent to `pynab.client.setHeader("Authorization", "Bearer <token>");
     * @param token access token
     */
    setToken(token) {
        this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * execute fetch for URL
     * @param url   request URL
     */
    _baseFetch(url, params) {
        // Add baseUrl to url
        const fullUrl = (url.indexOf(this.baseUrl) === -1) ? this.baseUrl + url : url;
        // Add headers
        return fetch(fullUrl, Object.assign({
            headers: this.headers,
        }, params)).then((res) => {
            console.log("status", res.status);
            return res;
        });
    }
    /**
     * execute GET method for URL
     * @param url   request URL
     * @param query query object in form of key-value
     */
    get(url, query) {
        if (query) {
            url += "?" + qs.stringify(query, { arrayFormat: "repeat" });
        }
        return this._baseFetch(url, {
            method: "GET"
        });
    }
    /**
     * execute POST method for URL
     * @param url   request URL
     * @param body  request body object
     */
    post(url, body) {
        return this._baseFetch(url, {
            method: "POST",
            body: new URLSearchParams(body).toString(),
        });
    }
    /**
     * execute PUT method for URL
     * @param url   request URL
     * @param body  request body object
     */
    put(url, body) {
        return this._baseFetch(url, {
            method: "PUT",
            body: new URLSearchParams(body).toString(),
        });
    }
    /**
     * execute PATCH method for URL
     * @param url   request URL
     * @param body  request body object
     */
    patch(url, body) {
        return this._baseFetch(url, {
            method: "PATCH",
            body: new URLSearchParams(body).toString(),
        });
    }
    /**
     * execute DELETE method for URL
     * @param url request URL
     */
    delete(url) {
        return this._baseFetch(url, {
            method: "DELETE",
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map