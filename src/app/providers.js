'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider} from "next-themes";
import {SessionProvider} from "next-auth/react";

export function Providers({session, children}) {
	return (
		<NextUIProvider>
			<ThemeProvider attribute="class" enableSystem={true}>
				<SessionProvider session={session}>
					{children}
				</SessionProvider>
			</ThemeProvider>
		</NextUIProvider>
	)
}