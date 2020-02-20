import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";
import { blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MUIButton from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InboxIcon from '@material-ui/icons/Inbox';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import PersonIcon from '@material-ui/icons/Person';
import PartyModeIcon from '@material-ui/icons/PartyMode';
import logotext from "assets/img/iNubeText.png";
import GridContainer from "components/Grid/GridContainer.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

// core components
import HeaderLinks from "./HeaderLinks";
import Button from "components/CustomButtons/Button.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle.jsx";
import LangSwitchContainer from 'components/Translation/LangSwitch/LangSwitchContainer';
//import SimpleDialogDemo from 'components/SpeedDial/SlideUp.jsx';
import { relativeTimeRounding } from "moment";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import GridItem from "../Grid/GridItem";

const styles = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
};

const useStyles = withStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function Header12({ ...props }) {
    function makeBrand() {
        var name;
        props.routes.map((prop, key) => {
            if (prop.collapse) {
                prop.views.map((prop, key) => {
                    if (prop.path === props.location.pathname) {
                        name = prop.name;
                    }
                    return null;
                });
            }
            if (prop.path === props.location.pathname) {
                name = prop.name;
            }
            return null;
        });
        if (name) {
            return "";
        } else {
            //return "Default Brand Name";
            return "";
        }
    }

    const { classes, color, rtlActive } = props;
    const appBarClasses = cx({
        [" " + classes[color]]: color
    });
    const sidebarMinimize =
        classes.sidebarMinimize +
        " " +
        cx({
            [classes.sidebarMinimizeRTL]: rtlActive
        });
    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div className="logoClasses">
                    <a href="https://micav0002.azurewebsites.net/dashboard/home" className="logoNormal">
                        <img src={logotext} alt="logo" className="imgNormal" width="150" height="240" />
                    </a>
                </div>
                {/* <Hidden smDown implementation="css">
                    <div className={sidebarMinimize}>
                        {props.miniActive ? (
                            <Button
                                justIcon
                                round
                                color="white"
                                onClick={props.sidebarMinimize}
                            >
                                <ViewList className={classes.sidebarMiniIcon} />
                            </Button>
                        ) : (
                                <Button
                                    justIcon
                                    round
                                    color="white"
                                    onClick={props.sidebarMinimize}
                                >
                                    <MoreVert className={classes.sidebarMiniIcon} />
                                </Button>
                            )}
                    </div>
                </Hidden>*/}
                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <Button href="#" className={classes.title} color="transparent">
                        {makeBrand()}
                    </Button>
                </div>
                <div>
                    <MUIButton variant="outlined" color="primary" style={{ top: "-5px" }} onClick={props.handleopenDialog}><TranslationContainer translationKey="Switchrole" /></MUIButton>
                    <Dialog style={{ textAlign: "center" }} onClose={props.handlecloseDialog} aria-labelledby="simple-dialog-title" open={props.opendialog} >
                        <DialogTitle id="simple-dialog-title"> <b>Switch Role</b> </DialogTitle>
                        <DialogContent dividers>
                            {props.userroledata.map(function (item, key) {
                                return (
                                    <List round button>
                                        <ListItem button id="padding-list-item" selected={props.selectedrole === item.id} onClick={e => props.handleselectedRole(e, key)} >
                                            <ListItemAvatar>
                                                <Avatar className={classes.avatar}>
                                                    <PersonIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText>
                                                {item.mValue}
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                );
                            }.bind(this))}
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <LangSwitchContainer />
                </div>
                <Hidden smDown implementation="css">
                    <HeaderLinks rtlActive={rtlActive} />
                </Hidden>
                <Hidden mdUp implementation="css">
                    <Button
                        round
                        className={classes.appResponsive}
                        color="white"
                        justIcon
                        aria-label="open drawer"
                        onClick={props.handleDrawerToggle}
                    >
                        <ViewList className={classes.sidebarMiniIcon} />
                    </Button>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

Header12.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    rtlActive: PropTypes.bool
};

export default withStyles(headerStyle)(Header12);