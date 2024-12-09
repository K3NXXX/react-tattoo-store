import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { adminService } from '../../services/admin.service'
import { IAdmin, IAdminData } from '../../types/admin.type'

import style from './Admin.module.scss'

const AdminList: React.FC<IAdminData> = ({ userData }) => {
	const { data, error, isLoading } = useQuery<IAdmin[]>({
		queryKey: ['admins'],
		queryFn: () => adminService.getAll(),
	})

	if (isLoading) return <p>Завантаження...</p>
	if (error) return <p>Виникла помилка: {error.message}</p>

	if (!data) {
		return <p>Немає доступних адміністраторів.</p>
	}

	return (
		<ul className={style.adminList}>
			{data.map((admin: IAdmin) => (
				<li
					className={userData.email === admin.email ? style.activeAdmin : ''}
					key={admin._id}
				>
					{admin.email}
				</li>
			))}
		</ul>
	)
}

export default AdminList
