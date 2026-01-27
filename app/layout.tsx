import "./globals.css";
import { Roboto_Slab, Gravitas_One } from "next/font/google";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-roboto-slab",
  display: "swap",
});

const gravitas = Gravitas_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gravitas",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${robotoSlab.variable} ${gravitas.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
