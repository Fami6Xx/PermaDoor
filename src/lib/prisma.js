const { PrismaClient } = require("@prisma/client");

let globalForPrisma = global;

if (!globalForPrisma.prisma) {
	globalForPrisma.prisma = new PrismaClient({
		log: ["warn", "error", "info"],
	});
}

const prisma = globalForPrisma.prisma;

if (process.env.NODE_ENV != "production") globalForPrisma.prisma;

module.exports = {
	prisma
}
