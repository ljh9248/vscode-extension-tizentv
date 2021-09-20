import {
  commands,
  Disposable,
  ExtensionContext,
  TreeItem,
  window,
} from "vscode";
import { TaskItem, taskItemProvider } from "./provider/TaskExplorer";
import { KebabProvider } from "./provider/TaskKebabMaker";

export function activate(context: ExtensionContext) {
  const kebabProvider = new KebabProvider(context);
  console.log(
    'Congratulations, your extension "vscode-tizen-workspace" is now active!'
  );

  const disposable: Disposable[] = [
    window.registerTreeDataProvider("taskExplorer", taskItemProvider),
    window.registerTreeDataProvider("taskKebabMaker", kebabProvider),
    commands.registerCommand("taskExplorer.runTask", (node: TaskItem) => {
      kebabProvider.create(node);
    }),
    commands.registerCommand("taskExplorer.addTask", (node: TaskItem) => {
      kebabProvider.getCurrent()?.pushTask(node);
      kebabProvider.refresh();
    }),
    commands.registerCommand("taskExplorer.editTask", (node: TaskItem) =>
      window.showInformationMessage(
        `Successfully called delete entry on ${node.label}.`
      )
    ),
    commands.registerCommand(
      "tizenWorkspace.editProperty",
      async (node: TaskItem) => {
        const input = await window.showInputBox();
        node.description = input;
        kebabProvider.refresh();
      }
    ),
    commands.registerCommand("tizenWorkspace.runTask", (node: TaskItem) => {
      node.runTask();
    }),
    commands.registerCommand("tizenWorkspace.dropTask", (node: TaskItem) => {
      node.dropTask();
    }),
    commands.registerCommand(
      "tizenWorkspace.openTaskTerminal",
      (node: TaskItem) => {
        node.openTerminal();
      }
    ),
  ];

  context.subscriptions.push(...disposable);
}

export function deactivate() {}
