import JobServ from './jobserv.js';

class Workers extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/workers/';
  }
}

export default Workers;
