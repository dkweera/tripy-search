import { products } from "../data/products";
import SearchClient from "./search-client";

export const dynamic = "force-static";

export default function Page() {
  return <SearchClient products={products} />;
}
