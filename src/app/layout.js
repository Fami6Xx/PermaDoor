import "./globals.css";
import {Providers} from "@/app/providers";

export const metadata = {
  title: 'PermaDoor',
  description: 'Definitely not a Backdoor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
