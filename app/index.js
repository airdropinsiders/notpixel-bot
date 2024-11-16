  import { Config } from './config/config.js';
  import { proxyList } from './config/proxy_list.js';
  import { Core } from './src/core/core.js';
  import { Telegram } from './src/core/telegram.js';
  import { Bless } from './src/utils/bless.js';
  import { Helper } from './src/utils/helper.js';
  import a0_0x1b772f from './src/utils/logger.js';
  async function operation(_0x18b390, _0x2de650, _0x24062a, _0x4096e1) {
    const _0x2e9bb5 = new Core(_0x18b390, _0x2de650, _0x24062a, _0x4096e1);
    try {
      const _0x533bfd = Config.REPAINTER ?? true;
      const _0x171d77 = Config.TEMPLATE ?? {
        'templateID': 0x4decc265,
        'startArea': 0x1d921,
        'endArea': 0x26600,
        'correctColor': '#00CC78'
      };
      await _0x2e9bb5.getUserInfo(true);
      await _0x2e9bb5.getMiningStatus(true);
      await _0x2e9bb5.checkUserSelectedTemplate(_0x171d77.templateID);
      const _0x30cd12 = Helper.random(0x0, 0x7530);
      await Helper.delay(_0x30cd12, _0x18b390, "Random Delay " + Helper.msToTime(_0x30cd12) + ", To Make Sure All Account Not Draw On Same pixel...", _0x2e9bb5);
      while (_0x2e9bb5.mining.charges != 0x0) {
        if (_0x533bfd == true) {
          let _0x342c35;
          if (_0x2e9bb5.found == false) {
            if (_0x2e9bb5.template) {
              const _0xf324b9 = await _0x2e9bb5.getRandomPixelFromCoverage(_0x171d77.startArea + Helper.random(0x1, 0x14), _0x171d77.endArea);
              _0x342c35 = [..._0xf324b9];
              for (const _0x5194ca of _0x342c35) {
                await Helper.delay(0x0, _0x18b390, "Searching on Template Area...", _0x2e9bb5);
                await _0x2e9bb5.checkPixel(_0x5194ca, _0x171d77.correctColor);
                if (_0x2e9bb5.found == true) {
                  await _0x2e9bb5.startPainting(_0x5194ca, _0x171d77.correctColor);
                  break;
                }
              }
            } else {
              await _0x2e9bb5.selectTemplate();
            }
          }
          if (_0x2e9bb5.found == false) {
            await Helper.delay(0x3e8, _0x18b390, "Selecting a Global Template...", _0x2e9bb5);
            await Helper.delay(0xbb8, _0x18b390, "Finding incorrect pixels colors from coverage Area 1...", _0x2e9bb5);
            const _0x3f5e8b = await _0x2e9bb5.getRandomPixelFromCoverage(0x4108e, 0x49180);
            const _0x4b713b = await _0x2e9bb5.getRandomPixelFromCoverage(0x4bc16, 0x53d08);
            _0x342c35 = [..._0x3f5e8b, ..._0x4b713b];
            for (const _0x45c34a of _0x342c35) {
              await Helper.delay(0x0, _0x18b390, "Searching on Area 1...", _0x2e9bb5);
              await _0x2e9bb5.checkPixel(_0x45c34a, "#00756F");
              if (_0x2e9bb5.found == true) {
                await _0x2e9bb5.startPainting(_0x45c34a, "#00756F");
                break;
              }
            }
          }
          if (_0x2e9bb5.found == false) {
            const _0x2dedaa = Helper.random(0x0, _0x342c35.length);
            await _0x2e9bb5.startPainting(_0x342c35[_0x2dedaa], '#00756F');
          }
          _0x2e9bb5.found = false;
        } else {
          const _0x1a762e = Helper.random(0x1, 0xf4240);
          await _0x2e9bb5.startPainting(_0x1a762e);
        }
      }
      await _0x2e9bb5.claimMining();
      const _0x2e8afa = Config.USEAUTOUPGRADE ?? true;
      if (_0x2e8afa) {
        if (_0x2e9bb5.mining.boosts.reChargeSpeed != 0x7) {
          await _0x2e9bb5.upgrade('reChargeSpeed');
        }
        if (_0x2e9bb5.mining.boosts.paintReward != 0xb) {
          await _0x2e9bb5.upgrade('paintReward');
        }
        if (_0x2e9bb5.mining.boosts.energyLimit != 0x7) {
          await _0x2e9bb5.upgrade('energyLimit');
        }
      }
      const _0x404981 = Helper.random(0xbb8, 0x2710);
      const _0x4968ba = Config.CUSTOMDELAYINMIN ? Config.CUSTOMDELAYINMIN * 0xea60 : undefined;
      await Helper.delay(_0x4968ba ? _0x4968ba : _0x404981 + _0x2e9bb5.mining.reChargeTimer, _0x18b390, "Account " + _0x18b390.id + " Processing Complete, Restarting in " + Helper.msToTime(_0x404981 + _0x2e9bb5.mining.reChargeTimer), _0x2e9bb5);
      await operation(_0x18b390, _0x2de650, _0x24062a, _0x4096e1);
    } catch (_0x360e07) {
      if (_0x360e07.message.includes('401')) {
        if (_0x18b390.type == 'query') {
          await Helper.delay(0x3e8, _0x18b390, "Error : " + _0x360e07.message + ", Query Is Expired, Please Get New Query", _0x2e9bb5);
        } else {
          await Helper.delay(0x1388, _0x18b390, "Error : " + _0x360e07.message + ", Query Is Expired, Getting New Query in 5 Seconds", _0x2e9bb5);
          const _0x3c87ca = new Telegram();
          await _0x3c87ca.useSession(_0x18b390.accounts, _0x4096e1);
          const _0x339754 = await _0x3c87ca.client.getMe();
          _0x339754.type = 'sessions';
          _0x339754.accounts = _0x18b390.accounts;
          _0x339754.id = _0x339754.id.value;
          let _0xcaacc = await _0x3c87ca.resolvePeer(_0x339754).then(async () => {
            return await _0x3c87ca.initWebView(_0x339754);
          })["catch"](_0x58898e => {
            throw _0x58898e;
          });
          const _0x20fd74 = Helper.queryToJSON(_0xcaacc);
          await _0x3c87ca.disconnect();
          await Helper.delay(0x1388, _0x339754, "Successfully get new query", _0x2e9bb5);
          await operation(_0x339754, _0xcaacc, _0x20fd74, _0x4096e1);
        }
      } else {
        if (_0x360e07.message.includes('API')) {
          await Helper.delay(0x1388, _0x18b390, "Error : " + _0x360e07.message + ", Exiting bot...", _0x2e9bb5);
          await process.exit();
        } else {
          await Helper.delay(0x1388, _0x18b390, "Error : " + _0x360e07.message + ", Retrying after 5 Seconds", _0x2e9bb5);
          await operation(_0x18b390, _0x2de650, _0x24062a, _0x4096e1);
        }
      }
    }
  }
  let init = false;
  async function startBot() {
    return new Promise(async (_0x2c4875, _0x5161e1) => {
      try {
        a0_0x1b772f.info("BOT STARTED");
        const _0x54038b = await new Telegram();
        if (init == false) {
          await _0x54038b.init();
          init = true;
        }
        const _0x1ec4e3 = Helper.getSession('accounts');
        const _0x1b7be9 = [];
        if (proxyList.length > 0x0) {
          if (_0x1ec4e3.length != proxyList.length) {
            _0x5161e1("You have " + _0x1ec4e3.length + " Session but you provide " + proxyList.length + " Proxy");
          }
        }
        for (const _0x5bd0cb of _0x1ec4e3) {
          const _0xc66a46 = _0x1ec4e3.indexOf(_0x5bd0cb);
          const _0x5687de = proxyList.length > 0x0 ? proxyList[_0xc66a46] : undefined;
          if (!_0x5bd0cb.includes("query")) {
            await _0x54038b.useSession('accounts/' + _0x5bd0cb, _0x5687de);
            _0x54038b.session = _0x5bd0cb;
            const _0x55b713 = await _0x54038b.client.getMe();
            _0x55b713.type = "sessions";
            _0x55b713.accounts = 'accounts/' + _0x5bd0cb;
            _0x55b713.id = _0x55b713.id.value;
            let _0xffe6b6 = await _0x54038b.resolvePeer(_0x55b713).then(async () => {
              return await _0x54038b.initWebView(_0x55b713);
            })["catch"](_0x4df31b => {
              throw _0x4df31b;
            });
            const _0x1f0e81 = Helper.queryToJSON(_0xffe6b6);
            await _0x54038b.disconnect();
            _0x1b7be9.push([_0x55b713, _0xffe6b6, _0x1f0e81, _0x5687de]);
          } else {
            let _0x5d918f = Helper.readQueryFile("accounts/" + _0x5bd0cb + '/query.txt');
            let _0x348133 = Helper.queryToJSON(_0x5d918f);
            if (!_0x348133.user) {
              _0x348133 = await Helper.queryToJSON(await Helper.launchParamToQuery(_0x5d918f));
              _0x5d918f = await Helper.launchParamToQuery(_0x5d918f);
            }
            const _0x1ed122 = _0x348133.user;
            _0x1ed122.type = 'query';
            _0x1ed122.firstName = _0x1ed122.first_name;
            _0x1ed122.lastName = _0x1ed122.last_name;
            _0x1b7be9.push([_0x1ed122, _0x5d918f, _0x348133, _0x5687de]);
          }
        }
        if (Config.DISPLAY != "TWIST") {
          Helper.twist = new Bless();
        }
        const _0xc9a094 = _0x1b7be9.map(async _0x5dbf8a => {
          await operation(_0x5dbf8a[0x0], _0x5dbf8a[0x1], _0x5dbf8a[0x2], _0x5dbf8a[0x3]);
        });
        await Promise.all(_0xc9a094);
        _0x2c4875();
      } catch (_0x20516e) {
        a0_0x1b772f.info("BOT STOPPED");
        a0_0x1b772f.error(JSON.stringify(_0x20516e));
        _0x5161e1(_0x20516e);
      }
    });
  }
  (async () => {
    try {
      a0_0x1b772f.clear();
      a0_0x1b772f.info('');
      a0_0x1b772f.info("Application Started");
      console.log("Not Pixel BOT");
      console.log();
      console.log("By : AirdropInsider");
      console.log("Join Channel : https://t.me/AirdropInsiderID");
      console.log("Dont forget to run git pull to keep up to date");
      console.log();
      console.log();
      Helper.showSkelLogo();
      await startBot();
    } catch (_0x5aa488) {
      console.log("Error During executing bot", _0x5aa488);
      await startBot();
    }
  })();