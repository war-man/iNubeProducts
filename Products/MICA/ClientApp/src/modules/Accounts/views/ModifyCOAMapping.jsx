import React from "react";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ModifyViewCOAMapping from "assets/img/ModifyViewCOA-Mapping.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import AccountConfig from "modules/Accounts/AccountConfig.js";
import withStyles from "@material-ui/core/styles/withStyles";
////////////////////
////////////////////
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from '@material-ui/core/Modal';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import validationPage from "./ValidationPage.jsx";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { Animated } from "react-animated-css";
import swal from 'sweetalert';
import ExportToExcel from "components/ExcelExport/ExcelPlugin/ExportToExcel.jsx";
import COAMapping from "modules/Accounts/views/COAMapping.jsx";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png"
import TranslationContainer from "components/Translation/TranslationContainer.jsx";


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

const searchClose = {
    float: "right",
    position: 'relative',
    bottom: "56px",
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}

const paddingCard =
{
    padding: "10px",
}


class ModifyCOAMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                CustomerName: "",
            },
            customerData: [],
            searchData: [],
            newdata: [],
            display: false,
            actnId: "",
            /////New
            flagEdit: false,
            flagEditTypee: false,
            editModal: false,
            open: false,
            visibility: false,
            disabled: false,
            disable: false,
            close: false,
            rowData: {},
            flagUpdate: false,
            flagAccountType: false,
            flagName: "",
            //Loader
            isButtonVisibility: false,
            loader: true,
            pageloader: false,
            nodata: false,
        };
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        fetch(`https://inubeservicesbilling.azurewebsites.net/api/Billing/GetCustomerName`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setTimeout(
                        function () {
                            this.setState({ pageloader: true });
                        }
                            .bind(this),
                        2000
                    );
                    this.setState({ isButtonVisibility: true });
                }
                this.setState({ customerData: data });
                console.log(data);
            });
    }
    handleView = (id) => {
        this.setState({ actnId: id })
        //if (this.state.actnId == "") {
        //    swal("", "Please select the Account to view details", "error")
        //} else {
        this.handleOpen();
        let view = this.state;
        view.disabled = true;
        view.disable = true;
        view.editModal = true;
        view.open = true;
        view.flagEdit = false;
        view.close = false;
        view.visibility = false;
        view.close = false
        view.flagName = "View";
        view.flagUpdate = false;
        view.flagEditTypee = true;
        //For Execel Button
        view.flagExcelButton = true;
        this.setState({ view });
        //}
    };

    handleEdit = (id) => {
        this.setState({ actnId: id })
        //if (this.state.actnId == "") {
        //    swal("", "Please select the Account to edit details", "error")
        //} else {

        this.handleOpen();
        console.log(id)
        let edit = this.state;
        edit.close = false;
        edit.editModal = true;
        edit.visibility = false;
        edit.open = true;
        edit.flagEdit = true;
        edit.disabled = false;
        edit.disable = false;
        edit.close = false;
        edit.flagUpdate = true;
        edit.flagEditTypee = true;
        this.setState({ edit });
        console.log("edit", this.state.editModal);
        edit.flagName = "Modify";
        //For Execel Button
        edit.flagExcelButton = false;

        //}
    };
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    // For Grid
    editFunction(id, pId) {
        document.getElementById("disp");
        this.setState({ actnId: pId })
        console.log("display data: ", this.state.partid, this.state.rowData)
    }

    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    //Deletion of Accounts
    onDelete = (id) => {
        this.setState({ actnId: id })
        //if (this.state.actnId == "") {
        //    swal("", "Please select the Account to delete", "error")
        //}
        //else {
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/DeleteCoaMapping?AccountMapppingId=` + this.state.actnId, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(data => {
            this.onFormSubmit();
            swal({

                text: "Account Id" + this.state.actnId + " Successfully Deleted",
                icon: "success"
            });
        });
        //}
    }

    onFormSubmit = () => {
        if (this.state.fields.CustomerName != "") {
            debugger;
            //this.setState({ display: true });
            this.setState({ display: false, loader: false });
            this.setState({ newdata: [] });
            console.log(this.state.customerData, 'CustomerData');
            const filter = this.state.customerData.filter(item => item.customerName == this.state.fields.CustomerName);
            console.log(filter, 'MyData1');
            if (filter.length > 0) {
                var accountType = filter[0].customerId;
            }
            console.log(accountType, 'MyData');
            var data = {
                'customerId': accountType
            };
            fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/SearchCOAMapping`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    this.setState({ searchData: data });
                    console.log(this.state.searchData, 'SearchData Fields ')

                    if (this.state.searchData.length > 0) {
                        this.setState({ display: true, loader: true });
                        this.setState({
                            newdata: this.state.searchData.map((prop, key) => {
                                return {
                                    MicaAccountCode: prop.micaAccountCode,
                                    MicaAccountType: prop.accountType,
                                    MicaAccountName: prop.accountName,
                                    CustomerAccountCode: prop.refAccountCode,
                                    CustomerAccountName: prop.name,
                                    CustomerAccountDesc: prop.description,
                                    //Select: <input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.accountMappingId)} />,
                                    btn: <div>
                                        <Button color="info" justIcon round simple className="view" onClick={() => this.handleView(prop.accountMappingId)}><Visibility /></Button>
                                        <Button color="info" justIcon round simple className="edit" onClick={() => this.handleEdit(prop.accountMappingId)} editModal={this.state.editModal}><Edit /> </Button>
                                        <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDelete(prop.accountMappingId)} ><Delete /></Button>
                                    </div>
                                };
                            })
                        });
                        console.log(this.state.newdata, 'New Data');
                    }
                    else {
                        setTimeout(
                            function () {
                                this.setState({ loader: true, display: false, nodata: true });
                            }.bind(this), 2000
                        );
                    }
                });
        }
        else {
            swal({
                text: "Customer Name Should Not be Blank",
                icon: "error"
            });
        }
    }
    searchagain = () => {
        this.setState({ nodata: false });
        window.scrollTo(0, 0);

    }



    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.state.pageloader ?
                    <Card >
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Icon><img id="icon" src={ModifyViewCOAMapping} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> <TranslationContainer translationKey="ModifyCOAMapping" /> </small>
                                </h4>
                            }
                        </CardHeader>

                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="CustomerName"
                                        id="CustomerName"
                                        value={this.state.fields.CustomerName}
                                        name='CustomerName'
                                        onChange={this.onInputChange}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={5} sm={3} md={3} lg={1}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <Button id="top-bnt" color="info" round onClick={() => this.onFormSubmit()}>
                                            <TranslationContainer translationKey="Search" />
                          </Button>
                                    </Animated>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>

                    : <PageContentLoader />}

                {this.state.loader ?
                    <GridContainer xl={12}>
                        {this.state.display ?
                            <GridContainer>
                                <GridItem xs={12}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <CardBody className="product-search-tab">
                                            <ReactTable
                                                title={"CHART OF ACCOUNT MAPPING"}
                                                data={this.state.newdata}
                                                filterable
                                                columns={[
                                                    //{
                                                    //    Header: "",
                                                    //    accessor: "Select",
                                                    //    minWidth: 10,
                                                    //    style: { textAlign: "center" },
                                                    //    headerClassName: 'react-table-center',
                                                    //    sortable: false,
                                                    //    filterable: false,
                                                    //    resizable: false,
                                                    //},
                                                    {
                                                        Header: "MICAAccountCode",
                                                        accessor: "MicaAccountCode",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,

                                                    },
                                                    {
                                                        Header: "MICAAccountType",
                                                        accessor: "MicaAccountType",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,

                                                    },
                                                    {
                                                        Header: "MICAAccountName",
                                                        accessor: "MicaAccountName",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "CustomerAccountCode",
                                                        accessor: "CustomerAccountCode",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "CustomerAccountName",
                                                        accessor: "CustomerAccountName",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "CustomerAccountDescription",
                                                        accessor: "CustomerAccountDesc",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "Action",
                                                        accessor: "btn",
                                                        minwidth: 30,
                                                        style: { textalign: "left" },
                                                        headerclassname: 'react-table-center',
                                                        resizable: false,
                                                    }
                                                ]}
                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                                pageSize={([this.state.searchData.length + 1] < 5) ? [this.state.searchData.length + 1] : 5}
                                                showPaginationBottom
                                                className="-striped -highlight"
                                            />
                                        </CardBody>
                                    </Animated>
                                </GridItem>
                                {
                                    //<div className="search-Account-bnt">
                                    //    <Button color="info" round className={classes.marginRight} onClick={this.handleView}>
                                    //        View
                                    //       </Button>
                                    //    <Button color="info" round className={classes.marginRight} onClick={this.handleEdit} editModal={this.state.editModal}>
                                    //        Edit
                                    //       </Button>
                                    //    <Button color="info" round className={classes.marginRight} onClick={() => this.onDelete()} >
                                    //        Delete
                                    //       </Button>
                                    //</div>
                                }
                                <div >

                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}>
                                        <div className={classes.paper} id="modal">
                                            <h4><small className="center-text"> {this.state.flagName} COA Mapping</small></h4>

                                            <Button color="info"
                                                round
                                                className={classes.marginRight}
                                                style={searchClose}
                                                onClick={this.handleClose}>
                                                &times;
                                    </Button>
                                            <div id="disp" >
                                                <COAMapping flagEditTypee={this.state.flagEditTypee} flagUpdate={this.state.flagUpdate} editModal={this.state.editModal} flagEdit={this.state.flagEdit} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} searchAccountMapId={this.state.actnId} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} />
                                            </div>
                                        </div>
                                    </Modal>
                                </div>


                            </GridContainer>
                            : <GridItem lg={12}>{
                                this.state.nodata ?
                                    <Card>
                                        <GridContainer lg={12} justify="center">
                                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                <img src={data_Not_found} className="tab-data-not-found" />
                                            </Animated>
                                        </GridContainer>
                                        <GridContainer lg={12} justify="center">
                                            <GridItem xs={5} sm={3} md={3} lg={1} >
                                                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                                    <Button className="secondary-color" round onClick={() => this.searchagain()}> Try again </Button>
                                                </Animated>
                                            </GridItem>
                                        </GridContainer>
                                    </Card>
                                    : null
                            }
                            </GridItem>
                        }
                    </GridContainer>
                    :
                    <Card style={paddingCard}>
                        <TableContentLoader />
                    </Card>
                }
            </div>
        );
    }
}

export default withStyles(style)(ModifyCOAMapping);