import prisma from './prisma';

/**
 * Get all conversations of a user
 * @param userId {string} - ID of the user
 * @returns {Promise<Array>} - Returns all conversations of a user
 */
export const getAllConversations = async (userId) => {
	const conversations = await prisma.conversation.findMany({
		where: {
			users: {
				some: {
					id: userId
				}
			}
		},
		select: {
			id: true,
			users: {
				select: {
					id: true,
					global_name: true,
					image: true
				}
			}
		}
	});

	if(!conversations) return [];
	if(conversations.length === 0) return [];

	return conversations;
}

/**
 * @param userId {string} - ID of the user
 * @param users {Array<string>} - Array of selected users to have a conversation with
 * @param name {string|undefined} - Name of the conversation (optional)
 */
export const createConversation = async (userId, users, name) => {
	return prisma.conversation.create({
		data: {
			name: name,
			users: {
				connect: users.map((user) => ({id: user}))
			}
		}
	});
}