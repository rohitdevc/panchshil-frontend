import { notFound } from "next/navigation";

interface ListPageProps {
  params: Promise<{
    "category-slug": string;
  }>;
}

export default async function ListPage({ params }: ListPageProps) {
  notFound();
}
