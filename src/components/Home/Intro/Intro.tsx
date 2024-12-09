import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-scroll'
import bg1 from '../../../assets/img/intro-bg1.png'
import bg2 from '../../../assets/img/intro-bg2.png'
import bg3 from '../../../assets/img/intro-bg3.png'
import upBtn from '../../../assets/img/intro-slider-btn.svg'
import downBtn from '../../../assets/img/intro-slider-btn2.svg'
import { RootState } from '../../../redux/store'
import PurchaseModal from '../../PurchaseModal/PurchaseModal'
import style from './Intro.module.scss'

const Intro: React.FC = () => {
	const modal = useSelector((state: RootState) => state.categorySlice.modal)
	const spanList = ['', '', '']
	let [carousel, setCarousel] = useState<number>(1)
	const increaseIndexCarousel = (): void => {
		setCarousel(prev => prev + 1)
		if (carousel >= 3) {
			setCarousel(1)
		}
	}
	const decreaseIndexCarousel = (): void => {
		setCarousel(prev => prev - 1)
		if (carousel <= 1) {
			setCarousel(3)
		}
	}
	return (
		<div
			className={style.wrapper}
			style={{
				backgroundColor: '#050402',
				backgroundImage: `url(${
					carousel === 1 ? bg1 : carousel === 2 ? bg2 : bg3
				})`,
			}}
		>
			<div
				style={{ backgroundImage: `url(${bg1})` }}
				className={style.phone__bg}
			></div>
			<div className={style.content}>
				<div className={style.left}>
					<h1 className={style.title}>
						Найкращі товари <br />в світі тату
					</h1>
					<p className={style.text}>
						Обладнання та матеріали для найяскравіших та якісних робіт
					</p>
					<Link
						to='toCatalog'
						smooth={true}
						duration={1000}
						className={style.link}
					>
						<span className={style.catalog__text}>Дивитися каталог</span>
					</Link>
				</div>
				<div className={style.right}>
					<div className={style.carousel}>
						<img onClick={decreaseIndexCarousel} src={upBtn} alt='' />
						{spanList.map((span, index) => {
							return (
								<span
									onClick={() => setCarousel(index + 1)}
									key={index}
									className={
										carousel === index + 1 ? `${style.btn__active}` : 'btn'
									}
								></span>
							)
						})}
						<img onClick={increaseIndexCarousel} src={downBtn} alt='' />
					</div>
				</div>
			</div>
			<div className={style.phone__carousel}>
				{spanList.map((span, index) => {
					return (
						<span
							onClick={() => setCarousel(index + 1)}
							key={index}
							className={
								carousel === index + 1 ? `${style.btn__active}` : 'btn'
							}
						></span>
					)
				})}
			</div>
			{modal && <PurchaseModal />}
		</div>
	)
}

export default Intro
