import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import fs from "fs/promises";
import path from "path";
import { getMedia } from "@/api/CMS.api";
import { MediaProp } from "@/interfaces";

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
}

generateSearchIndex();
