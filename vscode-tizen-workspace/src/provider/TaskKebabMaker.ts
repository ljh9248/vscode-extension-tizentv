import { join } from "path";
import {
  Event,
  EventEmitter,
  ExtensionContext,
  ProviderResult,
  Task,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";
import { PropertyState, TaskItem } from "./TaskExplorer";

class KebabItem extends TreeItem {
  tasks: TaskItem[] = [];
  constructor(public readonly label: string) {
    super(label, TreeItemCollapsibleState.Expanded);
  }

  pushTask(task: TaskItem) {
    this.tasks.push(task);
  }

  popTask(task: TaskItem) {
    const index = this.tasks.findIndex((v) => v.id === task.id);
    this.tasks.splice(index, 1);
  }

  run() {
    //run task sequentially
  }

  stop() {}
}

export class KebabProvider
  implements TreeDataProvider<KebabItem | TaskItem | TreeItem>
{
  constructor(private context: ExtensionContext) {}
  private _onDidChangeTreeData: EventEmitter<void | KebabItem | undefined> =
    new EventEmitter<KebabItem | undefined | void>();

  private kebabs: KebabItem[] = [];

  private current: KebabItem | undefined = undefined;

  readonly onDidChangeTreeData: Event<KebabItem | undefined | void> =
    this._onDidChangeTreeData.event;

  getTreeItem(element: KebabItem | TaskItem): TreeItem | Thenable<TreeItem> {
    if (element instanceof TaskItem) {
      element.collapsibleState = TreeItemCollapsibleState.Collapsed;
    }

    if (
      element.contextValue === PropertyState.mandatory &&
      element.description === "none"
    ) {
      element.iconPath = {
        dark: this.context.asAbsolutePath(
          join("resources", "dark", "warning.svg")
        ),
        light: this.context.asAbsolutePath(
          join("resources", "light", "warning.svg")
        ),
      };
    }
    return element;
  }

  getChildren(
    element?: KebabItem | TaskItem
  ): ProviderResult<KebabItem[] | TaskItem[] | TreeItem[]> {
    console.log(element);
    if (!element) {
      return this.kebabs;
    } else if (element instanceof KebabItem) {
      return element.tasks;
    } else if (element instanceof TaskItem) {
      element.paramRoot.collapsibleState = TreeItemCollapsibleState.Expanded;
      return [...element.params, element.outputRoot];
    }
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
  create(task: TaskItem) {
    const kebab = new KebabItem(`kebab-${this.kebabs.length}`);
    kebab.pushTask(task);
    this.kebabs.push(kebab);
    this.current = kebab;
    this.refresh();
  }

  getCurrent() {
    return this.current;
  }
}
