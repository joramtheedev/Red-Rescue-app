import type { Metadata } from "next";
import "./globals.css"; // ← uncomment this
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_NAME || "My App",
    description: "My web app",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (

            <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-surface text-white antialiased font-body min-h-screen">
            <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
                <Navbar />
                {children}
            </ClerkProvider>
            </body>
            </html>

    );
}
