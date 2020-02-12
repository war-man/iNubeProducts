import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Icon from "@material-ui/core/Icon";
import SalesSummaryIcon from "assets/img/sales-summary.png";
import Permission from "./_Permission";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

class Privileges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: [],
            checked: [24, 22],
            selectedValue: null,
            selectedEnabled: "b",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
        this.save = this.save.bind(this);
        console.log('Constructor Priveleges');
    }

    onChange = (currentNode, selectedNodes) => {
        this.state.role.push(currentNode.permissionId);
        console.log('onChange::', currentNode.permissionId, selectedNodes);
    }
    save() {
        console.log("values  ", this.state.role);
    };

    handleChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    handleChangeEnabled(event) {
        this.setState({ selectedEnabled: event.target.value });
    }
    handleToggle(value) {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer >
                <GridContainer justify="center">
                    <GridItem>
                        <Card className="wizCard">
                            <CardHeader color="warning" icon>
                                <CardIcon color="warning">
                                    <Icon> <img src={SalesSummaryIcon} className={classes.cardIcons} /></Icon>
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>
                                    <small>Assign Priveleges
                        </small> </h4>
                            </CardHeader>
                            <CardBody>
                                <GridContainer className="privelegesBox">
                                    <GridItem id="alertItem" xs={12} sm={12} md={12} lg={12}>
                                        {this.state.perFlag ? <Permission onChange={this.onChange} MasPermissionDTO={this.state.MasPermissionDTO} savepermission={this.savepermission} /> : null}
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </GridContainer>

        );
    }
}

export default withStyles(regularFormsStyle)(Privileges);
