"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "../hooks/useDebounce";
import type { Product } from "../data/products";

type Props = {
  products: Product[];
};

export default function SearchClient({ products }: Props) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredProducts = useMemo(() => {
    const text = debouncedSearch.trim().toLowerCase();
    if (!text) return products;

    
    const cleanText = text.replace(/[$]/g, " ").trim();
    const parts= cleanText.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return products;

   
    if (parts.length === 2 && parts[0] === "product" && /^\d+$/.test(parts[1])) {
      return products.filter(
        (product) => product.name.toLowerCase() === `product ${parts[1]}`
      );
    }

  
    if (parts.length >= 3 && parts[0] === "product" && /^\d+$/.test(parts[1])) {
      const productNumber = parts[1];
      const pricePart = parts[parts.length - 1]; 
      return products.filter(
        (product) =>
          product.name.toLowerCase() === `product ${productNumber}` &&
          product.price.toString().includes(pricePart)
      );
    }


    if (parts.length === 1 && /^\d+$/.test(parts[0])) {
      return products.filter((product) =>
        product.price.toString().includes(parts[0])
      );
    }

    
    return products.filter((product) => {
      const productName = product.name.toLowerCase();
      const productPrice = product.price.toString();
      return parts.every(
        (part) => productName.includes(part) || productPrice.includes(part)
      );
    });
  }, [debouncedSearch, products]);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />

      <p className="mb-2">Results: {filteredProducts.length}</p>

      <ul className="max-h-96 overflow-y-auto border rounded p-2">
        {filteredProducts.slice(0, 50).map((product) => (
          <li key={product.id} className="py-1">
            {product.name} – ${product.price}
          </li>
        ))}
      </ul>
    </main>
  );
}