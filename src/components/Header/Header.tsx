import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import AuthForm from './AuthForm'
import style from './Header.module.scss'
import HeaderBottom from './HeaderBottom'
import HeaderMobileMenu from './HeaderMobileMenu'
import HeaderTop from './HeaderTop'

const Header: React.FC = () => {
	let [openMenu, setOpenMenu] = useState<boolean>(false)
	const { isAuthFormOpened } = useSelector(
		(state: RootState) => state.globalSlice
	)

	return (
		<div className={style.wrapper}>
			<header className={style.header}>
				<HeaderTop />
				<HeaderBottom />
				{openMenu && <HeaderMobileMenu />}
				{isAuthFormOpened && <AuthForm />}
			</header>
		</div>
	)
}

export default Header
