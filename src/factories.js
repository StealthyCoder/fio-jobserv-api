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
 * @param {String} run - The run name.
 * @param {String} target - The build name/id (the target).
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
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Array>}
 */
Waves.prototype.list = async function ({ factory, query, options, fetchFn }) {
  return this.find({
    path: `${factory}/${this.resourcePath}/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve a single wave.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.wave - The name of the wave.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Waves.prototype.retrieve = async function ({
  factory,
  wave,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/${this.resourcePath}/${wave}/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve a wave status.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.wave - The name of the wave.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Waves.prototype.status = async function ({
  factory,
  wave,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/${this.resourcePath}/${wave}/status/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve a wave status.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.wave - The name of the wave.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Waves.prototype.cancel = async function ({
  factory,
  wave,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.post({
      path: `${factory}/${this.resourcePath}/${wave}/cancel/`,
      query,
      options,
      fetchFn,
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
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Waves.prototype.complete = async function ({
  factory,
  wave,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.post({
      path: `${factory}/${this.resourcePath}/${wave}/complete/`,
      query,
      options,
      fetchFn,
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
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Waves.prototype.rollout = async function ({
  factory,
  wave,
  data,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.post({
      path: `${factory}/${this.resourcePath}/${wave}/rollout/`,
      body: data,
      query,
      options,
      fetchFn,
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
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Array>}
 */
DeviceGroups.prototype.list = async function ({
  factory,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/device-groups/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Create a new device group.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {Object} args.data - The data to send.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
DeviceGroups.prototype.create = async function ({
  factory,
  data,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.post({
      path: `${factory}/device-groups/`,
      body: data,
      query,
      options,
      fetchFn,
    })
  );
};

/**
 * Update a device group.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.group - The name of the device group.
 * @param {Object} args.data - The data to send.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
DeviceGroups.prototype.update = async function ({
  factory,
  group,
  data,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.patch({
      path: `${factory}/device-groups/${group}/`,
      body: data,
      query,
      options,
      fetchFn,
    })
  );
};

/**
 * Remove a device group from a factory.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.group - The name of the device group.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise}
 */
DeviceGroups.prototype.remove = async function ({
  factory,
  group,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.delete({
      path: `${factory}/device-groups/${group}/`,
      query,
      options,
      fetchFn,
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
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.target - The name/id name of the build.
 * @param {String} args.run - The run name.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
ComposeApps.prototype.list = async function ({
  factory,
  target,
  run,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(run, target)}/compose-apps/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve a compose app details.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.target - The name/id of the build.
 * @param {String} args.run - The run name.
 * @param {String} args.app - The name of the app.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
ComposeApps.prototype.retrieve = async function ({
  factory,
  target,
  run,
  app,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(
      run,
      target
    )}/compose-apps/${app}/`,
    query,
    options,
    fetchFn,
  });
};

class Sboms extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';
  }
}

/**
 * List all sboms for a target.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.tufTarget - The name of the TUF target.
 * @param {String} [args.run] - The run name.
 * @param {String} [args.target] - The name of the build.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Sboms.prototype.list = async function ({
  factory,
  run,
  target,
  tufTarget,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/targets/${
      tufTarget || createTargetName(run, target)
    }/sboms/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve list of SPDX packages for a specific SBOM.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.tufTarget - The name of the TUF target.
 * @param {String} [args.run] - The run name.
 * @param {String} [args.target] - The name of the build.
 * @param {String} args.sbomPath - The SPDIX package path.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Sboms.prototype.retrieve = async function ({
  factory,
  tufTarget,
  run,
  target,
  sbomPath,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/targets/${
      tufTarget || createTargetName(run, target)
    }/sboms/${sbomPath}`,
    query,
    options,
    fetchFn,
  });
};

class Targets extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/ota/factories/';

    this.ComposeApps = new ComposeApps(address);
    this.Sboms = new Sboms(address);
  }
}

/**
 * List all targets of a factory.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Targets.prototype.list = async function ({ factory, query, options, fetchFn }) {
  return this.find({ path: `${factory}/targets/`, query, options, fetchFn });
};

/**
 * Get a target of a factory.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {String} args.target - The name/id of the build.
 * @param {String} args.run - The run name.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Targets.prototype.retrieve = async function ({
  factory,
  target,
  run,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/targets/${createTargetName(run, target)}/`,
    query,
    options,
    fetchFn,
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
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Factories.prototype.prodTargets = function ({
  factory,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${factory}/prod-targets/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve a factory status.
 * @param {Object} args
 * @param {String} args.factory - The name of the factory.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Factories.prototype.status = async function ({
  factory,
  query,
  options,
  fetchFn,
}) {
  return this.find({ path: `${factory}/status/`, query, options, fetchFn });
};

export default Factories;
