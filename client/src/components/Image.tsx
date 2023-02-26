import { AdvancedImage, responsive, lazyload } from "@cloudinary/react";
import { getImage } from "../lib/cloudinary";

export type ImageProps = {
  id: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
};

export function Image(props: ImageProps) {
  const img = getImage(props.id);

  return (
    <AdvancedImage
      cldImg={img}
      alt={props.alt}
      className={props.className}
      width={props.width}
      height={props.height}
      plugins={[lazyload(), responsive()]}
    />
  );
}

export default Image;
