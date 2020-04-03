import PricingPage from "views/Pages/PricingPage.jsx";
import ClaimIntimation from "views/Pages/ClaimIntimateDemo.jsx";
import PolicyBookingDemo from "views/Pages/PolicyBookingDemo.jsx";
//import LoginPage from "views/Pages/LoginPage.jsx";
import LoginPage from "modules/Login/views/LoginPage.jsx";
import Feedback from "modules/Login/views/Feedback.jsx";
import PolicyBooking from "modules/Policy/views/PolicyBooking.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import LockScreenPage from "views/Pages/LockScreenPage.jsx";
import PasswordPage from "modules/Login/views/PasswordPage.jsx";
import Firsttimelogin from "modules/Login/views/Firsttimelogin.jsx";
import RecoverPassword from "modules/Login/views/_RecoverPassword.jsx";
import ResetPassword from "modules/Login/views/ResetPassword.jsx";
import RecoverUsername from "modules/Login/views/RecoverUsername.jsx";
import Search from "modules/Login/views/Search.jsx";
import ModelTest from "views/Test/ModelTest.jsx";
// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import LockOpen from "@material-ui/icons/LockOpen";
import LAUNCH from "layouts/LAUNCH.jsx";
import MyProfile from "modules/Users/views/UserManagement/MyProfile.jsx";
//import Feedback from "react-bootstrap/Feedback";

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
        path: "/pages/FirstTimeLogin",
        name: "First Time Login",
        short: "FirstTimeLogin",
        mini: "FL",
        icon: PersonAdd,
        component: Firsttimelogin
    },
    {
        path: "/pages/RecoverPassword",
        name: "RecoverPassword",
        short: "RecoverPassword",
        mini: "RP",
        icon: PersonAdd,
        component: RecoverPassword
    },
    {
        path: "/pages/MyProfile",
        name: "MyProfile",
        short: "MyProfile",
        mini: "MP",
        icon: PersonAdd,
        component: MyProfile
    },
    {
        path: "/pages/ResetPassword",
        name: "ResetPassword",
        short: "ResetPassword",
        mini: "RP",
        icon: PersonAdd,
        component: ResetPassword
    },
    {
        path: "/pages/RecoverUsername",
        name: "RecoverUsername",
        short: "RecoverUsername",
        mini: "RU",
        icon: PersonAdd,
        component: RecoverUsername
    },
    {
        path: "/pages/Search",
        name: "Search",
        short: "Search",
        mini: "S",
        icon: PersonAdd,
        component: Search
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
        short: "Booking",
        mini: "BP",
        icon: MonetizationOn,
        component: PolicyBooking
    },
    {
        path: "/pages/Policy",
        name: "Policy",
        short: "Booking",
        mini: "PB",
        icon: MonetizationOn,
        component: PolicyBookingDemo
    },
    {
        path: "/pages/Claim",
        name: "Claim",
        short: "Initimate",
        mini: "CI",
        icon: MonetizationOn,
        component: ClaimIntimation
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

        path: "/pages/launch",
        name: "Launch Page",
        component: LAUNCH
    },
    {
        path: "/pages/feedback",
        name: "Feedback Page",
        short: "Feedback",
        mini: "FB",
        icon: PersonAdd,
        component: Feedback
    },
    {
        redirect: true,
        path: "/pages",
        pathTo: "/pages/launch",
        name: "Launch page"
    }
];

export default pagesRoutes;
