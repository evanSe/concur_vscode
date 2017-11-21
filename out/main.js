'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpm = require("typed-rest-client/HttpClient");
const vscode_1 = require("vscode");
let httpc = new httpm.HttpClient('vsts-node-api');
function activate() {
    InitStatusBar();
}
exports.activate = activate;
function InitStatusBar() {
    let pact = new Pact();
    pact.icon_init();
    pact.check_in();
}
function deactivate() {
}
exports.deactivate = deactivate;
class Pact {
    icon_init() {
        this._icon = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right);
        this._icon.text = 'PACT';
        this._icon.color = '#00f30b';
        this._icon.show();
    }
    icon_sync() {
        this._icon.tooltip = 'Establishing connection...';
        this._icon.text = 'PACT $(sync)';
    }
    icon_synced() {
        this._icon.tooltip = 'connection established';
        this._icon.text = 'PACT $(check)';
    }
    check_in() {
        return __awaiter(this, void 0, void 0, function* () {
            this.icon_sync();
            let res = yield httpc.get('http://45.55.247.112:8000/check_in');
            let body = JSON.parse(yield res.readBody());
            console.log(1);
            vscode_1.window.showInformationMessage('Workspace id is "' + body.id + '"');
            console.log('Workspace id is "' + body.id + '"');
            console.log(2);
            this.icon_synced();
        });
    }
}
//# sourceMappingURL=main.js.map