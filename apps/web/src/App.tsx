import classes from "./App.module.css";
import { UploadButton } from "./components/upload-btn";
import { RenderTree } from "./components/render-tree";
import { NoDataIllustration } from "./components/no-data";
import { useNodes } from "./hooks/use-nodes";

export default function App() {
   const { data, error, loading } = useNodes();

   if (error) return <p>{error}</p>;
   if (loading) return <a>Loading...</a>;

   return (
      <div>
         <nav className={classes.navbar}>
            <h2>Json Tree Viewer</h2>
            <UploadButton />
         </nav>

         {data.length ? <RenderTree data={data} /> : <NoDataIllustration />}
      </div>
   );
}
