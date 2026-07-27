import Fuse from "fuse.js";
import searchIndex from "@/generated/search-index.json";

export const fuse = new Fuse(searchIndex, {
  keys: ["title", "keywords", "type"],
  threshold: 0.35,
});
