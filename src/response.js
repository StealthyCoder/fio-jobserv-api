/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

/**
 * Wrapper around a response object to provide a common interface for
 * the remote resources.
 *
 * @param {Promise} req - The request to perform, a Promise to be resolved.
 * @returns {Object}
 */
const remoteResponse = function (res) {
  let _body;
  let _buffer;
  let _json;
  let _text;
  let _res;

  _res = res;

  const apiResponse = {
    _body,
    _buffer,
    _json,
    _text,
    _res,
    async json() {
      if (this.isJson()) {
        if (!this._json) {
          this._json = await this._res.json();
        }
        return this._json;
      }
    },
    async text() {
      if (this.isText()) {
        if (!this._text) {
          this._text = await this._res.text();
        }
        return this._text;
      }
    },
    get headers() {
      return this._res.headers;
    },
    get contentEncoding() {
      return this.headers.get('content-encoding');
    },
    get contentType() {
      return this.headers.get('content-type');
    },
    get length() {
      return this.headers.get('content-length');
    },
    get status() {
      return this._res.status;
    },
    get statusText() {
      return this._res.statusText;
    },
    get ok() {
      return this._res.ok;
    },
    get raw() {
      return this._res;
    },
    get body() {
      if (!this._body) {
        this._body = this._res.body;
      }
      return this._body;
    },
    async buffer() {
      if (!this._buffer) {
        this._buffer = await this._res.buffer();
      }
      return this._buffer;
    },
    isJson() {
      return /^application\/json/.test(this.contentType);
    },
    isText() {
      return /^text\//.test(this.contentType);
    },
    async pagination() {
      const payload = await this.json();

      if (payload) {
        const data = payload.data ?? payload; // hack is necessary as 'builds' and 'devices' api's differ
        return {
          total: data.total,
          limit: data.limit,
          pages: data.pages,
          current: data.page,
          next: data.page + 1 > data.pages ? null : data.page + 1,
        };
      }

      return {};
    },
  };

  return Object.seal(apiResponse);
};

const error_status_map = {
  400: 'bad_request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not_found',
  405: 'not_allowed',
  406: 'not_acceptable',
  408: 'request_timeout',
  410: 'gone',
  500: 'server_error',
  501: 'not_implemented',
  503: 'service_unavailable',
  504: 'timeout',
};

class HTTPError extends Error {
  constructor(message) {
    super(message);
  }
}

/**
 * Create a response object.
 * @param {Promise} request - A request to be resolved.
 * @returns {Promise<Object>}
 */
export const createResponse = async (request) => {
  const response = remoteResponse(await request);
  if (response.ok) {
    return response;
  }

  const err = new HTTPError(response.statusText ?? 'HTTP Error');
  err.status = response.status ?? 500;
  err.error = error_status_map[err.status];
  err.text = await response.text();
  err.json = await response.json();

  throw err;
};

export default createResponse;
