import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";

export default function OtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <Navbar />
      <main className="min-h-full px-10 py-28">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
