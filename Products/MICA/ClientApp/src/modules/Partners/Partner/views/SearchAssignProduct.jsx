import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
//import SearchProduct from "modules/Partners/Partner/views/_SearchProduct.jsx";
//import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
//import bindModel from 'components/ModelBinding/bindModel.js';
import Button from "../../../../components/CustomButtons/Button";
import partnerconfig from "modules/Partners/PartnerConfig.js";
//import swal from 'sweetalert';
//import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
//import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
//import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from '@material-ui/core/Modal';
//import Paper from '@material-ui/core/Paper';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Icon from "@material-ui/core/Icon";
import searchproduct from "assets/img/search-product.png";
import AssignPro from "assets/img/assigned-products.png";
import AssignProduct from "modules/Partners/Partner/views/AssignProduct.jsx";
import ReactTable from "react-table";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import $ from "jquery";
import CustomReactTable from 'modules/Products/Micro/views/Others/InlineFormEdit.jsx';
import { Animated } from "react-animated-css";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});

class SearchAssignProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unupdatedata: [],
            Edit: true,
            columnArray: [
                {
                    Header: "PartnerName",
                    accessor: "partnerName",
                },
                {

                    Header: "AgentNo",
                    accessor: "policyNo",
                },
                {
                    Header: "ProductName",
                    accessor: "productName",

                },
                {
                    Header: "AssignDate",
                    accessor: "policyIssueDate",

                    // InputType: "date"
                },
                {
                    Header: "EffectiveFrom",
                    accessor: "policyStartDate",
                    //InputType: "date"
                },
                {
                    Header: "EffectiveTo",
                    accessor: "policyEndDate",
                    InputType: "datetime"
                }],
            rowtable: "",

            searchassignproductlist: [],
            Assignproductsendlist: [],
            Tableshow: false,
            disabled: false,
            open: false,
            assigndata: "",
            label: "Product Code - Product Name",



        }
    }
    Editopen = () => {
        this.setState({ open: true });
        console.log("officesendlist: ", this.state.officesendlist);

    }
    Viewopen = () => {
        console.log("componentData");
        this.setState({ open: true });
        console.log("officesendlist: ", this.state.officesendlist);
        this.setState({ disabled: true });

    }

    editFunction(id, oid) {
        console.log("pid", oid);
        console.log("searchassignproductlist data", this.state.searchassignproductlist);
        var AssArr = this.state.searchassignproductlist;
        var AssignArr = [];
        $.each(AssArr, function (k, v) {
            if (v.agentId == oid) {
                AssignArr.push(AssArr[id]);
            }
        })
        console.log("OfficeArr", AssignArr);
        this.setState({ Assignproductsendlist: AssignArr });

        const assign = AssignArr[0].agentId;
        //let assigndata=this.state.assigndata;
        this.setState({ assigndata: assign });
        console.log("officesendlist: ", this.state.Assignproductsendlist, this.state.assigndata);

    }

    dataTable = (officelist) => {
        console.log("officelist in react", officelist);
        this.setState({
            searchassignproductlist: officelist.map((prop, key) => {
                return {
                    id: key,
                    //agentId: prop.agentId,
                    partnerName: prop.partnerName,
                    policyNo: prop.policyNo,
                    policyId: prop.policyId,
                    //productIdPk: prop.productIdPk,
                    productName: prop.productName,
                    policyIssueDate: new Date(prop.createdDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    policyStartDate: new Date(prop.policyStartDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    policyEndDate: (this.state.editing == true && key === this.state.rowtable) ? < CustomDatetime labelText="Effective To" id='dtEffectTo' name='effectiveTo' required={true} onChange={(evt) => this.onDateChange('', 'effectiveTo', evt, key)
                    } value={prop.policyEndDate} formControlProps={{ fullWidth: true }
                    } /> : new Date(prop.policyEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', }),
                    //radio: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.agentId)} />
                    // edit: <Button color="warning" id="addproduct" round onClick={this.editRow}>Edit</Button>
                };

            })
        });
        console.log("searchassignproductlist", this.state.searchassignproductlist);
    }


    componentDidMount = () => {

        this.setState({ Tableshow: true });

        if (this.props.partid != "") {

            fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/GetAssignProduct?partnerId=` + this.props.partid, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(" GetAssignProduct", data);

                    this.dataTable(data);
                    // this.setState({ searchassignproductlist: data }); 
                    // console.log("coming GetAssignProduct", this.state.searchassignproductlist);

                });
        }
    }




    removeRow = (deleteRow) => {
        let Row = this.state.searchassignproductlist;
        Row.splice(deleteRow, 1);
        this.setState(Row);
    }

    changeRow = (rowNumber, value) => {
        //debugger;
        let Columns = this.state.searchassignproductlist;
        Columns[rowNumber] = value;
        this.setState(Columns);
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                { /*  <FilterNone /> */}

                                <Icon><img id="icon" src={AssignPro} /></Icon>

                            </CardIcon>
                            <h4 className={this.props.cardIconTitle}>
                                <small> <TranslationContainer translationKey="AssignedProducts" /> </small>
                            </h4>
                        </CardHeader>
                        <CardBody>

                            <GridContainer>


                                {/* <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Partner ID"
                                        // id="partnerNmae"
                                        name="Productid"
                                        //value={this.state.PartnerSearchDTO.partnerid}
                                      //  onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
             
                            <GridItem xs={3} sm={3} md={3}>
            
                    
                                <Button style={{marginTop:'22px'}} color="warning" id="searchProduct" round onClick={this.SearchProductbtn} >Search Assigned Products</Button>
                            </GridItem>
                             */}
                                <div>
                                    {this.state.Tableshow ?
                                        <GridContainer>
                                            <GridItem xs={12}>
                                                <CardBody className="search-asign-product-react-tab">
                                                    <CustomReactTable removeRow={this.removeRow} changeRow={this.changeRow} data={this.state.searchassignproductlist} ColumnArray={this.state.columnArray} Edit={this.state.Edit} />
                                                </CardBody>
                                            </GridItem>
                                        </GridContainer>
                                        : null}
                                </div>
                            </GridContainer>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}
                                style={{
                                    //  'max-height': 'calc(100vh - 210px)',
                                    'overflow-y': 'auto'
                                }}
                            >
                                <AssignProduct entryFlag={true} />
                            </Modal>
                        </CardBody>
                    </Card>
                </Animated>
            </div>
        );
    }
}
export default withStyles(styles)(SearchAssignProduct);