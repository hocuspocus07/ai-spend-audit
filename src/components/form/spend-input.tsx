import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SpendInput({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="grid w-full gap-2">
      <Label className="text-xs font-bold uppercase tracking-wider text-zinc-500">{label}</Label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
        <Input 
          type="number" 
          placeholder={placeholder} 
          className="h-12 rounded-xl pl-8 ring-offset-background focus-visible:ring-2 focus-visible:ring-zinc-950" 
        />
      </div>
    </div>
  );
}