import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'

const rootElem = document.getElementById('root')
const queryClient = new QueryClient()

const baseName =
process.env.NODE_ENV === "production" ? "/react-tattoo-store" : "";

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem)
	root.render(
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
			<BrowserRouter basename={baseName}>
					<App />
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	)
}
