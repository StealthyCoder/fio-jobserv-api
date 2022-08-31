/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response.js';
import Remote from './remote.js';

export class JobServ extends Remote {
  constructor(address) {
    super(address);
  }
}

/**
 * Retrieve all data at the specified path.
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
JobServ.prototype.list = async function ({ path, query, options, fetchFn }) {
  return createResponse(this.get({ path, query, options, fetchFn }));
};

/**
 * Get all data at the specified path.
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
JobServ.prototype.find = async function ({ path, query, options, fetchFn }) {
  return createResponse(this.get({ path, query, options, fetchFn }));
};

/**
 * Retrieve a resource by its id.
 *
 * @param {Object} args
 * @param {String} args.id - The resource id.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
JobServ.prototype.findById = async function ({ id, query, options, fetchFn }) {
  return createResponse(this.get({ path: id, query, options, fetchFn }));
};

/**
 * Create a resource on the server.
 *
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {(Object|String|Buffer)} args.data - The data to send (aliased as body). If an object, it will be serialized as json.
 * @param {(Object|String|Buffer)} [args.body] - The data to send.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
JobServ.prototype.create = async function ({
  path,
  body,
  data,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.post({ path, body: data ?? body, query, options, fetchFn })
  );
};

/**
 * Update a resource on the server.
 *
 * @param {Object} args
 * @param {String} [args.path] - The path of the request.
 * @param {(Object|String|Buffer)} args.data - The data to send (aliased as body). If an object, it will be serialized as json.
 * @param {(Object|String|Buffer)} [data.body] - The data to send.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
JobServ.prototype.update = async function ({
  path,
  data,
  body,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.patch({ path, body: data ?? body, query, options, fetchFn })
  );
};

/**
 * Remove a resource on the server.
 *
 * @param {Object} args
 * @param {String} args.path - The path of the request.
 * @param {(Object|String|Buffer)} [args.data] - The data to send.
 * @param {Object} [args.query] - The query parameters.
 * @param {Object} [args.options] - Optional request configurations.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
JobServ.prototype.remove = async function ({
  path,
  data,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.delete({ path, body: data, query, options, fetchFn })
  );
};

export default JobServ;
