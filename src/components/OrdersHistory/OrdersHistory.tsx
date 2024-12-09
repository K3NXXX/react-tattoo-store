import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { productsService } from '../../services/products.service'
import { Order } from '../../types/order.type'
import ProductFeedback from '../ProductFeedback/ProductFeedback'
import styles from './OrdersHistory.module.scss'

const OrdersHistory: React.FC = () => {
	const [openModal, setOpenModal] = useState(false)
	const [productId, setProductId] = useState<null | string>(null)

	const handleCloseModal = () => setOpenModal(false)

	const { data } = useQuery<Order>({
		queryKey: ['ordersHistory'],
		queryFn: () => productsService.getOrdersHistory(),
	})

	const allItems =
		data?.orders.flatMap(order =>
			order.items.map(item => ({
				...item,
				orderDate: order.orderDate,
			}))
		) || []

	return (
		<div className={styles.root}>
			<h6>03. Історія замовлень</h6>
			<div className={styles.content}>
				<ul className={styles.orders__list}>
					{allItems.map(item => (
						<div key={item.id} className={styles.good}>
							<div>
								<img
									className={styles.goodImg}
									src={item.image}
									alt={item.name}
								/>
							</div>
							<p className={styles.name}>{item.name}</p>
							<p className={styles.price}>{item.price}$</p>
							<p className={styles.count}>Count: {item.count}</p>
							<p className={styles.date}>
								Order Date: {new Date(item.orderDate).toLocaleDateString()}
							</p>
							<div
								onClick={() => {
									setOpenModal(true)
									setProductId(item.id)
								}}
								className={styles.rating}
							>
								<button>Add feedback</button>
							</div>
						</div>
					))}
				</ul>
			</div>
			<ProductFeedback open={openModal} onClose={handleCloseModal} productId={productId} />
		</div>
	)
}

export default OrdersHistory
