import { atom } from "jotai";
import { NestedNode } from "types";

export const UploadingAtom = atom<boolean>(true);
export const TreeDataAtom = atom<NestedNode[]>([]);
