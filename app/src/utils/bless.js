  import a4_0x50041d from 'blessed';
  import a4_0xccf70e from './logger.js';
  import { Helper } from './helper.js';
  export class Bless {
    constructor() {
      this.screen = a4_0x50041d.screen({
        'fastCSR': true
      });
      this.screen.title = "AIRDROP INSIDER";
      this.titleBox = a4_0x50041d.box({
        'top': 0x0,
        'left': "center",
        'width': 'shrink',
        'height': 0x2,
        'tags': true,
        'content': "{center}NOT PIXEL BOT{/center}\n    By: AirdropInsiderID",
        'style': {
          'fg': 'white',
          'bold': true
        }
      });
      this.screen.append(this.titleBox);
      this.subTitle = a4_0x50041d.box({
        'top': 0x1,
        'left': 'center',
        'width': "shrink",
        'height': 0x2,
        'tags': true,
        'content': "By: Airdrop - Insider (https://t.me/AirdropInsiderID)",
        'style': {
          'fg': 'white',
          'bold': true
        }
      });
      this.screen.append(this.subTitle);
      this.tabList = a4_0x50041d.box({
        'top': 0x5,
        'left': 'center',
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'style': {
          'fg': "white"
        }
      });
      this.screen.append(this.tabList);
      this.hintBox = a4_0x50041d.box({
        'bottom': 0x0,
        'left': 'center',
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'content': "{center}Use '->'(arrow right) and '<-'(arrow left) to switch between tabs{/center}",
        'style': {
          'fg': 'white'
        }
      });
      this.screen.append(this.hintBox);
      this.infoBox = a4_0x50041d.box({
        'bottom': 0x3,
        'left': 'center',
        'width': '100%',
        'height': 0x3,
        'tags': true,
        'content': '',
        'style': {
          'fg': 'white'
        }
      });
      this.screen.append(this.infoBox);
      this.tabs = [];
      this.currentTabIndex = 0x0;
      this.isSwitchingTab = false;
      Helper.getSession('accounts').forEach((_0x59afb7, _0x4c439c) => {
        const _0x3222cd = this.createAccountTab("Account " + (_0x4c439c + 0x1));
        this.tabs.push(_0x3222cd);
        this.screen.append(_0x3222cd);
        _0x3222cd.hide();
      });
      if (this.tabs.length > 0x0) {
        this.tabs[0x0].show();
      }
      this.renderTabList();
      this.screen.key(['q', 'C-c'], () => {
        return process.exit(0x0);
      });
      this.screen.key(["left", 'right'], (_0x433975, _0xe1e59e) => {
        if (this.isSwitchingTab) {
          return;
        }
        if (_0xe1e59e.name === 'right') {
          this.switchTab((this.currentTabIndex + 0x1) % this.tabs.length);
        } else {
          if (_0xe1e59e.name === 'left') {
            this.switchTab((this.currentTabIndex - 0x1 + this.tabs.length) % this.tabs.length);
          }
        }
      });
      this.screen.render();
    }
    ["createAccountTab"](_0x1cde85) {
      return a4_0x50041d.box({
        'label': _0x1cde85,
        'top': 0x6,
        'left': 0x0,
        'width': "100%",
        'height': "shrink",
        'border': {
          'type': 'line'
        },
        'style': {
          'fg': 'white',
          'border': {
            'fg': '#f0f0f0'
          }
        },
        'tags': true
      });
    }
    ["renderTabList"]() {
      let _0x2d6b1 = '';
      Helper.getSession('accounts').forEach((_0x1d9feb, _0x4010ae) => {
        if (_0x4010ae === this.currentTabIndex) {
          _0x2d6b1 += "{blue-fg}{bold} Account " + (_0x4010ae + 0x1) + " {/bold}{/blue-fg} ";
        } else {
          _0x2d6b1 += " Account " + (_0x4010ae + 0x1) + " ";
        }
      });
      this.tabList.setContent("{center}" + _0x2d6b1 + '{/center}');
      this.screen.render();
    }
    ['switchTab'](_0x2738ce) {
      if (_0x2738ce < 0x0 || _0x2738ce >= this.tabs.length) {
        return;
      }
      this.isSwitchingTab = true;
      this.tabs[this.currentTabIndex].hide();
      this.currentTabIndex = _0x2738ce;
      this.tabs[this.currentTabIndex].show();
      this.renderTabList();
      setTimeout(() => {
        this.isSwitchingTab = false;
      }, 0xc8);
      this.screen.render();
    }
    async ['log'](_0x4f1015 = '', _0x4560d7 = '', _0x4e57e8 = new Core(), _0x4c7c92) {
      const _0x432bbf = Helper.getSession('accounts');
      const _0x1c5963 = _0x432bbf.indexOf(_0x4560d7.accounts.split('/')[0x1]);
      if (_0x4c7c92 === undefined) {
        a4_0xccf70e.info("Account " + (_0x1c5963 + 0x1) + " - " + _0x4f1015);
        _0x4c7c92 = '-';
      }
      let _0x2ad5b7;
      const _0x4f82d2 = _0x4e57e8.mining ?? {};
      const _0x2e13b8 = _0x4f82d2.userBalance ?? '-';
      const _0x4ac9ee = _0x4f82d2.charges ?? '-';
      let _0x281296 = {
        'msg': _0x4f1015,
        'delay': _0x4c7c92,
        'acc': _0x4560d7,
        'balance': _0x2e13b8,
        'charge': _0x4ac9ee
      };
      _0x2ad5b7 = '' + Helper.spinnerContent(_0x281296);
      this.tabs[_0x1c5963].setContent(_0x2ad5b7);
      this.screen.render();
    }
    ['info'](_0x5cf30c = '') {
      const _0x664fdb = "\n{center}Info: " + _0x5cf30c + "{/center}\n";
      this.infoBox.setContent(_0x664fdb);
      this.screen.render();
    }
    ['clearInfo']() {
      this.infoBox.setContent('');
      this.screen.render();
    }
  }