import React from "react";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import Button from "components/CustomButtons/Button.jsx";
import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle.jsx";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";
//import ComponentsList from "../routes/AllComponent";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import { Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";

//import avatar from "assets/img/faces/avatar.jpg";
import DefaultPicture from "assets/img/faces/DefaultPicture.png";
import IconsList from "routes/AllIcons.jsx";
var ps;



// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }
    render() {
        const { className, user, headerLinks, links } = this.props;
        return (
            <div className={className} ref="sidebarWrapper">
                {user}
                {headerLinks}
                {links}
            </div>
        );
    }
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAvatar: false,
            openComponents: this.activeRoute("/components"),
            openForms: this.activeRoute("/forms"),
            openTables: this.activeRoute("/tables"),
            openMaps: this.activeRoute("/maps"),
            openPages: this.activeRoute("-page"),
            miniActive: true,
            firstName: "",
            lastName: "",
            userName: "",
            defaultpic: false,
        };
        this.activeRoute.bind(this);
        this.handleclick = this.handleclick.bind(this);
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    componentDidMount() {
        console.log("image: ", localStorage.getItem('profilepicture'));
        //if (localStorage.getItem('profilepicture') == undefined || localStorage.getItem('profilepicture') == null || localStorage.getItem('profilepicture') == "") {
        //    this.setState({ defaultpic: true });
        //}
        //else {
        //    this.setState({ defaultpic: false });
        //}
    }

    sidebarMinimize = () => {
        this.setState({ miniActive: !this.state.miniActive });
    }

    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/pages/login-page',
            }} />
        }
    }

    handleclick() {
        this.setState({
            redirect: true,
        });
        localStorage.removeItem('userId');
        localStorage.removeItem('profilepicture');
        localStorage.clear();
    }

    userNameData = () => {
        let first = localStorage.getItem('firstName');
        let last = localStorage.getItem('lastName');
        this.state.firstName = first;
        this.state.lastName = last;
        this.state.userName = first + last;

        console.log("first name", this.state.firstName)
        console.log("last name", this.state.lastName)
        console.log("User name", this.state.userName)
    }

    openCollapse(collapse) {
        var st = {};
        st[collapse] = !this.state[collapse];
        this.setState(st);
    }

    render() {
        const {
            classes,
            color,
            logo,
            image,
            logoText,
            routes,
            bgColor,
            rtlActive
        } = this.props;
        const itemText =
            classes.itemText +
            " " +
            cx({
                [classes.itemTextMini]: this.props.miniActive && this.state.miniActive,
                [classes.itemTextMiniRTL]:
                    rtlActive && this.props.miniActive && this.state.miniActive,
                [classes.itemTextRTL]: rtlActive
            });
        const collapseItemText =
            classes.collapseItemText +
            " " +
            cx({
                [classes.collapseItemTextMini]:
                    this.props.miniActive && this.state.miniActive,
                [classes.collapseItemTextMiniRTL]:
                    rtlActive && this.props.miniActive && this.state.miniActive,
                [classes.collapseItemTextRTL]: rtlActive
            });
        const userWrapperClass =
            classes.user +
            " " +
            cx({
                [classes.whiteAfter]: bgColor === "white"
            });
        const caret =
            classes.caret +
            " " +
            cx({
                [classes.caretRTL]: rtlActive
            });
        const collapseItemMini =
            classes.collapseItemMini +
            " " +
            cx({
                [classes.collapseItemMiniRTL]: rtlActive
            });
        const photo =
            classes.photo +
            " " +
            cx({
                [classes.photoRTL]: rtlActive
            });
        const sidebarMinimize =
            classes.sidebarMinimize +
            " " +
            cx({
                [classes.sidebarMinimizeRTL]: rtlActive
            });

        //var user = (
        //    <div className={userWrapperClass}>
        //        <Hidden smDown implementation="css">
        //            <div className={sidebarMinimize}>
        //                {this.state.miniActive ? (
        //                    <Button
        //                        id="Toggle"
        //                        justIcon
        //                        round
        //                        color="white"
        //                        onClick={this.sidebarMinimize.bind(this)}
        //                    >
        //                        <ViewList className={headerStyle.sidebarMiniIcon} />
        //                    </Button>
        //                ) : (
        //                        <Button
        //                            id="Toggle"
        //                            justIcon
        //                            round
        //                            color="white"
        //                            onClick={this.sidebarMinimize.bind(this)}
        //                        >
        //                            <MoreVert className={headerStyle.sidebarMiniIcon} />
        //                        </Button>
        //                    )}
        //            </div>
        //        </Hidden>
        //    </div>
        //);
        var links = (
            <List className={classes.list}>
                {routes.map((prop, key) => {
                    const navLinkClasses =
                        classes.itemLink +
                        " " +
                        cx({
                            [" " + classes.collapseActive]: this.activeRoute(prop.url)
                        });
                    const itemText =
                        classes.itemText +
                        " " +
                        cx({
                            [classes.itemTextMini]:
                                this.props.miniActive && this.state.miniActive,
                            [classes.itemTextMiniRTL]:
                                rtlActive && this.props.miniActive && this.state.miniActive,
                            [classes.itemTextRTL]: rtlActive
                        });
                    const collapseItemText =
                        classes.collapseItemText +
                        " " +
                        cx({
                            [classes.collapseItemTextMini]:
                                this.props.miniActive && this.state.miniActive,
                            [classes.collapseItemTextMiniRTL]:
                                rtlActive && this.props.miniActive && this.state.miniActive,
                            [classes.collapseItemTextRTL]: rtlActive
                        });
                    const itemIcon =
                        classes.itemIcon +
                        " " +
                        cx({
                            [classes.itemIconRTL]: rtlActive
                        });
                    const caret =
                        classes.caret +
                        " " +
                        cx({
                            [classes.caretRTL]: rtlActive
                        });
                    return <ListItem key={key} className={classes.item}>
                        <NavLink to={prop.url} className={navLinkClasses}>
                            <ListItemIcon className={itemIcon}>
                                {typeof prop.icon === "string" ? (
                                    <Icon>{prop.icon}</Icon>
                                ) : (
                                        <prop.icon />
                                    )}
                            </ListItemIcon>
                            <ListItemText
                                primary={<TranslationContainer translationKey={prop.itemDescription} />}
                                disableTypography={true}
                                className={itemText}
                            />
                        </NavLink>
                    </ListItem>
                }
                )}
            </List>
        );

        const logoNormal =
            classes.logoNormal +
            " " +
            cx({
                [classes.logoNormalSidebarMini]:
                    this.props.miniActive && this.state.miniActive,
                [classes.logoNormalSidebarMiniRTL]:
                    rtlActive && this.props.miniActive && this.state.miniActive,
                [classes.logoNormalRTL]: rtlActive
            });
        const logoMini =
            classes.logoMini +
            " " +
            cx({
                [classes.logoMiniRTL]: rtlActive
            });
        const logoClasses =
            classes.logo +
            " " +
            cx({
                [classes.whiteAfter]: bgColor === "white"
            });
        var brand = (
            <div className={logoClasses}>
                {/*<a href="http://www.inubesolutions.com/" className={logoMini}>*/}
                <a href="https://micav0002.azurewebsites.net/dashboard/home" className={logoMini}>
                    <img src={logo} alt="logo" className={classes.img} />
                </a>
                {/*<a href="http://www.inubesolutions.com/" className={logoMini}>*/}
                <a href="https://micav0002.azurewebsites.net/dashboard/home" className={logoNormal}>
                    <img src={logoText} alt="logo" className={classes.imgNormal} />
                </a>
            </div>
        );
        const drawerPaper =
            classes.drawerPaper +
            " " +
            cx({
                [classes.drawerPaperMini]:
                    this.props.miniActive && this.state.miniActive,
                [classes.drawerPaperRTL]: rtlActive
            });
        const sidebarWrapper =
            classes.sidebarWrapper +
            " " +
            cx({
                [classes.drawerPaperMini]:
                    this.props.miniActive && this.state.miniActive,
                [classes.sidebarWrapperWithPerfectScrollbar]:
                    navigator.platform.indexOf("Win") > -1
            });
        return (
            <div ref="mainPanel">
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={rtlActive ? "left" : "right"}
                        open={this.props.open}
                        classes={{
                            paper: drawerPaper + " " + classes[bgColor + "Background"]
                        }}
                        onClose={this.props.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {/* Logo Sidebar (sidebar-logo) */}
                        {/* {brand} */}
                        <SidebarWrapper
                            className={sidebarWrapper}
                            //user={user}
                            //headerLinks={<HeaderLinks rtlActive={rtlActive} />}
                            links={links}
                        />
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                style={{ backgroundImage: "url(" + image + ")" }}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        onMouseOver={() => this.setState({ miniActive: false })}
                        onMouseOut={() => this.setState({ miniActive: true })}
                        anchor={rtlActive ? "right" : "left"}
                        variant="permanent"
                        open
                        classes={{
                            paper: drawerPaper + " " + classes[bgColor + "Background"]
                        }}
                    >
                        {/* Logo Sidebar (sidebar-logo) */}
                        {/* {brand} */}
                        <SidebarWrapper
                            className={sidebarWrapper}
                            //user={user}
                            links={links}
                        />
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                style={{ backgroundImage: "url(" + image + ")" }}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

Sidebar.defaultProps = {
    bgColor: "blue"
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    bgColor: PropTypes.oneOf(["white", "black", "blue"]),
    rtlActive: PropTypes.bool,
    color: PropTypes.oneOf([
        "white",
        "red",
        "orange",
        "green",
        "blue",
        "purple",
        "rose"
    ]),
    logo: PropTypes.string,
    logoText: PropTypes.string,
    image: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(sidebarStyle)(Sidebar);