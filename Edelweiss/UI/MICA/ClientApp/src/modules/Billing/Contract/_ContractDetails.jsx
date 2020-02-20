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
import ReactTable from "react-table";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
//import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
import MyUploader from "./DocumnetUpload.jsx";
import swal from 'sweetalert';
import Success from "../../../components/Typography/Success.jsx";
import Contract from "assets/img/Contract.png";
import Customer from "assets/img/Customer-details.png";






const ContractDetails =(props)=> {
   
 
        return (

            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={Contract} /></Icon>
                    </CardIcon>
                    {
                        <h4 >
                            <small> Contract Details </small>
                        </h4>
                    }
                </CardHeader>

                <CardBody>

                    <div>

                        <GridContainer>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime required={true} onFocus={props.onClick} labelText="Contract Date" id='dtActiveFrom' name='ContractDate' onChange={(evt) => this.onDateChange('datetime', 'ContractDate', evt)} value={props.ContractDate} formControlProps={{ fullWidth: true }} />

                            </GridItem>


                            <GridItem xs={12} sm={12} md={4}>
                                <CustomInput
                                    labelText="Contract Name"
                                    name="contractName"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime required={true} onFocus={props.onClick} labelText="Contract Effective Date" id='dtActiveFrom' name='contractEffectiveDate' onChange={(evt) => this.onDateChange('datetime', 'contractEffectiveDate', evt)} value={props.contractEffectiveDate} formControlProps={{ fullWidth: true }} />
                              
                            </GridItem>


                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime required={true} onFocus={props.onClick} labelText="Contract End Date" id='dtActiveFrom' name='contractEndDate' onChange={(evt) => this.onDateChange('datetime', 'contractEndDate', evt)} value={props.contractEndDate} formControlProps={{ fullWidth: true }} />

                            </GridItem>


                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Contract Currency"
                                    name="ContractCurrency"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>


                                <GridItem xs={12} sm={4}>
                                    <CustomInput
                                        labelText="Max Credit Amount Allowed"
                                        name="maxCreaditamountAllowed"
                                        // required={true}
                                        //value={this.state.CancellationDTO.eventId}
                                        onChange={(e) => this.SetValue(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Max Credit Period"
                                    name="maxCreaditPeriod"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Grace Period"
                                    name="gracePeriod"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={4}>
                                <CustomInput
                                    labelText="Purchase Order No"
                                    name="purchaseOrderNo"
                                    // required={true}
                                    //value={this.state.CancellationDTO.eventId}
                                    onChange={(e) => this.SetValue(e)}
                                    formControlProps={{ fullWidth: true }}
                                />
                            </GridItem>

                            <GridItem xs={12} sm={12} md={4}>
                                <CustomDatetime required={true} onFocus={props.onClick} labelText="Purchase Order Date" id='dtActiveFrom' name='purchaseOrderDate' onChange={(evt) => this.onDateChange('datetime', 'purchaseOrderDate', evt)} value={props.purchaseOrderDate} formControlProps={{ fullWidth: true }} />

                            </GridItem>
 
                        </GridContainer>


                        <CardHeader color="info" icon >

                            {
                                <h3 >
                                    <small> Documents </small>
                                </h3>
                            }
                            </CardHeader>

                        <MyUploader/>



                        <CardHeader color="info" icon >

                            {
                                <h3 >
                                    <small> History </small>
                                </h3>
                            }
                        </CardHeader>
                        <GridContainer justify="center">
                            <div id="searchTableSec">

                                <GridItem xs={12} >
                                   

                                    <CardBody className="modify-user-react-tab">
                                        <ReactTable
                                            data={this.state.Policydetailsdata}
                                            filterable

                                            columns={[
                                                {
                                                    Header: "S.No",
                                                    accessor: "SNo",
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 30,
                                                    resizable: false,

                                                },
                                                {
                                                    Header: "Modified Date",
                                                    accessor: "ModifiedDate",
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 60,
                                                    resizable: false,
                                                    /* minWidth: 150,
                                                       style: { textAlign: "center" },
                                                       headerClassName: 'react-table-center'*/
                                                },
                                                {

                                                    Header: "Contract Effective Date",
                                                    accessor: "ContractEffectiveDate",
                                                    //minWidth: 150,
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 80,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Contract End Date",
                                                    accessor: "ContractEndDate",
                                                    //minWidth: 150,
                                                    //style: { textAlign: "center" },
                                                    //headerClassName: 'react-table-center'
                                                    style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 70,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Contract Currency",
                                                    accessor: "ContractCurrency",

                                                    ///style: { textAlign: "center" },
                                                    ///headerClassName: 'react-table-center'
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 70,
                                                    resizable: false,
                                                },
                                                {
                                                    Header: "Max Credit Amount Allowed",
                                                    accessor: "MaxCreditAmountAllowed",
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 100,
                                                    resizable: false,
                                                    //minWidth: 150,
                                                    //style: { textAlign: "center" },
                                                    //headerClassName: 'react-table-center'
                                                },
                                                {

                                                    Header: "Max Credit Period",
                                                    accessor: "MaxCreditPeriod",
                                                    //minWidth: 150,
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 70,
                                                    resizable: false,
                                                },
                                                {

                                                    Header: "Grace Period",
                                                    accessor: "GracePeriod",
                                                    //minWidth: 150,
                                                    //style: { textAlign: "center" },
                                                    headerClassName: 'react-table-center',
                                                    minWidth: 50,
                                                    resizable: false,
                                                },



                                            ]}

                                            defaultPageSize={5}
                                            showPaginationTop={false}
                                            //pageSize={([this.state.Policydetailsdata.length + 1] < 5) ? [this.state.Policydetailsdata.length + 1] : 5}
                                            showPaginationBottom
                                            className="-striped -highlight"
                                        />
                                    </CardBody>
                                </GridItem>
                            </div>
                        </GridContainer>
                        
                        <GridItem xs={3} sm={3} md={3}>
                            <Button id="round" style={{ marginTop: '25px' }} color="danger" > Cancel  </Button>
                            <Button id="round" style={{ marginTop: '25px' }} color="info" onClick={this.submit} > Save  </Button>
                        </GridItem>
                       

                    </div>
                </CardBody>
            </Card>


            );




    }




export default ContractDetails;
