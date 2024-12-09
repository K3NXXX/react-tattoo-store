import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { CategoryItem } from '../../redux/slices/categorySlice'
import { productsService } from '../../services/products.service'
import CategoryCard from '../Category/CategoryCard'
import style from './YouAlsoCanLike.module.scss'

const YouAlsoCanLike: React.FC = () => {
	const { data } = useQuery<CategoryItem[]>({
		queryKey: ['getProducts'],
		queryFn: () => productsService.getAll(),
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
	})

	return (
		<div className={style.root}>
			<h6 className={style.title}>Вам також може сподобатися</h6>
			<ul className={style.list}>
				{data?.slice(0, 4).map(item => (
					<CategoryCard good={item} />
				))}
			</ul>
		</div>
	)
}

export default YouAlsoCanLike
