// ##############################
// // // Wizard component styles
// #############################

import {
  primaryColor,
  dangerColor,
  successColor,
  roseColor,
  infoColor,
  lightBlue,
  warningColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const wizardStyle = {
  wizardContainer: {},
  card: {
    display: "inline-block",
    position: "relative",
    width: "90%",
    margin: "25px 0",
    left:"25px",
    //boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    transition: "all 300ms linear",
    minHeight: "410px"
  },
  wizardHeader: {
    textAlign: "center",
    padding: "25px 0 35px"
  },
  title: {
    margin: "0"
  },
  subtitle: {
    margin: "5px 0 0"
  },
  wizardNavigation: {
    position: "relative",
    //width: "auto"
    
  },
  nav: {
    marginTop: "0px",
    paddingLeft: "0",
    marginBottom: "0",
    listStyle: "none",
    backgroundColor: "rgba(200, 200, 200, 0.2)",
    "&:after,&:before": {
      display: "table",
      content: '" "',
      //borderRight: "1px solid #333"
      },

    "&:after": {
      content:'""',
      borderBottom: "4px solid #b3d8f1", 
        width: "100%",
      borderRadius:"0px",
    }
   

  },
  steps: {
    marginLeft: "0",
    textAlign: "center",
    // float: "left",
    // display: "block",
    position: "relative",
    display: "inline-block",
    borderBottom: "0px solid #2395e6",

  },
  stepsAnchor: {
    cursor: "pointer",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    transition: "all .3s",
    border: "0 !important",
    borderRadius: "30px",
    lineHeight: "18px",
    textTransform: "capitalize",
    fontSize: "12px",
    fontWeight: "500",
    minWidth: "100px",
    textAlign: "center",
    color: "#555555 !important"
  },
  content: {
    marginTop: "0",
    minHeight: "300px",
    padding: "20px 15px"
  },
  stepContent: {
    display: "none"
  },
  stepContentActive: {
    display: "block"
  },
  movingTab: {
    position: "absolute",
    textAlign: "center",
    padding: "12px",
    fontSize: "12px",
    textTransform: "uppercase",
    WebkitFontSmoothing: "subpixel-antialiased",
    top: "1px",
    left: "0px",
    borderRadius: "4px",
    color: "#FFFFFF",
    cursor: "pointer",
    fontWeight: "500"
  },
  primary: {
    backgroundColor: primaryColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4)"
  },
  warning: {
    backgroundColor: warningColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4)"
  },
  danger: {
    backgroundColor: dangerColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(244, 67, 54, 0.4)"
  },
  success: {
    backgroundColor: successColor,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4)"
  },
  info: {
    backgroundColor: lightBlue,
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 188, 212, 0.4)"
  },
  rose: {
    backgroundColor: "#03416D",
    //boxShadow: "0 16px 26px -10px rgba(3, 65, 109, 0.5), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(244, 67, 54, 0.2)"
  },
  footer: {
    padding: "0 15px"
  },
  left: {
    float: "left!important"
  },
  right: {
    float: "right!important"
  },
  clearfix: {
    "&:after,&:before": {
      display: "table",
      content: '" "'
    },
    clear: "both"
  }
};

export default wizardStyle;
