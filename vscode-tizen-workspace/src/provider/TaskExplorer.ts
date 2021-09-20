import { Event, ProviderResult, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";


export class TaskItem extends TreeItem {
  constructor(public readonly label: string) {
    super(label, TreeItemCollapsibleState.None);

    this.params = new TreeItem('params');

    this.output = new TreeItem('output');
  }

  params: TreeItem;

  output: TreeItem;

  contextValue = 'TizenTask';
}

class TaskItemProvider implements TreeDataProvider<TaskItem>{
  onDidChangeTreeData?: Event<void | TaskItem | null | undefined> | undefined;
  getTreeItem(element: TaskItem): TreeItem {
    return element;
  }
  getChildren(element?: TaskItem): ProviderResult<TaskItem[]> {
    return Promise.resolve([
      new TaskItem('vbs : sso-app'),
      new TaskItem('vbs : sso-service'),
      new TaskItem('ssh : deploy ...'),
      new TaskItem('ssh : rpm install ...'),
      new TaskItem('sh : launch ...'),
    ]);
  }

}

export const taskItemProvider = new TaskItemProvider();