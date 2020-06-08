// ##############################
// // // Header styles
// #############################

import {
    containerFluid,
    defaultFont,
    primaryColor,
    defaultBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    boxShadow,
} from "assets/jss/material-dashboard-pro-react.jsx";

const headerStyle = theme => ({
    appBar: {
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "0",
        marginBottom: "0",
        position: "fixed",
        //width: "70.3rem",
        paddingTop: "10px",
        zIndex: "1029",
        height: "3.57rem",
        color: "#555555",
        border: "0",
        boxShadow: "0 4px 8px rgba(0,0,0,.08)",
        borderRadius: "3px",
        padding: "10px 0",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
        display: "block"
    },
    container: {
        ...containerFluid,
        minHeight: "50px",
        marginTop: "-3px"
    },
    flex: {
        flex: 1
    },
    title: {
        ...defaultFont,
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        paddingTop: "0.625rem",
        paddingBottom: "0.625rem",
        margin: "0 !important",
        "&:hover,&:focus": {
            background: "transparent"
        }
    },
    primary: {
        backgroundColor: primaryColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    info: {
        backgroundColor: infoColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    success: {
        backgroundColor: successColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    warning: {
        backgroundColor: warningColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    danger: {
        backgroundColor: dangerColor,
        color: "#FFFFFF",
        ...defaultBoxShadow
    },
    sidebarMinimize: {
        float: "left",
        padding: "0 0 0 15px",
        display: "block",
        color: "#555555"
    },
    sidebarMinimizeRTL: {
        padding: "0 15px 0 0 !important"
    },
    sidebarMiniIcon: {
        width: "20px",
        height: "17px",
        color: primaryColor
    }
});

export default headerStyle;