import "./globals.css";
import {Providers} from "@/app/providers";
import PermaNav from "@/components/Navbar/PermaNav";

export const metadata = {
  title: 'PermaDoor',
  description: 'Definitely not a Backdoor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <PermaNav/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
