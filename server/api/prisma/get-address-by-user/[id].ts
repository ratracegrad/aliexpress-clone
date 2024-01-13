import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

	const address = await prisma.addresses.findFirst({
		where: {
			userId: event.context.params?.id,
		},
	})

	return address
})