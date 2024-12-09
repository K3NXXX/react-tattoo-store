import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'

const rootElem = document.getElementById('root')
const queryClient = new QueryClient()

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem)
	root.render(
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
			<BrowserRouter basename="/react-tattoo-store">
					<App />
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	)
}
