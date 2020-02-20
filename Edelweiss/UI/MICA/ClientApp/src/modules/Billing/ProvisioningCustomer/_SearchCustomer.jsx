import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

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
   
};
const radioAlign = {
    margin: "0 auto",
    textAlign: "center"
}

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}


const SearchCustomer = (props) => {
    let classes = props.classes;
    console.log("props Event", props);




    return (
        <div>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" /></Icon>
                        </CardIcon>
                        {
                            <GridItem>
                                <h4><small>Customer Search</small></h4>

                            </GridItem>
                        }
                    </CardHeader>


                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                        <CardBody>
                            <GridContainer className="search-Product">

                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput

                                        labelText="Customer Name"
                                        value={props.CustomersDTO.customerName}
                                        name="customerName"
                                        id="customerName"
                                        onChange={(e) => props.SetCustomer("string", e)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                        <Button id="top-bnt" color="info" round onClick={props.handleSearchCustomer} >
                                            Search
                                               </Button>
                                    </Animated>
                                </GridItem>
                                {/* <div id="searchContractTable" style={{ display: 'none' }}> */}
                                
                            </GridContainer>
                        </CardBody>
                    </Animated>
                </Card>
                {props.searchCustomerTable == true ?
                    <GridContainer justify="center">



                        <GridItem>

                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                <CardBody className="modify-user-react-tab">

                                    <ReactTable
                                        data={props.customerdata}
                                        filterable
                                        columns={[
                                            {
                                                Header: "Select",
                                                accessor: "radio",
                                                minWidth: 20,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                sortable: false,
                                                filterable: false,
                                                resizable: false,
                                            },
                                            //{
                                            //    Header: " S No",
                                            //    accessor: "SNo",
                                            //    style: { textAlign: "right" },
                                            //    headerClassName: 'react-table-center',
                                            //    minWidth: 50,
                                            //    resizable: false,

                                            //},
                                            //{
                                            //    Header: "Customer Id",
                                            //    accessor: "CustomerId",
                                            //    style: { textAlign: "center" },
                                            //    headerClassName: 'react-table-center',
                                            //    minWidth: 50,
                                            //    resizable: false,

                                            //},
                                            {

                                                Header: "Customer Name",
                                                accessor: "CustomerName",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                            {

                                                Header: "Contract Name",
                                                accessor: "ContractName",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            },
                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />



                                </CardBody>
                            </Animated>
                            <GridContainer justify="center">
                                <GridItem >

                                    <Animated animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                                        <Button id="submitBtn" color="info" round onClick={props.handleOK} >
                                            Ok
                                               </Button>
                                    </Animated>
                                </GridItem>
                            </GridContainer>
                        </GridItem>

                    </GridContainer>
                    : null}
            </Animated>
        </div>


    );
}
//}
export default withStyles(style)(SearchCustomer);
