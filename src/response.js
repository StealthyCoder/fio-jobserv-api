/*
Copyright 2020, 2021, 2022, 2023, 2024 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import { Mutex } from 'async-mutex';

/**
 * Wrapper around a response object to provide a common interface for
 * the remote resources.
 *
 * @param {Promise} req The request to perform, a Promise to be resolved
 * @returns {Object}
 */
const remoteResponse = function (res) {
  let _body;
  let _buffer;
  let _json;
  let _text;
  let _res;

  _res = res;

  const responseMutex = new Mutex();

  const apiResponse = {
    _body,
    _buffer,
    _json,
    _text,
    _res,
    async json() {
      return responseMutex.runExclusive(async () => {
        if (this.isJson()) {
          if (!this._json) {
            this._json = JSON.parse(new TextDecoder().decode(await this.buffer()));
          }
          return this._json;
        }
        return;
      });
    },
    async text() {
      return responseMutex.runExclusive(async () => {
        if (this.isText()) {
          if (!this._text) {
            this._text = new TextDecoder().decode(await this.buffer());
          }
          return this._text;
        }
        return;
      });
    },
    get headers() {
      return this._res.headers;
    },
    get contentEncoding() {
      return this.headers['content-encoding'];
    },
    get contentType() {
      return this.headers['content-type'];
    },
    get length() {
      return this.headers['content-length'];
    },
    get status() {
      return this._res.statusCode;
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
    get ok() {
      if (this.status >= 200 && this.status < 300) {
        return true;
      }
      return false;
    },
    async buffer() {
      if (!this._buffer) {
        this._buffer = await this._res.body.arrayBuffer();
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
 * @param {Promise} request A request to be resolved
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
  [err.text, err.json] = await Promise.all([response.text(), response.json()]);

  throw err;
};

export default createResponse;
