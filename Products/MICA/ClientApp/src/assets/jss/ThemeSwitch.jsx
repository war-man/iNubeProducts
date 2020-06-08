import { useState, React } from "react";
//import * as theme from "assets/jss/material-dashboard-pro-react.jsx";
//import {
//    grayColor,
//    roseColor,
//    primaryColor,
//    infoColor,
//    successColor,
//    warningColor,
//    dangerColor,
//    lightBlue
//} from "assets/jss/material-dashboard-pro-react.jsx";

//const primaryColor = "#4d738e";
//const warningColor = "#ff9800";
//const dangerColor = "#d2181c";
//const successColor = "#4caf50";
//const infoColor = "#183a7b";
//const roseColor = "#f15955";
//const grayColor = "#455a64";
//const lightBlue = "#00acc1";

function DefaultTheme() {
    localStorage.setItem('primaryColor', "#4d738e");
    localStorage.setItem('warningColor', "#ff9800");
    localStorage.setItem('dangerColor', "#d2181c");
    localStorage.setItem('successColor', "#4caf50");
    localStorage.setItem('infoColor', "#183a7b");
    localStorage.setItem('roseColor', "#f15955");
    localStorage.setItem('grayColor', "#455a64");
    localStorage.setItem('lightBlue', "#00acc1");
    window.location.reload();
}

function resetTheme() {
    localStorage.setItem('primaryColor', "#4d738e");
    localStorage.setItem('warningColor', "#ff9800");
    localStorage.setItem('dangerColor', "#d2181c");
    localStorage.setItem('successColor', "#4caf50");
    localStorage.setItem('infoColor', "#183a7b");
    localStorage.setItem('roseColor', "#f15955");
    localStorage.setItem('grayColor', "#455a64");
    localStorage.setItem('lightBlue', "#00acc1");
}

export const ThemeSwitch = {
    DefaultTheme,
    //changeTheme,
    resetTheme,
}

export default ThemeSwitch;