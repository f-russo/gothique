"use client";

import { Heart, PenLine } from "lucide-react";
import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Client tab shell for the account page. The tab bodies are server-rendered
 * nodes passed in as props.
 */
export function AccountTabs({
  favorites,
  reviews,
  favoriteCount,
  reviewCount,
}: {
  favorites: ReactNode;
  reviews: ReactNode;
  favoriteCount: number;
  reviewCount: number;
}) {
  return (
    <Tabs defaultValue="favorites" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:min-w-80">
        <TabsTrigger value="favorites" className="gap-2">
          <Heart size={15} />
          Favourites
          <span className="ml-1 rounded-full bg-secondary px-1.5 text-xs text-muted-foreground">
            {favoriteCount}
          </span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="gap-2">
          <PenLine size={15} />
          Reviews
          <span className="ml-1 rounded-full bg-secondary px-1.5 text-xs text-muted-foreground">
            {reviewCount}
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="favorites" className="mt-6">
        {favorites}
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        {reviews}
      </TabsContent>
    </Tabs>
  );
}
