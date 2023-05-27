import { useEffect, useState } from "react";

export function useImage(path: string) {
  const [image, setImage] = useState("");

  useEffect(() => {
    import(`../assets/${path}`).then((x) => setImage(x.default));
  }, [path]);

  return image;
}
