import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
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
      <body className={inter.className}>{children}
      {/* <div id="shabd-translation"></div> */}
      {/* <script strategy="afterInteractive" src="https://shabd-testing.s3.us-east-2.amazonaws.com/obs-shabd.js"/> */}
      </body>
      
    </html>
  );
}
