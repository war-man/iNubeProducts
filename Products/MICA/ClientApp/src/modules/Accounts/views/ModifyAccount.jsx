import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ModifyViewAccount from "assets/img/ModifyView-Account.png";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import AccountConfig from "modules/Accounts/AccountConfig.js";
import withStyles from "@material-ui/core/styles/withStyles";
//import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import extendedFormsStyle from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx";
import { Animated } from "react-animated-css";
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import swal from 'sweetalert';
import Visibility from "@material-ui/icons/Visibility";
import $ from 'jquery';
//import Partner from "modules/Partners/Organization/views/CreatePartner.jsx";
import Accounts from "modules/Accounts/views/CreateAccount.jsx";
import validationPage from "./ValidationPage.jsx";
import ExportToExcel from "components/ExcelExport/ExcelPlugin/ExportToExcel.jsx";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import TableContentLoader from "components/Loaders/TableContentLoader.jsx";
import data_Not_found from "assets/img/data-not-found-new.png"

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
//For Switch
const AntSwitch = withStyles(theme => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);


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

class ModifyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                AccountTypeId: "",
                AccountName: "",
                AccountDesc: "",
                AccountCode: "",
            },
            isActive: "",
            accountData: [],
            accountTypeData: [],
            searchData: [],
            newdata: [],
            flagEdit: false,
            display: false,
            actnId: "",
            //NEW 
            flagEditTypee: false,
            editModal: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            visibility: false,
            acntId: "",
            disabled: false,
            disable: false,
            close: false,
            rowData: {},
            flagUpdate: false,
            flagAccountType: false,
            flagExcelButton: false,
            flagName: "",
            AccountNameState: "",
            AccountDescState: "",
            AccountCodeState: "",
            //Loader
            isButtonVisibility: false,
            loader: true,
            pageloader: false,
            nodata: false,
            //For_Excel
            lstSheet: [
                {
                    data: [],
                    sheetName: "ChartsOfAccounts",
                    columnArray: [
                        {
                            Header: "Account Type",
                            accessor: "accountType",
                        },
                        {
                            Header: "Account Name",
                            accessor: "accountName",
                        },
                        {
                            Header: "Account Description",
                            accessor: "accountDesc",
                        },
                        {
                            Header: "Account Code",
                            accessor: "accountCode",
                        },
                        {
                            Header: "CeatedDate",
                            accessor: "createdDate",
                        },
                    ]
                }
            ],

        };
        this.handleEdit = this.handleEdit.bind(this);
    }



    onInputChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    //handleToggle= (evt)  =>{
    //    const { checked } = this.state;
    //    const currentIndex = evt.target.value;
    //    const newChecked = [...checked];

    //    if (currentIndex === -1) {
    //        newChecked.push(evt.target.value);
    //    } else {
    //        newChecked.splice(currentIndex, 1);
    //    }

    //    this.setState({
    //        checked: newChecked
    //    });
    //}; 
    change(event, stateName, type, stateNameEqualTo, maxValue) {
        switch (type) {
            case "string":
                if (validationPage.verifyName(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            case "number":
                if (validationPage.verifyAccountCode(event.target.value)) {
                    this.setState({ [stateName + "State"]: false });
                } else {
                    this.setState({ [stateName + "State"]: true });
                }
                break;
            default:
                break;
        }
    }
    onInputChangeVal = (type, event) => {
        const fields = this.state.fields;
        let name = event.target.name;
        fields[event.target.name] = event.target.value;
        this.setState({ fields });
        this.change(event, name, type);
    };

    componentDidMount() {
        //Accoount Type For Search
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAccountType`, {
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
                this.setState({ accountTypeData: data });
                console.log(data);
            });

        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAllAccountWithType`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ accountData: data });
                console.log(data);
            });
        //Account Details
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/GetAllAccountWithType`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ CheckData: data });
                //For Export to Excel
                this.state.lstSheet[0].data = this.state.CheckData;
                console.log(data);
                console.log(this.state.lstSheet, 'LIST_SHEET')
            });

    }
    handleView = (id) => {
        //TO select particular Account 
        document.getElementById("disp");
        this.setState({ actnId: id })
        //Previus 
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
        //TO select particular Account 
        document.getElementById("disp");
        this.setState({ actnId: id })
        //Previus 
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
    onDisable = (status, id) => {
        debugger
        document.getElementById("disp");
        //Previus 
        if (status == "Y") {
            this.state.isActive = "N";
            var data = {
                'isActive': "N"
            };
            fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/DisableAccount?AccountId=` + id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(data => {
                swal({

                    text: "Successfully Disabled",
                    icon: "success"
                });
                this.onFormSubmit();
                console.log("data save result:", data);
                this.setState({ SavedData: data });
            });
            //}
        }
        else {
            this.state.isActive = "Y";
            var data = {
                'isActive': "Y"
            };
            //if (this.state.actnId == "") {
            //    swal("", "Please select the Account to disable", "error")
            //}
            //else{
            fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/DisableAccount?AccountId=` + id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(data)
            }).then(data => {
                swal({

                    text: "Successfully Enabled",
                    icon: "success"
                });
                this.onFormSubmit();
                console.log("data save result:", data);
                this.setState({ SavedData: data });
            });

        }

    }

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


    onFormSubmit = () => {
        console.log(this.state.fields, 'Fields Value Before')
        debugger;
        //  this.setState({ display: true });
        this.setState({ newdata: [] });
        var accountType = this.state.fields.AccountTypeId;
        var accountCode = parseInt(this.state.fields.AccountCode);
        this.setState({ display: false, loader: false });
        var data = {
            'AccountType': accountType, 'AccountName': this.state.fields.AccountName, 'AccountDesc': this.state.fields.AccountDesc, 'AccountCode': accountCode
        };
        fetch(`${AccountConfig.accountConfigUrl}/api/AccountConfig/SearchAccount`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(sdata => {
                this.state.searchData = sdata;
                this.setState({});
                console.log(sdata, 'SearchData Fields ')

                if (sdata.length > 0) {
                    this.setState({ display: true, loader: true });
                    this.setState({
                        newdata: sdata.map((prop, key) => {

                            return {
                                AccountType: prop.accountType,
                                AccountCode: prop.accountCode,
                                AccountName: prop.accountName,
                                AccountDesc: prop.accountDesc,
                                //Select: < input type="radio" name="product" onClick={this.editFunction.bind(this, key, prop.accountId)} />,
                                btn: <div>
                                    <Button color="info" justIcon round simple className="view" onClick={() => this.handleView(prop.accountId)}><Visibility /></Button>
                                    <Button color="info" justIcon round simple className="edit" onClick={() => this.handleEdit(prop.accountId)} editModal={this.state.editModal}><Edit /> </Button>
                                </div>,
                                status: <div>
                                    {
                                        (prop.isActive == "Y") ?
                                            (
                                                < Tooltip title="Activate" placement="bottom" arrow >
                                                    <Switch checked={true} color="primary" onClick={() => this.onDisable(prop.isActive, prop.accountId)} />
                                                </Tooltip >
                                            )
                                            :
                                            (
                                                < Tooltip title="Deactivate" placement="bottom" arrow >
                                                    <Switch checked={false} color="primary" onClick={() => this.onDisable(prop.isActive, prop.accountId)} />
                                                </Tooltip >
                                            )
                                    }
                                </div>
                            };
                        })
                    });
                    console.log(this.state.newdata, 'New Data');
                } else {
                    setTimeout(
                        function () {
                            this.setState({ loader: true, display: false, nodata: true });
                        }.bind(this), 2000
                    );
                }
            });
        //Resetting Error Success Value
        this.state.AccountDescState = "";
        this.state.AccountNameState = "";
        this.state.AccountCodeState = "";
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
                                <Icon><img id="icon" src={ModifyViewAccount} /></Icon>
                            </CardIcon>
                            {
                                <h4 >
                                    <small> Modify/View Account </small>
                                </h4>
                            }
                        </CardHeader>

                        <CardBody>
                            <GridContainer>
                                {//<GridItem xs={12} sm={12} md={4}>
                                    //    <FormControlLabel
                                    //        control={
                                    //            <Checkbox
                                    //                tabIndex={-1}
                                    //                onClick={() => this.handleToggle}
                                    //                checkedIcon={<Check className={classes.checkedIcon} />}
                                    //                icon={<Check className={classes.uncheckedIcon} />}
                                    //                classes={{
                                    //                    checked: classes.checked,
                                    //                    root: classes.checkRoot
                                    //                }}
                                    //            />
                                    //        }
                                    //        classes={{
                                    //            label: classes.label
                                    //        }}
                                    //        label="Search All"
                                    //    />
                                    //</GridItem>
                                }
                            </GridContainer>
                            <GridContainer>

                                <GridItem xs={12} sm={12} md={3}>
                                    <FormControl
                                        fullWidth
                                        className={classes.selectFormControl}
                                    >
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}
                                        >
                                            Account Type
                          </InputLabel>
                                        <Select
                                            value={this.state.fields.AccountTypeId}
                                            onChange={this.onInputChange}
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            inputProps={{
                                                name: "AccountTypeId",
                                                id: "simple-select"
                                            }}
                                        >
                                            {
                                                this.state.accountTypeData.map(item =>
                                                    <MenuItem
                                                        value={item.accountType}
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                    >
                                                        {item.accountType}
                                                    </MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </GridItem>

                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Account Code"
                                        id="AccountCode"
                                        value={this.state.fields.AccountCode}
                                        error={this.state.AccountCodeState}
                                        name='AccountCode'
                                        onChange={(event) => this.onInputChangeVal("number", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Account Name"
                                        id="AccountName"
                                        value={this.state.fields.AccountName}
                                        error={this.state.AccountNameState}
                                        name='AccountName'
                                        onChange={(event) => this.onInputChangeVal("string", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Account Description"
                                        id="AccountDesc"
                                        value={this.state.fields.AccountDesc}
                                        error={this.state.AccountDescState}
                                        name='AccountDesc'
                                        onChange={(event) => this.onInputChangeVal("string", event)}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>

                            </GridContainer>
                            <GridContainer lg={12} justify="center">
                                <GridItem xs={5} sm={3} md={3} lg={1}>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        <Button id="button-search-partner" color="info" round onClick={() => this.onFormSubmit()}>
                                            Search
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
                                                title={"Chart of Accounts"}
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
                                                        Header: "Account Type",
                                                        accessor: "AccountType",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,

                                                    },
                                                    {
                                                        Header: "Account Code",
                                                        accessor: "AccountCode",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,

                                                    },
                                                    {
                                                        Header: "Account Name",
                                                        accessor: "AccountName",
                                                        minWidth: 30,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "Account Description",
                                                        accessor: "AccountDesc",
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
                                                    },
                                                    {
                                                        Header: "Status",
                                                        accessor: "status",
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
                                    //    <Button color="info" round className={classes.marginRight} onClick={() => this.onDisable()} >
                                    //        Disable
                                    //       </Button>
                                    //    <GridContainer justify="center">
                                    //        <GridItem >
                                    //            <ExportToExcel lstSheet={this.state.lstSheet} />
                                    //        </GridItem>
                                    //    </GridContainer>
                                    //</div>
                                }
                                <div >

                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.open}
                                        onClose={this.handleClose}>
                                        <div className={classes.paper} id="modal">
                                            <h4><small className="center-text"> {this.state.flagName} Account</small></h4>

                                            <Button color="info"
                                                round
                                                className={classes.marginRight}
                                                style={searchClose}
                                                onClick={this.handleClose}>
                                                &times;
                                                        </Button>
                                            <div id="disp" >
                                                <Accounts flagEditTypee={this.state.flagEditTypee} flagExcelButton={this.state.flagExcelButton} flagAccountType={this.state.flagAccountType} flagUpdate={this.state.flagUpdate} editModal={this.state.editModal} flagEdit={this.state.flagEdit} disable={this.state.disable} handleClose={this.handleClose} open={this.state.open} close={this.state.close} disabled={this.state.disabled} searchAccountId={this.state.actnId} btnvisibility={this.state.btnvisibility} displaybtn={!this.state.disabled} visibility={this.state.visibility} />
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

export default withStyles(style)(ModifyAccount);