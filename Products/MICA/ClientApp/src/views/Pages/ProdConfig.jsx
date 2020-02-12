import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

import Heading from "components/Heading/Heading.jsx";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";

import Step1 from "../Forms/WizardSteps/Step1.jsx";
import Step2 from "../Forms/WizardSteps/Step2.jsx";
import Step3 from "../Forms/WizardSteps/Step3.jsx";

import avatar from "assets/img/faces/marc.jpg";

class ProdConfigPage extends React.Component {
    render() {
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={this.props.cardIconTitle}>
                                    <small> Product Basic Feature </small>
                                </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Product Name"
                                            id="productname"
                                            formControlProps={{
                                                fullWidth: true
                                            }}                                            
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Product Code"
                                            id="productcode"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <CustomInput
                                            labelText="Line Of Business"
                                            id="lob"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
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
                                            tabButton: "Covers",
                                            tabIcon: Dashboard,
                                            tabContent: (
                                                <Wizard 
                                                        validate
                                                        steps={[
                                                            { stepName: "Insurables", stepComponent: Step1, stepId: "about" },
                                                            { stepName: "Covers", stepComponent: Step2, stepId: "account" },
                                                            { stepName: "Benefits", stepComponent: Step3, stepId: "address" },
                                                            { stepName: "Premium", stepComponent: Step1, stepId: "address" }
                                                        ]}
                                                        title=""
                                                        subtitle=""
                                                    />
                                            )
                                        },
                                        {
                                            tabButton: "Clauses",
                                            tabIcon: Schedule,
                                            tabContent: (
                                                   <Wizard
                                                        validate
                                                        steps={[
                                                            { stepName: "Clauses", stepComponent: Step1, stepId: "about" },
                                                            { stepName: "Warranties", stepComponent: Step2, stepId: "account" },
                                                            { stepName: "Exclusions", stepComponent: Step3, stepId: "address" }
                                                        ]}
                                                        title=""
                                                        subtitle=""
                                                    />
                                            )
                                        },
                                        {
                                            tabButton: "Others",
                                            tabIcon: Schedule,
                                            tabContent: (
                                                    <Wizard
                                                        validate
                                                        steps={[
                                                            { stepName: "Channels", stepComponent: Step1, stepId: "about" },
                                                            { stepName: "Risks", stepComponent: Step2, stepId: "account" },
                                                            { stepName: "Claims", stepComponent: Step3, stepId: "address" }
                                                        ]}
                                                        title=""
                                                        subtitle=""
                                                    />
                                            )
                                        }
                                    ]}
                                />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>

            );
    }
}
export default ProdConfigPage;