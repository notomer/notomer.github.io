import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NavBar } from "@/components/NavBar";
import { CommandPalette } from "@/components/CommandPalette";
import EasterEggProvider from "@/components/EasterEggProvider";
import { Dock } from "@/components/system/Dock";
import BootWrapper from "@/components/system/BootWrapper";

export const metadata: Metadata = {
  title: "Apple Eras UI",
  description: "Switchable themes for every Apple design era - from Aqua to Big Sur",
  keywords: ["Apple", "UI", "themes", "design", "Aqua", "macOS", "iOS"],
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <BootWrapper>
          <ThemeProvider>
            <EasterEggProvider>
              <NavBar />
              <main className="pt-12 pb-24">
                {children}
              </main>
              <CommandPalette />
              <Dock />
            </EasterEggProvider>
          </ThemeProvider>
        </BootWrapper>
      </body>
    </html>
  );
}
