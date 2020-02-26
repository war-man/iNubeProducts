import Icon from "@material-ui/core/Icon";
//import validationFormsStyle from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.jsx";
//import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from '@material-ui/core/Modal';
//import swal from 'sweetalert';
//import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Edit from "@material-ui/icons/Edit";
import AssignPro from "assets/img/assigned-products.png";
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
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import $ from "jquery";
import CommonMessage from "Messages/CommonMessage.jsx";
import AssignProduct from "modules/Partners/Partner/views/AssignProduct.jsx";
import partnerconfig from "modules/Partners/PartnerConfig.js";
import React from "react";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
//import SearchProduct from "modules/Partners/Partner/views/_SearchProduct.jsx";
//import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
//import bindModel from 'components/ModelBinding/bindModel.js';
import Button from "../../../../components/CustomButtons/Button";
//import CustomReactTable from 'modules/Products/Micro/views/Others/InlineFormEdit.jsx';
import CustomReactTable from './AssignProductTable.jsx';

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
            dateFlag: true,
            temp:[],
            assignProductList:[],
            flag:false,
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

    dataTable = () => {
        debugger;
        console.log("officelist in react", this.state.assignProductList);
        this.setState({
            searchassignproductlist: this.state.assignProductList.map((prop, key) => {
                console.log("key", key)
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
                    policyEndDate: (this.state.editing == true && key === this.state.rowtable) ?
                        < CustomDatetime
                          //  onFocus={this.state.onClick}
                            labelText="Effective To"
                            id='policyEndDate'
                            name='policyEndDate'
                            required={true}
                            onChange={(evt) => this.onDateChange('datetime', 'policyEndDate', evt, key)}
                            value={(((this.state.dateFlag == true) || (this.state.rowtable!=key) ) ? new Date(prop.policyEndDate) : prop.policyEndDate)}
                            formControlProps={{ fullWidth: true }}
                        /> :
                        ((this.state.dateFlag == true) ? new Date(prop.policyEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : prop.policyEndDate),//prop.policyEndDate.split('T')[0]-->to remove time
                    btn: <div>
                      
                            {!this.state.flag && <div>
                                <Button color="info" justIcon round simple className="edit" onClick={(e) => this.handleEdit(e, key)}><Edit /></Button>
                            {/* <Button color="danger" justIcon round simple className="edit" ><Delete /></Button>*/}
                            </div>
                            }     
                        {this.state.flag && <div>
                            <Button color="info" justIcon round simple className="edit" onClick={(e) => this.handleSave(e, key)}><Check /></Button>
                            <Button color="danger" justIcon round simple className="edit" onClick={(e) => this.handleDiscard(e, key)} ><Close /></Button>
                        </div>
                        }
                    </div>
                };

            })
        });
        console.log("searchassignproductlist", this.state.searchassignproductlist);
    }

    onFormUpdate = (pid,eDate) => {
        var data = {
            'policyEndDate': eDate
            };
            fetch(`${partnerconfig.partnerconfigUrl}/api/Partner/EditAssignProductDate?PolicyId=` + pid, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    var msg = CommonMessage(data.messageKey, [])

                swal({
                    //text: data.responseMessage,
                    text: msg,
                    icon: "success"
                });
                console.log("data save result:", data.responseMessage);
                this.setState({ SavedData: data });
            });
    }

    datechange = (date) => {
        const _date = date.split('/');
        const dateObj = { month: _date[1], year: _date[2], day: _date[0] };
        return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    }

    onDateChange = (formate, name, event, key) => {
        debugger;
        console.log("event:", event);
        this.setState({ dateFlag: false });
        var today = event.toDate();
        
        let date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
     
        if (today.getDate() < 10) {
            var dt = '0' + today.getDate();
        }
        else {
            var dt = today.getDate();
        }
        if (today.getMonth() < 10) {
            var mm = '0' + (today.getMonth() + 1)
        }
        else {
            var mm = (today.getMonth() + 1);
        }
        var dateNew = dt + '/' + mm + '/' + today.getFullYear();
        this.state.searchassignproductlist[key][name] = dateNew;
        var date2 = new Date();
        var date1 = new Date(today);
        let state = this.state.assignProductList[key];
        state[name] = dateNew;
        this.setState({ state });
    };

    handleSave = (e, index) => {
        this.state.searchassignproductlist[index] = this.state.temp;
        this.state.dateFlag = true;//Based on button clicks for different rows
        this.state.flag = false;
        this.state.editing = false;//to get back edit and delete buttons
      
        this.state.assignProductList[index].policyEndDate = this.datechange(this.state.assignProductList[index].policyEndDate);//date conversion--should not modify other row dates, while modifying one
        this.dataTable();

        this.onFormUpdate(this.state.assignProductList[index].policyId, this.state.assignProductList[index].policyEndDate);
         
    }
    handleEdit = (e, index) => {
        console.log("check data", this.state.assignProductList[index], this.state.searchassignproductlist[index]);
        this.setState({ dateFlag: false });

        var sData = this.state.searchassignproductlist[index];
        this.state.temp.push(sData);
        this.dataTable();

        this.state.rowtable = index;
        this.state.flag = true;
        this.state.editing = true;
        this.dataTable();

        console.log("date check", this.state.searchassignproductlist, index, this.state.temp);
    }

    handleDiscard = (e, index) => {
        debugger
        this.state.assignProductList[index].policyEndDate = this.datechange(this.state.temp[index].policyEndDate);//to get old dates after discarding
        console.log("modified", this.state.assignProductList[index].policyEndDate, this.state.temp[index].policyEndDate);

        this.state.flag = false;
        this.state.dateFlag = true;
        this.state.editing = false;//to get back edit and delete buttons
        this.dataTable();
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
                    this.setState({ assignProductList:data});
                    this.dataTable();
                });
        }
    }




    removeRow = (deleteRow) => {
        let Row = this.state.searchassignproductlist;
        Row.splice(deleteRow, 1);
        this.setState(Row);
    }

    changeRow = (rowNumber, value) => {
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