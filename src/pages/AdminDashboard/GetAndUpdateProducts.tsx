import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { productsService } from '../../services/products.service'
import { IProduct } from '../../types/product.type'
import style from './Admin.module.scss'

const GetAndUpdateProducts: React.FC = () => {
	const [editingProductId, setEditingProductId] = useState<string | null>(null)
	const [products, setProducts] = useState<IProduct[]>([])
	const [originalProduct, setOriginalProduct] = useState<IProduct | null>(null)
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const { data, error, isLoading } = useQuery<IProduct[]>({
		queryKey: ['products'],
		queryFn: () => productsService.getAll(),
	})

	const { mutate } = useMutation({
		mutationKey: ['updateProduct'],
		mutationFn: (data: IProduct) => productsService.update(data._id, data),
		onSuccess: () => {
			toast.success('Товар оновлено успішно')
			setErrors({})
		},
		onError: (error: any) => {
			toast.error(error.response.data.error)
		},
	})

	const validateProduct = (product: IProduct) => {
		let hasErrors = false
		setErrors({})

		if (!product.name) {
			toast.error("Назва товару є обов'язковою.")
			setErrors(prev => ({ ...prev, name: "Назва товару є обов'язковою." }))
			hasErrors = true
		}

		if (product.price <= 0) {
			toast.error('Ціна повинна бути більшою за 0.')
			setErrors(prev => ({
				...prev,
				price: 'Ціна повинна бути більшою за 0.',
			}))
			hasErrors = true
		}

		const validTrends = ['new', 'hits', 'popular']
		if (product.trending && !validTrends.includes(product.trending)) {
			toast.error(
				'Недійсне значення тенденції. Дозволені значення: new, hits, popular.'
			)
			setErrors(prev => ({ ...prev, trending: 'Недійсне значення.' }))
			hasErrors = true
		}

		return hasErrors
	}

	const handleEditClick = (product: IProduct) => {
		setEditingProductId(product._id)
		setOriginalProduct({ ...product })
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		product: IProduct
	) => {
		const updatedProducts = products.map(p =>
			p._id === product._id ? { ...p, [e.target.name]: e.target.value } : p
		)
		setProducts(updatedProducts)
		setErrors(prev => ({ ...prev, [e.target.name]: '' }))

		if (e.target.tagName === 'TEXTAREA') {
			e.target.style.height = 'auto'
			e.target.style.height = `${e.target.scrollHeight}px`
		}
	}

	useEffect(() => {
		if (data) {
			setProducts(data)
		}
	}, [data])

	const handleSave = (product: IProduct) => {
		const hasErrors = validateProduct(product)
		if (!hasErrors) {
			mutate(product)
			setEditingProductId(null)
			setOriginalProduct(null)
		}
	}

	const handleCancel = () => {
		if (originalProduct) {
			const updatedProducts = products.map(p =>
				p._id === originalProduct._id ? originalProduct : p
			)
			setProducts(updatedProducts)
		}
		setEditingProductId(null)
		setOriginalProduct(null)
	}

	if (isLoading) return <p>Завантаження...</p>
	if (error) return <p>Виникла помилка: {error.message}</p>

	if (!data) {
		return <p>Немає товарів.</p>
	}

	return (
		<ul className={style.productsList}>
			{products.map((product: IProduct) => (
				<li key={product._id} className={style.productCard}>
					{editingProductId === product._id ? (
						<>
							<div className={style.productInput}>
								<input
									className={style.productName}
									type='text'
									name='name'
									value={product.name}
									onChange={e => handleChange(e, product)}
								/>
							</div>
							<div className={style.productInput}>
								<textarea
									name='description'
									value={product.description}
									onChange={e => handleChange(e, product)}
									style={{ resize: 'none' }}
								/>
							</div>
							<div className={style.productInput}>
								<h4>Ціна: </h4>
								<input
									type='number'
									name='price'
									value={product.price}
									onChange={e => handleChange(e, product)}
								/>
							</div>
							<div className={style.productInput}>
								<h4>Категорія: </h4>
								<input
									type='text'
									name='category'
									value={product.category}
									onChange={e => handleChange(e, product)}
								/>
							</div>
							<div className={style.productInput}>
								<h4>Для кого: </h4>
								<input
									type='text'
									name='forWho'
									value={product.forWho}
									onChange={e => handleChange(e, product)}
								/>
							</div>
							<div className={style.productInput}>
								<h4>Тренд: </h4>
								<input
									type='text'
									name='trending'
									value={product.trending}
									onChange={e => handleChange(e, product)}
								/>
							</div>
							<div className={style.productInput}>
								<h4>Рейтинг: </h4>
								<input
									type='number'
									name='rating'
									value={product.rating}
									onChange={e => handleChange(e, product)}
								/>
							</div>
							<div className={style.productCardButtons}>
								<button
									className={style.saveButton}
									onClick={() => handleSave(product)}
								>
									Зберегти
								</button>
								<button className={style.cancelButton} onClick={handleCancel}>
									Скасувати
								</button>
							</div>
						</>
					) : (
						<>
							<h3>{product.name}</h3>
							<p>{product.description}</p>
							<p>Ціна: {product.price} грн</p>
							<p>Категорія: {product.category}</p>
							<p>Для кого: {product.forWho}</p>
							<p>Тренд: {product.trending}</p>
							<p>Рейтинг: {product.rating}</p>
							<img
								src={product.image}
								alt={product.name}
								className={style.productImage}
							/>
							<button
								className={style.changeProductButton}
								onClick={() => handleEditClick(product)}
							>
								Змінити
							</button>
						</>
					)}
				</li>
			))}
		</ul>
	)
}

export default GetAndUpdateProducts
