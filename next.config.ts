import type { NextConfig } from "next";
import createMDX from '@next/mdx'


const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "js", "jsx", "md", "mdx"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})
 
export default withMDX(nextConfig)
