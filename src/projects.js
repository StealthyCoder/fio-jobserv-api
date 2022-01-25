/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createResponse from './response.js';
import JobServ from './jobserv.js';

class Projects extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/projects/';
  }
}

/**
 * Retrieve all builds of a project.
 * @param {Object} args
 * @param {String} args.project - The name of the project.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.findBuilds = async function ({
  project,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${project}/builds/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve a project build.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.findBuildById = async function ({
  project,
  build,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${project}/builds/${build}/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve all runs of a project build.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.findRuns = async function ({
  project,
  build,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve a run of a project build.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {String} args.run - The run name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.findRunByName = async function ({
  project,
  build,
  run,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/${run}/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Stop/Cancel a running run.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {String} args.run - The run name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.cancelRun = async function ({
  project,
  build,
  run,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.post({
      path: `${project}/builds/${build}/runs/${run}/cancel`,
      query,
      options,
      fetchFn,
    })
  );
};

/**
 * Run again a previously ran run.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {String} args.run - The run name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.runAgain = async function ({
  project,
  build,
  run,
  query,
  options,
  fetchFn,
}) {
  return createResponse(
    this.post({
      path: `${project}/builds/${build}/runs/${run}/rerun`,
      query,
      options,
      fetchFn,
    })
  );
};

/**
 * Retrieve the .simulate.sh script for a run.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {String} args.run - The run name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.retrieveSimulator = async function ({
  project,
  build,
  run,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/${run}/.simulate.sh`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve history for run of a project.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {String} args.run - The run name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.findRunHistory = async function ({
  project,
  run,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${project}/history/${run}/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve all tests of a project build run.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {String} args.run - The run name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.findTests = async function ({
  project,
  build,
  run,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/${run}/tests/`,
    query,
    options,
    fetchFn,
  });
};

/**
 * Retrieve all tests of a project build run.
 * @param {Object} args
 * @param {String} args.project - The project name.
 * @param {String} args.build - The build name/id.
 * @param {String} args.run - The run name/id.
 * @param {String} args.test - The test name/id.
 * @param {Object} [args.query] - The request query parameters.
 * @param {Object} [args.options] - Optional request options.
 * @param {Function} [args.fetchFn] - Optional fetch function to use.
 * @returns {Promise<Object>}
 */
Projects.prototype.findTestByName = async function ({
  project,
  build,
  run,
  test,
  query,
  options,
  fetchFn,
}) {
  return this.find({
    path: `${project}/builds/${build}/runs/${run}/tests/${test}/`,
    query,
    options,
    fetchFn,
  });
};

export default Projects;
