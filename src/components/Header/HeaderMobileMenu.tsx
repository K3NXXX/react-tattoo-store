import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll'
import arrow from '../../assets/img/arrow-icon.svg'
import email from '../../assets/img/email-icon.svg'
import phone from '../../assets/img/phone-icon.svg'
import telegram from '../../assets/img/telegram-icon.png'
import viber1 from '../../assets/img/viber-icon.svg'
import viber2 from '../../assets/img/viber2-icon.svg'
import style from './Header.module.scss'

const HeaderMobileMenu: React.FC = () => {
	let [openMenu, setOpenMenu] = useState<boolean>(false)
	const [expandCatalog, setExpandCatalog] = useState<boolean>(false)

	const headerPhoneCategoryList = [
		'Каталог',
		'Контакти',
		'Промокоди',
		'Знижки',
		'Допомога',
		'Про нас',
		'Вибране',
	]

	const catalog = [
		'Набори для тату',
		'Тату тримачі',
		'Тату машинки',
		'Педалі та провода',
		'Тату фарби',
	]

	return (
		<div className={style.phone__menu}>
			{openMenu && (
				<div className={style.phone__menu2}>
					<ul className={style.phone__menu_list}>
						{headerPhoneCategoryList.map((phonecategory, index) => (
							<li
								key={index}
								className={index === 0 ? `${style.phoneCatalog}` : ''}
							>
								{phonecategory === 'Каталог' ? (
									<LinkScroll
										onClick={() => setOpenMenu(false)}
										to='toCatalog'
										smooth={true}
										duration={1000}
									>
										<li className={style.catalogSpecial}>{phonecategory}</li>
									</LinkScroll>
								) : (
									<Link onClick={() => setOpenMenu(false)} to='*'>
										{phonecategory}
									</Link>
								)}
								{phonecategory === 'Каталог' && expandCatalog && (
									<ul className={style.catalogList}>
										{catalog.map((catalogItem, catalogIndex) => (
											<Link
												onClick={() => setOpenMenu(false)}
												to={`/react-tattoo-store/catalog/${catalogIndex}`}
											>
												<li key={catalogIndex}>{catalogItem}</li>
											</Link>
										))}
									</ul>
								)}
							</li>
						))}
						<img
							onClick={e => {
								setExpandCatalog(!expandCatalog)
								e.stopPropagation()
							}}
							className={style.arrow}
							src={arrow}
							alt='arrow'
						/>
					</ul>
				</div>
			)}

			<div className={style.contacts__phone}>
				<img src={phone} alt='phone-icon' />
				<a href='tel:+380975525252'>
					<span className={style.phone__number}>+380 97 552-52-52</span>
				</a>
			</div>
			<div className={style.phone__social}>
				<a href='tel:+380975525252'>
					<img src={telegram} alt='telegram' />
				</a>
				<a href='tel:+380975525252'>
					<img src={viber1} alt='viber' />
				</a>
				<a href='tel:+380975525252'>
					<img src={viber2} alt='viber' />
				</a>
			</div>
			<p>Графік роботи: з 9:00 до 20:00</p>
			<div className={style.email__phone}>
				<img src={email} alt='email-icon' />
				<a href='mailto:Mr.Driskell@gmail.com'>Mr.Driskell@gmail.com</a>
			</div>
		</div>
	)
}

export default HeaderMobileMenu
