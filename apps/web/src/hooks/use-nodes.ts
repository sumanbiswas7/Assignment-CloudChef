import { useAtom } from "jotai";
import { TreeDataAtom, UploadingAtom } from "../atoms/tree-atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/base-url";
import { buildTree } from "../utils/build-tree";
import { getMsgFromAxiosErr } from "../utils/get-axios-err";

export function useNodes() {
   const [data, setData] = useAtom(TreeDataAtom);
   const [loading, setLoading] = useAtom(UploadingAtom);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      fetchNodes();
   }, []);

   async function fetchNodes() {
      try {
         const res = await axios.get(`${BASE_URL}/node`);
         const nodes = res.data.data?.nodes;
         if (!nodes) return setError("No nodes uploaded found");
         const modifiedData = buildTree(nodes);
         setData(modifiedData);
         setLoading(false);
      } catch (error) {
         const msg = getMsgFromAxiosErr(error);
         setError(msg);
      }
   }

   return { data, loading, error };
}
