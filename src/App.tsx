import {Button} from '@material-ui/core'
import React from 'react'
import './App.css'
import {MdEdit} from './MdModule'

export default function App() {
	const [dialog, setDialog] = React.useState(false)
	return (
		<>
			<Button onClick={() => setDialog(true)}>show</Button>
			<MdEdit open={dialog} onClose={() => setDialog(false)} />
		</>
	)
}
