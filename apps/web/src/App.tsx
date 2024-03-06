import { useEffect, useState } from "react";
import DUMMY_DATA from "./data/dummy-data.json";
import { NestedNode, Node } from "types";
import "./App.css";

export default function App() {
   const [data, setData] = useState<NestedNode[]>([]);

   useEffect(() => {
      const modifiedData = buildTree(DUMMY_DATA);
      console.log(modifiedData);
      setData(modifiedData);
   }, []);

   function buildTree(data: Node[]) {
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

   return (
      <div style={{ width: "100vw", height: "100vh" }} className="tree">
         {renderTree(data)}
      </div>
   );
}

const renderTree = (treeData: NestedNode[]) => {
   return (
      <ul>
         {treeData.map((item) => (
            <li key={item.name}>
               <div>{item.name}</div>
               {item.children && item.children.length ? renderTree(item.children) : ""}
            </li>
         ))}
      </ul>
   );
};
