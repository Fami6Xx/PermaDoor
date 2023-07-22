import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord"
import {prisma} from "@/lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			profile(profile) {
				if (profile.avatar === null) {
					const defaultAvatarNumber = parseInt(profile.discriminator) % 5
					profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
				} else {
					const format = profile.avatar.startsWith("a_") ? "gif" : "png"
					profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
				}

				return {
					id: profile.id,
					discordId: profile.id,
					name: profile.username,
					global_name: profile.global_name,
					two_factor_enabled: profile.mfa_enabled,
					email: profile.email,
					image: profile.image_url,
				}
			},
		})
	],
	callbacks: {
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.user.id = user.discordId;
			session.user.name = user.name;
			session.user.displayName = user.global_name;
			session.user.two_factor_enabled = user.two_factor_enabled;
			session.user.email = user.email;
			session.user.image = user.image;

			return session
		}
	}
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }