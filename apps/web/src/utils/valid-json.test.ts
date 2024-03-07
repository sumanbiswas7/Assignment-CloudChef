import { expect, test } from "vitest";
import { isValidJson } from "./valid-json";

test("Valid JSON data with correct parent-child relationships", () => {
   const data = [
      {
         name: "name2",
         parentName: "name1",
         childrenNames: ["name4"],
      },
      {
         name: "name3",
         parentName: "name1",
         childrenNames: ["name5", "name6", "name7"],
      },
      {
         name: "name4",
         parentName: "name2",
         childrenNames: [],
      },
      {
         name: "name5",
         parentName: "name3",
         childrenNames: ["name8"],
      },
      {
         name: "name6",
         parentName: "name3",
         childrenNames: [],
      },
      {
         name: "name7",
         parentName: "name3",
         childrenNames: [],
      },
      {
         name: "name1",
         parentName: null,
         childrenNames: ["name2", "name3"],
      },
      {
         name: "name8",
         parentName: "name5",
         childrenNames: [],
      },
   ];

   expect(isValidJson(data)).toBe(true);
});

test("Invalid JSON data: Missing 'name' property", () => {
   const data = [
      {
         parentName: "name1",
         childrenNames: ["name4"],
      },
   ];

   expect(isValidJson(data)).toBe(false);
});

test("Invalid JSON data: Non-existent parentName", () => {
   const data = [
      {
         name: "name2",
         parentName: "nonexistent",
         childrenNames: ["name4"],
      },
   ];

   expect(isValidJson(data)).toBe(false);
});

test("Invalid JSON data: Non-existent child node", () => {
   const data = [
      {
         name: "name2",
         parentName: "name1",
         childrenNames: ["nonexistent"],
      },
   ];

   expect(isValidJson(data)).toBe(false);
});

test("Invalid JSON data: 'childrenNames' not an array", () => {
   const data = [
      {
         name: "name2",
         parentName: "name1",
         childrenNames: "invalid",
      },
   ];

   expect(isValidJson(data)).toBe(false);
});

test("Invalid JSON data: More than one root node", () => {
   const data = [
      {
         name: "name1",
         parentName: null,
         childrenNames: [],
      },
      {
         name: "name2",
         parentName: null,
         childrenNames: [],
      },
   ];

   expect(isValidJson(data)).toBe(false);
});
