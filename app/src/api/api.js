  import a1_0x77497f from 'axios';
  import { HttpsProxyAgent } from 'https-proxy-agent';
  import { Helper } from '../utils/helper.js';
  import a1_0x576e49 from '../utils/logger.js';
  export class API {
    constructor(_0x1d07bf, _0x2d7b72, _0x1c56b3) {
      this.url = _0x1c56b3;
      this.ua = Helper.randomUserAgent();
      this.query = _0x1d07bf;
      this.proxy = _0x2d7b72;
      this.axiosInstance = a1_0x77497f.create({
        'baseURL': _0x1c56b3,
        'headers': this.generateHeaders()
      });
    }
    ['generateHeaders'](_0x50afae = this.query) {
      const _0x239cec = {
        'Accept': "application/json, text/plain, */*",
        'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
        'Content-Type': 'application/json',
        'User-Agent': this.ua
      };
      if (_0x50afae) {
        _0x239cec.Authorization = "initData " + _0x50afae;
      }
      return _0x239cec;
    }
    async ['fetch'](_0x4052b6, _0x5afa49 = 'GET', _0x64d08, _0x3ba646 = {}, _0x4eddf7 = {}) {
      try {
        const _0x1a7561 = '' + this.url + _0x4052b6;
        const _0x432b11 = {
          ..._0x4eddf7,
          ...this.generateHeaders(_0x64d08)
        };
        a1_0x576e49.info(_0x5afa49 + " : " + _0x1a7561 + " " + (this.proxy ? this.proxy : ''));
        a1_0x576e49.info("Request Header : " + JSON.stringify(_0x432b11));
        const _0x572ea7 = {
          'method': _0x5afa49,
          'url': _0x1a7561,
          'headers': _0x432b11
        };
        if (this.proxy) {
          _0x572ea7.httpsAgent = new HttpsProxyAgent(this.proxy);
        }
        if (_0x5afa49 !== 'GET') {
          _0x572ea7.data = _0x3ba646;
          a1_0x576e49.info("Request Body : " + JSON.stringify(_0x3ba646));
        }
        const _0xf2eb72 = await this.axiosInstance.request(_0x572ea7);
        a1_0x576e49.info("Response : " + _0xf2eb72.status + " " + _0xf2eb72.statusText);
        const _0x54d4b0 = {
          'status': _0xf2eb72.status,
          ..._0xf2eb72.data
        };
        a1_0x576e49.info("Response Data : " + JSON.stringify(_0x54d4b0));
        return _0x54d4b0;
      } catch (_0x30e63f) {
        a1_0x576e49.error("Error : " + _0x30e63f.message);
        if (_0x30e63f.status == 0x193) {
          return {
            'status': 0x193,
            ..._0x30e63f.response.data
          };
        }
        if (_0x30e63f.status == 0x1f7 || _0x30e63f.status == 0x194) {
          throw Error("Detect API change Stopping BOT..");
        } else {
          throw _0x30e63f;
        }
      }
    }
  }