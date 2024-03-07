import classes from "./no-data.module.css";

export function NoDataIllustration() {
   return (
      <div className={classes.container}>
         <img src="/no-data.png" className={classes.img} />
         <p>Please upload a file</p>
      </div>
   );
}
