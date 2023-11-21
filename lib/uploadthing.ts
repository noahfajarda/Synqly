import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

// extract upload thing and upload files function to be used in account profile
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
