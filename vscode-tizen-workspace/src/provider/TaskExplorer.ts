import {
  Event,
  ProviderResult,
  Task,
  TaskDefinition,
  tasks,
  TaskScope,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  window,
} from "vscode";

export enum PropertyState {
  mandatory = "mandatory",
  optional = "optional",
}

interface TaskDefinitionProperty {
  type: "string" | "array" | "number" | "object";
  [name: string]: any;
}

export interface TizenTaskDefinition extends TaskDefinition {
  properties: TaskDefinitionProperty;
  required: string[];
}

export class TaskItem extends TreeItem {
  constructor(public readonly label: string, private readonly task: Task) {
    super(label, TreeItemCollapsibleState.None);

    this.paramRoot = new TreeItem("params");

    this.outputRoot = new TreeItem("output");

    const { properties, required } = this.task
      .definition as TizenTaskDefinition;
    if (typeof properties === "object" && required) {
      this.params = Object.keys(properties).map((key) => {
        const item = new TreeItem(key);
        item.description = "none";
        if (required.includes(key)) {
          item.contextValue = PropertyState.mandatory;
        } else {
          item.contextValue = PropertyState.optional;
        }
        return item;
      });
    }
  }

  paramRoot: TreeItem;
  params: TreeItem[] = [];

  outputRoot: TreeItem;
  output: TreeItem[] = [];

  contextValue = "TizenTask";

  runTask() {
    window.showInformationMessage(`run task ${this.label}`);
  }

  dropTask() {
    window.showInformationMessage(`remove task ${this.label} from kebab`);
  }

  openTerminal() {
    window.showInformationMessage(`open terminal ${this.label}`);
  }
}

class TaskItemProvider implements TreeDataProvider<TaskItem> {
  onDidChangeTreeData?: Event<void | TaskItem | null | undefined> | undefined;
  getTreeItem(element: TaskItem): TreeItem {
    return element;
  }
  getChildren(element?: TaskItem): ProviderResult<TaskItem[]> {
    return Promise.resolve([
      new TaskItem(
        "gbs : sso-app",
        new Task(
          {
            type: "gbs",
            required: ["param1", "param2", "param3"],
            properties: {
              param1: {
                type: "string",
              },
              param2: {
                type: "string",
              },
              param3: {
                type: "string",
              },
            },
          },
          TaskScope.Workspace,
          "build",
          "gbs"
        )
      ),
      new TaskItem(
        "gbs : sso-service",
        new Task(
          {
            type: "gbs",
            required: ["param1", "param2"],
            properties: {
              param1: {
                type: "string",
              },
              param2: {
                type: "string",
              },
              param3: {
                type: "string",
              },
            },
          },
          TaskScope.Workspace,
          "build",
          "gbs"
        )
      ),
      new TaskItem(
        "ssh : deploy ...",
        new Task(
          {
            type: "ssh",
            required: ["param1"],
            properties: {
              param1: {
                type: "string",
              },
              param2: {
                type: "string",
              },
              param3: {
                type: "string",
              },
            },
          },
          TaskScope.Workspace,
          "deploy",
          "ssh"
        )
      ),
      new TaskItem(
        "ssh : rpm install ...",
        new Task(
          {
            type: "ssh",
            required: ["param1"],
            properties: {
              param1: {
                type: "string",
              },
              param2: {
                type: "string",
              },
              param3: {
                type: "string",
              },
            },
          },
          TaskScope.Workspace,
          "rpm install",
          "ssh"
        )
      ),
      new TaskItem(
        "ssh : shell ...",
        new Task(
          {
            type: "ssh",
            required: ["param1", "param2", "param3"],
            properties: {
              param1: {
                type: "string",
              },
              param2: {
                type: "string",
              },
              param3: {
                type: "string",
              },
            },
          },
          TaskScope.Workspace,
          "shell",
          "ssh"
        )
      ),
    ]);
  }
}

export const taskItemProvider = new TaskItemProvider();
