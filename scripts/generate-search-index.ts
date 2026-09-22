import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import fs from "fs/promises";
import path from "path";
import { getMedia } from "@/api/CMS.api";
import { MediaProp, PropertyProps } from "@/interfaces";
import { KNOWN_PROPERTY_CATEGORY_SLUGS } from "@/lib/property-category-slugs";
import { getPropertiesByCategory } from "@/api/property";

async function generateSearchIndex() {
  const media = (await getMedia()) as MediaProp[];

  const pages = [
    ...media.map((media_row) => ({
      title: media_row.media_title,
      path: media_row.media_url,
      type: "Media",
    })),
  ];
  
  const outPath = path.join(process.cwd(), "generated/search-index.json");

  await fs.mkdir(path.dirname(outPath), { recursive: true });

  await fs.writeFile(outPath, JSON.stringify(pages, null, 2));

  const propertyOutPath = path.join(process.cwd(), "generated/property-index.json");
  
  await fs.mkdir(path.dirname(propertyOutPath), { recursive: true });
  
  const propertyPages: {
    title: string;
    path: string;
  }[] = [];
  
  for (const property_category_url_slug of KNOWN_PROPERTY_CATEGORY_SLUGS) {
    const properties = await getPropertiesByCategory(property_category_url_slug) as PropertyProps[];
    
    propertyPages.push(
      ...properties.map((property_row) => ({
        title: property_row.property_name,
        path: property_row.property_url_slug,
      }))
    );
  }
  
  await fs.writeFile(propertyOutPath, JSON.stringify(propertyPages, null, 2), "utf-8");
}

generateSearchIndex();
