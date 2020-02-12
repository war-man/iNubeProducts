//Node Modules

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Apps from "@material-ui/icons/Apps";
import GridOn from "@material-ui/icons/GridOn";
import Timeline from "@material-ui/icons/Timeline";
import Group from "@material-ui/icons/Group";

//General Components

import AsyncComponent from "components/Async/AsyncComponent.jsx";
import pagesRoutes from "./pages.jsx";

//Module Components
const Dashboard = AsyncComponent(() => { return import("modules/Users/views/Dashboard.jsx"); });
//import Dashboard from "modules/Users/views/Dashboard.jsx";
const UserProfile = AsyncComponent(() => { return import("views/Pages/UserProfile.jsx"); });
const TimelinePage = AsyncComponent(() => { return import("views/Pages/Timeline.jsx"); });
const RTLSupport = AsyncComponent(() => { return import("views/Pages/RTLSupport.jsx"); });

const ProductConfig = AsyncComponent(() => { return import("modules/Products/Micro/views/ProductConfig.jsx"); });
const PartnerDetails = AsyncComponent(() => { return import("modules/Partners/Partner/views/PartnerDetails.jsx"); });
const SearchPartner = AsyncComponent(() => { return import("modules/Partners/Partner/views/SearchPartner.jsx"); });

const Organization = AsyncComponent(() => { return import("modules/Partners/Organization/views/Organization.jsx"); });
const Partner = AsyncComponent(() => { return import("modules/Partners/Organization/views/CreatePartner.jsx"); });
const Office = AsyncComponent(() => { return import("modules/Partners/Organization/views/Office.jsx"); });
const AssignRole = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_AssignRole.jsx"); });
const Privileges = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_Privileges.jsx"); });
const RolePrivilage = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_RolePrivileges.jsx"); });
const UserCreation = AsyncComponent(() => { return import("modules/Users/views/UserManagement/User.jsx"); });
const UserManagement = AsyncComponent(() => { return import("modules/Users/views/UserManagement.jsx"); });
const RuleObject = AsyncComponent(() => { return import("modules/RuleEngine/views/RuleObject/RuleObject.jsx"); });
const Parameters = AsyncComponent(() => { return import("modules/RuleEngine/views/GeneralParameter/GeneralParameter"); });
const RuleConfig = AsyncComponent(() => { return import("modules/RuleEngine/views/RuleConfig/RuleConfig"); });
const RuleExecution = AsyncComponent(() => { return import("modules/RuleEngine/views/RuleExecution/RuleExecution"); });
const ChangePassword = AsyncComponent(() => {return import("modules/Users/views/UserManagement/_ChangePassword.jsx"); });
const ProductSearch = AsyncComponent(() => { return import("modules/Products/Micro/views/ProductSearch.jsx"); });
const ModifyUser = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_ModifyUser.jsx"); });
const SearchOffice = AsyncComponent(() => { return import("modules/Partners/Organization/views/SearchOffice.jsx"); });
const SearchOrganization = AsyncComponent(() => { return import("modules/Partners/Organization/views/SearchOrganization.jsx"); });
const ClaimIntimate = AsyncComponent(() => { return import("modules/Claims/views/ClaimIntimate.jsx"); });
const SearchClaim = AsyncComponent(() => { return import("modules/Claims/views/SearchClaim.jsx"); });
const SearchAssignProduct = AsyncComponent(() => { return import("modules/Partners/Partner/views/SearchAssignProduct.jsx"); });
const MyProfile = AsyncComponent(() => { return import("modules/Users/views/UserManagement/MyProfile.jsx"); });
const PolicyCancellation = AsyncComponent(() => { return import("modules/Policy/views/PolicyCancellation.jsx"); });


var pages = [
  {
    path: "/timeline-page",
    name: "TimelinePage",
    mini: "TP",
    component: TimelinePage
    },
    {
    path: "/pages/userprofileapage",
    name: "UserProfile",
    mini: "UP",
    component: UserProfile
  },
  {
    path: "/rtl/rtl-support-page",
    name: "RTL Support",
    mini: "RS",
    component: RTLSupport
  }
].concat(pagesRoutes);

var dashRoutes = [
    {
        path: "/dashboard/home",
        name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
    },
  {
    collapse: true,
    path: "/ProductConfig",
    name: "Products",
    state: "openProducts",
    icon: Apps,
    views: [
      {
        path: "/ProductConfig/ProductConfig",
        name: "Configure",
        mini: "C",
            component: ProductConfig
      },
      {
          path: "/ProductConfig/ProductReConfig",
        name: "ReConfigure",
        mini: "R",
          component: ProductConfig
      },
      {
          path: "/ProductConfig/Agreement",
        name: "Agreement",
        mini: "A",
          component: ProductConfig
        },
        {
            path: "/ProductConfig/ProductSearch",
            name: "ProductSearch",
            mini: "PS",
            component: ProductSearch
        } 
    ]
  },
    {
        collapse: true,
        path: "/Partners",
        name: "Partners",
        state: "openPartners",
        icon: GridOn,
        views: [
            {
                path: "/Partners/Organization",
                name: "Organization",
                mini: "OR",
                component: Organization
            },
            {
                path: "/Partners/Office",
                name: "Office",
                mini: "OF",
                component: Office
            },
            {
                path: "/Partners/CreatePartner",
                name: "CreatePartner",
                mini: "CP",
                component: Partner
            },
            {
                path: "/Partners/PartnerDetails",
                name: "PartnerDetails",
                mini: "PD",
                component: PartnerDetails
            },
            {
                path: "/Partners/SearchPartner",
                name: "SearchPartner",
                mini: "SP",
                component: PartnerDetails
            },
            {
                path: "/Partners/SearchOffice",
                name: "SearchOffice",
                mini: "SO",
                component: SearchOffice
            },
            {
                path: "/Partners/SearchOrganization",
                name: "SearchOrganization",
                mini: "SO",
                component: SearchOrganization
            },
             {
                path: "/Partners/Assign",
                name: "AssignProduct",
                mini: "AP",
                component: ProductConfig
            },
            {
                path: "/Partners/Assign",
                name: "SearchPartner",
                mini: "SP",
                component: SearchPartner
            },
            {
                path: "/Partners/SearchAssignProduct",
                name: "SearchAssignProduct",
                mini: "SP",
                component: SearchAssignProduct
            }
            
        ]
    },
    {
        collapse: true,
        path: "/Users",
        name: "Users",
        state: "openUsers",
        icon: Group,
        views: [
            {
                path: "/Users/CreateUser",
                name: "CreateUser",
                mini: "CU",
                component: UserManagement
            },
            {
                path: "/Users/AssignRole",
                name: "AssignRole",
                mini: "AR",
                component: AssignRole
            },
            {
                path: "/Users/Privileges",
                name: "Privileges",
                mini: "PR",
                component: Privileges
            },
            {
                path: "/Users/RolePrivilege",
                name: "RolePrivilege",
                mini: "RP",
                component: RolePrivilage
            },
            {
                path: "/Users/UserCreation",
                name: "UserCreation",
                mini: "UC",
                component: UserCreation
            },
            {
                path: "/Users/ChangePassword",
                name: "ChangePassword",
                mini: "CP",
                component: ChangePassword
            },
            {
                path: "/Users/ModifyUser",
                name: "ModifyUser",
                mini: "MU",
                component: ModifyUser
            },
            {
                path: "/Users/MyProfile",
                name: "MyProfile",
                mini: "MP",
                component: MyProfile
            },
        ]
    },
    {
        collapse: true,
        path: "/Claims",
        name: "Claims",
        state: "openClaims",
        icon: Timeline,
        views: [
            {
                path: "/Claims/Intimate",
                name: "Intimate",
                mini: "I",
                component: ClaimIntimate
            },
            {
                path: "/Claims/SearchClaim",
                name: "SearchClaim",
                mini: "SE",
                component: SearchClaim
            },

        ]
    },
    {
        collapse: true,
        path: "/RuleEngine",
        name: "RuleEngine",
        state: "openRuleEngine",
        icon: Group,
        views: [
            {
                path: "/RuleEngine/Parameters",
                name: "Parameters",
                mini: "RP",
                component: Parameters
            },
            {
                path: "/RuleEngine/RuleObject",
                name: "RuleParameters",
                mini: "RO",
                component: RuleObject
            },
            {
                path: "/RuleEngine/RuleConfig",
                name: "RuleConfig",
                mini: "RC",
                component: RuleConfig
            },
            {
                path: "/RuleEngine/RuleExecution",
                name: "RuleExecution",
                mini: "RE",
                component: RuleExecution
            }

        ]
    },

  //{
  //  collapse: true,
  //  path: "-page",
  //  name: "Pages",
  //  state: "openPages",
  //  icon: Image,
  //  views: pages
  //},
  //{
  //  collapse: true,
  //  path: "/components",
  //  name: "Components",
  //  state: "openComponents",
  //  icon: Apps,
  //  views: [
  //    {
  //      path: "/components/buttons",
  //      name: "Buttons",
  //      mini: "B",
  //      component: Buttons
  //    },
  //    {
  //      path: "/components/grid-system",
  //      name: "Grid System",
  //      mini: "GS",
  //      component: GridSystem
  //    },
  //    {
  //      path: "/components/panels",
  //      name: "Panels",
  //      mini: "P",
  //      component: Panels
  //    },
  //    {
  //      path: "/components/sweet-alert",
  //      name: "Sweet Alert",
  //      mini: "SA",
  //      component: SweetAlert
  //    },
  //    {
  //      path: "/components/notifications",
  //      name: "Notifications",
  //      mini: "N",
  //      component: Notifications
  //    },
  //    { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
  //    {
  //      path: "/components/typography",
  //      name: "Typography",
  //      mini: "T",
  //      component: Typography
  //    }
  //  ]
  //},
  //{
  //  collapse: true,
  //  path: "/forms",
  //  name: "Forms",
  //  state: "openForms",
  //  icon: "content_paste",
  //  views: [
  //    {
  //      path: "/forms/regular-forms",
  //      name: "Regular Forms",
  //      mini: "RF",
  //      component: RegularForms
  //    },
  //    {
  //      path: "/forms/extended-forms",
  //      name: "Extended Forms",
  //      mini: "EF",
  //      component: ExtendedForms
  //    },
  //    {
  //      path: "/forms/validation-forms",
  //      name: "Validation Forms",
  //      mini: "VF",
  //      component: ValidationForms
  //    },
  //    { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }
  //  ]
  //},
  //{
  //  collapse: true,
  //  path: "/tables",
  //  name: "Tables",
  //  state: "openTables",
  //  icon: GridOn,
  //  views: [
  //    {
  //      path: "/tables/regular-tables",
  //      name: "Regular Tables",
  //      mini: "RT",
  //      component: RegularTables
  //    },
  //    {
  //      path: "/tables/extended-tables",
  //      name: "Extended Tables",
  //      mini: "ET",
  //      component: ExtendedTables
  //    },
  //    {
  //      path: "/tables/react-tables",
  //      name: "React Tables",
  //      mini: "RT",
  //      component: ReactTables
  //    }
  //  ]
  //},
  //{
  //  collapse: true,
  //  path: "/maps",
  //  name: "Maps",
  //  state: "openMaps",
  //  icon: Place,
  //  views: [
  //    {
  //      path: "/maps/google-maps",
  //      name: "Google Maps",
  //      mini: "GM",
  //      component: GoogleMaps
  //    },
  //    {
  //      path: "/maps/full-screen-maps",
  //      name: "Full Screen Map",
  //      mini: "FSM",
  //      component: FullScreenMap
  //    },
  //    {
  //      path: "/maps/vector-maps",
  //      name: "Vector Map",
  //      mini: "VM",
  //      component: VectorMap
  //    }
  //  ]
  //},
  //  { path: "/ProductConfig", name: "Widgets", icon: WidgetsIcon, component: Widgets },
   // { path: "/Test", name: "Test", icon: Group, component: ModelTest },
  //  { path: "/users", name: "Charts", icon: Timeline, component: CreateUser },
  //  { path: "/Partners", name: "Calendar", icon: DateRange, component: Calendar },
   { redirect: true, path: "/", pathTo: "/pages", name: "Pages" }
 //{ redirect: true, path: "/", pathTo: "/dashboard/home", name: "Dashboard" }
   // { redirect: true, path: "/dashboard", pathTo: "/dashboard/home", name: "Dashboard" }
];
export default dashRoutes;
