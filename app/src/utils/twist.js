  import { Twisters } from 'twisters';
  import a7_0x1b2ebc from './logger.js';
  import { Core } from '../core/core.js';
  import { Helper } from './helper.js';
  export class Twist {
    constructor() {
      this.twisters = new Twisters();
    }
    ["log"](_0xda3726 = '', _0x1ccade = '', _0xc74077 = new Core(), _0x9199d) {
      if (_0x9199d == undefined) {
        a7_0x1b2ebc.info(_0x1ccade.id + " - " + _0xda3726);
        _0x9199d = '-';
      }
      const _0x30da53 = _0xc74077.mining ?? {};
      const _0x323b61 = _0x30da53.userBalance ?? '-';
      const _0x3f5114 = _0x30da53.charges ?? '-';
      let _0x4daa4a = {
        'msg': _0xda3726,
        'delay': _0x9199d,
        'acc': _0x1ccade,
        'balance': _0x323b61,
        'charge': _0x3f5114
      };
      this.twisters.put(_0x1ccade.id, {
        'text': "\n================= Account " + _0x1ccade.id + " =============\n" + Helper.spinnerContent(_0x4daa4a) + "\n=============================================="
      });
    }
    ["info"](_0x23b349 = '') {
      this.twisters.put(0x2, {
        'text': "\n==============================================\nInfo : " + _0x23b349 + "\n=============================================="
      });
      return;
    }
    ['clearInfo']() {
      this.twisters.remove(0x2);
    }
    async ['clear'](_0x2d4f8f) {
      await this.twisters.flush();
    }
  }