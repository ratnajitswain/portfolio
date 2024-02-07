import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ratnajit Swain - ReactJs - NextJs - NodeJs - MongoDB",
  description: "Hi, I am Ratnajit Swain, A Full-stack Web developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel= "stylesheet" href= "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
