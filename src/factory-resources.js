/*
Copyright 2020, 2021, 2022, 2023, 2024 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import JobServ from './jobserv.js';

export class FactoryResources extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/';
  }
}

export default FactoryResources;
