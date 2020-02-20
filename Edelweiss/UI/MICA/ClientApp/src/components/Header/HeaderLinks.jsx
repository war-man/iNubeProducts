import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import cx from "classnames";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Redirect } from 'react-router-dom'
import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";
import LoginPage from "modules/Login/views/LoginPage.jsx";
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';

//const options = [
//    'Show some love to Material-UI',
//    'Show all notification content',
//    'Hide sensitive notification content',
//    'Hide all notification content',
//];

const useStyles = withStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


class HeaderLinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            pass: "",
            options: [
                'My Profile',
                'Log-out',
            ],
            anchorEl: "",
            selectedIndex: 0,
            opendialogue: false,
            open: false,
            redirecttoprofile: false,
        };
    }

    handleProfile = () => {
        
        this.timeOutFunction = setTimeout(
            function () {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            700
        );
        (function () {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;

            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();
        var baseURI = window.location.pathname;
        console.log("Locations", baseURI);
        debugger;
        if (window.location.pathname != '/Users/MyProfile') {
            this.setState({ redirecttoprofile: true, opendialogue: false });
        } else {
            this.handleClose();
        }
    }

    renderRedirecttoprofile = () => {
        debugger;
        console.log("location flag: ", this.state.redirecttoprofile);
        if (this.state.redirecttoprofile == true) {
            return <Redirect to={{
                pathname: '/Users/MyProfile',
            }} />
            this.handleClose();
        }
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleClose = () => {
        //this.setState({ redirecttoprofile: false });
        this.setState({ open: false, opendialogue: false });
    };

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/pages/login-page',
            }} />
        }
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget, opendialogue: true });
    };

    handleLogout = () => {
        this.setState({ redirect: true });
        localStorage.removeItem('userId');
        localStorage.clear();
    }

    render() {
        const { classes, rtlActive } = this.props;
        const { open } = this.state;
        const searchButton =
            classes.top +
            " " +
            classes.searchButton +
            " " +
            classNames({
                [classes.searchRTL]: rtlActive
            });
        const dropdownItem = classNames(
            classes.dropdownItem,
            classes.primaryHover,
            { [classes.dropdownItemRTL]: rtlActive }
        );
        const wrapper = classNames({
            [classes.wrapperRTL]: rtlActive
        });
        const managerClasses = classNames({
            [classes.managerClasses]: true
        });
        const photo =
            classes.photo +
            " " +
            cx({
                [classes.photoRTL]: rtlActive
            });
        return (
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    style={{ top: "-11px" }}
                >
                    <img className="border-radius" src={'data:image/png;base64,' + localStorage.getItem('profilepicture')} alt="..." />
                    {/*   <AccountCircle />*/}
                </IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.opendialogue}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Username:  <b>{localStorage.getItem('displayName')}</b></MenuItem>
                    {/*  {this.renderRedirecttoprofile()}
                    <MenuItem onClick={this.handleProfile}>My Profile</MenuItem>*/}
                    {this.renderRedirect()}
                    <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
                </Menu>
            </div>
        );
    }
}

HeaderLinks.propTypes = {
    classes: PropTypes.object.isRequired,
    rtlActive: PropTypes.bool
};

export default withStyles(headerLinksStyle)(HeaderLinks);
