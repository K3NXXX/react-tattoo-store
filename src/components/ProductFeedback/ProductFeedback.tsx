import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Rating,
	TextField,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { productsService } from '../../services/products.service'
import { IChangeRating } from '../../types/product.type'

interface IFeedbackProps {
	open: boolean
	onClose: () => void
	productId: string | null
}

const ProductFeedback: React.FC<IFeedbackProps> = ({
	open,
	onClose,
	productId,
}) => {
	const [value, setValue] = useState<number | null>(5)
	const [text, setText] = useState<null | string>(null)
	const userData = JSON.parse(localStorage.getItem('userData') ?? '{}')

	const { mutate: changeRating } = useMutation({
		mutationKey: ['changeRating'],
		mutationFn: (data: IChangeRating) =>
			productsService.addOrUpdateRating(data),
		onSuccess: () => {
			toast.success('Відгук успішно надіслано')
			onClose()
		},
		onError: () => {
			toast.error('Ви вже робили вігдук на цей товар')
		},
	})

	const handleChangeRating = (newRating: number | null) => {
		const setRatingData = {
			productId,
			userId: userData._id,
			rating: newRating,
		}
		changeRating(setRatingData)
	}

	return (
		<Dialog
			open={open}
			PaperProps={{
				sx: {
					width: '100%',
					maxWidth: '600px',
					margin: '0 auto',
				},
			}}
		>
			<DialogContent>
				<DialogContentText
					sx={{
						textAlign: 'center',
						fontSize: '25px',
						fontWeight: '500',
						marginBottom: '20px',
					}}
				>
					Залиште відгук про товар
				</DialogContentText>
				<TextField
					margin='dense'
					id='feedback'
					name='feedback'
					label='Ваш відгук'
					multiline
					rows={10}
					fullWidth
					variant='outlined'
					sx={{ marginBottom: '20px' }}
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				<Rating
					name='simple-controlled'
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue)
					}}
					sx={{
						fontSize: '25px',
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} sx={{ color: '#dba765', fontSize: '16px' }}>
					Відмінити
				</Button>
				<Button
					onClick={() => handleChangeRating(value)}
					sx={{ color: '#dba765', fontSize: '16px' }}
				>
					Надіслати
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ProductFeedback
