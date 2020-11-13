import {AppBar, Dialog, Grid, IconButton, Toolbar, Typography} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Save from '@material-ui/icons/Save'
import View from '@material-ui/icons/Visibility'
import Edit from '@material-ui/icons/Edit'
import {TransitionProps} from '@material-ui/core/transitions'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
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

interface Props {
	open: boolean,
	initData?: Data,
	onClose?: () => void,
	onSave?: (data: Data) => void
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

export default function MdEdit(props: Props) {
	const classes = useStyles()
	const [preview, setPreview] = React.useState(false)
	const [source, setSource] = React.useState<string>(props.initData ? props.initData.source : "")
	const [name, setName] = React.useState<string>(props.initData ? props.initData.name : "")
	return (
		<Dialog fullScreen open={props.open} onClose={props.onClose} TransitionComponent={SlideUp}
			onExit={() => {
				setSource("")
				setPreview(false)
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
								{preview ? <Edit /> : <View />}
							</IconButton>
							<IconButton edge="end" color="inherit" onClick={
								() => {if (props.onSave) props.onSave({name: name, source: source})}
							} aria-label="close">
								<Save />
							</IconButton>
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
						mode: 'markdown',
						lineNumbers: true,
						smartIndent: true,
						lineWrapping: true,
					}}
					onBeforeChange={(_editor, _data, value) => {
						setSource(value)
					}}
				/>
			</div>
			<div hidden={!preview}
				style={{
					overflowX: "hidden"
				}}>
				<Grid container justify="center" alignItems="center">
					<div
						hidden={source === ""}
						style={{
							width: "min( 100%, 100vmin )",
							paddingLeft: "1em",
							paddingRight: "1em",
							overflowWrap: "break-word",
						}}>
						<ReactMarkdown
							plugins={[math]}
							renderers={renderers}
						>{source}</ReactMarkdown>
					</div>
					<div hidden={source !== ""}
						style={{
							marginTop: "3ex",
							color: "grey",
						}}><i>Preview is to be displayed here.</i></div>
				</Grid>
			</div>
		</Dialog>
	)
}
