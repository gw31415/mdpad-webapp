import {AppBar, Dialog, Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import SaveIcon from '@material-ui/icons/Save'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ViewIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import {TransitionProps} from '@material-ui/core/transitions'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import RenameDialog from './RenameDialog'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import {Controlled as CodeMirror} from 'react-codemirror2'
import "./codemirror.css"
import "codemirror/mode/markdown/markdown"

import math from 'remark-math'
import 'katex/dist/katex.min.css'
const katex = require('react-katex')
const InlineMath = katex.InlineMath
const BlockMath = katex.BlockMath
const renderers = {
	inlineMath: (source: {value: string}) =>
		<InlineMath>{source.value}</InlineMath>,
	math: (source: {value: string}) =>
		<div style={{
			overflowX: "auto",
		}}>
			<BlockMath>{source.value}</BlockMath>
		</div>,
}

interface Data {
	source: string,
	name: string
}

const SlideUp = React.forwardRef(
	(
		props: TransitionProps & {children?: React.ReactElement},
		ref: React.Ref<unknown>
	) => <Slide direction="up" ref={ref} {...props} />
)

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			marginLeft: theme.spacing(2),
			flex: 1,
		},
	}))

export function MdEdit(props: {
	open: boolean,
	highlightEnabled: boolean,
	initData?: Data,
	onClose?: () => void,
	onSave?: (data: Data) => void,
}) {
	const classes = useStyles()
	const [preview, setPreview] = React.useState(false)
	const [source, setSource] = React.useState<string>(props.initData ? props.initData.source : "")
	const [name, setName] = React.useState<string>(props.initData ? props.initData.name : "")
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [renameDialog, setRenameDialog] = React.useState(false)
	return (
		<Dialog fullScreen open={props.open} onClose={props.onClose} TransitionComponent={SlideUp}
			onExited={() => {
				setPreview(false)
				setSource("")
				setName("")
				setAnchorEl(null)
				setRenameDialog(false)
			}}>
			<AppBar position="sticky">
				<Toolbar>
					<Grid container justify="space-between" alignItems="center">
						<IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{name !== "" ? name : "(name not set)"}
						</Typography>
						<Grid item>
							<IconButton edge="end" color="inherit" onClick={() => setPreview(!preview)} aria-label="close">
								{preview ? <EditIcon /> : <ViewIcon />}
							</IconButton>
							<IconButton edge="end" color="inherit" onClick={
								() => {if (props.onSave) props.onSave({name: name, source: source})}
							} aria-label="close">
								<SaveIcon />
							</IconButton>
							<IconButton edge="end" color="inherit" onClick={
								e => {setAnchorEl(e.currentTarget)}
							} aria-label="close">
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={() => setAnchorEl(null)}
							>
								<MenuItem onClick={() => {
									setAnchorEl(null)
									setRenameDialog(true)
								}}>Rename</MenuItem>
							</Menu>
							<RenameDialog
								initialName={name}
								onOK={name => {
									setRenameDialog(false)
									setName(name)
								}}
								open={renameDialog}
								onExit={() => setRenameDialog(false)}
							></RenameDialog>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<div style={{
				width: "100%",
				height: "100%",
				padding: "none",
			}} hidden={preview}>
				<CodeMirror
					value={source}
					options={{
						mode: props.highlightEnabled ? 'markdown' : 'plain',
						lineNumbers: true,
						lineWrapping: true,
						autofocus: true,
					}}
					onBeforeChange={(_editor, _data, value) => {
						setSource(value)
					}}
				/>
			</div>
			<MdPage hidden={!preview} nullMsg="Preview is to be displayed here." source={source} />
		</Dialog>
	)
}

MdEdit.defaultProps = {
	highlightEnabled: true
}

export function MdPage(props: {hidden: boolean, source: string, nullMsg: string}) {
	return (
		<div hidden={props.hidden} style={{overflowX: "hidden"}}>
			<Grid container justify="center" alignItems="center">
				<div
					hidden={props.source === ""}
					style={{
						width: "min( 100%, 100vmin )",
						paddingLeft: "1em",
						paddingRight: "1em",
						overflowWrap: "break-word",
					}}>
					<ReactMarkdown
						plugins={[math]}
						renderers={renderers}
					>{props.source}</ReactMarkdown>
				</div>
				<div hidden={props.nullMsg !== undefined && props.source !== ""}
					style={{
						marginTop: "3ex",
						color: "grey",
					}}><i>{props.nullMsg}</i></div>
			</Grid>
		</div>
	)
}
