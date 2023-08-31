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
							image: true,
							id: true,
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
							image: true,
							id: true,
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

export async function getFriendRequests(userId) {
	const friendRequests = await prisma.friendRequest.findMany({
		where: {
			receiverId: userId
		},
		select: {
			id: true,
			sender: {
				select: {
					global_name: true,
					image: true,
					id: true
				}
			}
		}
	});

	return friendRequests.map(f => ({
		...f.sender,
		friendRequestId: f.id
	}));
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
					OR: [
						{
							userId: currentUserId,
						},
						{
							friendId: currentUserId
						}
					],
				},
				select: {
					id: true
				}
			},
			friendOf: {
				where: {
					OR: [
						{
							userId: currentUserId,
						},
						{
							friendId: currentUserId
						}
					],
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
		sendFriendRequest: user.receivedFriendRequests.length > 0,
		receivedFriendRequest: user.sentFriendRequests.length > 0, // This is because we are looping the users, so we need to check if the current user has received a friend request from the user that we are looping
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

	const existingFriendship = await prisma.friendship.findMany({
		where: {
			OR: [
				{
					userId: senderId,
					friendId: targetId
				},
				{
					userId: targetId,
					friendId: senderId
				}
			]
		}
	});

	if (existingFriendship && existingFriendship.length > 0) {
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

export async function removeFriend(userId, friendId) {
	const friendship = await prisma.friendship.findMany({
		where: {
			OR: [
				{
					userId: userId,
					friendId: friendId
				},
				{
					userId: friendId,
					friendId: userId
				}
			]
		}
	});

	if (!friendship || friendship.length === 0) {
		return false;
	}

	await prisma.friendship.delete({
		where: {
			id: friendship[0].id
		}
	});

	return true;
}

export async function acceptFriendRequest(senderId, receiverId) {
	const friendRequest = await prisma.friendRequest.findMany({
		where: {
			senderId: senderId,
			receiverId: receiverId
		}
	});

	if (!friendRequest || friendRequest.length === 0) {
		return false;
	}

	await prisma.friendRequest.delete({
		where: {
			id: friendRequest[0].id
		}
	})

	await	prisma.friendship.create({
		data: {
			userId: senderId,
			friendId: receiverId
		}
	})

	return true;
}

export async function declineFriendRequest(senderId, receiverId) {
	const friendRequest = await prisma.friendRequest.findMany({
		where: {
			senderId: senderId,
			receiverId: receiverId
		}
	});

	if (!friendRequest || friendRequest.length === 0) {
		return false;
	}

	await prisma.friendRequest.delete({
		where: {
			id: friendRequest[0].id
		}
	})

	return true;
}