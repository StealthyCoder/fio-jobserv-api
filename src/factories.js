/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import safeRegex from 'safe-regex';

import JobServ from './jobserv.js';
import createResponse from './response.js';

/**
 * Create the correct target name to be retrieved.
 * Right now it's `[target]-lmp-[build]`.
 * @param {Object} data
 * @param {Object} data.run - The run name.
 * @param {Object} data.target - The build name/id (the target).
 * @returns {String}
 */
function createTargetName(run, target) {
  // eslint-disable-next-line security/detect-non-literal-regexp
  const targetCheck = new RegExp(`(${target})`, 'i');
  if (
    /lmp-([a-zA-Z0-9-])*?\d+$/.test(run) &&
    safeRegex(targetCheck) &&
    targetCheck.test(run)
  ) {
    return run;
  }
  return `${run}-lmp-${target}`;
}

class Waves extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';
    this.resourcePath = 'waves';
  }
}

/**
 * List all waves for a factory.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Array>}
 */
Waves.prototype.list = async function ({ factory, query, options }) {
  return this.find({
    path: `${factory}/${this.resourcePath}/`,
    query,
    options,
  });
};

/**
 * Retrieve a single wave.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.wave - The name of the wave.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Waves.prototype.retrieve = async function ({ factory, wave, query, options }) {
  return this.find({
    path: `${factory}/${this.resourcePath}/${wave}/`,
    query,
    options,
  });
};

/**
 * Retrieve a wave status.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.wave - The name of the wave.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Waves.prototype.status = async function ({ factory, wave, query, options }) {
  return this.find({
    path: `${factory}/${this.resourcePath}/${wave}/status/`,
    query,
    options,
  });
};

/**
 * Retrieve a wave status.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.wave - The name of the wave.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Waves.prototype.cancel = async function ({ factory, wave, query, options }) {
  return createResponse(
    this.post({
      path: `${factory}/${this.resourcePath}/${wave}/cancel/`,
      query,
      options,
    })
  );
};

/**
 * Retrieve a wave status.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.wave - The name of the wave.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Waves.prototype.complete = async function ({ factory, wave, query, options }) {
  return createResponse(
    this.post({
      path: `${factory}/${this.resourcePath}/${wave}/complete/`,
      query,
      options,
    })
  );
};

/**
 * Retrieve a wave status.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.wave - The name of the wave.
 * @param {String} args.data - The data to send.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Waves.prototype.rollout = async function ({
  factory,
  wave,
  data,
  query,
  options,
}) {
  return createResponse(
    this.post({
      path: `${factory}/${this.resourcePath}/${wave}/rollout/`,
      body: data,
      query,
      options,
    })
  );
};

class DeviceGroups extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';
  }
}

/**
 * List all device groups for a factory.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Array>}
 */
DeviceGroups.prototype.list = async function ({ factory, query, options }) {
  return this.find({
    path: `${factory}/device-groups/`,
    query,
    options,
  });
};

/**
 * Create a new device group.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {Object} data.data - The data to send.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
DeviceGroups.prototype.create = async function ({
  factory,
  data,
  query,
  options,
}) {
  return createResponse(
    this.post({
      path: `${factory}/device-groups/`,
      body: data,
      query,
      options,
    })
  );
};

/**
 * Update a device group.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {String} data.group - The name of the device group.
 * @param {Object} data.data - The data to send.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
DeviceGroups.prototype.update = async function ({
  factory,
  group,
  data,
  query,
  options,
}) {
  return createResponse(
    this.patch({
      path: `${factory}/device-groups/${group}/`,
      body: data,
      query,
      options,
    })
  );
};

/**
 * Remove a device group from a factory.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {String} data.group - The name of the device group.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise}
 */
DeviceGroups.prototype.remove = async function ({
  factory,
  group,
  query,
  options,
}) {
  return createResponse(
    this.delete({
      path: `${factory}/device-groups/${group}/`,
      query,
      options,
    })
  );
};

class ComposeApps extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';
  }
}

/**
 * List all compose apps for a target.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {String} data.target - The name/id name of the build.
 * @param {String} data.run - The run name.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
ComposeApps.prototype.list = async function ({
  factory,
  target,
  run,
  query,
  options,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(run, target)}/compose-apps/`,
    query,
    options,
  });
};

/**
 * Retrieve a compose app details.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {String} data.target - The name/id of the build.
 * @param {String} data.run - The run name.
 * @param {String} data.app - The name of the app.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
ComposeApps.prototype.retrieve = async function ({
  factory,
  target,
  run,
  app,
  query,
  options,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(
      run,
      target
    )}/compose-apps/${app}/`,
    query,
    options,
  });
};

class Targets extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';

    this.ComposeApps = new ComposeApps(address);
  }
}

/**
 * List all targets of a factory.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Targets.prototype.list = async function ({ factory, query, options }) {
  return this.find({ path: `${factory}/targets/`, query, options });
};

/**
 * Get a target of a factory.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {String} data.target - The name/id of the build.
 * @param {String} data.run - The run name.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Targets.prototype.retrieve = async function ({
  factory,
  target,
  run,
  query,
  options,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(run, target)}/`,
    query,
    options,
  });
};

class Factories extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';

    this.Targets = new Targets(address);
    this.DeviceGroups = new DeviceGroups(address);
    this.Waves = new Waves(address);
  }
}

/**
 * Retrieve a factory production targets.
 * @param {Object} args
 * @param {String} args.factory The factory name
 * @param {Object} [args.query] Request query parameters
 * @param {Object} [args.options] Request options
 * @returns {Promise<Object>}
 */
Factories.prototype.prodTargets = function ({ factory, query, options }) {
  return this.find({ path: `${factory}/prod-targets/`, query, options });
};

/**
 * Retrieve a factory status.
 * @param {Object} data
 * @param {String} data.factory - The name of the factory.
 * @param {Object} [data.query] - The request query parameters.
 * @param {Object} [data.options] - Optional request options.
 * @returns {Promise<Object>}
 */
Factories.prototype.status = async function ({ factory, query, options }) {
  return this.find({ path: `${factory}/status/`, query, options });
};

export default Factories;
