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
			id: true
		}
	});

	const friendData = await Promise.all(users.map(async user => {
		const sentFriendRequests = await prisma.friendRequest.findMany({
			where: {
				senderId: user.id,
				receiverId: currentUserId
			},
			select: {
				id: true
			}
		});

		const receivedFriendRequests = await prisma.friendRequest.findMany({
			where: {
				senderId: currentUserId,
				receiverId: user.id
			},
			select: {
				id: true
			}
		});

		const friendships = await prisma.friendship.findMany({
			where: {
				OR: [
					{
						userId: user.id,
						friendId: currentUserId
					},
					{
						userId: currentUserId,
						friendId: user.id
					}
				]
			},
			select: {
				id: true
			}
		});

		return {
			user,
			sentFriendRequests,
			receivedFriendRequests,
			friendships
		};
	}));

	return friendData.map(data => ({
		global_name: data.user.global_name,
		image: data.user.image,
		id: data.user.id,
		isFriend: data.friendships.length > 0,
		sendFriendRequest: data.receivedFriendRequests.length > 0,
		receivedFriendRequest: data.sentFriendRequests.length > 0,
		isPending: data.sentFriendRequests.length > 0 || data.receivedFriendRequests.length > 0
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