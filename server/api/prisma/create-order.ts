import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ProductItem {
	id: number
	orderId: number
	productId: number
}

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const order = await prisma.orders.create({
		data: {
			userId: body.userId,
			stripeId: body.stripeId,
			name: body.name,
			address: body.address,
			city: body.city,
			zipcode: body.zipcode,
			country: body.country,
		},
	})

	body.products.forEach(async (product: ProductItem) => {
		await prisma.orderItem.create({
			data: {
				orderId: order.id,
				productId: Number(product.id),
			},
		})
	})

	return order
})
