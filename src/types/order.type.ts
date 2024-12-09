export interface IUserData {
	email: string
	phone_number: string
	name: string
}
export interface Order {
	_id: string
	orders: OrderDetails[] 
}

interface OrderDetails {
	_id: string
	status: string
	orderDate: string
	items: OrderItem[] 
}

interface OrderItem {
	id: string
	name: string
	price: number
	count: number
	image: string
	_id: string
}

export interface IOrderData {
	name: string
	phone: string
	email: string
	city: string
	street: string
	flat: string
	house: string

}
