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

import ReactTable from "components/MuiTable/MuiTable.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";





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

class ReporteeMovement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retainFlag: false,
            supervisorDD: [{
                mId: 1,
                mValue: "Supervisor Team member1"
            },
            {
                mId: 2,
                mValue: "Supervisor Team member2"
            },
            {
                mId: 3,
                mValue: "Supervisor Team member3"
            },
            {
                mId: 4,
                mValue: "Supervisor Team member4"
            }]

        }
        
    };
    

    //retainFun = () => {
    //    this.setState({ retainFlag: false });

    //   // this.props.componentData.reporteeFlag = false;
    //};
    //distributeFun = () => {
    //    this.setState({ retainFlag: true });
    //    this.props.componentData.reporteeFlag = true;
    //};

    render() {

        const { classes } = this.props;
        const repdata = this.props.componentData;
        return (
            <div>
                <GridContainer justify="center">
                    <GridItem xs={3} sm={3} md={3}>
                        <Button color="warning" onClick={repdata.retainFun} round>Retain</Button>

                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <Button color="warning" onClick={repdata.distributeFun} round>Distribute</Button>

                    </GridItem>
                </GridContainer>
                {repdata.retainFlag && <GridContainer>
                    <GridContainer>
                        {/*
                        <GridItem xs={12} sm={12} md={4}>
                        <Dropdown
                            labelText="New SuperVisor"

                            // value={}
                            lstObject={this.state.supervisorDD}
                            name='decisionId'
                            // onChange={(e) => this.SetCategory("string", e, props.index)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />

                    </GridItem> */}



                </GridContainer>

                    <GridContainer>
                        <GridItem xs={12}>


                            <CardBody>
                                <ReactTable
                                    data={repdata.reporteetabledata}
                                    filterable
                                    columns={[
                                        {
                                            Header: "Select",
                                            accessor: "SNo",
                                            sortable: false,
                                            filterable: false,
                                            minWidth: 30,
                                            resizable: false,
                                        },
                                        {
                                            Header: "Reportee Name",
                                            accessor: "ReporteeName",
                                            headerClassName: 'react-table-center',
                                            style: { textAlign: "center" },
                                            // width: '50'
                                            minWidth: 30,
                                            resizable: false,

                                        },
                                        {
                                            Header: "New Supervisor",
                                            accessor: "NewSupervisor",
                                            headerClassName: 'react-table-center',
                                            style: { textAlign: "center" },
                                            // width: '50'
                                            minWidth: 40,
                                            resizable: false,

                                        },



                                    ]}
                                    defaultPageSize={5}
                                    showPaginationTop={false}
                                    showPaginationBottom
                                    className="-striped -highlight"
                                />
                            </CardBody>

                        </GridItem>
                    </GridContainer> 
                    </GridContainer> }
            </div>

        );
    }
}
export default withStyles(style)(ReporteeMovement);