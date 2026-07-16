import { BlogDetailsPageClient } from "@/components/BlogDetailsPage";
import { blogDetailsDummyData } from "./blog-details.data";

export default function BlogDetailsPage(
  {
    // params,
  }: {
    params: { id: string };
  }
) {
  // In a real application, you would use params.id to fetch the data
  return <BlogDetailsPageClient data={blogDetailsDummyData} />;
}
