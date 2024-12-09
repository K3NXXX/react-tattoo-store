import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsService } from '../../services/products.service'
import { IProduct } from '../../types/product.type'
import SearchItem from '../SearchItem/SearchItem'
import style from './Header.module.scss'

const HeaderBottom: React.FC = () => {
	const listRef = useRef<HTMLDivElement | null>(null)
	const [expandCatalog, setExpandCatalog] = useState<boolean>(false)
	const [value, setValue] = useState('')

	const catalog = [
		'Набори для тату',
		'Тату тримачі',
		'Тату машинки',
		'Педалі та провода',
		'Тату фарби',
	]

	const { data } = useQuery<IProduct[]>({
		queryKey: ['getProducts'],
		queryFn: () => productsService.getAll(),
	})

	const filteredItems = data?.filter(item =>
		item.name.toLowerCase().includes(value?.toLowerCase() || '')
	)

	useEffect(() => {
		document.body.addEventListener('click', event => {
			const path = event.composedPath()
			if (listRef.current && !path.includes(listRef.current)) {
				setExpandCatalog(false)
			}
		})
	}, [])

	return (
		<div className={style.bottom}>
			<div className={style.bottom__left}>
				<div ref={listRef} className={style.catalog}>
					<p>Каталог</p>
					<svg
						className={style.svg__catalog}
						onClick={e => {
							setExpandCatalog(!expandCatalog)
							e.stopPropagation()
						}}
						xmlns='http://www.w3.org/2000/svg'
						width='28'
						height='28'
						viewBox='0 0 28 28'
						fill='none'
					>
						<path d='M2 13H26V15H2V13Z' fill='#BB8C5F' />
						<path d='M2 7H26V9H2V7Z' fill='#BB8C5F' />
						<path d='M2 19H26V21H2V19Z' fill='#BB8C5F' />
					</svg>
					{expandCatalog && (
						<ul className={style.desktopCatalogList}>
							{catalog.map((catalogValue, index) => (
								<li onClick={() => setExpandCatalog(false)} key={catalogValue}>
									<Link to={`/react-tattoo-store/catalog/${index}`}>
										{catalogValue}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className={style.search__wrapper}>
					<div className={style.search}>
						<input
							value={value}
							onChange={e => setValue(e.target.value)}
							className={style.search__input}
							type='text'
							placeholder='Пошук'
						/>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='28'
							height='28'
							viewBox='0 0 28 28'
							fill='none'
						>
							<ellipse
								cx='13.865'
								cy='13.865'
								rx='7.86499'
								ry='7.86499'
								stroke='#636B78'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M19.3353 19.7437L22.4188 22.8192'
								stroke='#636B78'
								strokeWidth='1.5'
								strokeLinecap='square'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
					<ul className={style.search__list}>
						{value && value.length > 2
							? filteredItems?.map(item => (
									<SearchItem setValue={setValue} item={item} />
							  ))
							: ''}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default HeaderBottom
