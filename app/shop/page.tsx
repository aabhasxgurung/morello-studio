import type { Metadata } from "next";
import { Suspense } from "react";
import Store from "@/components/sections/Store";

export const metadata: Metadata = {
  title: "Shop — Maison Argyle",
  description:
    "Shop the full Maison Argyle Vol. 03 collection. Heavyweight basics, considered cuts, and pieces that carry meaning.",
};

export default function ShopPage() {
  // Store reads ?c= via useSearchParams, which requires a Suspense boundary.
  return (
    <Suspense fallback={null}>
      <Store />
    </Suspense>
  );
}
