'use strict';
import * as httpm from 'typed-rest-client/HttpClient';
import { StatusBarAlignment, window, StatusBarItem } from 'vscode';
import { Workspace } from './workspace.class';

let httpc: httpm.HttpClient = new httpm.HttpClient('vsts-node-api');

export function activate()
{
	InitStatusBar();
}

function InitStatusBar()
{
	let pact = new Pact();
	pact.icon_init();
	pact.check_in();
}

export function deactivate()
{
}

class Pact
{
	private _icon: StatusBarItem;
	
	public icon_init()
	{
		this._icon = window.createStatusBarItem(StatusBarAlignment.Right);
		this._icon.text = 'PACT';
		this._icon.color = '#00f30b';
		this._icon.show();
	}

	public icon_sync()
	{
		this._icon.tooltip = 'Establishing connection...';
		this._icon.text = 'PACT $(sync)';
	}

	public icon_synced()
	{
		this._icon.tooltip = 'connection established';
		this._icon.text = 'PACT $(check)';
	}

	public async check_in()
	{
		this.icon_sync();
		let res: httpm.HttpClientResponse = await httpc.get('http://45.55.247.112:8000/check_in');
		let body: Workspace = JSON.parse(await res.readBody());
		console.log(1);
		window.showInformationMessage('Workspace id is "' + body.id + '"');
		console.log('Workspace id is "' + body.id + '"');
		console.log(2);
		this.icon_synced();
	}
}