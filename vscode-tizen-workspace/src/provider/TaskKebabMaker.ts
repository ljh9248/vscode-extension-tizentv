import { Event, EventEmitter, ProviderResult, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";
import { TaskItem } from "./TaskExplorer";

class KebabItem extends TreeItem {

  tasks: TaskItem[] = [];
  constructor(public readonly label: string) {
    super(label, TreeItemCollapsibleState.Expanded);
  }

  pushTask(task: TaskItem) {
    this.tasks.push(task);
  }

  popTask(task: TaskItem) {
    const index = this.tasks.findIndex(v => v.id === task.id);
    this.tasks.splice(index, 1);
  }

  run() {
    //run task sequentially
  }

  stop() {

  }
}

class KebabProvider implements TreeDataProvider<KebabItem | TaskItem> {
  private _onDidChangeTreeData: EventEmitter<void | KebabItem | undefined> = new EventEmitter<KebabItem | undefined | void>();

  private kebabs: KebabItem[] = [];

  private current: KebabItem | undefined = undefined;

  readonly onDidChangeTreeData: Event<KebabItem | undefined | void> = this._onDidChangeTreeData.event;

  getTreeItem(element: KebabItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  getChildren(element?: KebabItem | TaskItem): ProviderResult<KebabItem[] | TaskItem[]> {
    console.log(element);
    if (!element) {
      // return [];
      return this.kebabs;
    }
    if (element instanceof KebabItem) {
      return element.tasks;
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

export const kebabProvider = new KebabProvider();