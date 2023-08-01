import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord"
import prisma from "@/lib/prisma";
import {PrismaAdapter} from "@auth/prisma-adapter";

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	debug: true,
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

				const resultingProfile = {
					id: profile.id,
					discordId: profile.id,
					name: profile.username,
					global_name: profile.global_name,
					two_factor_enabled: profile.mfa_enabled,
					email: profile.email,
					emailVerified: profile.verified,
					image: profile.image_url,
				}

				checkUpdate(resultingProfile);

				return resultingProfile;
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
			session.user.emailVerified = user.emailVerified;
			session.user.image = user.image;
			console.log(session);

			return session
		}
	}
};

const handler = NextAuth(authOptions)

const checkUpdate = async (profile) => {
	const user = await prisma.user.findFirst({
		where: {
			discordId: profile.discordId
		}
	});

	if(!user) return;

	let needsUpdate = {};

	Object.keys(profile).forEach((key) => {
		if(profile[key] !== user[key] && key !== "id"){
			needsUpdate[key] = profile[key];
		}
	})
	console.log(needsUpdate);

	await prisma.user.update({
		where: {
			id: user.id
		},
		data: needsUpdate
	})
}

export { handler as GET, handler as POST }