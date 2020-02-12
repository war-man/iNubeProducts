import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchInvoice from "../Invoice/SearchInvoice";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";



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

class SearchPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <Card >
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={role} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Payment Search </small>
                            </h4>
                        }
                    </CardHeader>

                    <CardBody>
                        {/*<GridContainer>
                            <SearchInvoice />
                        </GridContainer> */}
                        <GridItem xs={12} sm={4}>
                                <CustomInput
                            labelText="Customer Name"
                            name="customerName"
                            required={true}
                           // value={this.state.InvoiceData.customerName}
                            //onChange={(e) => this.onInputChange(e)}
                            formControlProps={{ fullWidth: true }}
                        />
                            </GridItem>
                        {/* <GridContainer>
                            <SearchInvoice />

                        </GridContainer> */}
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(SearchPayment);