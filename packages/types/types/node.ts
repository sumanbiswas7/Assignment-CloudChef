export interface Node {
   name: string;
   parentName: string | null;
   childrenNames: string[];
}

export interface NestedNode {
   children: NestedNode[];
   childrenNames: string[];
   name: string;
   parentName: string | null;
}
