import prisma from './prisma';

export async function getUserFriendsInfoById(userId) {
	const user = await prisma.user.findUnique({
		where: {id: userId},
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

export async function findUsers(query, currentUserId) {
	const users = await prisma.user.findMany({
		where: {
			OR: [
				{
					global_name: {
						contains: query,
						mode: 'insensitive'
					}
				},
				{
					name: {
						contains: query,
						mode: 'insensitive'
					}
				}
			],
			NOT: {
				id: currentUserId
			}
		},
		select: {
			global_name: true,
			image: true,
			id: true,
			sentFriendRequests: {
				where: {
					receiverId: currentUserId
				},
				select: {
					id: true
				}
			},
			receivedFriendRequests: {
				where: {
					senderId: currentUserId
				},
				select: {
					id: true
				}
			},
			friendships: {
				where: {
					friendId: currentUserId
				},
				select: {
					id: true
				}
			},
			friendOf: {
				where: {
					friendId: currentUserId
				},
				select: {
					id: true
				}
			}
		}
	});

	return users.map(user => ({
		global_name: user.global_name,
		image: user.image,
		id: user.id,
		isFriend: user.friendships.length > 0 || user.friendOf.length > 0,
		sendFriendRequest: user.sentFriendRequests.length > 0,
		receivedFriendRequest: user.receivedFriendRequests.length > 0,
		isPending: user.sentFriendRequests.length > 0 || user.receivedFriendRequests.length > 0
	}));
}

export async function sendFriendRequest(senderId, targetId) {
	const existingRequest = await prisma.friendRequest.findMany({
		where: {
			OR: [
				{
					senderId: senderId,
					receiverId: targetId
				},
				{
					receiverId: senderId,
					senderId: targetId
				}
				]
		}
	});

	if (existingRequest && existingRequest.length > 0) {
		return false;
	}

	// Create the friend request
	await prisma.friendRequest.create({
		data: {
			senderId: senderId,
			receiverId: targetId
		}
	});

	return true;
}