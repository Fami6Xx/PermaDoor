import "./globals.css";
import {Providers} from "@/app/providers";
import PermaNav from "@/components/Navbar/PermaNav";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: 'PermaDoor',
  description: 'Testing app for my NextJS learning',
  metadataBase: "https://perma-door.vercel.app",
  openGraph: {
    title: "PermaDoor",
    description: "This site was made only for testing and learning purposes by developer Fami6Xx",
    url: "https://perma-door.vercel.app",
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

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          <PermaNav/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
