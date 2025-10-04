declare module "*.css" {
  const stylesType: Record<string, string>;
  export default stylesType;
}

declare module "*.scss" {
  const stylesType: Record<string, string>;
  export default stylesType;
}

declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const SVG: FC<SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
