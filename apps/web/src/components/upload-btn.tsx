import { useAtom } from "jotai";
import classes from "./upload-btn.module.css";
import { TreeDataAtom, UploadingAtom } from "../atoms/tree-atoms";
import { isValidJson } from "../utils/check-json";
import { buildTree } from "../utils/build-tree";

export function UploadButton() {
   const [, setUpload] = useAtom(UploadingAtom);
   const [, setTreeData] = useAtom(TreeDataAtom);

   async function importJson(e: React.ChangeEvent<HTMLInputElement>) {
      try {
         const file = e.target.files?.[0];
         if (!file) return;
         const reader = new FileReader();

         reader.onload = function (event) {
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
               const treeData = buildTree(jsonData);
               setTreeData(treeData);

               console.log("Success", jsonData);
               setUpload(false);
               // Check if the json file is supported
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
