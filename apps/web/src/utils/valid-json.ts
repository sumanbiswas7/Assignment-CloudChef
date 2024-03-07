/**
 * Checks if the provided JSON data matches a specific format and verifies the existence of child nodes.
 *
 * The expected JSON format consists of objects with the following properties:
 * - `name`: A string representing the name of the node.
 * - `parentName`: An optional string representing the name of the parent node. If null, the node is considered a root node.
 * - `childrenNames`: An array of strings representing the names of the child nodes.
 *
 * @param data An array of objects representing the JSON data to be validated.
 * @returns A boolean value indicating whether the provided JSON data adheres to the specified format and has valid parent-child relationships.
 */
export function isValidJson(data: any[]) {
   try {
      let parentFound = false;
      const nodesByName = new Map(); // name -> node conversion for quick access
      data.forEach((node) => {
         nodesByName.set(node.name, { ...node, children: [] });
      });

      for (const node of data) {
         if (!node.name || !node.childrenNames) return false;
         if (parentFound === true && node.parentName === null) return false;
         if (node.parentName === null) parentFound = true;
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
