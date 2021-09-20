import { commands, Disposable, ExtensionContext, window } from 'vscode';
import { TaskItem, taskItemProvider } from './provider/TaskExplorer';
import { kebabProvider } from './provider/TaskKebabMaker';

export function activate(context: ExtensionContext) {

	console.log('Congratulations, your extension "vscode-tizen-workspace" is now active!');

	const disposable: Disposable[] = [


		window.registerTreeDataProvider('taskExplorer', taskItemProvider),
		window.registerTreeDataProvider('taskKebabMaker', kebabProvider),
		commands.registerCommand('vscode-tizen-workspace.helloWorld', () => {
			window.showInformationMessage('Hello World from vscode-tizen-workspace!');
		}),
		commands.registerCommand('taskExplorer.runTask', (node: TaskItem) => {

			kebabProvider.create(node);
		}),
		commands.registerCommand('taskExplorer.addTask', (node: TaskItem) => {
			kebabProvider.getCurrent()?.pushTask(node);
			kebabProvider.refresh();
		}),
		commands.registerCommand('taskExplorer.editTask', (node: TaskItem) => window.showInformationMessage(`Successfully called delete entry on ${node.label}.`))
	];

	context.subscriptions.push(...disposable);
}

export function deactivate() { }
