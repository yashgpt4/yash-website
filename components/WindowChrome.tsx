'use client';

export function WindowChrome() {
  return (
    <div className="hidden md:flex h-10 items-center justify-between border-b border-stone-200 bg-stone-50 px-4">
      {/* Traffic light dots */}
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
      </div>

      {/* Site name */}
      <div className="text-xs text-stone-500 font-medium">yashvijaykar.com</div>

      {/* Spacer */}
      <div className="w-12" />
    </div>
  );
}
