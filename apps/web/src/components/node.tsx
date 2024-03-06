import { Handle, Position } from "reactflow";
import classes from "./node.module.css";

export function NodeCard({ data }: any) {
   return (
      <div className={classes.container}>
         <div>
            <Handle type="target" position={Position.Left} />
            <label htmlFor="text">{data.label}</label>
            <Handle type="source" position={Position.Right} id="a" />
         </div>
      </div>
   );
}
