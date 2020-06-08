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
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import user from "assets/img/user.png";
import lead from "assets/img/man-user.png";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
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

class PolicyMovement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtable: false,
            movedDD: [{
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


    tableshow = () => {
        this.setState({ showtable: true });
    };

    render() {

        const { classes } = this.props;

        return (
            <CardBody>
           
                       <GridContainer>     
                       
                    {/*  <GridItem xs={12} sm={12} md={4}>
                        <Dropdown
                            labelText="Moved To"

                            // value={}
                            lstObject={this.state.movedDD}
                            name='decisionId'
                            // onChange={(e) => this.SetCategory("string", e, props.index)}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                        
                        </GridItem>  */}
                     </GridContainer>

                        <GridContainer>
                            <GridItem xs={12}>


                                <CardBody>
                                    <ReactTable
                                data={this.props.policyTbldata}
                                        filterable
                                        columns={[
                                            //{
                                            //    Header: "Select",
                                            //    accessor: "radio",
                                            //    sortable: false,
                                            //    filterable: false,
                                            //    minWidth: 30,
                                            //    resizable: false,
                                            //},
                                            {
                                                Header: "Policy Number",
                                                accessor: "PolicyNumber",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Policy Status",
                                                accessor: "PolicyStatus",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: "City Name",
                                                accessor: "CityName",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Contact Number",
                                                accessor: "ContactNumber",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Premium Amount",
                                                accessor: "PremiumAmount",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Mode",
                                                accessor: "Mode",
                                                headerClassName: 'react-table-center',
                                                style: { textAlign: "center" },
                                                // width: '50'
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Moved To",
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

            </CardBody>


        );
    }
}
export default withStyles(style)(PolicyMovement);