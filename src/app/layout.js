import { Poppins } from "next/font/google";
import "./globals.css";
import WAButton from "./Components/WAButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional weights
});

export const metadata = {
  title: "Rent a Car Website",
  description: "Best cars available for rent",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={`${poppins.variable} antialiased`}>{children}</body>
      </html>
      <WAButton />
    </>
  );
}
