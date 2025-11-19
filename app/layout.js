import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['400', '700'], // you can add multiple weights
  variable: '--font-cairo', // optional: CSS variable
});

export const metadata = {
  title: "BBC News",
  description: "Your trusted source for news",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${cairo.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
