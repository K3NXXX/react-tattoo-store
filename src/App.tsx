import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import PageNotFound from './components/PageNotFound/PageNotFound'
import PurchaseModal from './components/PurchaseModal/PurchaseModal'
import { useClickOutside } from './hooks/useClickOutside'
import Cart from './pages/Cart/Cart'
import CatalogFrame from './pages/Catalog/CatalogFrame'
import Home from './pages/Home'
import { setModal } from './redux/slices/categorySlice'
import { RootState } from './redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Account from './pages/Account/Account'
import { authService } from './services/auth.service'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

const App: React.FC = () => {
	const modal = useSelector((state: RootState) => state.categorySlice.modal)
	const popupRef = useRef<HTMLDivElement>(null)
	const jwtToken = localStorage.getItem("jwt")
	const dispatch = useDispatch()

	useClickOutside(popupRef, () => {
		if (modal) setTimeout(() => dispatch(setModal(false)), 50)
	})

	useEffect(() => {
		if (jwtToken) {
			authService.getMe()

		}
	}, [])

	return (
		<div className='App'>
			<Header />
			<main className='main'>
				<Routes>
					<Route path='*' element={<PageNotFound />} />
					<Route path='/react-tattoo-store' element={<Home />} />
					<Route path='/react-tattoo-store/cart' element={<Cart />} />
					<Route path='/react-tattoo-store/account' element={<Account />} />
					<Route path='/react-tattoo-store/admin-dashboard' element={<AdminDashboard />} />
					<Route
						path='/react-tattoo-store/catalog/:id'
						element={<CatalogFrame />}
					/>
				</Routes>
			</main>
			<Footer />
			{modal && <PurchaseModal />}
      <ToastContainer position='bottom-right'/>
		</div>
	)
}

export default App
