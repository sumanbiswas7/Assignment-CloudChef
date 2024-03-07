import { NestedNode } from "types";
import classes from "./render-tree.module.css";

export function RenderTree({ data }: { data: NestedNode[] }) {
   return <div className={classes.tree}>{renderTree(data)}</div>;
}

export function renderTree(data: NestedNode[]) {
   return (
      <ul>
         {data.map((item) => (
            <li key={item.name}>
               <div className={"item"} style={{}}>
                  {item.name}
               </div>
               {item.children && item.children.length ? renderTree(item.children) : ""}
            </li>
         ))}
      </ul>
   );
}
