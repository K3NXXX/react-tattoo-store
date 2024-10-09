
import { RootState } from '../../redux/store'
import style from './Header.module.scss'
import AuthForm from './AuthForm'
import HeaderBottom from './HeaderBottom'
import HeaderTop from './HeaderTop'
import { useSelector } from 'react-redux'
import HeaderMobileMenu from './HeaderMobileMenu'
import { useState } from 'react'

const Header: React.FC = () => {
	let [openMenu, setOpenMenu] = useState<boolean>(false)
	const { isAuthFormOpened } = useSelector(
		(state: RootState) => state.globalSlice
	)

	return (
		<div className={style.wrapper}>
			<header className={style.header}>
				<HeaderTop/>
				<HeaderBottom/>
			{openMenu && (
				<HeaderMobileMenu/>
			)}
                {isAuthFormOpened  && <AuthForm/>}
			</header>
		</div>
	)
}

export default Header
