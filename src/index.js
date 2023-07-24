/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import Devices from './devices.js';
import Factories from './factories.js';
import FactoryResources from './factory-resources.js';
import Health from './health.js';
import JobServ from './jobserv.js';
import LegacyDeviceGroups from './legacy-device-groups.js';
import LegacyDevices from './legacy-devices.js';
import Projects from './projects.js';
import Updates from './updates.js';
import Workers from './workers.js';

export default JobServ;

/**
 * Generate the base API access resources.
 * Available resources are:
 *   Devices
 *   Factories
 *   LegacyDeviceGroups
 *   LegacyDevices
 *   Projects
 *   Updates
 * @param {String} address - The address of the resource server.
 * @returns {Object}
 */
export const generateFioApiResources = (address) => {
  return {
    Devices: new Devices(address),
    Factories: new Factories(address),
    Health: new Health(address),
    LegacyDeviceGroups: new LegacyDeviceGroups(address),
    LegacyDevices: new LegacyDevices(address),
    Projects: new Projects(address),
    Updates: new Updates(address),
    Workers: new Workers(address),
  };
};

/**
 * Generate the internal API access resources.
 * Available resources are:
 *   FactoryResources
 * @param {String} address - The address of the resource server.
 * @returns {Object}
 */
export const generateFioInternalApiResources = (address) => {
  return {
    FactoryResources: new FactoryResources(address),
  };
};
