/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response.js';
import JobServ from './jobserv.js';

class Devices extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/devices/';
  }
}

/**
 * Find a device by its name.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.findByName = async function ({
  device,
  query,
  options,
  fetchFn,
}) {
  return this.find({ path: `${device}/`, query, options, fetchFn });
};

/**
 * Remove a device.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.remove = async function ({
  device,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.delete({ path: `${device}/`, query, options, fetchFn })
  );
};

/**
 * Update a device name.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {(Object|String|Buffer)} args.data - The data to send (aliased as body). If an object, it will be serialized as json.
 * @param {(Object|String|Buffer)} [args.body] - The data to send.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.update = async function ({
  device,
  data,
  body,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.patch({
      path: `${device}/`,
      body: data ?? body,
      query,
      options,
      fetchFn,
    })
  );
};

/**
 * Retrieve all updates of a device.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.getUpdates = async function ({
  device,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${device}/updates/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve events that took place during the update.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {String} args.correlationId - The update/correlation id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.getUpdateEvents = async function ({
  device,
  correlationId,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${device}/updates/${correlationId}/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve the list of config settings defined for a device.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {String} args.update - The update name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.getUpdateById = async function ({
  device,
  update,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${device}/updates/${update}/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve the list of config settings defined for a device.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.createConfig = async function ({
  device,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${device}/config/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve the list of config settings defined for a device.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {String} args.factory - The name of the factory.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.getConfig = async function ({
  device,
  factory,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${device}/config/`,
    factory,
    query,
    options,
    fetchFn,
  });
};

/**
 * Update the device configuration with new content.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {(Object|String|Buffer)} args.data - The data to send (aliased as body). If an object, it will be serialized as json.
 * @param {(Object|String|Buffer)} [args.body] - The data to send.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.updateConfig = async function ({
  device,
  data,
  body,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.patch({
      path: `${device}/config/`,
      body: data ?? body,
      query,
      options,
      fetchFn,
    })
  );
};

/**
 * Remove the config file from the configuration.
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {String} args.config - The name of the config to remove.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.removeConfig = async function ({
  device,
  config,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.delete({
      path: `${device}/config/${config}/`,
      query,
      options,
      fetchFn,
    })
  );
};


/**
 * Get the Apps States belonging to a device
 * @param {Object} args
 * @param {String} args.device - The name of the device.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Devices.prototype.getAppsStates = async function ({
  device,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${device}/apps-states/`,
    query,
    options,
    fetchFn,
  });
};

export default Devices;
