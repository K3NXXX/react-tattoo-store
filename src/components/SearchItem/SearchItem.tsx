import React from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from '../../types/product.type'
import styles from './SearchItem.module.scss'

interface ISearchItempProps {
	item: IProduct
	setValue: (value: string) => void
}

const SearchItem: React.FC<ISearchItempProps> = ({ item, setValue }) => {
	return (
		<Link
			onClick={() => setValue('')}
			to={`/react-tattoo-store/product/${item._id}`}
		>
			<div className={styles.root}>
				<img src={item.image} alt='product' />
				<p>{item.name}</p>
				<p>{item.price}$</p>
			</div>
		</Link>
	)
}

export default SearchItem
