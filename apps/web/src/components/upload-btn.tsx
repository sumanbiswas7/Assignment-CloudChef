import { useAtom } from "jotai";
import classes from "./upload-btn.module.css";
import { TreeDataAtom, UploadingAtom } from "../atoms/tree-atoms";
import { isValidJson } from "../utils/valid-json";
import { buildTree } from "../utils/build-tree";
import axios from "axios";
import { BASE_URL } from "../constants/base-url";

export function UploadButton() {
   const [, setUpload] = useAtom(UploadingAtom);
   const [, setTreeData] = useAtom(TreeDataAtom);

   async function importJson(e: React.ChangeEvent<HTMLInputElement>) {
      try {
         const file = e.target.files?.[0];
         if (!file) return;
         const reader = new FileReader();

         reader.onload = async function (event) {
            try {
               setUpload(true);
               const jsonData = JSON.parse(event.target?.result as string);

               // check if json is formatted corryctly
               const valid = isValidJson(jsonData);
               if (valid === false) {
                  setUpload(false);
                  return alert("Given JSON is not formatted correctly");
               }

               // upload it to DB
               const res = await axios.post(`${BASE_URL}/node`, { nodes: jsonData });
               if (res.status !== 200) {
                  setUpload(false);
                  return alert("Something went wrong");
               }

               // render the uploaded in fe
               const treeData = buildTree(jsonData);
               setTreeData(treeData);
               setUpload(false);
            } catch (error) {
               setUpload(false);
               console.error("Error parsing JSON:", error);
            }
         };

         reader.readAsText(file);
      } catch (error) {
         console.error(error);
         throw new Error("Unable to upload file");
      }
   }

   return (
      <div className={classes.container}>
         <label htmlFor="upload-json" className={classes.upload_btn}>
            Upload
         </label>
         <input
            type="file"
            id="upload-json"
            className={classes.input}
            accept="application/JSON"
            onChange={importJson}
         />
      </div>
   );
}
