// checks if the data matches this format
// {
//     "name": "name1",
//     "parentName": null,
//     "childrenNames": ["name2", "name3"]
// },

export function isValidJson(data: any[]) {
   try {
      const nodesByName = new Map(); // name -> node conversion for quick access
      data.forEach((node) => {
         nodesByName.set(node.name, { ...node, children: [] });
      });

      for (const node of data) {
         if (!node.name || !node.childrenNames) return false;
         if (node.parentName && !nodesByName.has(node.parentName)) return false;
         if (!Array.isArray(node.childrenNames)) return false;

         for (const name of node.childrenNames) {
            if (!nodesByName.has(name)) return false;
         }
      }

      return true;
   } catch (error) {
      console.log(error);
      throw new Error("isValidJson(): Something went wrong");
   }
}
