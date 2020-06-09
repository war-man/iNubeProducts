import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import Description from '@material-ui/icons/Description';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import swal from 'sweetalert';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import SimpleDialogDemo from "./SlideUp.jsx"
import DocumentTutorials from "./DocumentTutorials.jsx";
import VideoTutorials from "./VideoTutorials.jsx";
import { Settings, History } from "@material-ui/icons";
//import { Dialog } from "@material-ui/core";
//import FullScreenDialog from 'components/SpeedDial/SlideUp.jsx';
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    exampleWrapper: {
        height: "1rem"
    },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
        top: "calc(100% - -12rem)",
        left: "calc(100% - 62px)",
        //top: "calc(100 % - -17rem)",
        //left: "calc(100 % - 84px)",
        bottom: "unset !important"
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const actions = [
    { icon: <VideoLibrary />, name: 'Video Tutorials', value: 'video', component: 'video' },
    { icon: <Description />, name: 'Help Document', value: 'document', component: 'video' },
    { icon: <PrintIcon />, name: 'Print', value: 'print', component: 'video' },
    { icon: <ShareIcon />, name: 'Share', value: 'share', component: 'video' },
    { icon: <FavoriteIcon />, name: 'Like', value: 'like', component: 'video' },
];

export default function SpeedDials() {
    const classes = useStyles();
    //const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
    const [direction, setDirection] = React.useState('up');
    const [open, setOpen] = React.useState(false);

    //const [open, setOpen] = React.useState(false);

    const [openvideo, setOpenvideo] = React.useState(false);
    const [opendocument, setOpendocument] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);
    const [dialvalue] = React.useState("");

    const handleDirectionChange = event => {
        setDirection(event.target.value);
    };

    const handleHiddenChange = event => {
        setHidden(event.target.checked);
    };

    const handleOpenClick = () => {
        setOpenvideo(true);
    };

    const handleClickClose = () => {
        setOpenvideo(false);
    };

    const pop = () => {

        //setOpenvideo(true);
        console.log("video");
    }

    const handleClick = () => {
        setOpen(!open);
    };

    const documentOpen = () => {
        setOpendocument(true);
    }
    const documentClose = () => {
        setOpendocument(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <div className={classes.exampleWrapper}>
                <SpeedDial
                    ariaLabel="SpeedDial"
                    style={{ color: "primary", /*backgroundColor: localStorage.getItem('primaryColor') */ }}
                    className={classes.speedDial}
                    hidden={hidden}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction={direction}
                    onBlur={handleClose}
                    onClick={pop}
                    onFocus={handleOpen}
                    onMouseEnter={pop}
                    onMouseLeave={handleClose}
                    ButtonProps={{
                        "data-testid": "speed-dial-button",
                    }}
                >
                    <SpeedDialAction
                        icon={<VideoLibrary />}
                        tooltipTitle={<TranslationContainer translationKey="VideoTutorials" />}
                        onClick={handleOpenClick}
                        ButtonProps={{ "data-testid": "speed-dial-action-settings-button" }}
                    />
                    <div>
                        <Dialog fullScreen open={openvideo} onClose={handleClickClose} TransitionComponent={Transition}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={handleClickClose} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}> <TranslationContainer translationKey="VideoTutorials" /> </Typography>
                                    {/*   <Button autoFocus color="inherit" onClick={handleClickClose}> Ok </Button>*/}
                                </Toolbar>
                            </AppBar>
                            <List>
                                <VideoTutorials />
                            </List>
                        </Dialog>
                    </div>
                    <SpeedDialAction
                        icon={<Description />}
                        tooltipTitle={<TranslationContainer translationKey="HelpDocument" />}
                        onClick={documentOpen}
                        ButtonProps={{ "data-testid": "speed-dial-action-settings-button" }}
                    />
                    <div>
                        <Dialog fullScreen open={opendocument} onClose={documentClose} TransitionComponent={Transition}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <IconButton edge="start" color="inherit" onClick={documentClose} aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" className={classes.title}><TranslationContainer translationKey="DocumentTutorials" /> </Typography>
                                    {/* <Button autoFocus color="inherit" onClick={handleClickClose}> Ok </Button>*/}
                                </Toolbar>
                            </AppBar>
                            <List>
                                <DocumentTutorials />
                            </List>
                        </Dialog>
                    </div>
                    <SpeedDialAction
                        icon={<PrintIcon />}
                        tooltipTitle={<TranslationContainer translationKey="Print" />}
                        onClick={pop}
                        ButtonProps={{ "data-testid": "speed-dial-action-settings-button" }}
                    />
                    <SpeedDialAction
                        icon={<ShareIcon />}
                        tooltipTitle={<TranslationContainer translationKey="Share" />}
                        onClick={pop}
                        ButtonProps={{ "data-testid": "speed-dial-action-settings-button" }}
                    />
                    <SpeedDialAction
                        icon={<FavoriteIcon />}
                        tooltipTitle={<TranslationContainer translationKey="Like" />}
                        onClick={pop}
                        ButtonProps={{ "data-testid": "speed-dial-action-settings-button" }}
                    />
                    {/*//{actions.map(action => (
                    //    <SpeedDialAction
                    //        key={action.name}
                    //        icon={action.icon}
                    //        tooltipTitle={action.name}
                    //        value={dialvalue}
                    //        onClick={(e)=>pop(e)}
                    //    />
                    //))}*/}
                </SpeedDial>
                {/*   <SimpleDialogDemo />*/}
            </div>
        </div>
    );
}