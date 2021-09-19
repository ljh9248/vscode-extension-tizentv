import { Event, ProviderResult, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";


class TaskItem extends TreeItem {
  constructor(public readonly label: string, public readonly collapsibleState: TreeItemCollapsibleState) {
    super(label, collapsibleState);
  }
}

class TaskItemProvider implements TreeDataProvider<TaskItem>{
  onDidChangeTreeData?: Event<void | TaskItem | null | undefined> | undefined;
  getTreeItem(element: TaskItem): TreeItem {
    return element;
  }
  getChildren(element?: TaskItem): ProviderResult<TaskItem[]> {
    return Promise.resolve([
      new TaskItem('vbs : sso-app', TreeItemCollapsibleState.None),
      new TaskItem('vbs : sso-service', TreeItemCollapsibleState.None),
      new TaskItem('ssh : deploy ...', TreeItemCollapsibleState.None),
      new TaskItem('ssh : rpm install ...', TreeItemCollapsibleState.None),
      new TaskItem('sh : launch ...', TreeItemCollapsibleState.None),
    ]);
  }

}

export const taskItemProvider = new TaskItemProvider();