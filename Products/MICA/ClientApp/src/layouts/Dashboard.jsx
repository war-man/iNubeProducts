import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/iNubeSymbol.png";
import logotext from "assets/img/iNubeText.png";
import Loginconfig from 'modules/Login/LoginConfig.js';
import SpeedDials from 'components/SpeedDial/SpeedDials.jsx';

import Hidden from "@material-ui/core/Hidden";
import Button from "components/CustomButtons/Button.jsx";
import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle.jsx";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";
import ComponentsList from "../routes/AllComponent";


var ps;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginuserid: "",
            loginroleid: "",
            mobileOpen: false,
            userroles: [],
            selectedrole: "",
            miniActive: false,
            switchRoutes: [],
            menuPermission: [],
            dashboards: [],
            homedashboards: [],
            emptyarray: [],
            dashboardsmenuPermission: [],
            logintoken: "",
            opendialog: false,
            userroledata: [],
            selectroleid: "",
        };
        this.resizeFunction = this.resizeFunction.bind(this);
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.refs.mainPanel, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }

        let userid = "";
        let roleid = "";
        let token = "";
        if (this.props.location.state != null) {
            this.setState({
                loginuserid: this.props.location.state.loginuserid,
                loginroleid: this.props.location.state.loginroleid,
                logintoken: this.props.location.state.logintoken,
            });

            userid = this.props.location.state.loginuserid;
            roleid = this.props.location.state.loginroleid;
            token = this.props.location.state.logintoken;

            this.setState({ selectedrole: this.props.location.state.loginroleid });
            console.log("login", userid, roleid, token);
        } else {
            userid = localStorage.getItem('userId');
            roleid = localStorage.getItem('roleId');
            token = localStorage.getItem('userToken');
            this.setState({ selectedrole: localStorage.getItem('roleId') });
            console.log("login: ", userid, roleid);
            console.log("token: ", token);
        }

        this.handlepermissions(userid, roleid, token);

        window.addEventListener("resize", this.resizeFunction);

        fetch(`${Loginconfig.LoginUrl}/api/Role/GetAllUserRoles/` + userid + ` `, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({ userroles: data });
                this.setState({ userroledata: data[0].mdata });
                console.log('User roles', this.state.userroles);
            });
    }

    handlepermissions = (userid, roleid, token) => {
        fetch(`${Loginconfig.LoginUrl}/api/Permission/GetPermissions?permissionType=Menu&userId=` + userid + `&roleId=` + roleid + ``, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({ menuPermission: data });
                this.handledashboard(userid, roleid, token);
                console.log('Menu Permission', this.state.menuPermission);
            });
    }

    handledashboard = (userid, roleid, token) => {
        fetch(`${Loginconfig.LoginUrl}/api/Permission/GetPermissions?permissionType=Dashboard&userId=` + userid + `&roleId=` + roleid + ``, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => response.json())
            .then((data) => {
                this.setState({ dashboardsmenuPermission: data });
                let dashboards = this.state.dashboards;
                console.log("dashboard: ", this.state.dashboards);
                if (this.state.dashboardsmenuPermission.length > 0) {
                    dashboards = this.state.dashboardsmenuPermission[0].children;
                    this.setState({ dashboards, homedashboards: this.state.dashboardsmenuPermission });
                    //let filtereddash = this.state.homedashboards[0].children;
                    //console.log("filterdash ", filtereddash);
                    //filtereddash.length = 0;
                    //this.setState({ filtereddash });
                }
                this.state.menuPermission = [...this.state.homedashboards, ...this.state.menuPermission];
                this.setState({});
                console.log('Dashboard Permission', this.state.homedashboards);
                console.log('Dashboard Permission', this.state.menuPermission);
            });
    }

    handleselectedRole = (event, key) => {
        console.log("user: ", key);
        this.state.selectrole = this.state.userroledata[key].id;

        let userid = localStorage.getItem('userId');
        localStorage.setItem('roleId', this.state.selectrole);
        this.setState({ selectedrole: localStorage.getItem('roleId') });
        let token = localStorage.getItem('userToken');

        this.handlepermissions(userid, this.state.selectrole, token);
        this.handlecloseDialog();
    }

    handleopenDialog = () => {
        this.setState({ opendialog: true });
    }

    handlecloseDialog = () => {
        this.setState({ opendialog: false });
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
        window.removeEventListener("resize", this.resizeFunction);
    }
    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    getRoute() {
        return this.props.location.pathname !== "/maps/full-screen-maps";
    }
    sidebarMinimize() {
        this.setState({ miniActive: !this.state.miniActive });
    }
    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    }
    render() {
        const { classes, ...rest } = this.props;
        const mainPanel =
            classes.mainPanel +
            " " +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive,
                [classes.mainPanelWithPerfectScrollbar]:
                    navigator.platform.indexOf("Win") > -1
            });

        this.state.switchRoutes = (
            <Switch>
                {this.state.menuPermission.map((prop, key) => {
                    if (prop.redirect)
                        return <Redirect from={prop.path} to={prop.pathTo} key={ComponentsList[key]} />;
                    if (prop.collapse)
                        return prop.children.map((prop, key) => {
                            return (
                                <Route path={prop.url} component={ComponentsList[prop.component]} key={key} />
                            );
                        });
                    return <Route path={prop.url} component={ComponentsList[prop.component]} key={key} />;
                })}
            </Switch>
        );
        return (

            <div className={classes.wrapper}>
                <Sidebar
                    routes={this.state.menuPermission}
                    logoText={logotext}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    bgColor="black"
                    miniActive={this.state.miniActive}
                    {...rest}
                />
                <div className={mainPanel} ref="mainPanel">
                    <Header
                        handleselectedRole={this.handleselectedRole}
                        handleopenDialog={this.handleopenDialog}
                        handlecloseDialog={this.handlecloseDialog}
                        userroledata={this.state.userroledata}
                        opendialog={this.state.opendialog}
                        sidebarMinimize={this.sidebarMinimize.bind(this)}
                        miniActive={this.state.miniActive}
                        routes={dashboardRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                        userroles={this.state.userroles}
                        selectedrole={this.state.selectedrole}
                        GetMasterData={this.GetMasterData}
                    />
                    {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {this.getRoute() ? (
                        <div className={classes.content}>
                            {/* */} <Hidden smDown implementation="css">
                                <div className={this.sidebarMinimize.bind(this)}>
                                    {this.state.miniActive ? (
                                        <Button
                                            id="Toggle"
                                            justIcon
                                            round
                                            className="toggle"
                                            color="white"
                                            onClick={this.sidebarMinimize.bind(this)}
                                        >
                                            <ViewList className={headerStyle.sidebarMiniIcon} />
                                        </Button>
                                    ) : (
                                            <Button
                                                id="Toggle"
                                                justIcon
                                                round
                                                className="toggle"
                                                color="white"
                                                onClick={this.sidebarMinimize.bind(this)}
                                            >
                                                <MoreVert className={headerStyle.sidebarMiniIcon} />
                                            </Button>
                                        )}
                                </div>
                            </Hidden>
                            <div className={classes.container}>{this.state.switchRoutes}</div>
                        </div>
                    ) : (
                            <div className={classes.map}>{this.state.switchRoutes}</div>
                        )}
                    {this.getRoute() ? <Footer fluid /> : null}
                </div>
                <div>
                    <SpeedDials fluid />
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(Dashboard);