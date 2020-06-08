/*!
=========================================================
 * Material Dashboard PRO React - v1.4.0 based on Material Dashboard PRO - v1.2.1
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

import ThemeSwitch from 'assets/jss/ThemeSwitch.jsx'

const drawerWidth = 240;

const drawerMiniWidth = 80;

const transition = {
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const containerFluid = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    "&:before,&:after": {
        display: "table",
        content: '" "'
    },
    "&:after": {
        clear: "both"
    }
};

const container = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    "@media (min-width: 768px)": {
        width: "750px"
    },
    "@media (min-width: 992px)": {
        width: "970px"
    },
    "@media (min-width: 1200px)": {
        width: "1170px"
    },
    "&:before,&:after": {
        display: "table",
        content: '" "'
    },
    "&:after": {
        clear: "both"
    }
};

const boxShadow = {
    boxShadow:
        "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
};

const card = {
    display: "inline-block",
    position: "relative",
    width: "100%",
    margin: "25px 0",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff"
};

const defaultFont = {
    fontWeight: "300",
    lineHeight: "1.5em"
};

function PeytoTheme() {
    localStorage.setItem('primaryColor', "#123859");
    localStorage.setItem('warningColor', "#F2C438");
    localStorage.setItem('dangerColor', "#F24130");
    localStorage.setItem('successColor', "#4caf50");
    localStorage.setItem('infoColor', "#419FD9");
    localStorage.setItem('roseColor', "#03738C");
    localStorage.setItem('grayColor', "#B3B3B3");
    localStorage.setItem('lightBlue', "#3803FA");
    window.location.reload();
}

function AlaskaTheme() {
    localStorage.setItem('primaryColor', "#2E6EA6");
    localStorage.setItem('warningColor', "#8C7503");
    localStorage.setItem('dangerColor', "#F24130");
    localStorage.setItem('successColor', "#D9B504");
    localStorage.setItem('infoColor', "#9BDAF2");
    localStorage.setItem('roseColor', "#8C6620");
    localStorage.setItem('grayColor', "#B3B3B3");
    localStorage.setItem('lightBlue', "#3803FA");
    window.location.reload();
}


function OceanicTheme() {
    localStorage.setItem('primaryColor', "#0D65D9");
    localStorage.setItem('warningColor', "#D9B504");
    localStorage.setItem('dangerColor', "#F24130");
    localStorage.setItem('successColor', "#4caf50");
    localStorage.setItem('infoColor', "#0FB2F2");
    localStorage.setItem('roseColor', "#0D7AD9");
    localStorage.setItem('grayColor', "#B3B3B3");
    localStorage.setItem('lightBlue', "#13C9F2");
    window.location.reload();
}

function RagaTheme() {
    localStorage.setItem('primaryColor', "#362D73");
    localStorage.setItem('warningColor', "#F2C53D");
    localStorage.setItem('dangerColor', "#F24130");
    localStorage.setItem('successColor', "#4caf50");
    localStorage.setItem('infoColor', "#5C73F2");
    localStorage.setItem('roseColor', "#020659");
    localStorage.setItem('grayColor', "#25D9D9");
    localStorage.setItem('lightBlue', "#5670BF");
    window.location.reload();
}

function AvianTheme() {
    localStorage.setItem('primaryColor', "#252526");
    localStorage.setItem('warningColor', "#F2C53D");
    localStorage.setItem('dangerColor', "#F24130");
    localStorage.setItem('successColor', "#4161BF");
    localStorage.setItem('infoColor', "#3752A6");
    localStorage.setItem('roseColor', "#101740");
    localStorage.setItem('grayColor', "#25D9D9");
    localStorage.setItem('lightBlue', "#4E74BF");
    window.location.reload();
}

function changeTheme6() {
    localStorage.setItem('primaryColor', "#262523");
    localStorage.setItem('warningColor', "#F2CB05");
    localStorage.setItem('dangerColor', "#D92818");
    localStorage.setItem('successColor', "#768C46");
    localStorage.setItem('infoColor', "#F2B705");
    localStorage.setItem('roseColor', "#A64149");
    localStorage.setItem('grayColor', "#F2F2F2");
    localStorage.setItem('lightBlue', "#4E74BF");
    window.location.reload();
}

let primaryColor = localStorage.getItem('primaryColor');
let warningColor = localStorage.getItem('warningColor');
let dangerColor = localStorage.getItem('dangerColor');
let successColor = localStorage.getItem('successColor');
let infoColor = localStorage.getItem('infoColor');
let roseColor = localStorage.getItem('roseColor');
let grayColor = localStorage.getItem('grayColor');
let lightBlue = localStorage.getItem('lightBlue');

//console.log("Check Primary Color:", primaryColor)
//let primaryColor = "#4d738e";
//let warningColor = "#ff9800";
//let dangerColor = "#d2181c";
//let successColor = "#4caf50";
//let infoColor = "#183a7b";
//let roseColor = "#f15955";
//let grayColor = "#455a64";
//let lightBlue = "#00acc1";

//var primaryColor = "#4d738e";
//var warningColor = "#ff9800";
//var dangerColor = "#d2181c";
//var successColor = "#4caf50";
//var infoColor = "#183a7b";
//var roseColor = "#f15955";
//var grayColor = "#455a64";
//var lightBlue = "#00acc1";

// let primaryColor = ThemeSwitch.Default.primaryColor;
// let warningColor = "#ff9800";
// let dangerColor = "#d2181c";
// let successColor = "#4caf50";
// let infoColor = "#183a7b";
// let roseColor = "#f15955";
// let grayColor = "#455a64";
// let lightBlue = "#00acc1";

const primaryBoxShadow = {
    boxShadow:
        "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.42)"
};
const infoBoxShadow = {
    boxShadow:
        "0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.42)"
};
const successBoxShadow = {
    boxShadow:
        "0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.42)"
};
const warningBoxShadow = {
    boxShadow:
        "0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.42)"
};
const dangerBoxShadow = {
    boxShadow:
        "0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12),0 7px 10px -5px rgba(0, 0, 0, 0.42)"
};
const roseBoxShadow = {
    boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.42)"
};

// old card headers
const orangeCardHeader = {
    background: "linear-gradient(60deg, #ddd, #333)",
    ...warningBoxShadow
};
const greenCardHeader = {
    background: "linear-gradient(60deg, #66bb6a, #43a047)",
    ...successBoxShadow
};
const redCardHeader = {
    background: "linear-gradient(60deg, #ef5350, #e53935)",
    ...dangerBoxShadow
};
const blueCardHeader = {
    background: "linear-gradient(60deg, #26c6da, #00acc1)",
    ...infoBoxShadow
};
const purpleCardHeader = {
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    ...primaryBoxShadow
};


// new card headers for dashoard card
const warningCardHeader = {
    background: "linear-gradient(60deg, #1068ac, #1068ac)",
    ...warningBoxShadow
};
const successCardHeader = {
    background: "linear-gradient(45deg, #448246 0%, #43a047 100%)",
    ...successBoxShadow
};
const dangerCardHeader = {
    background: "linear-gradient(45deg, #e53935  0%, #e53935  100% )",
    ...dangerBoxShadow
};
const infoCardHeader = {
    background: "linear-gradient(45deg, #08807e 0%, #0dadaa 100%)",
    ...infoBoxShadow
};
const primaryCardHeader = {
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    ...primaryBoxShadow
};
const roseCardHeader = {
    background: "linear-gradient(45deg, #12324a   0%, #5b829e 100%)",
    ...roseBoxShadow
};

const cardActions = {
    margin: "0 20px 10px",
    paddingTop: "10px",
    borderTop: "1px solid #eeeeee",
    height: "auto",
    ...defaultFont
};

const cardHeader = {
    margin: "-20px 15px 0",
    borderRadius: "3px",
    padding: "15px"
};

const defaultBoxShadow = {
    border: "0",
    borderRadius: "3px",
    boxShadow:
        "0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    padding: "10px 0",
    transition: "all 150ms ease 0s"
};

const tooltip = {
    padding: "10px 15px",
    minWidth: "130px",
    color: "#FFFFFF",
    lineHeight: "1.7em",
    background: "rgba(85,85,85,0.9)",
    border: "none",
    borderRadius: "3px",
    opacity: "1!important",
    boxShadow:
        "0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)",
    maxWidth: "200px",
    textAlign: "center",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    textShadow: "none",
    textTransform: "none",
    letterSpacing: "normal",
    wordBreak: "normal",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto"
};

const title = {
    color: "#333",
    textDecoration: "none",
    fontWeight: "300",
    marginTop: "30px",
    marginBottom: "25px",
    minHeight: "32px",
    //fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
    }
};

const cardTitle = {
    ...title,
    marginTop: "0",
    marginBottom: "3px",
    minHeight: "auto",
    "& a": {
        ...title,
        marginTop: ".625rem",
        marginBottom: "0.75rem",
        minHeight: "auto"
    }
};

const cardSubtitle = {
    marginTop: "-.375rem"
};

const cardLink = {
    "& + $cardLink": {
        marginLeft: "1.25rem"
    }
};

export {
    //variables
    drawerWidth,
    drawerMiniWidth,
    transition,
    container,
    containerFluid,
    boxShadow,
    card,
    defaultFont,
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    infoColor,
    roseColor,
    grayColor,
    lightBlue,
    primaryBoxShadow,
    infoBoxShadow,
    successBoxShadow,
    warningBoxShadow,
    dangerBoxShadow,
    roseBoxShadow,
    // old card header colors
    orangeCardHeader,
    greenCardHeader,
    redCardHeader,
    blueCardHeader,
    purpleCardHeader,
    roseCardHeader,
    // new card header colors
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    cardActions,
    cardHeader,
    defaultBoxShadow,
    tooltip,
    title,
    cardTitle,
    cardSubtitle,
    cardLink,
    PeytoTheme,
    AlaskaTheme,
    OceanicTheme,
    RagaTheme,
    AvianTheme,
    changeTheme6,
};