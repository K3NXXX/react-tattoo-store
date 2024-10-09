import { useEffect, useRef, useState } from 'react'
import style from "./Header.module.scss"
import { Link } from 'react-router-dom'

const HeaderBottom: React.FC = () => {
	const listRef = useRef<HTMLDivElement | null>(null)
	const [expandCatalog, setExpandCatalog] = useState<boolean>(false)

	const catalog = [
		'Набори для тату',
		'Тату тримачі',
		'Тату машинки',
		'Педалі та провода',
		'Тату фарби',
	]

	const headerCategoryList = [
		'Промокоди',
		'Знижки',
		'Допомога',
		'Про нас',
		'Контакти',
	]

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
										<li
											onClick={() => setExpandCatalog(false)}
											key={catalogValue}
										>
											<Link to={`/react-tattoo-store/catalog/${index}`}>
												{catalogValue}
											</Link>
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
					<div className={style.bottom__right}>
						<ul className={style.right__list}>
							{headerCategoryList.map((category, index) => {
								return (
									<li key={index}>
										<Link to='*'>{category}</Link>
									</li>
								)
							})}
						</ul>
					</div>
				</div>
	)
}

export default HeaderBottom