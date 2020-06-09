import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";









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

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}

class ViewAllowances extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retainFlag: false,
            showflag:false,
        }
    };

    SearchData = (e) => {
        this.setState({ showflag: true });

    }
   
   

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">

                            <Icon><img id="icon" /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small>View Allowance</small>
                            </h4>
                        }
                    </CardHeader>
                    <CardBody>
                        <GridContainer>

                            <GridItem xs={12} sm={4} md={4}>
                                <CustomInput
                                    labelText=""
                                    id="allowanceId"
                                    //value={}
                                    //name=''
                                    required={true}
                                    onChange={(e) => this.SetValue("string", e)}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">

                            <Button round /*disabled={this.state.btnload}*/ align="center" color="success" onClick={(e) => this.SearchData(e)} >Search</Button>

                            <Button round /*disabled={this.state.btnload}*/ align="center" color="success" >View</Button>

                           

                        </GridContainer>
                    </CardBody>
                </Card>
                {this.state.showflag &&
                    <GridContainer>
                        <GridItem xs={12}>
                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                                <ReactTable

                                    //data={props.newdata}
                                    filterable
                                    columns={[


                                        {
                                            Header: "Allowance Name",
                                            accessor: "Type",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 65,
                                            resizable: false,

                                        },
                                        {
                                            Header: "Designation",
                                            accessor: "LeadNo",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 60,
                                            resizable: false,

                                        },
                                        {

                                            Header: "Created On",
                                            accessor: "LeadDate",
                                            style: { textAlign: "center" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 70,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Expired On",
                                            accessor: "LeadNo",
                                            style: { textAlign: "right" },
                                            headerClassName: 'react-table-center',
                                            minWidth: 60,
                                            resizable: false,

                                        },

                                    ]

                                    }
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    // pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                    showPaginationBottom
                                    className="-striped -highlight"
                                />
                            </Animated>
                        </GridItem>
                    </GridContainer>
                }
            </div>
        );
    }
}
export default withStyles(style)(ViewAllowances);