import { animateScroll as scroll } from 'react-scroll';
import style from "./Subscribe.module.scss"
import bgImg from "../../assets/img/Subscribe/bgImg.png"
import returnToTop from "../../assets/img/Brands/prevBtn.png"
import { setIsAuthFormOpened } from '../../redux/slices/globalSlice'
import { useDispatch } from 'react-redux'
const Subscribe: React.FC = () => {
    const dispatch = useDispatch()
    const scrollToTop = () : void => {
        scroll.scrollToTop({
            smooth: true, 
            duration: 1000, 
        });
    };
    
    return (  
        <section className={style.wrapper}>
            <div className={style.left}>
                <p>Дізнавайтеся першими</p>
                <p>Зареєструйтеся, щоб знати про новини та акції</p>
                <button onClick={() => dispatch(setIsAuthFormOpened(true))} type="submit">Зареєструватися</button>
            </div>
            <div className={style.right}>
                <img className={style.bgImg} src={bgImg} alt="bgImg" />
                <div onClick={scrollToTop} className={style.backTopUp}>
                    <span>Вернутися наверх</span>
                    <img src={returnToTop} alt="returnToTopImg" />
                </div>
            </div>
        </section>
    );
}
 
export default Subscribe;