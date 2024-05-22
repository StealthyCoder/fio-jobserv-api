/*
Copyright 2020, 2021, 2022, 2023, 2024 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import http from 'http';
import https from 'https';
import path from 'node:path';
import { URL } from 'node:url';

import fetch from 'node-fetch';

const DEFAULT_HTTP_AGENT = new http.Agent({
  keepAlive: true,
});

const DEFAULT_HTTPS_AGENT = new https.Agent({
  keepAlive: true,
});

const DEFAULT_FETCH_OPTIONS = {
  agent: function (_parsedUrl) {
    if (_parsedUrl.protocol === 'http:') {
      return DEFAULT_HTTP_AGENT;
    }

    return DEFAULT_HTTPS_AGENT;
  },
};

class Remote {
  constructor(address) {
    this.address = address;

    this.contentType = 'application/json';
    this.follows = true;
    this.basePath = '/';
  }
}

/**
 * Create the href string to perform the request.
 *
 * @param {String} pathname The path to append to the server URL
 * @param {Object} query The query/search parameters
 * @returns {String}
 */
Remote.prototype.createPath = function (pathname, query) {
  let reqURL;

  if (pathname) {
    reqURL = new URL(path.join(this.basePath ?? '/', pathname), this.address);
  } else {
    reqURL = new URL(this.basePath, this.address);
  }

  if (query) {
    const searchParams = new URLSearchParams(query);
    reqURL.search = searchParams;
  }

  return reqURL.href;
};

/**
 * Serialize the data as JSON.
 * If the data is String or Buffer, it will be returned as is.
 * @param {Object} body - The data to serialize.
 * @return {Buffer|String}
 */
Remote.prototype.serialize = function (body) {
  if (!body) {
    return;
  }

  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    return body;
  }

  return Buffer.from(JSON.stringify(body));
};

/**
 * Perform the fetch request.
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {(String|Buffer)} [args.body] - The data to send.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Opitonal request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @param {String} [args.method=GET] - The request method to perform.
 * @returns {Promise}
 */
Remote.prototype.fetch = async function ({
  path,
  body,
  query,
  options,
  fetchFn,
  method = 'GET',
}) {
  const remoteOptions = Object.assign({}, DEFAULT_FETCH_OPTIONS, options);

  if (!remoteOptions.headers) {
    remoteOptions.headers = {};
    remoteOptions.headers['User-Agent'] = 'fio-jobserv-api/5.0.0';
  } else {
    remoteOptions.headers['User-Agent'] = 'fio-jobserv-api/5.0.0';
  }

  if (body && !Object.hasOwn(remoteOptions.headers, 'Content-Type')) {
    remoteOptions.headers['Content-Type'] = this.contentType;
  }

  const fetchUrl = this.createPath(path, query);
  const fetchOptions = { method, body: this.serialize(body), ...remoteOptions };

  if (fetchFn && typeof fetchFn === 'function') {
    return fetchFn(fetchUrl, fetchOptions);
  }

  return fetch(fetchUrl, fetchOptions);
};

/**
 * Perform a GET request.
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise}
 */
Remote.prototype.get = async function ({ path, query, options, fetchFn }) {
  return this.fetch({ path, query, options, fetchFn });
};

/**
 * Perform a POST request.
 * @param {Object} args
 * @param {String|Buffer} args.body - The data to send.
 * @param {String} [args.path] - The path of the request.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise}
 */
Remote.prototype.post = async function ({
  path,
  body,
  query,
  options,
  fetchFn,
}) {
  return this.fetch({ path, body, query, options, fetchFn, method: 'POST' });
};

/**
 * Perform a PUT request.
 * @param {Object} args
 * @param {String|Buffer} args.body - The data to send.
 * @param {String} [args.path] - The path of the request.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise}
 */
Remote.prototype.put = async function ({
  path,
  body,
  query,
  options,
  fetchFn,
}) {
  return this.fetch({ path, body, query, options, fetchFn, method: 'PUT' });
};

/**
 * Perform a DELETE request.
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {String|Buffer} [args.body] - The data to send.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise}
 */
Remote.prototype.delete = async function ({
  path,
  body,
  query,
  options,
  fetchFn,
}) {
  return this.fetch({ path, body, query, options, fetchFn, method: 'DELETE' });
};

/**
 * Perform a PATCH request.
 * @param {Object} args
 * @param {String|Buffer} args.body - The data to send.
 * @param {String} [args.path] - The path of the request.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise}
 */
Remote.prototype.patch = async function ({
  path,
  body,
  query,
  options,
  fetchFn,
}) {
  return this.fetch({ path, body, query, options, fetchFn, method: 'PATCH' });
};

/**
 * Perform a HEAD request.
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise}
 */
Remote.prototype.head = async function ({ path, query, options, fetchFn }) {
  return this.fetch({ path, query, options, fetchFn, method: 'HEAD' });
};

/**
 * Perform an OPTIONS request.
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise}
 */
Remote.prototype.options = async function ({ path, query, options, fetchFn }) {
  return this.fetch({ path, query, options, fetchFn, method: 'OPTIONS' });
};

export default Remote;
