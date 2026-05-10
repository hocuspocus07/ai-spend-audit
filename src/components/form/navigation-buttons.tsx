import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function NavigationButtons() {
  return (
    <div className="flex w-full items-center justify-between border-t border-zinc-100 bg-zinc-50/30 p-6 dark:border-zinc-800 dark:bg-transparent">
      <Button variant="ghost" className="rounded-xl px-6 font-semibold hover:bg-zinc-100">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Button className="rounded-xl px-8 font-bold shadow-lg shadow-zinc-200 dark:shadow-none">
        Continue
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}