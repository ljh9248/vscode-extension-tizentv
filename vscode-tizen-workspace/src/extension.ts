import { commands, Disposable, ExtensionContext, window } from 'vscode';
import { taskItemProvider } from './provider/TaskExplorer';

export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "vscode-tizen-workspace" is now active!');

	const disposable: Disposable[] = [];

	window.registerTreeDataProvider('taskExplorer', taskItemProvider);
	commands.registerCommand('vscode-tizen-workspace.helloWorld', () => {
		window.showInformationMessage('Hello World from vscode-tizen-workspace!');
	});

	context.subscriptions.push(...disposable);
}

export function deactivate() { }
