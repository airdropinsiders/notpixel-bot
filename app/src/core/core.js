  import { API } from '../api/api.js';
  import { Helper } from '../utils/helper.js';
  export class Core extends API {
    constructor(_0xfc316b, _0x23aeee, _0x31dc89, _0x4285a5) {
      super(_0x23aeee, _0x4285a5, 'https://notpx.app');
      this.account = _0xfc316b;
      this.query = _0x23aeee;
      this.queryObj = _0x31dc89;
      this.colorList = ["#e46e6e", '#FFD635', '#7EED56', '#00CCC0', '#51E9F4', '#94B3FF', '#E4ABFF', '#FF99AA', "#FF99AA"];
      this.completeGameErrorCount = 0x0;
      this.upgradable = {
        'reChargeSpeed': true,
        'energyLimit': true,
        'paintReward': true
      };
      this.found = false;
    }
    async ['getUserInfo'](_0x52d4fd = false) {
      try {
        if (_0x52d4fd) {
          await Helper.delay(0x3e8, this.account, "Getting User Information...", this);
        }
        const _0x273622 = await this.fetch('/api/v1/users/me', 'GET');
        if (_0x273622.status == 0xc8) {
          this.user = _0x273622;
          if (_0x52d4fd) {
            await Helper.delay(0x7d0, this.account, "Successfully Get User Information", this);
          }
        } else {
          throw Error("Failed To Get User Information");
        }
      } catch (_0x227662) {
        throw _0x227662;
      }
    }
    async ['getMiningStatus'](_0x5d5c56 = false) {
      try {
        if (_0x5d5c56) {
          await Helper.delay(0x3e8, this.account, "Getting Mining Status...", this);
        }
        const _0x42993f = await this.fetch('/api/v1/mining/status', "GET");
        if (_0x42993f.status == 0xc8) {
          this.mining = _0x42993f;
          if (_0x5d5c56) {
            await Helper.delay(0x7d0, this.account, "Successfully Get Mining Status", this);
          }
        } else {
          throw Error("Failed To Get Mining Status");
        }
      } catch (_0x5abf69) {
        throw _0x5abf69;
      }
    }
    async ['getRandomPixelFromCoverage'](_0x129e7d, _0x569f15) {
      const _0x36ae57 = [];
      const _0x344869 = _0x129e7d % 0x3e8;
      const _0x2e3123 = Math.floor(_0x129e7d / 0x3e8);
      const _0x48411d = _0x569f15 % 0x3e8;
      const _0x265c7d = Math.floor(_0x569f15 / 0x3e8);
      for (let _0x280f1d = _0x2e3123; _0x280f1d <= _0x265c7d; _0x280f1d++) {
        for (let _0x22fc3f = _0x280f1d === _0x2e3123 ? _0x344869 : 0x0; _0x22fc3f <= (_0x280f1d === _0x265c7d ? _0x48411d : 999); _0x22fc3f++) {
          const _0x2e5404 = _0x280f1d * 0x3e8 + _0x22fc3f;
          _0x36ae57.push(_0x2e5404);
        }
      }
      return _0x36ae57;
    }
    async ['checkPixel'](_0x49722e, _0x11d4a2 = "#000000") {
      try {
        const _0x5a43ec = await this.fetch('/api/v1/image/get/' + _0x49722e, 'GET', undefined);
        if (_0x5a43ec.status == 0xc8) {
          if (_0x5a43ec.pixel.color != _0x11d4a2) {
            await Helper.delay(0x3e8, this.account, "Found Incorrect Pixel " + _0x49722e + " -> Current Color : " + _0x5a43ec.pixel.color + " , Correct Color : " + _0x11d4a2 + '...', this);
            this.found = true;
          } else {
            this.found = false;
          }
        } else {
          this.found = false;
        }
      } catch (_0x272848) {
        this.found = false;
        if (_0x272848.message.includes('401')) {
          throw _0x272848;
        }
      }
    }
    async ["startPainting"](_0x6ed98b, _0x1cd1d0 = '#000000') {
      try {
        await Helper.delay(0x3e8, this.account, "Start Painting On Block No " + _0x6ed98b + '...', this);
        const _0x2a2e59 = {
          'pixelId': _0x6ed98b,
          'newColor': _0x1cd1d0
        };
        const _0x49a77b = await this.fetch('/api/v1/repaint/start', 'POST', undefined, _0x2a2e59);
        if (_0x49a77b.status == 0xc8) {
          await Helper.delay(0xbb8, this.account, "Successfully Painting On Block " + _0x6ed98b + ", with color " + _0x2a2e59.newColor + " \nGot " + Math.ceil(_0x49a77b.balance - this.mining.userBalance) + " Points", this);
          await this.getMiningStatus();
        } else {
          await Helper.delay(0x7d0, this.account, "Failed to Painting on Block " + _0x6ed98b, this);
        }
      } catch (_0x3281fb) {
        if (_0x3281fb.message.includes("fetch failed")) {
          await Helper.delay(0x7d0, this.account, "Failed to Painting on Block " + _0x6ed98b + " - " + _0x3281fb.message, this);
        } else {
          throw _0x3281fb;
        }
      }
    }
    async ['selectTemplate'](_0x2fd6f7) {
      try {
        await Helper.delay(0x3e8, this.account, "Selecting " + _0x2fd6f7 + " Template...", this);
        const _0x15aa40 = await this.fetch("/api/v1/image/template/" + _0x2fd6f7, 'GET', undefined);
        if (_0x15aa40.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, _0x2fd6f7 + " Template Selected", this);
          await Helper.delay(0x7d0, this.account, "Subscribing " + _0x2fd6f7 + " Template", this);
          const _0x5d868d = await this.fetch('/api/v1/image/template/subscribe/' + _0x2fd6f7, "PUT", undefined);
          if (_0x5d868d.status == 0xc8 || _0x5d868d.status == 0xcc) {
            await Helper.delay(0x3e8, this.account, "Successfully Subscribing " + _0x2fd6f7 + " Template", this);
            this.template = true;
          } else {
            if (_0x5d868d.status == 0x193) {
              this.template = true;
            } else {
              if (_0x5d868d.status == 0xcb && _0x5d868d.status == 0x1f8) {
                await this.selectTemplate(_0x2fd6f7);
              } else {
                await Helper.delay(0x3e8, this.account, "Failed to Subscribe " + _0x2fd6f7 + " Template - " + _0x5d868d.error, this);
              }
            }
          }
        } else {
          await Helper.delay(0x7d0, this.account, "Failed to Select Pumpkin Template", this);
        }
      } catch (_0x48d409) {
        throw _0x48d409;
      }
    }
    async ["checkUserSelectedTemplate"](_0x136030) {
      try {
        await Helper.delay(0x3e8, this.account, "Checking User Selected Template...", this);
        const _0x4d3e78 = await this.fetch('/api/v1/image/template/my', "GET");
        if (_0x4d3e78.status == 0xc8) {
          if (_0x4d3e78.id == _0x136030) {
            await Helper.delay(0x7d0, this.account, "User Already Use " + _0x136030 + " Template", this);
            this.template = true;
          } else {
            await this.selectTemplate(_0x136030);
          }
        } else {
          if (_0x4d3e78.status == 0x194) {
            await this.selectTemplate(_0x136030);
          } else {
            await Helper.delay(0x1388, this.account, "Failed To Check User Template...", this);
          }
        }
      } catch (_0x2dfe5b) {
        await Helper.delay(0x7d0, this.account, "Failed To Check User Template, Skipping ...", this);
      }
    }
    async ['claimMining']() {
      try {
        await Helper.delay(0x3e8, this.account, "Start Claiming Mining Balance...", this);
        const _0x30a225 = await this.fetch('/api/v1/mining/claim', 'GET');
        if (_0x30a225.status == 0xc8) {
          await Helper.delay(0x7d0, this.account, "Successfully Claim Mining Reward", this);
          await this.getMiningStatus();
        } else {
          await Helper.delay(0x1388, this.account, "Failed To Claim Mining Reward, Skipping...", this);
        }
      } catch (_0x115ff6) {
        await Helper.delay(0x7d0, this.account, "Failed To Claim Mining Reward, Skipping ...", this);
      }
    }
    async ['completeMissionsX'](_0x47a350) {
      try {
        await Helper.delay(0x1f4, this.account, "Try To Completing Missions X " + _0x47a350 + '...', this);
        const _0x58456d = await this.fetch('/api/v1/mining/task/check/x?name=' + _0x47a350, 'GET');
        if (_0x58456d.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Complete Task X " + _0x47a350, this);
          await this.getMiningStatus();
        } else {
          await Helper.delay(0x3e8, this.account, "Failed to Complete Task X " + _0x47a350 + ", Skipping...", this);
        }
      } catch (_0x54f0e7) {
        await Helper.delay(0x7d0, this.account, "Failed to Complete Task X " + _0x47a350 + ", Skipping...", this);
      }
    }
    async ["upgrade"](_0x3f9ebe) {
      try {
        await Helper.delay(0x1f4, this.account, "Try To Upgrading " + _0x3f9ebe + '...', this);
        const _0x3e1b0b = await this.fetch("/api/v1/mining/boost/check/" + _0x3f9ebe, "GET");
        if (_0x3e1b0b.status == 0xc8) {
          await Helper.delay(0x3e8, this.account, "Successfully Upgrade " + _0x3f9ebe, this);
          await this.getMiningStatus();
        } else {
          throw Error("Failed To Upgrade " + _0x3f9ebe);
        }
      } catch (_0x4259c2) {
        this.upgradable[_0x3f9ebe] = false;
        await Helper.delay(0x7d0, this.account, "Failed Upgrade " + _0x3f9ebe + " - Insufficient balance", this);
      }
    }
  }