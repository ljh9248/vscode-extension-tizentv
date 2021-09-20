import { commands, Disposable, ExtensionContext, window } from 'vscode';
import { TaskItem, taskItemProvider } from './provider/TaskExplorer';

export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "vscode-tizen-workspace" is now active!');

	const disposable: Disposable[] = [


		window.registerTreeDataProvider('taskExplorer', taskItemProvider),
		commands.registerCommand('vscode-tizen-workspace.helloWorld', () => {
			window.showInformationMessage('Hello World from vscode-tizen-workspace!');
		}),
		commands.registerCommand('taskExplorer.runTask', () => window.showInformationMessage(`Successfully called add entry.`)),
		commands.registerCommand('taskExplorer.addTask', (node: TaskItem) => window.showInformationMessage(`Successfully called edit entry on ${node.label}.`)),
		commands.registerCommand('taskExplorer.editTask', (node: TaskItem) => window.showInformationMessage(`Successfully called delete entry on ${node.label}.`))
	];

	context.subscriptions.push(...disposable);
}

export function deactivate() { }
