import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "X Persona Blueprint - Decode Any X Account",
    description:
        "Analyze any public X (Twitter) account and get a detailed personality & writing style blueprint. Discover their tone, themes, beliefs, and content formulas.",
    keywords: [
        "twitter analysis",
        "x analysis",
        "writing style",
        "content strategy",
        "social media",
        "persona blueprint",
    ],
    authors: [{ name: "X Persona Blueprint" }],
    openGraph: {
        title: "X Persona Blueprint - Decode Any X Account",
        description:
            "Discover the personality and writing blueprint behind any X account. Analyze tone, themes, beliefs, and content formulas instantly.",
        type: "website",
        locale: "en_US",
        siteName: "X Persona Blueprint",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "X Persona Blueprint",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "X Persona Blueprint - Decode Any X Account",
        description:
            "Discover the personality and writing blueprint behind any X account.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#0a0a0a" />
            </head>
            <body className="bg-background text-text-primary min-h-screen">
                {children}
            </body>
        </html>
    );
}
