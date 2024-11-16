  import a3_0x5e3877 from 'input';
  import { Helper } from '../utils/helper.js';
  import { Api, TelegramClient } from 'telegram';
  import { StoreSession } from 'telegram/sessions/StoreSession.js';
  import a3_0x344ab4 from '../utils/logger.js';
  import { FloodWaitError } from 'telegram/errors/RPCErrorList.js';
  import { Config } from '../../config/config.js';
  import { HttpsProxyAgent } from 'https-proxy-agent';
  import { LogLevel } from 'telegram/extensions/Logger.js';
  export class Telegram {
    ['storeSession'];
    constructor() {
      this.accountName = 'accounts';
      this.url = 'https://app.notpx.app/';
      this.bot = 'notpixel';
    }
    async ['init']() {
      try {
        await this.onBoarding();
      } catch (_0x359435) {
        console.log(_0x359435);
        a3_0x344ab4.error('' + JSON.stringify(_0x359435));
        throw _0x359435;
      }
    }
    async ['onBoarding']() {
      try {
        let _0x3623fe = "Welcome to Bot \nBy : AirdropInsiderID \n \nLets getting started.\n \nYour Session List:\n";
        const _0xff2620 = Helper.getSession('accounts');
        if (_0xff2620.length == 0x0) {
          _0x3623fe += '<empty>';
        } else {
          for (const _0x188572 of _0xff2620) {
            _0x3623fe += "- " + _0x188572 + "\n";
          }
        }
        _0x3623fe += "\n \nPlease Choose a menu: \n";
        _0x3623fe += "\n \n1. Create Account \n2. Reset Account \n3. Start Bot\n4. Query modification\n \nInput your choice :";
        const _0x1e2f3c = await a3_0x5e3877.text(_0x3623fe);
        if (_0x1e2f3c == 0x1) {
          await this.accountType();
        } else {
          if (_0x1e2f3c == 0x2) {
            Helper.resetAccounts();
            await Helper.delay(0xbb8);
            await this.onBoarding();
          } else {
            if (_0x1e2f3c == 0x3) {
              if (Helper.getSession(this.accountName)?.["length"] == 0x0) {
                console.info("You don't have any Accounts, please create first");
                await this.onBoarding();
              }
            } else if (_0x1e2f3c == 0x4) {
              await this.queryModificaiton();
            } else {
              console.error("Invalid input, Please try again");
              await this.onBoarding();
            }
          }
        }
      } catch (_0x421f2a) {
        throw _0x421f2a;
      }
    }
    async ["queryModificaiton"]() {
      try {
        const _0x23c7c4 = Helper.getSession('accounts');
        const _0x13d791 = _0x23c7c4.filter(_0x2947c4 => _0x2947c4.includes("query"));
        let _0x57d5a3 = "Your Query Account List :\n \n";
        for (const _0x517464 of _0x13d791) {
          _0x57d5a3 += _0x23c7c4.indexOf(_0x517464) + 0x1 + ". " + _0x517464 + "\n";
        }
        if (_0x13d791.length == 0x0) {
          console.log("You dont have any Query Account.");
          await this.onBoarding();
        } else {
          _0x57d5a3 += "\n \nPlease Select Query Account for modification:";
        }
        const _0x5c330c = await a3_0x5e3877.text(_0x57d5a3);
        if (_0x13d791[_0x5c330c - 0x1] != undefined) {
          const _0x24c221 = _0x13d791[_0x5c330c - 0x1];
          this.accountName = "accounts/" + _0x24c221;
          const _0x5e79c5 = "Old Query : " + Helper.readQueryFile(this.accountName + '/query.txt') + "\n \nPlease Enter New Query ";
          const _0x442a0c = await a3_0x5e3877.text(_0x5e79c5);
          await Helper.saveQueryFile(this.accountName, _0x442a0c);
          await Helper.delay(0xbb8);
          await this.onBoarding();
        } else {
          console.error("Invalid input, Please try again");
          await this.queryModificaiton();
        }
      } catch (_0x374f7b) {
        throw _0x374f7b;
      }
    }
    async ["sessionCreation"]() {
      try {
        if (Config.TELEGRAM_APP_ID == undefined || Config.TELEGRAM_APP_HASH == undefined) {
          throw new Error("Please configure your TELEGRAM_APP_ID and TELEGRAM_APP_HASH first");
        }
        const _0x588bda = Helper.getSession('accounts');
        let _0x35c7 = "Your Account List :\n \n";
        for (const _0x217b19 of _0x588bda) {
          _0x35c7 += _0x588bda.indexOf(_0x217b19) + 0x1 + ". " + _0x217b19 + "\n";
        }
        if (_0x588bda.length == 0x0) {
          _0x35c7 += "<empty> \n \nPlease enter Session Name :";
        } else {
          _0x35c7 += "\n \nYou already have sessions, cancel(CTRL+C) or create new Session :";
        }
        const _0x3f436b = await a3_0x5e3877.text(_0x35c7);
        this.accountName = Helper.createDir('sessions-' + _0x3f436b);
        await this.useSession(this.accountName);
        await this.disconnect();
        a3_0x344ab4.info("Session " + this.accountName + " - Created");
        console.log("Session " + _0x3f436b + " - Created, Please Restart The Bot Again");
        this.storeSession.save();
        await Helper.delay(0xbb8);
        process.exit();
      } catch (_0x5e31de) {
        throw _0x5e31de;
      }
    }
    async ['queryCreation']() {
      try {
        const _0x255b96 = Helper.getSession("accounts");
        let _0x26362f = "Your Account List :\n \n";
        for (const _0x2ca74b of _0x255b96) {
          _0x26362f += _0x255b96.indexOf(_0x2ca74b) + 0x1 + ". " + _0x2ca74b + "\n";
        }
        if (_0x255b96.length == 0x0) {
          _0x26362f += "<empty> \n \nPlease enter Account Name :";
        } else {
          _0x26362f += "\n \nYou already have Account, cancel(CTRL+C) or create new Account :";
        }
        const _0x2ca92d = await a3_0x5e3877.text(_0x26362f);
        this.accountName = Helper.createDir('query-' + _0x2ca92d);
        const _0x340951 = await a3_0x5e3877.text("Please Enter Telegram Query : ");
        await Helper.saveQueryFile(this.accountName, _0x340951);
        a3_0x344ab4.info("Query " + this.accountName + " - Created");
        console.log("Query " + _0x2ca92d + " - Created, Please Restart The Bot Again");
        await Helper.delay(0xbb8);
        process.exit();
      } catch (_0x40953d) {
        throw _0x40953d;
      }
    }
    async ["accountType"]() {
      try {
        const _0x3e8ea4 = Helper.getSession('accounts');
        let _0x26604e = "Your Account List :\n \n";
        if (_0x3e8ea4.length > 0x0) {
          for (const _0x499e87 of _0x3e8ea4) {
            _0x26604e += _0x3e8ea4.indexOf(_0x499e87) + 0x1 + ". " + _0x499e87 + "\n";
          }
        } else {
          _0x26604e += "<empty>\n";
        }
        _0x26604e += "\n \nAvailable Account Type: \n1. Session \n2. Query\n \nPlease Entery Your Choice : ";
        const _0x4d30fb = await a3_0x5e3877.text(_0x26604e);
        if (_0x4d30fb == 0x1) {
          await this.sessionCreation();
        } else {
          if (_0x4d30fb == 0x2) {
            await this.queryCreation();
          } else {
            console.log("Invalid Input");
            await this.accountType();
          }
        }
      } catch (_0x2339e5) {
        throw _0x2339e5;
      }
    }
    async ['useSession'](_0x4928f6, _0x1e7ab9) {
      try {
        this.proxy = _0x1e7ab9;
        const _0x3c7306 = {
          'connectionRetries': 0x5
        };
        if (this.proxy) {
          _0x3c7306.agent = new HttpsProxyAgent(this.proxy);
        }
        this.storeSession = new StoreSession(_0x4928f6);
        this.client = new TelegramClient(this.storeSession, Config.TELEGRAM_APP_ID, Config.TELEGRAM_APP_HASH, _0x3c7306);
        this.client.setLogLevel(LogLevel.ERROR);
        this.storeSession.save();
        await this.client.start({
          'phoneNumber': async () => await a3_0x5e3877.text("Enter your Telegram Phone Number ?"),
          'password': async () => await a3_0x5e3877.text("Enter your Telegram Password?"),
          'phoneCode': async () => await a3_0x5e3877.text("Enter your Telegram Verification Code ?"),
          'onError': _0x2b78cc => {
            console.log(_0x2b78cc.message);
          }
        });
      } catch (_0x530f8e) {
        throw _0x530f8e;
      }
    }
    async ['resolvePeer'](_0x49fa0b) {
      try {
        a3_0x344ab4.info("Session " + this.session + " - Resolving Peer");
        while (this.peer == undefined) {
          try {
            this.peer = await this.client.getEntity(this.bot);
            break;
          } catch (_0x4036f2) {
            if (_0x4036f2 instanceof FloodWaitError) {
              const _0x5ab72e = _0x4036f2.seconds;
              a3_0x344ab4.warn(this.client.session.serverAddress + " | FloodWait " + _0x4036f2);
              a3_0x344ab4.info(this.client.session.serverAddress + " | Sleep " + _0x5ab72e + 's');
              await Helper.delay(_0x5ab72e * 0x3e8, _0x49fa0b, this.client.session.serverAddress + " | FloodWait " + _0x4036f2);
            } else {
              throw _0x4036f2;
            }
          }
        }
      } catch (_0x1b634f) {
        throw _0x1b634f;
      }
    }
    async ['disconnect']() {
      await this.client.disconnect();
      await this.client.destroy();
      this.peer = undefined;
      this.accountName = undefined;
    }
    async ["initWebView"](_0x225e10) {
      try {
        const _0x243eae = await this.client.invoke(new Api.messages.RequestAppWebView({
          'peer': this.bot,
          'app': new Api.InputBotAppShortName({
            'botId': await this.client.getInputEntity(this.bot),
            'shortName': 'app'
          }),
          'writeAllowed': true,
          'platform': 'android',
          'startParam': 'f' + _0x225e10.id,
          'compact': true
        }));
        a3_0x344ab4.info("Session " + this.session + " - Webview Connected");
        return Helper.getQueryFromUrl(_0x243eae.url);
      } catch (_0x1dc7f9) {
        throw _0x1dc7f9;
      }
    }
  }