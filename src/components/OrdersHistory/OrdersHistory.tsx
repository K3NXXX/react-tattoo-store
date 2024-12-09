import { Pagination } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { productsService } from '../../services/products.service'
import { Order } from '../../types/order.type'
import ProductFeedback from '../ProductFeedback/ProductFeedback'
import styles from './OrdersHistory.module.scss'

const OrdersHistory: React.FC = () => {
	const [openModal, setOpenModal] = useState(false)
	const [productId, setProductId] = useState<null | string>(null)
	const [page, setPage] = useState(1)
	const itemsPerPage = 5

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

	const paginatedItems = allItems.slice(
		(page - 1) * itemsPerPage,
		page * itemsPerPage
	)

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
	}

	return (
		<div className={styles.root}>
			<h6>03. Історія замовлень</h6>
			<div className={styles.content}>
				<ul className={styles.orders__list}>
					{allItems.length > 0 ? (
						paginatedItems.map(item => (
							<div key={item._id} className={styles.good}>
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
						))
					) : (
						<p>Ви ще не робили замовлень</p>
					)}
				</ul>
			</div>
			<ProductFeedback
				open={openModal}
				onClose={handleCloseModal}
				productId={productId}
			/>
			{data && allItems.length > itemsPerPage && (
				<Pagination
					count={Math.ceil(allItems.length / itemsPerPage)}
					page={page}
					onChange={handlePageChange}
					color='standard'
					className={styles.pagination}
				/>
			)}
		</div>
	)
}

export default OrdersHistory
