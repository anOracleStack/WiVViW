import type { MetadataRoute } from "next";
import { isSiteAccessLocked } from "@/lib/site-access-locked";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (isSiteAccessLocked()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
  };
}
