import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import UserConfig from 'modules/Users/UserConfig.js';
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.jsx";

const style = {
    infoText: {
        fontWeight: "300",
        margin: "10px 0 30px",
        textAlign: "center"
    },
    inputAdornmentIcon: {
        color: "#555"
    },
    choiche: {
        textAlign: "center",
        cursor: "pointer",
        marginTop: "20px"
    },
    ...customSelectStyle,
    ...customCheckboxRadioSwitch
};

class DragNDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            masterList: [],
            dynamicdata: {

            },
        };
    }


    componentDidMount() {
        fetch(`${UserConfig.UserConfigUrl}/api/UserProfile/GetMasterData?sMasterlist=abc`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ masterList: data });
                console.log("masterlist: ", this.state.masterList)
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card >
                    <CardBody>
                        <GridContainer>
                            {this.props.dynamic.map(function (item, key) {
                                if (this.props.count - 1 != key) {
                                    return (
                                        <GridItem xs={12} sm={4} key={key}>
                                            {item}
                                        </GridItem>
                                    );
                                } else {
                                    return (
                                        <GridContainer justify="center">
                                            {/*<GridItem xs={12} sm={4} key={key}>*/}
                                            {item}
                                            {/* </GridItem>*/}
                                        </GridContainer>
                                    );
                                }
                            }.bind(this))
                            }
                        </GridContainer>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(DragNDrop);