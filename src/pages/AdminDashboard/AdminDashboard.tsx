import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IUser } from '../../types/auth.type'
import style from './Admin.module.scss'
import AdminList from './GetAdmins'
import GetAndUpdateProducts from './GetAndUpdateProducts'
import InfoPanel from './InfoPanel'
import ProductForm from './ProductForm'
import AdminForm from './RegisterAdmin'

const AdminDashboard: React.FC = () => {
	const [panelId, setPanelId] = useState(0)

	const userData: IUser = JSON.parse(localStorage.getItem('userData') ?? '{}')

	const handleSetPanelId = (id: number) => {
		setPanelId(id)
	}

	return (
		<section className={style.wrapper}>
			<div className={style.left}>
				<div className={style.path}>
					<Link to='/react-tattoo-store'>Головна</Link> /
					<Link to='/react-tattoo-shop/account'> Адмін панель</Link>
				</div>
				<h2 className={style.title}>Адмін панель</h2>
				<div className={style.container}>
					<div className={style.buttons}>
						<button
							onClick={() => handleSetPanelId(1)}
							className={panelId === 1 ? style.activeButton : ''}
						>
							Додати новий товар
						</button>
						<button
							onClick={() => handleSetPanelId(2)}
							className={panelId === 2 ? style.activeButton : ''}
						>
							Змінити товар
						</button>
						<button
							onClick={() => handleSetPanelId(3)}
							className={panelId === 3 ? style.activeButton : ''}
						>
							Зареєструвати адміна
						</button>
						<button
							onClick={() => handleSetPanelId(4)}
							className={panelId === 4 ? style.activeButton : ''}
						>
							Адміни
						</button>
					</div>
					{panelId === 1 ? (
						<ProductForm />
					) : panelId === 2 ? (
						<GetAndUpdateProducts />
					) : panelId === 3 ? (
						<div key='admins'>
							<AdminForm />
						</div>
					) : panelId === 4 ? (
						<AdminList userData={userData} />
					) : (
						<p>Вітаю, {userData.email}</p>
					)}
					<InfoPanel userData={userData} />
				</div>
			</div>
		</section>
	)
}

export default AdminDashboard
