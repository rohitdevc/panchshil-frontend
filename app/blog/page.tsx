import { BlogsPageClient } from "@/components/BlogsPage";
import { blogsPageStaticData } from "./blogs-page.data";

export default function BlogsPage() {
  return <BlogsPageClient data={blogsPageStaticData} />;
}
