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
				label="Syntax highlight"
			/>
			<Button onClick={() => setDialog(true)}>show</Button>
			<MdEdit open={dialog} onClose={() => setDialog(false)} highlightEnabled={syntax} />
		</>
	)
}
