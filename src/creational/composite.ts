export interface FileSystemNode {
  getSize(): number;
  display(indent: string): void;
}

export class FileLeaf implements FileSystemNode {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  getSize(): number {
    return this.size;
  }

  display(indent: string): void {
    console.log(`${indent}- File: ${this.name} (${this.size} KB)`);
  }
}

export class FolderComposite implements FileSystemNode {
  private children: FileSystemNode[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  add(node: FileSystemNode): void {
    this.children.push(node);
  }

  getSize(): number {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }

  display(indent: string): void {
    console.log(`${indent}+ Folder: ${this.name}`);
    for (const child of this.children) {
      child.display(indent + "   ");
    }
  }
}

const root = new FolderComposite("root");
const src = new FolderComposite("src");
const components = new FolderComposite("components");

components.add(root);
src.add(new FileLeaf("index.ts", 5));
src.add(new FileLeaf("utils.ts", 3));

const assets = new FolderComposite("assets");
assets.add(new FileLeaf("logo.png", 150));
components.add(root);
components.add(new FileLeaf("header.tsx", 8));
root.add(src);
root.add(assets);
root.add(new FileLeaf("README.md", 1));


root.display("");

console.log("Total size:", root.getSize(), "KB");
