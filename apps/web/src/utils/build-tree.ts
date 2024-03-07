import { NestedNode, Node } from "types";

export function buildTree(data: Node[]) {
   const nodesByName = new Map(); // name -> node conversion for quick access
   data.forEach((node) => {
      nodesByName.set(node.name, { ...node, children: [] });
   });

   let tree: NestedNode[] = [];
   data.forEach((node) => {
      if (node.parentName) {
         // If the node has a parent, find the parent and add this node to its children
         const parent = nodesByName.get(node.parentName);
         if (parent) {
            // Append current node to its parent's children array
            parent.children.push(nodesByName.get(node.name));
         }
      } else {
         // If no parent, it's a root node
         tree.push(nodesByName.get(node.name));
      }
   });

   return tree;
}
