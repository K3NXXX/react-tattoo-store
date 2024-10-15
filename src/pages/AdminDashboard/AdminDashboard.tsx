import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './AdminDashboard.module.scss'
import { IUser } from '../../types/auth.type'
import {useForm} from "react-hook-form";
import {IProduct} from "../../types/product.type";
import {useMutation} from "@tanstack/react-query";
import {productsService} from "../../services/products.service";
import {toast} from "react-toastify";


const AdminDashboard: React.FC = () => {
	const navigate = useNavigate()
	const userData: IUser = JSON.parse(localStorage.getItem("userData") ?? "{}")

	const { handleSubmit, register } = useForm<IProduct>({mode:"onChange"})
	const { mutate } = useMutation({
		mutationKey:["createProduct"],
		mutationFn: (data: IProduct) => productsService.create(data),
		onSuccess: () => toast.success('Реєстрація пройшла успішно')
	})

	const onSubmit = (data: IProduct) => {
		mutate(data)
	}

	const handleLogout = () => {
		localStorage.removeItem('jwt');
		localStorage.removeItem("userData")
		navigate('/react-tattoo-store');
		window.location.reload();
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
						<form onSubmit={handleSubmit(onSubmit)} className={style.form}>
							<h3>Додати новий товар</h3>
								<div className={style.formItem}>
									<input
										{...register("name")}
										placeholder="Назва"
										type='text'
									/>
								</div>
								<div className={style.formItem}>
										<input
											{...register("description")}
											placeholder="Опис"
											type='text'
										/>
								</div>
								<div className={style.formItem}>
										<input
											{...register("price")}
											placeholder="Ціна"
											type='number'
										/>
								</div>
								<div className={style.formItem}>
										<input
											{...register("category")}
											placeholder="Категорія"
											type='text'
										/>
								</div>
								<div className={style.formItem}>
										<input
											{...register("image")}
											placeholder="Зображення"
											type='text'
										/>
								</div>
							<button>Додати</button>
						</form>
					</div>
					<div className={style.userInfo}>
						<div className={style.column}>
							<div className={style.online}>
								<div className={style.contacts}>
									<div className={style.contactsData}>Ел. пошта: <p>{userData.email}</p></div>
								</div>
								<button onClick={() => handleLogout()} className={style.exit}>
									Вийти
								</button>
							</div>
						</div>
					</div>
				</div>

			</div>
		</section>
	)
}

export default AdminDashboard
