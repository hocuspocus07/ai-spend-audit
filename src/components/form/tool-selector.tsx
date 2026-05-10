export function ToolSelector() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        AI Tool
      </label>

      <select className="h-12 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 text-sm outline-none transition focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700">
        <option>ChatGPT</option>
        <option>Claude</option>
        <option>Cursor</option>
        <option>GitHub Copilot</option>
        <option>Gemini</option>
      </select>
    </div>
  );
}
