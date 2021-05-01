import { useEffect } from "react";
import Child from "./Child";

export default function Parent() {
  console.log("normal parent ");
  useEffect(() => console.log("useEffectParent"));
  return <Child />;
}
