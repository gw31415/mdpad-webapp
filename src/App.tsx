import {Button, FormControlLabel, Switch} from '@material-ui/core'
import React from 'react'
import './App.css'
import {MdEdit} from './MdModule'

export default function App() {
	const [dialog, setDialog] = React.useState(false)
	const [syntax, setSyntax] = React.useState(true)
	return (
		<>
			<FormControlLabel control={
				<Switch checked={syntax} onChange={e => {setSyntax(e.target.checked)}} />
			}
				label="Rich text area"
			/>
			<Button onClick={() => setDialog(true)}>show</Button>
			<MdEdit open={dialog} onClose={() => setDialog(false)} richTextAreaEnabled={syntax} />
		</>
	)
}
