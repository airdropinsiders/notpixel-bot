  import a5_0x51e65c from 'moment-timezone';
  import a5_0x10703c from 'fs';
  import a5_0xd93fed from 'path';
  import { parse } from 'querystring';
  import { Twist } from './twist.js';
  import { Config } from '../../config/config.js';
  export class Helper {
    static ['display'] = Config.DISPLAY;
    static ["twist"] = new Twist();
    static ["spinnerContent"] = _0x43fa0f => "\nName         : " + (_0x43fa0f.acc.firstName ?? 'Unamed') + " " + (_0x43fa0f.acc.lastName ?? '') + " \nBalance      : " + _0x43fa0f.balance + "\nCharge       : " + _0x43fa0f.charge + "\n\nStatus : " + _0x43fa0f.msg + "\nDelay : " + _0x43fa0f.delay + "\n";
    static ['delay'] = (_0x436f20, _0x3e6139, _0x2fb2ab, _0x4c1a02) => {
      return new Promise(async _0x218854 => {
        let _0x46da90 = _0x436f20;
        if (_0x3e6139 != undefined) {
          await this.twist.log(_0x2fb2ab, _0x3e6139, _0x4c1a02, "Delaying for " + this.msToTime(_0x436f20));
        } else {
          await this.twist.info("Delaying for " + this.msToTime(_0x436f20));
        }
        const _0x2b93ad = setInterval(async () => {
          _0x46da90 -= 0x3e8;
          if (_0x3e6139 != undefined) {
            await this.twist.log(_0x2fb2ab, _0x3e6139, _0x4c1a02, "Delaying for " + this.msToTime(_0x46da90));
          } else {
            await this.twist.info("Delaying for " + this.msToTime(_0x46da90));
          }
          if (_0x46da90 <= 0x0) {
            clearInterval(_0x2b93ad);
            _0x218854();
          }
        }, 0x3e8);
        setTimeout(async () => {
          clearInterval(_0x2b93ad);
          await this.twist.clearInfo();
          if (_0x3e6139) {
            await this.twist.log(_0x2fb2ab, _0x3e6139, _0x4c1a02);
          }
          _0x218854();
        }, _0x436f20);
      });
    };
    static ['randomUserAgent']() {
      const _0x2c4978 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
      return _0x2c4978[Math.floor(Math.random() * _0x2c4978.length)];
    }
    static ["readTime"](_0x235af7) {
      const _0x51d99f = a5_0x51e65c.unix(_0x235af7);
      return _0x51d99f.format("YYYY-MM-DD HH:mm:ss");
    }
    static ['getCurrentTimestamp']() {
      const _0x1c5cdf = a5_0x51e65c().tz('Asia/Singapore').unix();
      return _0x1c5cdf.toString();
    }
    static ["getSession"](_0x2f22f4) {
      try {
        if (!a5_0x10703c.existsSync("accounts")) {
          a5_0x10703c.mkdirSync("accounts");
        }
        const _0x1fc36a = a5_0x10703c.readdirSync(a5_0xd93fed.resolve(_0x2f22f4));
        const _0x5314c4 = [];
        _0x1fc36a.forEach(_0x104e60 => {
          _0x5314c4.push(_0x104e60);
        });
        return _0x5314c4;
      } catch (_0x1c8b7f) {
        throw Error("Error reading sessions directory: " + _0x1c8b7f + ',');
      }
    }
    static ["resetAccounts"]() {
      try {
        const _0x5061b7 = a5_0xd93fed.resolve('accounts');
        const _0x40960e = a5_0x10703c.readdirSync(_0x5061b7);
        console.log("Deleting Accounts...");
        _0x40960e.forEach(_0x991fe5 => {
          const _0x1895a1 = a5_0xd93fed.join(_0x5061b7, _0x991fe5);
          console.log(_0x1895a1);
          a5_0x10703c.rm(_0x1895a1, {
            'recursive': true,
            'force': true
          }, _0x5d7713 => {
            if (_0x5d7713) {
              console.error("Error deleting file " + _0x1895a1 + ':', _0x5d7713);
            }
          });
        });
        console.info("Account reset successfully. Please restart the bot.");
      } catch (_0x9c8ee8) {
        console.error("Error deleting accounts: " + _0x9c8ee8);
        throw _0x9c8ee8;
      }
    }
    static ['getQueryFromUrl'](_0x4e2f01) {
      const _0x7e5adf = _0x4e2f01.split('tgWebAppData=')[0x1].split('&tgWebAppVersion=')[0x0];
      return this.convertUrlEncodedString(_0x7e5adf);
    }
    static ["convertUrlEncodedString"](_0x5c2b5a) {
      const _0x249fa6 = decodeURIComponent(_0x5c2b5a);
      return _0x249fa6;
    }
    static ['jsonToInitParam'](_0xaff366) {
      const _0x3b3ddc = parse(_0xaff366);
      if (_0x3b3ddc.user) {
        const _0x1be630 = JSON.parse(_0x3b3ddc.user);
        _0x3b3ddc.user = encodeURIComponent(JSON.stringify(_0x1be630));
      }
      const _0x5a525d = [];
      for (const [_0x55ac27, _0x8901a9] of Object.entries(_0x3b3ddc)) {
        _0x5a525d.push(_0x55ac27 + '=' + _0x8901a9);
      }
      const _0x333c80 = _0x5a525d.join('&');
      return _0x333c80;
    }
    static ["createDir"](_0x190694) {
      try {
        const _0x2017ac = a5_0xd93fed.join("accounts", _0x190694);
        if (!a5_0x10703c.existsSync("accounts")) {
          a5_0x10703c.mkdirSync("accounts");
        }
        a5_0x10703c.mkdirSync(_0x2017ac, {
          'recursive': true
        });
        console.log(_0x2017ac);
        return _0x2017ac;
      } catch (_0x31c0b4) {
        throw new Error("Error creating directory: " + _0x31c0b4);
      }
    }
    static ['saveQueryFile'](_0x2663dd, _0x1a81d9) {
      const _0x2c2be1 = a5_0xd93fed.resolve(_0x2663dd, 'query.txt');
      a5_0x10703c.writeFile(_0x2c2be1, _0x1a81d9, "utf8", _0x2ba598 => {
        if (_0x2ba598) {
          console.error("Error writing file:", _0x2ba598);
        } else {
          console.log("Query File Created/Modified Successfully.");
        }
      });
    }
    static ['random'](_0x5e57d5, _0x477519) {
      const _0x5f1195 = Math.floor(Math.random() * (_0x477519 - _0x5e57d5 + 0x1)) + _0x5e57d5;
      return _0x5f1195;
    }
    static ['randomArr'](_0x67b16d) {
      return _0x67b16d[Math.floor(Math.random() * _0x67b16d.length)];
    }
    static ['msToTime'](_0x529dc7) {
      const _0x2a9408 = Math.floor(_0x529dc7 / 3600000);
      const _0x2c8d6d = _0x529dc7 % 3600000;
      const _0x1aa348 = Math.floor(_0x2c8d6d / 60000);
      const _0x349e0e = _0x2c8d6d % 60000;
      const _0x2a6022 = Math.round(_0x349e0e / 0x3e8);
      return _0x2a9408 + " Hours " + _0x1aa348 + " Minutes " + _0x2a6022 + " Seconds";
    }
    static ['queryToJSON'](_0x5ab80c) {
      try {
        const _0xf9dd38 = {};
        const _0xd8f031 = _0x5ab80c.split('&');
        _0xd8f031.forEach(_0x5e7479 => {
          const [_0x27a77e, _0x34324b] = _0x5e7479.split('=');
          if (_0x27a77e === "user") {
            _0xf9dd38[_0x27a77e] = JSON.parse(decodeURIComponent(_0x34324b));
          } else {
            _0xf9dd38[_0x27a77e] = decodeURIComponent(_0x34324b);
          }
        });
        return _0xf9dd38;
      } catch (_0xc4870c) {
        throw Error("Invalid Query");
      }
    }
    static ['generateRandomString'](_0x101779) {
      let _0x1e38b2 = '';
      const _0x30ce63 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
      for (let _0x560262 = 0x0; _0x560262 < _0x101779; _0x560262++) {
        _0x1e38b2 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x30ce63));
      }
      return _0x1e38b2;
    }
    static ["readQueryFile"](_0x4f0332) {
      try {
        const _0x4cf356 = a5_0xd93fed.resolve(_0x4f0332);
        const _0x4b04a6 = a5_0x10703c.readFileSync(_0x4cf356, 'utf8');
        return _0x4b04a6;
      } catch (_0x2fb3a9) {
        console.log("No query.txt Files Found");
      }
    }
    static ["launchParamToQuery"](_0x1834d4) {
      const _0x568259 = new URLSearchParams(_0x1834d4);
      let _0x57eca2 = decodeURIComponent(_0x568259.get("tgWebAppData"));
      const _0x4baa3a = new URLSearchParams(_0x57eca2);
      let _0x469729 = decodeURIComponent(_0x4baa3a.get('user'));
      let _0x127cc3 = JSON.parse(_0x469729);
      const _0x2e3874 = {
        'query_id': _0x4baa3a.get('query_id'),
        'user': _0x127cc3,
        'auth_date': _0x4baa3a.get('auth_date'),
        'hash': _0x4baa3a.get('hash')
      };
      const _0x13c050 = JSON.stringify(_0x2e3874.user);
      const _0x10dabe = encodeURIComponent(_0x13c050);
      let _0x5101bb = '';
      if (_0x2e3874.query_id) {
        _0x5101bb += "query_id=" + encodeURIComponent(_0x2e3874.query_id) + '&';
      }
      _0x5101bb += "user=" + _0x10dabe + '&auth_date=' + encodeURIComponent(_0x2e3874.auth_date) + '&hash=' + encodeURIComponent(_0x2e3874.hash);
      return _0x5101bb;
    }
    static ['showSkelLogo']() {
        console.log(`
            █████╗ ██╗██████╗ ██████╗ ██████╗  ██████╗ ██████╗ 
           ██╔══██╗██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
           ███████║██║██████╔╝██║  ██║██████╔╝██║   ██║██████╔╝
           ██╔══██║██║██╔══██╗██║  ██║██╔══██╗██║   ██║██╔═══╝ 
           ██║  ██║██║██║  ██║██████╔╝██║  ██║╚██████╔╝██║     
           ╚═╝  ╚═╝╚═╝╚═╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     
                                                               
           ██╗███╗   ██╗███████╗██╗██████╗ ███████╗██████╗     
           ██║████╗  ██║██╔════╝██║██╔══██╗██╔════╝██╔══██╗    
           ██║██╔██╗ ██║███████╗██║██║  ██║█████╗  ██████╔╝    
           ██║██║╚██╗██║╚════██║██║██║  ██║██╔══╝  ██╔══██╗    
           ██║██║ ╚████║███████║██║██████╔╝███████╗██║  ██║    
           ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝    
           `);
    }
  }
