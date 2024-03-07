import classes from "./App.module.css";
import { UploadButton } from "./components/upload-btn";
import { useAtom } from "jotai";
import { TreeDataAtom, UploadingAtom } from "./atoms/tree-atoms";
import { RenderTree } from "./components/render-tree";
import { NoDataIllustration } from "./components/no-data";

export default function App() {
   const [data] = useAtom(TreeDataAtom);
   const [uploading] = useAtom(UploadingAtom);

   if (uploading) return <a>Uploading...</a>;

   return (
      <div>
         <nav className={classes.navbar}>
            <h2>Json Tree Viewer</h2>
            <UploadButton />
         </nav>

         {data.length ? <RenderTree data={data} /> : <NoDataIllustration />}
      </div>
   );
}
