"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteReview } from "@/lib/actions";

export function ReviewDeleteButton({ reviewId }: { reviewId: number }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const onDelete = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    startTransition(async () => {
      const res = await deleteReview(null, reviewId);
      if (res.ok) {
        toast.success("Your review has been withdrawn.");
        router.refresh();
      } else {
        toast.error(res.error);
        setConfirming(false);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={pending}
      className={
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors " +
        (confirming
          ? "bg-destructive/20 text-destructive"
          : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive")
      }
    >
      <Trash2 size={13} className={pending ? "animate-flicker" : ""} />
      {confirming ? "Confirm removal" : "Remove"}
    </button>
  );
}
