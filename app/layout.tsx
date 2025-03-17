import "./globals.css";
import { Inter } from "next/font/google";
import HeaderAuth from "@/components/next_components/header-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dog Adoption App",
  description: "Adopt a Dog Today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <HeaderAuth/>
        {children}
      </body>
    </html>
  );
}
