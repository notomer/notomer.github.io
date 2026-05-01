"use client";

export default function Radar({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/40" onClick={onClose}>
      <div
        className="w-[min(760px,90vw)] rounded-ui shadow-card border border-[var(--card-border)] 
                   bg-[var(--surface)] backdrop-blur-[var(--blur)] font-ui"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[var(--chrome)] rounded-t-ui border-b border-[var(--card-border)]">
          {/* Stoplights */}
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#ffb3b3] to-[#ff5f57] shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#ffe3a1] to-[#ffbd2e] shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#a6f3b1] to-[#28c840] shadow-sm" />
          </div>
          <span className="ml-2 font-ui text-sm text-[var(--muted)]">Feedback Assistant — New Report</span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-[var(--muted)] font-ui">
              Title
              <input 
                className="mt-1 w-full rounded-ui border border-[var(--btn-border)] bg-[var(--card-bg)] px-2 py-1 text-[var(--fg)] font-ui" 
                defaultValue="FB12345678: Visual glitch in Theme Switcher" 
                readOnly
              />
            </label>
            <label className="text-sm text-[var(--muted)] font-ui">
              Product
              <input 
                className="mt-1 w-full rounded-ui border border-[var(--btn-border)] bg-[var(--card-bg)] px-2 py-1 text-[var(--fg)] font-ui" 
                defaultValue="Apple Eras UI.app" 
                readOnly
              />
            </label>
          </div>
          
          <label className="block text-sm text-[var(--muted)] font-ui">
            Steps to Reproduce
            <textarea 
              className="mt-1 w-full h-28 rounded-ui border border-[var(--btn-border)] bg-[var(--card-bg)] p-2 text-[var(--fg)] font-ui resize-none"
              defaultValue={`1. Open Theme Switcher with "/" hotkey
2. Toggle between Aqua and Big Sur themes
3. Observe delightful theme transitions
4. Marvel at authentic Apple design recreation

Expected: Themes should switch instantly
Actual: Themes switch so smoothly it's almost magical ✨

This isn't really a bug, it's working perfectly!`}
              readOnly
            />
          </label>
          
          <div className="flex justify-end gap-2 pt-2">
            <button 
              className="px-3 py-1.5 border rounded-ui bg-[var(--btn-bg)] text-[var(--btn-fg)] border-[var(--btn-border)] shadow-btn font-ui text-sm transition hover:scale-[0.98]"
              onClick={onClose}
            >
              Submit to /dev/null
            </button>
            <button 
              className="px-3 py-1.5 border rounded-ui bg-[var(--card-bg)] text-[var(--fg)] border-[var(--card-border)] font-ui text-sm transition hover:bg-[var(--surface)]" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 