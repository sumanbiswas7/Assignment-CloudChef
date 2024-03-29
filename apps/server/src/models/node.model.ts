import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   parentName: {
      type: String,
   },

   childrenNames: [String],
});

export const Node = mongoose.model("Node", nodeSchema);
