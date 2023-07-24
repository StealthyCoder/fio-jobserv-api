import JobServ from './jobserv.js';

class Health extends JobServ {
  constructor(address) {
    super(address);
    this.basePath = '/health/runs/';
  }
}

export default Health;
