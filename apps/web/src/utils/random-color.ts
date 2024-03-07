export function getRandomColor() {
   const colorsArr = [
      "#f2f8c9",
      "#f8e8c9",
      "#f8d9c9",
      "#f8c9c9",
      "#c9f4f8",
      "#c9dbf8",
      "#d6c9f8",
      "#f8c9ef",
      "#f8c9c9",
   ];

   const randomIdx = Math.floor(Math.random() * colorsArr.length);
   return colorsArr[randomIdx];
}
