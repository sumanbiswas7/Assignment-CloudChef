import { atom } from "jotai";
import { NestedNode } from "types";

export const UploadingAtom = atom<boolean>(false);
export const TreeDataAtom = atom<NestedNode[]>([]);
