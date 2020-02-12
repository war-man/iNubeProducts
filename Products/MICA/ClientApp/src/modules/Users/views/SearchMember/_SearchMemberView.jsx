import React from "react";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import MemberDetails from "./_MemberDetails.jsx"
import CoverDetails from "./_CoverDetails.jsx"
import BenefitDetails from "./_BenefitDetails.jsx"
import ClaimDetails from "./_ClaimDetails.jsx"

class ViewMember extends React.Component {
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
                                tabButton: "Search Member View",
                                tabIcon: Search,
                                tabContent: (
                                    <Wizard
                                        validate
                                        steps={[
                                            { stepName: "Member Details", stepComponent: MemberDetails, stepId: "MemberDetails" },
                                            { stepName: "Cover Details", stepComponent: CoverDetails, stepId: "CoverDetails" },
                                            { stepName: "Benefit Details", stepComponent: BenefitDetails, stepId: "BenefitDetails" },
                                            { stepName: "Claim Details", stepComponent: ClaimDetails, stepId: "ClaimDetails" },
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
export default ViewMember;