"use client";
import { useRouter } from 'next/navigation';

const FAKE_APPS = [
  { name: 'Apple Eras UI', status: 'responding', pid: '1337' },
  { name: 'Theme Switcher', status: 'responding', pid: '420' },
  { name: 'Terminal', status: 'responding', pid: '2001' },
  { name: 'Easter Egg Manager', status: 'responding', pid: '1984' },
  { name: 'Clarus the Dogcow', status: 'not responding', pid: '1998' },
  { name: 'Spinning Beachball', status: 'not responding', pid: '2007' },
];

export default function ForceQuit({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const handleForceQuit = (appName: string) => {
    if (appName === 'Apple Eras UI') {
      // Soft refresh/relaunch
      window.location.reload();
    } else if (appName === 'Terminal') {
      router.push('/terminal');
      onClose();
    } else {
      // Just close the dialog for other apps
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/40" onClick={onClose}>
      <div
        className="w-[min(500px,90vw)] bg-[var(--surface)] backdrop-blur-[var(--blur)] border border-[var(--card-border)] rounded-ui shadow-card font-ui"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[var(--chrome)] rounded-t-ui border-b border-[var(--card-border)]">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#ffb3b3] to-[#ff5f57] shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#ffe3a1] to-[#ffbd2e] shadow-sm" />
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#a6f3b1] to-[#28c840] shadow-sm" />
          </div>
          <span className="ml-2 font-ui text-sm text-[var(--muted)]">Force Quit Applications</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-[var(--muted)] mb-4 font-ui">
            If an application doesn&apos;t respond for a while, select its name and click Force Quit.
          </p>

          {/* App List */}
          <div className="border border-[var(--card-border)] rounded-ui bg-[var(--card-bg)] mb-4">
            {FAKE_APPS.map((app, index) => (
              <div
                key={app.name}
                className={`flex items-center justify-between p-3 border-b border-[var(--card-border)] last:border-b-0 hover:bg-[var(--surface)] cursor-pointer ${
                  app.status === 'not responding' ? 'text-red-600' : 'text-[var(--fg)]'
                }`}
                onClick={() => handleForceQuit(app.name)}
              >
                <div>
                  <div className="font-ui text-sm">{app.name}</div>
                  <div className="font-ui text-xs text-[var(--muted)]">
                    PID: {app.pid}
                  </div>
                </div>
                <div className="font-ui text-xs">
                  {app.status === 'not responding' && (
                    <span className="text-red-600 font-semibold">(Not Responding)</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-between">
            <div className="text-xs text-[var(--muted)] font-ui">
              ⌘⌥⎋ • You can also press Command-Option-Escape to open this dialog.
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleForceQuit('Apple Eras UI')}
                className="px-3 py-1.5 bg-red-600 text-white border border-red-700 rounded-ui font-ui text-sm transition hover:bg-red-700"
              >
                Relaunch
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-[var(--card-bg)] text-[var(--fg)] border border-[var(--card-border)] rounded-ui font-ui text-sm transition hover:bg-[var(--surface)]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 