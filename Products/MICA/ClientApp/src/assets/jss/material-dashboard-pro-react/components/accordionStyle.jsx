import { primaryColor } from "assets/jss/material-dashboard-pro-react.jsx";

const accordionStyle = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: "20px",
        marginTop: "20px",
    },
    expansionPanel: {
        boxShadow: "none",
        marginBottom: "0px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        "&:before": {
            display: "none !important",

        },
        "&:hover": {

            //transition:"boxShadow 83ms",
            boxShadow: "0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)",
            //backgroundColor: "#fff8f8",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",


        },
    },
    expansionPanelExpanded: {
        margin: "0",
    },
    expansionPanelSummary: {
        minHeight: "auto !important",
        backgroundColor: "transparent",
        borderBottom: "1px solid #ddd",
        padding: "25px 10px 5px 0px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        color: "#333",
        "&:hover": {
            color: "primaryColor",

        },
        "&:active,&:focused": {
            backgroundColor: "#333"
        }

    },
    expansionPanelSummaryExpaned: {
        color: "#333",
        fontWeight: "600",
        "& $expansionPanelSummaryExpandIcon": {
            [theme.breakpoints.up("md")]: {
                top: "auto !important"
            },
            transform: "rotate(180deg)",
            [theme.breakpoints.down("sm")]: {
                top: "10px !important"
            }
        }
    },
    expansionPanelSummaryContent: {
        margin: "0 !important"
    },
    expansionPanelSummaryExpandIcon: {
        [theme.breakpoints.up("md")]: {
            top: "auto !important"
        },
        transform: "rotate(0deg)",
        color: "inherit",
        [theme.breakpoints.down("sm")]: {
            top: "10px !important"
        }
    },
    expansionPanelSummaryExpandIconExpanded: {},
    title: {
        fontSize: "15px",
        fontWeight: "bolder",
        marginTop: "0",
        marginBottom: "0",
        color: "inherit",
        marginLeft: "0.5rem"
    },
    expansionPanelDetails: {
        padding: "15px 0px 5px"
    }
});

export default accordionStyle;
