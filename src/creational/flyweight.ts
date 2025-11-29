// 1. The Heavy Shared Object (Flyweight)
class TreeType {
  name: string;
  color: string;
  texture: string; // Imagine this is a heavy 5MB image

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  draw(x: number, y: number) {
    // We use the shared data (name) AND the unique data (x, y)
    console.log(
      `🌲 Drawing ${this.name} (${this.color}) at coordinates [${x}, ${y}]`
    );
  }
}

// 2. The Factory (Manages the Cache)
class TreeFactory {
  // The 'Bookshelf' where we keep our shared types
  static cache: Map<string, TreeType> = new Map();

  static getTreeType(name: string, color: string, texture: string): TreeType {
    // Create a unique key to find this specific type
    const key = `${name}-${color}`;

    // CHECK: Do we have it?
    if (!TreeFactory.cache.has(key)) {
      console.log(`✨ Creating new TreeType: ${name}`);
      // CREATE & STORE
      const newType = new TreeType(name, color, texture);
      TreeFactory.cache.set(key, newType);
    }

    // RETURN the cached version
    return TreeFactory.cache.get(key)!;
  }
}

// 3. The Context (The individual tree at a specific spot)
class Tree {
  x: number;
  y: number;
  type: TreeType; // <--- This is the Reference (The Link)

  constructor(x: number, y: number, type: TreeType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  render() {
    // Delegate the drawing to the type, passing our unique location
    this.type.draw(this.x, this.y);
  }
}

// --- MAIN SIMULATION ---

const forest: Tree[] = [];

// Helper function to make it cleaner
function plantTree(x: number, y: number, name: string, color: string) {
  // 1. Ask Factory for the Type (It handles the reusing logic)
  const type = TreeFactory.getTreeType(name, color, "High-Res-Texture.jpg");

  // 2. Create the unique tree using that shared type
  const tree = new Tree(x, y, type);

  forest.push(tree);
}

console.log("--- planting forest ---");
// Plant 3 identical Oaks
plantTree(10, 20, "Oak", "Green");
plantTree(15, 25, "Oak", "Green");
plantTree(20, 30, "Oak", "Green");

// Plant 2 identical Pines
plantTree(50, 10, "Pine", "DarkGreen");
plantTree(55, 15, "Pine", "DarkGreen");

console.log("\n--- Rendering... ---");
forest.forEach((tree) => tree.render());

console.log("\n--- MEMORY STATS ---");
console.log(`Total Trees in forest: ${forest.length}`); // 5
console.log(`Total TreeTypes in memory: ${TreeFactory.cache.size}`); // ONLY 2!
