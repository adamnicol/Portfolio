import config from "../utils/config";
import { Cloudinary } from "@cloudinary/url-gen";

const cloud = new Cloudinary({
  cloud: {
    cloudName: config.CLOUDINARY_CLOUD_NAME,
  },
});

export const getImage = (id: string) => cloud.image(`portfolio/${id}`);
