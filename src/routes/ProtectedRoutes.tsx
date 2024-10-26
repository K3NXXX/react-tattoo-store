import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}: {children: JSX.Element}) => {
	const jwtToken = localStorage.getItem("jwt")
	if (!jwtToken) {
		return <Navigate to={"/react-tattoo-store"}/>
	}

	return children
}

export default ProtectedRoutes