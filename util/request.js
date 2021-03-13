const fetch = require('node-fetch');
const querystring = require("querystring");
const ApiError = require('../errors/TopGGApiError'), TypeError = require('../errors/TypeError');

async function request(token, method, path, body) {

    let a;

    const headers = new fetch.Headers();

    if (!token) {
        throw new TypeError('Missing top.gg Client Token');
    }

    if (typeof (token) !== 'string') {
        throw new TypeError('The top.gg Client Token must be a string')
    }

    headers.set('Authorization', token);

    if (method !== 'GET') {
        headers.set('Content-Type', 'application/json');
    }

    let url = `https://top.gg/api/${path}`;

    if (body && method === 'GET') {
        url += `?${querystring.stringify(body)}`;
    }

    let response = await fetch.default(url, {
        method,
        headers,
        body: body && method !== 'GET' ? JSON.stringify(body) : null
    });

    let responseBody;

    if ((a = response.headers.get('Content-Type')) === null || a === void 0 ? void 0 : a.startsWith('application/json')) {
        responseBody = await response.json();
    } else {
        responseBody = await response.text();
    }

    if (!response.ok) {
        throw new ApiError(response.status, response.statusText, responseBody);
    }

    return responseBody;

}

module.exports = request;