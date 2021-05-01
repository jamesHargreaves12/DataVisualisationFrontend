import { useEffect } from "react";

export default function Child() {
  console.log("normal child ");
  useEffect(() => console.log("useEffect child"));
  return <div />;
}
