import React from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core"

export default function RenameDialog(props: {
	initialName: string,
	open: boolean,
	onExit: () => void,
	onOK: (name: string) => void,
}) {
	const [newName, setNewName] = React.useState(props.initialName)
	return (
		<Dialog open={props.open}>
			<DialogTitle>Change Name</DialogTitle>
			<DialogContent>
				<DialogContentText>Please enter new name.</DialogContentText>
				<TextField
					placeholder={props.initialName}
					autoFocus margin="dense" fullWidth
					onChange={e => {setNewName(e.target.value)}}
					value={newName} />
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onExit}>Cancel</Button>
				<Button onClick={() => props.onOK(newName !== "" ? newName : props.initialName)}>OK</Button>
			</DialogActions>
		</Dialog>
	)
}
