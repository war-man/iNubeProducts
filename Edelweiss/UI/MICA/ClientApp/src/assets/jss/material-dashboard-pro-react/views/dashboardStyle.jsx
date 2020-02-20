// ##############################
// // // Dashboard View styles
// #############################

import {
    successColor,
    tooltip,
    cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.jsx";

const dashboardStyle = {
    ...hoverCardStyle,
    tooltip,
    cardTitle: {
        ...cardTitle,
        marginTop: "0px",
        marginBottom: "3px"
    },
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px",
        fontWeight: "400"
    },
    cardProductTitle: {
        ...cardTitle,
        marginTop: "0px",
        marginBottom: "3px",
        textAlign: "center"
    },
    cardCategory: {
        color: "#999999",
        fontSize: "14px",
        paddingTop: "10px",
        marginBottom: "0",
        marginTop: "0",
        margin: "0"
    },
    cardProductDesciprion: {
        textAlign: "center",
        color: "#999999"
    },
    stats: {
        color: "#999999",
        fontSize: "12px",
        lineHeight: "22px",
        display: "inline-flex",
        "& svg": {
            position: "relative",
            top: "4px",
            width: "16px",
            height: "16px",
            marginRight: "3px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            position: "relative",
            top: "4px",
            fontSize: "16px",
            marginRight: "3px"
        }
    },
    productStats: {
        paddingTop: "7px",
        paddingBottom: "7px",
        margin: "0"
    },
    successText: {
        color: successColor
    },
    upArrowCardCategory: {
        width: 14,
        height: 14
    },
    underChartIcons: {
        width: "17px",
        height: "17px"
    },
    price: {
        color: "inherit",
        "& h4": {
            marginBottom: "0px",
            marginTop: "0px"
        }
    },
    cdBal: {
        marginLeft: "15px",
        fontWeight: "500",
        color:"#333"
    },
    cdAmt: {
        marginLeft: "300px",
        marginTop: "-35px",
        border: "1px solid #03416D",
        padding: "8px",
        color: "white",
        backgroundColor: "#03416D",
        fontSize: "x-large",
        fontWeight: "500",
        borderRadius: "4px",
        width: "160px",
        textAlign: "right"
    },
    vl: {
        borderLeft: "2px solid #52C5E7",
        marginLeft: "-2px",
        height: "auto"
    },
    dateStyle: {
        border: "none",
        backgroundColor: "transparent",
        marginLeft: "85px",
        marginTop: "-23px"
    },
    salesDate: {
        border: "none",
        backgroundColor: "transparent",
        marginLeft: "112px",
        marginTop: "-23px"
    },
    dateItem: {
        marginTop: "10px",
        marginLeft: "58px"
    },
    dateItem1: {
        marginTop: "-54px",
        marginLeft: "230px"
    },
    btnSec: {
        marginTop: "10px",
        marginLeft: "120px"
    },
    rechargeBtn: {
        borderRadius: "4px"
    },
    avail: {
        backgroundColor: "transparent",
        color: "#00bcd4",
        boxShadow: "none",
        border: "none"
    },
    utilized: {
        color: "#f05b4f",
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "none"
    },
    lob: {
        marginLeft: "60px"
    },
    product: {
        marginTop: "-72px",
        marginLeft: "230px"
    },
    motor: {
        marginLeft: "120px",
        fontWeight: "400",
        marginTop: "60px"
    },
    motor1: {
        marginLeft: "80px",
        fontWeight: "400",
    },
    salesAmt: {
        marginLeft: "320px",
        marginTop: "-42px",
        border: "1px solid #43a047",
        padding: "8px",
        color: "white",
        backgroundColor: "#43a047",
        fontSize: "x-large",
        fontWeight: "500",
        borderRadius: "4px",
        width: "max-content"
    },
    initiatorAmt: {
        marginLeft: "320px",
        marginTop: "-42px",
        border: "1px solid #ef5350",
        padding: "8px",
        color: "white",
        backgroundColor: "#ef5350",
        fontSize: "x-large",
        fontWeight: "500",
        borderRadius: "4px",
        width: "100px"
    },
    interval: {
        marginLeft: "60px",
        marginTop: "20px"
    },
    actionBtn: {
        marginLeft: "230px",
        marginTop: "-45px"
    },
    reset: {
        marginLeft: "115px",
        marginTop: "-65px",
        borderRadius: "5px",
        height: "35px"
    },
    submit: {
        borderRadius: "5px",
        height: "35px"
    },
    svl: {
        borderLeft: "2px solid  #43a047",
        marginLeft: "-80px",
        height: "300px"
    },
    salesGraph: {
        zoom: "1.35",
        marginLeft: "-30px",
        marginTop: "40px"
    },
    pieBtn: {
        backgroundColor: "transparent",
        color: "#f05b4f",
        boxShadow: "none",
        border: "none"
    },
    barBtn: {
        backgroundColor: "transparent",
        color: "#43a047",
        boxShadow: "none",
        border: "none"
    },
    chartOptions: {
        marginLeft: "310px"
    },
    pieChart: {
        marginTop: "10px"
    },
    avail1: {
        backgroundColor: "transparent",
        color: "#43a047",
        boxShadow: "none",
        border: "none"
    },
    chartFooter: {
        marginLeft: "90px",
        fontWeight: "400"
    },
    calImg: {
        width: "40px"
    },
    cardIcons: {
        width: "27px"
    },
    calIcon: {
        width: "23px"
    },
    escalationDiv: {
        backgroundColor: "#f5f5f5",
        borderRadius: "6px",
    },
    innerDiv: {
        padding: "4px"
    },
    divContent: {
        marginLeft: "90px"
    },
    level1: {
        marginLeft: "30px"
    },
    name: {
        marginLeft: "130px"
    },
    levels: {
        marginLeft: "130px",
        color: "#00acc1"
    },
    intimationDates: {
        backgroundColor: "transparent",
        border: "none",
        marginLeft: "180px",
        marginTop: "-23px"
    },
    claimTable: {
        marginTop: "40px",
    },
    searchBtn: {
        marginLeft: "410px",
        borderRadius: "30px"
    },
    calendarBtn: {
        borderRadius: "30px"
    },
    calContainer: {
        marginTop: "-40px"
    },
    pendAcn: {
        marginLeft: "320px",
        marginTop: "-35px",
        border: "1px solid #ff9800",
        padding: "8px",
        color: "white",
        backgroundColor: "#ff9800",
        fontSize: "x-large",
        fontWeight: "500",
        borderRadius: "4px",
        width: "140px"
    },
    uvl: {
        borderLeft: "2px solid #ff9800",
        marginLeft: "30px",
        height: "auto"
    },
    pvl: {
        borderLeft: "2px solid  #ef5350",
        marginLeft: "-60px",
        height: "auto"
    },
    submitSec: {
        marginLeft: "50px"
    },
    approved: {
        color: "#f4c63d",
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "none"
    },
    pendingFooter: {
        fontWeight: "400",
        float: "right",
        marginTop: "10px"
    },
};

export default dashboardStyle;
