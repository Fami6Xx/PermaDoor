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
			name: true,
			encrypted: true,
			lastAction: true,
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
 * Updates last action of a conversation
 * @param conversationId {string} - ID of the conversation
 * @returns {Promise<Conversation>}
 */
export const triggerLastAction = async (conversationId) => {
	return prisma.conversation.update({
		where: {
			id: conversationId
		},
		data: {
			lastAction: Date.now() / 1000,
		}
	});
}

/**
 * Creates a conversation between users and puts it in the database
 *
 * @param userId {string} - ID of the user
 * @param users {Array<string>} - Array of selected users to have a conversation with
 * @param name {string|undefined} - Name of the conversation (optional)
 * @param encryption {boolean} - If the conversation is encrypted
 */
export const createConversation = async (userId, users, name, encryption) => {
	users.push(userId);

	if(!name || name.length === 0 || name.trim().length === 0) name = "A very secret conversation";
	if(name.length > 100) name = name.substring(0, 100);

	return prisma.conversation.create({
		data: {
			name: name,
			encrypted: encryption,
			lastAction: Date.now() / 1000,
			users: {
				connect: users.map((user) => ({id: user}))
			}
		}
	});
}