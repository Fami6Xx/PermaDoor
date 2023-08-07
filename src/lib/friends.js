const prisma = require('../prisma');

export async function getUserFriendsInfoById(userId) {
	"use server";
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			friendships: {
				select: {
					friend: {
						select: {
							global_name: true,
							image: true
						}
					},
					createdAt: true
				}
			},
			friendOf: {
				select: {
					user: {
						select: {
							global_name: true,
							image: true
						}
					},
					createdAt: true
				}
			}
		}
	});

	if (!user) {
		throw new Error('User not found.');
	}

	const addedFriends = user.friendships.map(f => ({
		...f.friend,
		friendshipCreatedAt: f.createdAt
	}));

	const addedByFriends = user.friendOf.map(f => ({
		...f.user,
		friendshipCreatedAt: f.createdAt
	}));

	return [...addedFriends, ...addedByFriends];
}