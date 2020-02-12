import React from "react";
// @material-ui/icons
import Settings from "@material-ui/icons/Settings";
import Group from "@material-ui/icons/Group";
//import Extension from "@material-ui/icons/Extension";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";

import UserCreation from "./UserManagement/_Permission";
import AssignRole from "./UserManagement/_AssignRole";
import Privileges from "./UserManagement/_Privileges";
import Role from "./UserManagement/_RoleManagement";




class Payment extends React.Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <NavPills
                        color="rose"
                        horizontal={{
                            tabsGrid: { xs: 12, sm: 12, md: 2 },
                            contentGrid: { xs: 12, sm: 12, md: 10 }
                        }}
                        tabs={[
                            {
                                tabButton: "User Management",
                                tabIcon: Group,
                                tabContent: (
                                    <Wizard
                                        validate
                                        steps={[
                                            { stepName: "Role Management", stepComponent: Role, stepId: "role" },
                                            { stepName: "User Management", stepComponent: UserCreation, stepId: "user" },

                                        ]}
                                        title=""
                                        subtitle=""
                                    />
                                )
                            },
                            {
                                tabButton: "Assign Role",
                                tabIcon: Settings,
                                tabContent: (
                                    <Wizard
                                        validate
                                        steps={[
                                            { stepName: "Assign Role", stepComponent: AssignRole, stepId: "AssignRole" },

                                        ]}
                                        title=""
                                        subtitle=""
                                    />
                                )
                            },
                            {
                                tabButton: "Privileges",
                                tabIcon: Settings,
                                tabContent: (
                                    <Wizard
                                        validate
                                        steps={[
                                            { stepName: "Privileges", stepComponent: Privileges, stepId: "privileges" },

                                        ]}
                                        title=""
                                        subtitle=""
                                    />
                                )
                            },

                        ]}
                    />
                </CardBody>
            </Card>
        );
    }
}
export default Payment;