import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import role from "assets/img/users.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import swal from 'sweetalert';
import partnerconfig from "modules/Partners/PartnerConfig.js";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";

import Docupload from "modules/Products/Micro/views/Docupload.jsx";
import PromoCodeDocupload from "modules/Products/Micro/views/PromoCodeDocupload.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

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

class UserExcelUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductData: [],
            partid: 570,
            visible: false,
            productid: "",
            productCode: this.props.productcode,
            ProductID: this.props.productid,
        };
    }

    setValue = (event) => {
        let value = event.target.value;
        this.setState({ productid: value });
        console.log("productid: ", this.state.productid);
    }

    componentDidMount() {
        if (this.props.productid == null) {
            this.setState({ visible: true });
        }
        fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/GetAssignProductbyId?partnerId=` + this.state.partid, {
            // fetch(`https://localhost:44315/api/Partner/GetAssignProductbyId?partnerId=` + this.state.partid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ ProductData: data });
                console.log("data save result:", data);
                console.log("search product data", this.state.ProductData);
            });
    }

    handlesendemailsms = () => {
        console.log("hitting");
        fetch(`${productConfig.productConfigUrl}/api/Product/SMSBlast`, {
            method: 'Get',
            //body: JSON.stringify(this.state.productSearchDTO),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            }
        })
            .then(response => response.json())
            .then(data => {
                //if (data.status == 200) {
                swal({
                    text: "Email & Text Messages sent",
                    icon: "success"
                });
                //}
                //else {
                //    swal({
                //        text: "Try again later!",
                //        icon: "error"
                //    });
                //}
            });
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
                                <small> {this.props.ExcelName} Excel Upload </small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer justify="center">
                            <GridItem xs={6} sm={6}>
                                <label>
                                    <div className="banner">
                                        <label>Product ID: </label><h5>{this.props.productid}</h5>
                                        <label>Product Code: </label><h5>{this.props.productcode}</h5>
                                        <label>Product Name: </label><h5>{this.props.productname}</h5>
                                    </div>
                                </label>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            {this.state.visible ? <GridContainer justify="center">
                                <GridItem xs={6} sm={6} >
                                    <Dropdown
                                        labelText="Product Name"
                                        id="ddlstatus"
                                        lstObject={this.state.ProductData}
                                        required={true}
                                        //filterName='Product' 
                                        value={this.state.productid}
                                        name='productid'
                                        onChange={(e) => this.setValue(e)}
                                        formControlProps={{ fullWidth: true }} />
                                </GridItem>
                            </GridContainer>
                                : null}


                            <GridContainer justify="center">
                                <GridItem xs={6} sm={6} md={6}>
                                    {(this.props.ExcelName == "User") ? <Docupload productCode={this.state.productCode} ProductID={this.state.ProductID} /> : null}
                                    {(this.props.ExcelName == "PromoCode") ? <PromoCodeDocupload productCode={this.state.productCode} ProductID={this.state.ProductID} />:null}
                                </GridItem>
                                {(this.props.ExcelName=="User") && <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={2} md={3} lg={1} >
                                        <Button round color="primary" onClick={() => this.handlesendemailsms()}>Send Email & SMS</Button>
                                </GridItem>
                                
                            </GridContainer>
                            }
                            </GridContainer>
                        </GridContainer>

                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withStyles(style)(UserExcelUpload);