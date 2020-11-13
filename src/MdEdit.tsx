import {AppBar, Dialog, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Save from '@material-ui/icons/Save'
import View from '@material-ui/icons/Visibility'
import Edit from '@material-ui/icons/Edit'
import {TransitionProps} from '@material-ui/core/transitions'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
	open: boolean,
	title?: string,
	onClose?: () => void,
	children?: string,
	onSave?: (source: string) => void
}

const lineHeight = "4ex"

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
	const [source, setSource] = React.useState<string>(`${props.children}`)
	return (
		<Dialog fullScreen open={props.open} onClose={props.onClose} TransitionComponent={SlideUp}>
			<AppBar position="sticky">
				<Toolbar>
					<Grid container justify="space-between" alignItems="center">
						<IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{props.title}
						</Typography>
						<Grid item>
							<IconButton edge="end" color="inherit" onClick={() => setPreview(!preview)} aria-label="close">
								{
									preview ? <Edit /> : <View />
								}
							</IconButton>
							<IconButton edge="end" color="inherit" onClick={props.onClose} aria-label="close">
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
				<textarea style={{
					resize: "none",
					outline: "none",
					border: "none",
					background: "none",
					WebkitAppearance: "none",
					padding: "5px",
					width: "100%",
					height: `calc(100% - ${lineHeight} / 2)`,
					lineHeight: lineHeight,
					boxSizing: "border-box",
				}}
					placeholder="Markdown Editor"
					onChange={e => {
						setSource(e.target.value)
					}} />
			</div>
			<div hidden={!preview}>
				<Grid container justify="center" alignItems="center">
					<div style={{
						width: "min( 100vh, 100vw )",
						paddingLeft: "1em",
						paddingRight: "1em",
					}}>
						<ReactMarkdown>{source}</ReactMarkdown>
					</div>
				</Grid>
			</div>
			<Paper hidden={true} style={{margin: "3px", padding: "10px", minHeight: "60vh"}}>
			</Paper>
		</Dialog>
	)
}
