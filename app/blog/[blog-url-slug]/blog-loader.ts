import { cache } from "react";
import { getBlogDetail } from "@/api/CMS.api";

export const loadBlog = cache(async (slug: string) => {
  return getBlogDetail(slug);
});
