import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Menu from "@material-ui/icons/Menu";

// core components
import Button from "components/CustomButtons/Button";

import pagesRoutes from "routes/pages.jsx";

import pagesHeaderStyle from "assets/jss/material-dashboard-pro-react/components/pagesHeaderStyle.jsx";

class PagesHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    handleDrawerToggle = () => {
        this.setState({ open: !this.state.open });
    };
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.setState({ open: false });
        }
    }
   
    render() {
        const { classes, color } = this.props;
        const appBarClasses = cx({
            [" " + classes[color]]: color
        });
        var list = (
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <NavLink to={"/dashboard"} className={classes.navLink}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText
                            primary={"Dashboard"}
                            disableTypography={true}
                            className={classes.listItemText}
                        />
                    </NavLink>
                </ListItem>
                {pagesRoutes.map((prop, key) => {
                    if (prop.redirect) {
                        return null;
                    }
                    const navLink =
                        classes.navLink +
                        cx({
                            [" " + classes.navLinkActive]: this.activeRoute(prop.path)
                        });
                    
                    return (
                        <ListItem key={key} className={classes.listItem}>
                            <NavLink to={prop.path} className={navLink}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <prop.icon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={prop.short}
                                    disableTypography={true}
                                    className={classes.listItemText}
                                />
                            </NavLink>
                        </ListItem>
                    );
                })}
            </List>
        );
        return (
            <div>
            <AppBar position="static" align="center"  className={classes.appBar + appBarClasses}>
                <Toolbar className={classes.container}>
                        <Hidden smDown>
                            <br/>
                            <br/>
                            <div className={classes.flex} >
                            <h3 className="header">Micro Insurance Cover Accelerator</h3>
                                    
                            </div>

                        </Hidden>
                    <Hidden mdUp>
                            <div className={classes.flex}>
                                <h3  className="header">Micro Insurance Cover Accelerator</h3>
                            
                        </div>
                    </Hidden>

                </Toolbar>
                </AppBar>
                </div>        );
    }
}

PagesHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(pagesHeaderStyle)(PagesHeader);
