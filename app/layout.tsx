import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Provider from "./Provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CookieConsent from "react-cookie-consent";
import Script from "next/script";
import I18nProvider from "./TrasnlateProvider";

// Define your custom font
const geistSans = localFont({
  src: "./_fonts/Roboto/Roboto-Regular.ttf", // Path to the font file
  variable: "--font-geist-sans", // This will be the CSS variable you use in your styles
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "To Sign It",
  description: "elctronic signature",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.png" type="image/x-icon" />
        <title>To Sign It</title>
        <meta name="description" content="elctronic signature" />
      </head>

      <body className={`${geistSans.variable}`}>
        <Provider>
          <ToastContainer />
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            strategy="afterInteractive"
          />
          <I18nProvider>{children}</I18nProvider>
        </Provider>
      </body>
    </html>
  );
}
