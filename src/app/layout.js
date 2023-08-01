import "./globals.css";
import {Providers} from "@/app/providers";
import PermaNav from "@/components/Navbar/PermaNav";

export const metadata = {
  title: 'PermaDoor',
  description: 'Definitely not a Backdoor',
  openGraph: {
    title: "PermaDoor",
    description: "This site was made only for testing and learning purposes by developer Fami6Xx",
    url: "https://perma-door.vercel.com",
    siteName: "PermaDoor",
    type: "website",
    locale: "en_US",
    images: [{
      url: "https://cdn.discordapp.com/app-icons/1126625590770925628/ba49f2dbe1be940037b34820f0b1a23c.png?size=256",
      width: 256,
      height: 256
    }]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <PermaNav/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
