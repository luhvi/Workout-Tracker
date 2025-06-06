import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DropdownProvider } from "./DropdownContext";
import { ExercisesProvider } from "./ExercisesContext";
import { EditingProvider } from "./EditingContext";
import { EditedProvider } from "./EditedContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ExercisesProvider>
          <EditingProvider>
            <EditedProvider>
              <DropdownProvider>{children}</DropdownProvider>
            </EditedProvider>
          </EditingProvider>
        </ExercisesProvider>
      </body>
    </html>
  );
}
