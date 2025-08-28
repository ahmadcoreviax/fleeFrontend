import { Poppins } from "next/font/google";
import "./globals.css";
import WAButton from "./Components/WAButton";
import "antd/dist/reset.css";
import Script from "next/script";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional weights
});
export const metadata = {
  title: "Fleet X Car Rental LLC | Premium Car Rentals in UAE",
  description:
    "Fleet X Car Rental LLC offers premium and affordable car rentals in all over UAE. Choose from luxury, SUV, and economy cars. Best rates, flexible booking, and best support.",
  keywords: [
    "Fleet X Car Rental LLC",
    "Car rental Dubai",
    "Car rental UAE",
    "Luxury car rental Dubai",
    "SUV rental UAE",
    "Affordable car hire UAE",
    "Best car rental company UAE",
  ],

  authors: [{ name: "Fleet X Car Rental LLC" }],
  creator: "Fleet X Car Rental LLC",
  publisher: "Fleet X Car Rental LLC",
  alternates: {
    canonical: "https://fleetx.ae",
  },
  openGraph: {
    title: "Fleet X Car Rental LLC | Premium Car Rentals in UAE",
    description:
      "Rent luxury, SUV, and economy cars in UAE with Fleet X Car Rental LLC. Affordable rates, easy booking, and reliable service.",
    url: "https://fleetx.ae",
    siteName: "Fleet X Car Rental LLC",
    images: [
      {
        url: "https://fleetx.ae/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fleet X Car Rental UAE",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fleet X Car Rental LLC",
    description:
      "Fleet X Car Rental LLC offers the best car rental deals in UAE. Rent luxury, SUV, and economy cars at affordable prices.",
    images: ["https://fleetx.ae/og-image.jpg"],
    creator: "@fleetxrentals", // agar Twitter handle ho
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Car Rental",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={`${poppins.variable} antialiased`}>{children}</body>
        <Script
          id="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CarRental",
              "@id": "https://fleetx.ae/#car-rental",
              name: "Fleet X Car Rental LLC",
              legalName: "Fleet X Car Rental LLC",
              alternateName: "Fleet X Car Rentals",
              url: "https://fleetx.ae",
              logo: "https://fleetx.ae/fullLogo.png",
              image: "https://fleetx.ae/og-image.jpg",
              description:
                "Fleet X Car Rental LLC offers luxury, SUV, and economy cars for rent across Dubai and UAE. Affordable daily, weekly, and monthly rental packages with premium service.",
              slogan: "Luxury & Affordable Car Rentals in UAE",
              foundingDate: "2025",
              founders: [
                {
                  "@type": "Person",
                  name: "Muhammad Atique",
                },
              ],
              knowsAbout: [
                "Car Rental Dubai",
                "Luxury Car Rental",
                "SUV Car Hire",
                "Economy Car Rental",
                "Monthly Car Rental",
              ],
              sameAs: [
                "https://www.facebook.com/fleetxrentals",
                "https://www.instagram.com/fleetxrentals",
                "https://www.linkedin.com/company/fleetxrentals",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sheikh Zayed Road",
                addressLocality: "Dubai",
                addressRegion: "Dubai",
                postalCode: "00000",
                addressCountry: "AE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "25.276987",
                longitude: "55.296249",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+971-50-1234567",
                contactType: "customer service",
                areaServed: "AE",
                availableLanguage: ["English", "Arabic"],
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "08:00",
                  closes: "23:00",
                },
              ],
              priceRange: "$$",
              currenciesAccepted: "AED",
              paymentAccepted: "Cash, Credit Card, Bank Transfer",
              areaServed: [
                {
                  "@type": "Place",
                  name: "Dubai",
                },
                {
                  "@type": "Place",
                  name: "Abu Dhabi",
                },
                {
                  "@type": "Place",
                  name: "Sharjah",
                },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Fleet X Car Rental Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Luxury Car Rental",
                      description:
                        "Premium luxury cars like BMW, Mercedes, and Tesla for rent in Dubai.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "SUV Rental",
                      description:
                        "Spacious SUV cars available for families and business trips.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Economy Car Rental",
                      description:
                        "Affordable daily and monthly car rental packages.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Chauffeur Service",
                      description:
                        "Professional drivers available for hourly and daily bookings.",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </html>
      <WAButton />
    </>
  );
}
