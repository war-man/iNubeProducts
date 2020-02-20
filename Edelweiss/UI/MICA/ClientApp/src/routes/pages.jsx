import PricingPage from "views/Pages/PricingPage.jsx";
//import LoginPage from "views/Pages/LoginPage.jsx";
import LoginPage from "modules/Login/views/LoginPage.jsx";
import PolicyBooking from "modules/Policy/views/PolicyBooking.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";
import PasswordPage from "modules/Login/views/PasswordPage.jsx";
import Test from "views/Test/Test.jsx";
import ModelTest from "views/Test/ModelTest.jsx";
import ModelTestddl from "views/Test/ModelTestDropdown.jsx";

import HomePage from "modules/Edelweiss/HomePage.jsx";
import DriverPage from "modules/Edelweiss/DriverPage.jsx";
import DriverDetails from "modules/Edelweiss/DriverDetails.jsx";
// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import LockOpen from "@material-ui/icons/LockOpen";
import TPPolicy from "modules/Edelweiss/TPPolicy.jsx";
import ProceedPayment from "modules/Edelweiss/ProceedPayment.jsx";
import ProceedDate from "modules/Edelweiss/ProceedDate.jsx";
import BillingFrequency from "modules/Edelweiss/BillingFrequency.jsx";
import Payment from "modules/Edelweiss/Payment.jsx";
import ProposalPage from "../modules/Edelweiss/ProposalPage";
import AddVehicle from "../modules/Edelweiss/AddVehicle.jsx";
import AddDriver from "../modules/Edelweiss/AddDriver.jsx";
const pagesRoutes = [
  {
    path: "/pages/register-page",
    name: "Register Page",
    short: "Register",
    mini: "RP",
    icon: PersonAdd,
    component: RegisterPage
  },
  {
    path: "/pages/login-page",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
    },
    {
        path: "/pages/password-page",
        name: "Password Page",
        short: "Password",
        mini: "PP",
        icon: PersonAdd,
        component: PasswordPage
    },
  {
    path: "/pages/pricing-page",
    name: "Pricing Page",
    short: "Pricing",
    mini: "PP",
    icon: MonetizationOn,
    component: PricingPage
    },
    {
        path: "/pages/test-page",
        name: "Test Page",
        short: "test",
        mini: "TP",
        icon: MonetizationOn,
        component: ModelTest
    },
    {
        path: "/pages/PolicyBooking",
        name: "PolicyBooking",
        short: "Boooking",
        mini: "BP",
        icon: MonetizationOn,
        component: PolicyBooking
    },
    {
        path: "/pages/Homepage",
        name: "Homepage",
        short: "Homepage",
        mini: "HP",
        icon: MonetizationOn,
        component: HomePage
    },
    {
        path: "/pages/Driverpage",
        name: "Driverpage",
        short: "Driverpage",
        mini: "DP",
        icon: MonetizationOn,
        component: DriverPage
    },
    {
        path: "/pages/Driverdetails",
        name: "Driverdetails",
        short: "Driverdetails",
        mini: "DD",
        icon: MonetizationOn,
        component: DriverDetails
    },
  {
    path: "/pages/lock-screen-page",
    name: "Lock Screen Page",
    short: "Lock",
    mini: "LSP",
    icon: LockOpen,
    component: LockScreenPage
    },
    {
        path: "/pages/TPPolicy",
        name: "TPPolicy",
        short: "TPPolicy",
        mini: "DD",
        icon: MonetizationOn,
        component: TPPolicy
    },
    {
        path: "/pages/ProceedPayment",
        name: "ProceedPayment",
        short: "ProceedPayment",
        mini: "DD",
        icon: MonetizationOn,
        component: ProceedPayment
    },
    {
        path: "/pages/ProceedDate",
        name: "ProceedDate",
        short: "ProceedDate",
        mini: "DD",
        icon: MonetizationOn,
        component: ProceedDate
    },
    {
        path: "/pages/BillingFrequency",
        name: "BillingFrequency",
        short: "BillingFrequency",
        mini: "DD",
        icon: MonetizationOn,
        component: BillingFrequency
    },
    {
        path: "/pages/Payment",
        name: "Payment",
        short: "Payment",
        mini: "DD",
        icon: MonetizationOn,
        component: Payment
    },
    {
        path: "/pages/Proposal",
        name: "Proposal",
        short: "Proposal",
        mini: "DD",
        icon: MonetizationOn,
        component: ProposalPage
    },
    {
        path: "/pages/AddVehicle",
        name: "AddVehicle",
        short: "AddVehicle",
        mini: "DD",
        icon: MonetizationOn,
        component: AddVehicle
    },
    {
        path: "/pages/AddDriver",
        name: "AddDriver",
        short: "AddDriver",
        mini: "DD",
        icon: MonetizationOn,
        component: AddDriver
    },
    {
    redirect: true,
    path: "/pages",
        pathTo: "/pages/Homepage",
        name: "Homepage"
  }
];

export default pagesRoutes;
