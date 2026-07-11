import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/providers/Toaster";

const geistSans = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://laliguransnursery.com"),

  title: {
    default:
      "New Laligurans Nursery | Premium Indoor & Outdoor Plants in Nepal",
    template: "%s | New Laligurans Nursery",
  },

  description:
    "Buy premium indoor plants, outdoor plants, flowering plants, fruit plants, bonsai, succulents, gardening essentials, pots, and accessories online in Nepal. Quality plants with fast delivery and expert care guides.",

  applicationName: "New Laligurans Nursery",

  keywords: [
    "Laligurans Nursery",
    "New Laligurans Nursery",
    "Plants Nepal",
    "Indoor Plants Nepal",
    "Outdoor Plants Nepal",
    "Flowering Plants",
    "Succulents",
    "Bonsai",
    "Fruit Plants",
    "Medicinal Plants",
    "Garden Plants",
    "Plant Shop Nepal",
    "Nursery Kathmandu",
    "Nursery Butwal",
    "Plant Delivery Nepal",
    "Gardening",
    "Garden Accessories",
    "Plant Pots",
    "Plant Care",
    "Air Purifying Plants",
  ],

  authors: [
    {
      name: "New Laligurans Nursery",
      url: "https://laliguransnursery.com",
    },
  ],

  creator: "New Laligurans Nursery",
  publisher: "New Laligurans Nursery",
  category: "E-commerce",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://laliguransnursery.com",
    siteName: "New Laligurans Nursery",
    title: "New Laligurans Nursery | Premium Indoor & Outdoor Plants in Nepal",
    description:
      "Shop premium indoor plants, flowering plants, bonsai, succulents, pots, and gardening essentials with delivery across Nepal.",

    images: [
      {
        url: "/laligurans-logo.png  ",
        width: 1200,
        height: 630,
        alt: "New Laligurans Nursery",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "New Laligurans Nursery",
    description:
      "Premium Indoor & Outdoor Plants | Gardening Essentials | Delivery Across Nepal",
    images: ["/laligurans-logo.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/laligurans-logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/laligurans-logo.png",
  },

  manifest: "/site.webmanifest",

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "New Laligurans Nursery",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },

  other: {
    "theme-color": "#6B2E2E",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#6B2E2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-background"
      style={{
        fontFamily: `${geistSans.style.fontFamily}, var(--font-sans)`,
      }}
    >
      <body className="text-foreground antialiased">
        <QueryProvider>
          {children}
          <Toaster />
          {process.env.NODE_ENV === "production" && <Analytics />}
        </QueryProvider>
      </body>
    </html>
  );
}
