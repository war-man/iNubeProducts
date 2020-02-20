import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import Favorite from "@material-ui/icons/Favorite";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";


import FormControlLabel from "@material-ui/core/FormControlLabel";
import Datetime from "react-datetime";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


import Heading from "components/Heading/Heading.jsx";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import BenefitClauses from "../Clauses/_BenefitCWE.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Clearfix from "components/Clearfix/Clearfix.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dropdown from "components/Dropdown/Dropdown.jsx";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import avatar from "assets/img/faces/marc.jpg";
import Premium from "../Covers/_Premium.jsx";

const tableClassRow = {
    color: "red"
}
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#f29498",
        color: theme.palette.common.white,
        fontWeight: "300",
        padding: "8px !important",
        border: "1px solid #eee"
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const Benefits = (props) => {
    
    const { classes } = props;
    console.log("Bindex", props);
    const benefitsData = props.componentData.props.props.props.props.state;
    const benefitFun = props.componentData;
    const coversProductDetails = props.componentData.props.props.props;
    const Iindex = props.componentData.props.Iindex;
    const Bindex = props.componentData.props.Bindex;
    const propFun = props.componentData.props;
    console.log("coversProductDetails", benefitFun,coversProductDetails, Iindex, Bindex, benefitsData)
    //console.log('testing benefits data ', props, benefitsData.masterList, coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex])
    var currencylist = JSON.parse(localStorage.getItem('listdata'));
    console.log("listdata", currencylist);
    return (
        <div>
        <GridContainer lg={12} style={{ position: 'relative', left: '30px' }}>
                {coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].singleValueSelected !== "1" ?

                null : (< GridContainer >

                    {/*
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                                <Card style={{ boxShadow: 'none',border:'0' }}>
                                <CardBody className="Benifits-Tab">
                       
                                    <Table className="createTableClass table-striped" style={{ borderRadius: '6px  ', width: '100%', margin: '0 auto' }} id="paymentTable">
                                        <TableHead className="tableClassRow" style={tableClassRow}>
                                            <TableRow className="tableClassRow">
                                                <CustomTableCell className="tableClassRow"><h7><b>Cover Event Factor - From Value </b></h7></CustomTableCell>
                                                <CustomTableCell className="tableClassRow"><h7><b>Cover Event Factor - To Value</b></h7></CustomTableCell>
                                                <CustomTableCell className="tableClassRow"><h7><b>Amount</b></h7></CustomTableCell>
                                                <CustomTableCell className="tableClassRow"><h7><b></b></h7></CustomTableCell>
                                            </TableRow>
                                        </TableHead>
                                        {
                                            benefitsData.ProductDTO.tblBenifitRangeDetails.map((item, index) =>
                                                <TableRow className="tableClassRow" key={index}>
                                                    <CustomTableCell><CustomInput
                                                        // labelText="Benefit From Value"
                                                        // id="benefitAmount"
                                                        disabled={benefitsData.disabled}
                                                        value={item.fromValue}
                                                        name="fromValue"
                                                        onChange={(e) => benefitsData.setBenifitValue('fromValue', e, index)}
                                                        disabled={benefitsData.viewdisable}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    /></CustomTableCell>

                                                    <CustomTableCell><CustomInput
                                                        disabled={benefitsData.viewdisable}
                                                        //  labelText="Benefit To Value"
                                                        // id="benefitAmount"
                                                        value={item.toValue}
                                                        name="toValue"
                                                        onChange={(e) => benefitsData.setBenifitValue('toValue', e, index)}
                                                        disabled={benefitsData.viewdisable}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    /></CustomTableCell>
                                                    <CustomTableCell><CustomInput
                                                        disabled={benefitsData.viewdisable}
                                                        //    labelText="Benefit Amount"
                                                        id="benefitAmount"
                                                        value={item.benefitAmount}
                                                        name="benefitAmount"
                                                        onChange={(e) => benefitsData.setBenifitValue('benefitAmount', e, index)}
                                                        disabled={benefitsData.viewdisable}
                                                        formControlProps={{
                                                            fullWidth: true
                                                        }}
                                                    /></CustomTableCell>

                                                    <CustomTableCell>{!benefitsData.viewdisable && <Button color="warning" onClick={(e) => benefitsData.addRecord(e, index)} id="round" >Add</Button>}</CustomTableCell>
                                                   
                                                        </TableRow>
                                        )}
                                    </Table> 
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>

 */}

                    <GridItem xs={12}>

                            <ReactTable
                                data={coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].benifitRangeTableDetails}
                            filterable
                            columns={[
                                {
                                    Header: "#",
                                    accessor: "id",
                                    headerClassName: 'react-table-center',
                                    style: { textAlign: "center" },
                                    minWidth: 20,
                                    sortable: false,
                                    //  filterable: false 
                                },
                                {
                                    // Header: "Cover Event Factor - From Value",
                                    Header: "C E F - From Value",
                                    accessor: "fromValue",
                                    minWidth: 40,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center'
                                },
                                {
                                    Header: "C E F - To Value",
                                    accessor: "toValue",
                                    minWidth: 40,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center'
                                },
                                {
                                    Header: "Benefit Amount",
                                    accessor: "Amount",
                                    minWidth: 40,
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center'
                                },
                                {
                                    Header: "Premium Amount",
                                    accessor: "PremiumAmount",
                                    minWidth: 40,
                                    style: { textAlign: "right" },
                                    headerClassName: 'react-table-center',
                                    show: props.componentData.state.hidepremiumAmount
                                },
                                {
                                    Header: "",
                                    accessor: "btn",
                                    style: { textAlign: "center" },
                                    minWidth: 20,
                                    style: { textAlign: "center" },
                                    headerClassName: 'react-table-center',
                                    sortable: false,
                                    filterable: false

                                },


                            ]}
                            defaultPageSize={5}
                          //  pageSize={([benefitsData.benifittabledata.length + 1] < 5) ? [benefitsData.benifittabledata.length + 1] : 5}
                            showPaginationTop={false}
                            showPaginationBottom
                            className="-striped -highlight discription-tab"
                        //loading={this.state.newdata}

                        //   loadingText="coming"
                        />

                    </GridItem>

                </GridContainer>
                )

            }

            <GridContainer className="benifit-container">
                    {/*benefitsData.MasterDTO.checkBox &&*/}
                        <GridItem xs={12} sm={4}>
                        <Dropdown required={true} labelText="Benefit Criteria" id="ProductDTO.benefitTypeId" lstObject={benefitsData.MasterDTO.BenefitCriteria} value={coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].benefitTypeId} name='benefitTypeId' onChange={(e) => benefitFun.SetCoverProductDetailsValue('productBenefits', e, Bindex, Iindex)} disabled={benefitsData.viewdisable} formControlProps={{ fullWidth: true }} />
                        {benefitsData.errormessage && (coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].benefitTypeId === "") ? <p className="error">This Field is Required</p> : null}
                    </GridItem>
                    


                <GridItem xs={2} sm={2} md={2}>
                        <MasterDropdown required={true} labelText="Currency" lstObject={(currencylist != null) ? currencylist : []} disabled={benefitsData.viewdisable} filterName='Currency' value={coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].currencyId} name='currencyId' onChange={(event) => benefitFun.SetCoverProductDetailsValue("productBenefits", event, Bindex, Iindex)} formControlProps={{ fullWidth: true }} />
                        {/* {benefitsData.errormessage && (benefitsData.ProductDTO.productBenefit.currencyId === "") ? <p className="error">This Field is Required</p> : null}*/}
                </GridItem>



                    {coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].singleValue === true ?

                    (

                        <GridItem id="benifitRangeAmount" xs={12} sm={12} md={4}>

                            <CustomInput
                                required={true}
                                disabled={(benefitsData.viewdisable === false) ? benefitsData.benefitinputdisable : true}
                                    inputType="number"
                                    type="numeric"
                                labelText="Benefit Amount"
                                id="benefitAmount"
                                    value={coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].benefitAmount}
                                name="benefitAmount"
                                    onChange={(e) => benefitFun.SetCoverProductDetailsValue('productBenefits', e, Bindex, Iindex)}

                                formControlProps={{
                                    fullWidth: true
                                }}
                                />
                                {benefitsData.errormessage && (coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].benefitAmount === "") ? <p className="error">This Field is Required</p> : null}
                        </GridItem>
                    ) : null
                }

                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                       
                        disabled={benefitsData.viewdisable}
                            labelText="Maximum Benefit Amount"
                            inputType="number"
                        id="gstnumber"
                            value={coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].maxBenefitAmount}
                            name="maxBenefitAmount"
                            type="numeric"
                            onBlur={() => benefitFun.onBlur('productBenefits',Iindex, Bindex)}
                            onChange={(e) => benefitFun.SetCoverProductDetailsValue('productBenefits', e, Bindex, Iindex)}
                        //   disabled={benefitsData.viewdisable}
                            disabled={(coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].benefitCriteriaValue != "") ? true : false}
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                           
                            inputType="number"
                        labelText="Maximum Benefit Criteria Value"
                        id="gstnumber"
                            value={coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].benefitCriteriaValue}
                        name="benefitCriteriaValue"
                            onChange={(e) => benefitFun.SetCoverProductDetailsValue('productBenefits', e, Bindex, Iindex)}
                            disabled={(coversProductDetails.ProductDTO.productInsurableItem[Iindex].productCovers[Bindex].productBenefits[0].maxBenefitAmount != "") ? true : false}
                        formControlProps={{
                            fullWidth: true
                        }}
                        />
                    </GridItem>

            </GridContainer>

            </GridContainer>
            <BenefitClauses props={props.componentData} />
        </div>
    );

}
export default withStyles(extendedFormsStyle)(Benefits);