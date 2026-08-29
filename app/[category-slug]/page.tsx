import { notFound } from "next/navigation";

// Revalidate this route every 30 minutes.
export const revalidate = 1800;

interface ListPageProps {
  params: Promise<{
    "category-slug": string;
  }>;
}

export default async function ListPage({ params }: ListPageProps) {
  notFound();
}
