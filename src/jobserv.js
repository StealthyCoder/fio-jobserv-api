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
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Optional request configurations.
 * @returns {Promise<Object>}
 */
JobServ.prototype.list = async function ({ path, query, options }) {
  return createResponse(this.get({ path, query, options }));
};

/**
 * Get all data at the specified path.
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Optional request configurations.
 * @returns {Promise<Object>}
 */
JobServ.prototype.find = async function ({ path, query, options }) {
  return createResponse(this.get({ path, query, options }));
};

/**
 * Retrieve a resoruce by its id.
 *
 * @param {Object} data
 * @param {String} data.id - The resource id.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Optional request configurations.
 * @returns {Promise<Object>}
 */
JobServ.prototype.findById = async function ({ id, query, options }) {
  return createResponse(this.get({ path: id, query, options }));
};

/**
 * Create a resource on the server.
 *
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {(Object|String|Buffer)} data.data - The data to send (aliased as body). If an object, it will be serialized as json.
 * @param {(Object|String|Buffer)} [data.body] - The data to send.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Optional request configurations.
 * @returns {Promise<Object>}
 */
JobServ.prototype.create = async function ({
  path,
  body,
  data,
  query,
  options,
}) {
  return createResponse(
    this.post({ path, body: data || body, query, options })
  );
};

/**
 * Update a resource on the server.
 *
 * @param {Object} data
 * @param {String} [data.path] - The path of the request.
 * @param {(Object|String|Buffer)} data.data - The data to send (aliased as body). If an object, it will be serialized as json.
 * @param {(Object|String|Buffer)} [data.body] - The data to send.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Optional request configurations.
 * @returns {Promise<Object>}
 */
JobServ.prototype.update = async function ({
  path,
  data,
  body,
  query,
  options,
}) {
  return createResponse(
    this.patch({ path, body: data || body, query, options })
  );
};

/**
 * Remove a resource on the server.
 *
 * @param {Object} data
 * @param {String} data.path - The path of the request.
 * @param {(Object|String|Buffer)} [data.data] - The data to send.
 * @param {Object} [data.query] - The query parameters.
 * @param {Object} [data.options] - Optional request configurations.
 * @returns {Promise<Object>}
 */
JobServ.prototype.remove = async function ({ path, data, query, options }) {
  return createResponse(this.delete({ path, body: data, query, options }));
};

export default JobServ;
