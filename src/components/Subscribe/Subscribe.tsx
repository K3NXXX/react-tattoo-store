import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { animateScroll as scroll } from 'react-scroll'
import returnToTop from '../../assets/img/Brands/prevBtn.png'
import bgImg from '../../assets/img/Subscribe/bgImg.png'
import { setIsAuthFormOpened } from '../../redux/slices/globalSlice'
import style from './Subscribe.module.scss'
const Subscribe: React.FC = () => {
	const jwt = localStorage.getItem('jwt')
	const dispatch = useDispatch()
	const scrollToTop = (): void => {
		scroll.scrollToTop({
			smooth: true,
			duration: 1000,
		})
	}

	return (
		<section className={style.wrapper}>
			<div className={style.left}>
				<p>Дізнавайтеся першими</p>
				<p>Зареєструйтеся, щоб знати про новини та акції</p>
				{jwt ? (
					<Link to={'/react-tattoo-store/account'}>
						<button>Зареєструватися</button>
					</Link>
				) : (
					<button
						onClick={() => dispatch(setIsAuthFormOpened(true))}
						type='submit'
					>
						Зареєструватися
					</button>
				)}
			</div>
			<div className={style.right}>
				<img className={style.bgImg} src={bgImg} alt='bgImg' />
				<div onClick={scrollToTop} className={style.backTopUp}>
					<span>Вернутися наверх</span>
					<img src={returnToTop} alt='returnToTopImg' />
				</div>
			</div>
		</section>
	)
}

export default Subscribe
