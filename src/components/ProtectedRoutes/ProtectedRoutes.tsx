import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
	children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const isAuthenticated = !!localStorage.getItem('jwt')

	if (!isAuthenticated) {
		return <Navigate to='/react-tattoo-store' />
	}

	return <>{children}</>
}

export default ProtectedRoute
