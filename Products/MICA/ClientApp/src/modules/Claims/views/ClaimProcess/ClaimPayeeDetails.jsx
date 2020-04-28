import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomerBankDetails from "modules/Claims/views/ClaimProcess/CustomerBankDetails.json";
import BankdetailsFields from "modules/Claims/views/ClaimProcess/BankdetailsFields.json";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import CustomDateTimePicker from "components/CustomDateTimePicker/DateTimePicker.jsx";
import ClaimConfig from "modules/Claims/ClaimConfig.js";
import validationPage from "modules/Claims/views/ValidationPage.jsx";

class ClaimPayeeDetails extends React.Component {
    constructor(props) {
        super(props);
        console.log("BankDetails coming",this.props);
        this.state = {
            claimManagerRemarksState:"",
            fields: this.props.claimDetailsprops.fields,
          
            claimid: this.props.claimDetailsprops.claimid,
            AccountTypedata:[],
            displaycust: false,
            BankDataModelDTO: this.props.claimDetailsprops.BankDataModelDTO,
            Bankarray:this.props.claimDetailsprops.OtherClaimBankDetails,
            BankDetails: {},
            Bankdata: {
                "Customer": {
                    "type": "",
                    "Bank Name": "",
                    "Account Holder Name": "",
                    "Account No.": "",
                    "Account Type": "",
                    "IFSC Code": "",
                    "Bank Branch Address": "",
                    "Amount Paid": "",
                    "Date Of Payment": "",
                }
            },
            Bankdata1: {
                "type": "",
                "Bank Name": "",
                "Account Holder Name": "",
                "Account No.": "",
                "Account Type": "",
                "IFSC Code": "",
                "Bank Branch Address": "",
                "Amount Paid": "",
                "Date Of Payment": "",
            },
        }
    };

    componentDidMount() {
        let accounttype = "Account Type";
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/GetMasterData?sMasterlist=` + accounttype + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ AccountTypedata: data });

                console.log("AccountTypedata", data);
            });



        this.setState({ Bankfieldsmodel: BankdetailsFields });

        //let datamodel = this.state.BankDataModelDTO;
        //datamodel["Workshop"] = {};
        //datamodel["Customer"] = {};
        //datamodel["Financier"] = {};
        //datamodel["Nominee"] = {};
        //datamodel["Surveyor"] = {};
        //this.setState({ datamodel });

        console.log("datamodel ", this.state.claimid);
        this.handleBankdetails(this.state.claimid);
        console.log("Bankarray", this.state.Bankarray, this.props.claimDetailsprops.OtherClaimBankDetails);
    }

  
    handleCheckbox = (event, name, i) => {
        this.props.claimDetailsFun.handleCheckboxUpdate(event, name, i);
        let element = this.state.Bankarray;
        if (event.target.checked == true) {
            if (name != "Customer") {
                this.state.Bankdata1.type = name;
                this.state.BankDataModelDTO[name] = Object.assign(this.state.BankDataModelDTO[name], this.state.Bankdata1);
                let Bankelement = {};
                let array = [];
                Bankelement.name = name;
                //Bankelement.BankDetails = [...array, ...BankdetailsFields];
                Bankelement.BankDetails = JSON.parse(JSON.stringify(BankdetailsFields));
                element.push(Bankelement);
            }
            else {
                this.oncustomerselect();
                //this.state.BankDataModelDTO[name] = this.state.Bankdata.Customer;
                this.setState({ displaycust: true });
                let CustBankelement = {};
                CustBankelement.name = name;
                CustBankelement.BankDetails = CustomerBankDetails;
                element.push(CustBankelement);
            }
            console.log("Bankarray: ", this.state.Bankarray);
        }
        if (event.target.checked == false) {
            let empty = {};
            //this.state.BankDataModelDTO[name] = Object.assign(this.state.BankDataModelDTO[name], empty);
            this.state.BankDataModelDTO[name] = empty;
            let index = element.findIndex(e => e.name == name);
            element.splice(index, 1);
            console.log("Bankarray: ", element);
        }
        this.setState({ element });
        console.log("BankDataModelDTO: ", this.state.BankDataModelDTO);
    }


    oncustomerselect = () => {
        let bank = this.state.BankDataModelDTO;
        let bankdata = this.state.Bankdata.Customer;
        let cbank = this.state.BankDetails;
        let jsondata = CustomerBankDetails;

        bankdata["Account Holder Name"] = cbank.accountHolderName;
        bankdata["Account No."] = cbank.accountNumber;
        bankdata["Account Type"] = cbank.accountType;
        bankdata["Bank Name"] = cbank.bankName;
        bankdata["IFSC Code"] = cbank.ifsccode;
        bankdata["Bank Branch Address"] = cbank.bankBranchAddress;
        bankdata.type = "Customer";

        jsondata[0].Value = cbank.accountHolderName;
        jsondata[1].Value = cbank.accountNumber;
        jsondata[2].Value = cbank.accountType;
        jsondata[3].Value = cbank.bankName;
        jsondata[4].Value = cbank.ifsccode;
        jsondata[5].Value = cbank.bankBranchAddress;

        bank["Customer"] = bankdata;

        this.setState({ bankdata, jsondata, bank });
        console.log("bankdata: ", CustomerBankDetails);
    }
    handleBankdetails = (id) => {
        let that = this;
        fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchClaimBankDetails?claimid=` + id + ``, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Response data', data);
            that.setState({ BankDetails: data });
            console.log('Response bank data', that.state.BankDetails);
        });
    }

      renderPage = (Bankfieldsmodel, name) => {

        if (Bankfieldsmodel.UIControl == "TextField") {

            return (<CustomInput
                labelText={Bankfieldsmodel.Name}
                //  required={true}
                name={Bankfieldsmodel.Name}
                // value={Bankfieldsmodel.Value}
                onChange={(e) => this.onModelChange(e, name)}
                formControlProps={{ fullWidth: true }}
            />

            );


        } else if (Bankfieldsmodel.UIControl == "AccountNumber") {
            return (<CustomInput
                labelText={Bankfieldsmodel.Name}
                //  required={true}
                error={Bankfieldsmodel.Validation}
                inputType="number"
                name={Bankfieldsmodel.Name}
                value={Bankfieldsmodel.Value}
                onChange={(e) => this.onModelChange(e, name)}
                formControlProps={{ fullWidth: true }}
            />

            );


        }
        else if (Bankfieldsmodel.UIControl == "Datetime") {

            return (
                < CustomDateTimePicker
                    timeformate={true}
                    disabled={false}
                    width='13rem'
                    //required={true}
                    disableFuture={true}
                    minDate={this.props.claimDetailsprops.ClaimIntemationDate}
                    maxDate={new Date()}
                    labelText={Bankfieldsmodel.Name}
                    name={Bankfieldsmodel.Name}
                    value={Bankfieldsmodel.Value}
                    onChange={(event) => this.onDateChange('datetime', "Bankfieldsmodel", Bankfieldsmodel.Name, name, event)} />
            );
        }

        else if (Bankfieldsmodel.UIControl == "Dropdown") {

            return (
                <MasterDropdown
                    // required={true}
                    labelText={Bankfieldsmodel.Name}
                    // id="Type"
                    lstObject={this.state.AccountTypedata}
                    filterName='Account Type'
                    //value={Bankfieldsmodel.Value}
                    name={Bankfieldsmodel.Name}
                    onChange={(e) => this.onModelChange(e, name)}
                    formControlProps={{ fullWidth: true }}
                />

            );


        }

    }

    renderPage1 = (Bankfieldsmodel, name) => {
        if (Bankfieldsmodel.UIControl == "TextField") {
            return (<CustomInput
                labelText={Bankfieldsmodel.Name}
                error={Bankfieldsmodel.Validation}
                //  required={true}
                name={Bankfieldsmodel.Name}
                value={Bankfieldsmodel.Value}
                onChange={(e) => this.onModelChange(e, name)}
                formControlProps={{ fullWidth: true }}
            />

            );


        } else if (Bankfieldsmodel.UIControl == "AccountNumber") {
            return (<CustomInput
                labelText={Bankfieldsmodel.Name}
                //  required={true}
                inputType="number"
                name={Bankfieldsmodel.Name}
                value={Bankfieldsmodel.Value}
                onChange={(e) => this.onModelChange(e, name)}
                formControlProps={{ fullWidth: true }}
            />

            );


        }
        else if (Bankfieldsmodel.UIControl == "Datetime") {
            return (
                < CustomDateTimePicker
                    timeformate={true}
                    disabled={false}
                    width='13rem'
                    //required={true}
                    minDate={this.props.claimDetailsprops.ClaimIntemationDate}
                    maxDate={new Date()}
                    //minDate={new Date(this.state.claimDetailsData.lossDate)}
                    disableFuture={true}
                    labelText={Bankfieldsmodel.Name}
                    name={Bankfieldsmodel.Name}
                    value={Bankfieldsmodel.Value}
                    onChange={(event) => this.onDateChange('datetime', "Bankfieldsmodel", Bankfieldsmodel.Name, name, event)
                    } />
            );
        }
        else if (Bankfieldsmodel.UIControl == "Dropdown") {

            return (
                <MasterDropdown
                    // required={true}
                    labelText={Bankfieldsmodel.Name}
                    // id="Type"
                    lstObject={this.state.AccountTypedata}
                    filterName='Account Type'
                    value={Bankfieldsmodel.Value}
                    name={Bankfieldsmodel.Name}
                    onChange={(e) => this.onModelChange(e, name)}
                    formControlProps={{ fullWidth: true }}
                />

            );


        }

    }

    onModelChange = (evt, name) => {
        let BankDataModelDTO = this.state.BankDataModelDTO;
        let data = BankDataModelDTO[name];
        data.type = name;
        data[evt.target.name] = evt.target.value;
     
        let bank = this.state.Bankarray;
        let index = bank.findIndex(e => e.name == name);
        let bankvalue = bank[index].BankDetails.filter(a => a.Name == evt.target.name)
        bankvalue[0].Value = evt.target.value;
        bankvalue[0].Validation=this.Validation(evt,bankvalue[0].ValidationType);
        this.setState({ bank });
      
        this.setState({  data, BankDataModelDTO });
       
    };
    onDateChange = (formate, type, name, objname, event) => {
        const { validdate } = this.state;
        this.setState({ validdate: false });
       
        //var today = event.toDate();
        //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var today = event.toDate();
        // var date = today.toISOString();
        var date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

        //const ClaimDataDTO = this.state.ClaimDTO;
        //ClaimDataDTO[name] = date;
        //this.setState({ ClaimDataDTO });

        let BankDataModelDTO = this.state.BankDataModelDTO;
        let data = BankDataModelDTO[objname];
        data[name] = date;

        //if (objname == "Customer") {
        let bank = this.state.Bankarray;
        let index = bank.findIndex(e => e.name == objname);
        let bankvalue = bank[index].BankDetails.filter(a => a.Name == name)
        bankvalue[0].Value = date;
        this.setState({ bank });
        //}

        this.setState({ data });

       // this.Validation(event, name, formate, date, type);

    };
    //handleBankdetails = (id) => {
    //    let that = this;
    //    fetch(`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/SearchClaimBankDetails?claimid=` + id + ``, {
    //        method: 'Get',
    //        headers: {
    //            'Accept': 'application/json',
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
    //        },
    //    }).then(function (response) {
    //        return response.json();
    //    }).then(function (data) {
    //        console.log('Response data', data);
    //        that.setState({ BankDetails: data });
    //        console.log('Response bank data', that.state.BankDetails);
    //    });
    //}

    Validation(event,type) {

        switch (type) {
         

           
            case "IFSC Code":
                if (validationPage.verifyBankifsc(event.target.value)) {

                    return false;
                } else {
                    return true;
                }
                break;

            case "lossDateTime":
                if (validationPage.verifydatetime(event.toDate())) {
                    return false;
                } else {
                    return true;
                }
                break;
            
            default:
                break;
        }
    }


    onInputParamChange = (type, evt) => {

        let fields = this.state.fields;
        let name = evt.target.name;
        let value = evt.target.value;
        fields[name] = value;

        this.setState({ fields });

       // this.change(evt, name, type);
    };
    onInternalFormSubmit = () => {
      
        this.props.claimDetailsFun.internalCallFormSubmit(this.state.fields);
    }

    render() {
       
       
        const { classes } = this.props;
        return (
            <div>
         

            <GridContainer>
                <h4>Payment Details</h4>
            </GridContainer>
            <GridContainer>
                <GridContainer>
                    <h6 className="payeetxttransform">Select Payee</h6>
                </GridContainer>
                    <GridContainer>
                        {this.props.claimDetailsprops.ProductClaimData.length>0?this.props.claimDetailsprops.ProductClaimData.map((item, i) =>
                        <GridItem xs={12} sm={4} md={3} className="downlevel">
                            <CustomCheckbox key={i}
                                name={item.inputType}
                                labelText={item.inputType}
                                value={item.mIsRequired}
                                checked={item.mIsRequired}
                                // onChange={(e) => claimDetailsprops.SetRiskClaimsDetailsValue('Claim Process', e)}
                                onChange={(e) => this.handleCheckbox(e, item.inputType, i)}
                                disabled={(item.disable == true) ? true : null}
                                formControlProps={{
                                    fullWidth: true
                                }} />
                        </GridItem>
                    ):null}
                </GridContainer>
            </GridContainer>
            <div>
                {this.state.Bankarray.length > 0 ?
                    <GridContainer>
                        {this.state.Bankarray.map((item, key) =>
                            <GridContainer >
                                {this.state.displaycust == true ?
                                    <GridContainer lg={12}>
                                        <GridContainer lg={12}>
                                            <GridItem lg={12}>
                                                <CardHeader color="info" icon >
                                                    {
                                                        <h3 >
                                                            <small> {item.name}&nbsp;<TranslationContainer translationKey="BankDetails" /></small>
                                                        </h3>
                                                    }
                                                </CardHeader>
                                            </GridItem>
                                        </GridContainer>

                                        {
                                            item.BankDetails.map(m =>
                                                <GridItem xs={8} sm={5} md={3}>
                                                    {this.renderPage1(m, item.name)}

                                                </GridItem>
                                            )
                                        }
                                    </GridContainer>
                                    :
                                    <GridContainer lg={12}>
                                        <GridContainer lg={12}>
                                            <GridItem lg={12}>
                                                <CardHeader color="info" icon >
                                                    {
                                                        <h3 >
                                                            <small> {item.name}&nbsp;<TranslationContainer translationKey="BankDetails" /></small>
                                                        </h3>
                                                    }
                                                </CardHeader>
                                            </GridItem>
                                        </GridContainer>

                                        {
                                            item.BankDetails.map(m =>
                                                <GridItem xs={8} sm={5} md={3}>
                                                    {this.renderPage1(m, item.name)}

                                                </GridItem>
                                            )
                                        }
                                    </GridContainer>
                                }

                            </GridContainer>
                        )}
                    </GridContainer>
                    : null}


                </div >
                <div>
                    {this.props.claimDetailsprops.approved &&
                        <GridContainer>
                            <CardHeader color="info" icon >
                                {
                                    <h3 >
                                        <small><TranslationContainer translationKey="ApproversRemark" /></small>
                                    </h3>
                                }
                            </CardHeader>
                            <GridContainer lg={12}>
                                <GridItem xs={12} sm={4} md={3}>

                                    <MasterDropdown
                                        // success={props.claimStatusIdState === "success"}
                                        error={this.state.claimStatusIdState}
                                        labelText="ClaimStatus"
                                        id="ddlstatus"
                                        lstObject={this.props.claimDetailsprops.ClaimStatusData}
                                        filterName='Claim Status'
                                        required={true}
                                        value={this.state.fields.claimStatusId}
                                        name='claimStatusId'
                                        onChange={(evt) => this.onInputParamChange("claimStatusId", evt)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                {this.props.claimDetailsprops.errormessage && (this.state.fields.claimStatusId == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                {this.props.claimDetailsprops.claimstatusflag && (this.state.fields.claimStatusId == "") ? <p className="error"> </p> : null}

                                </GridItem>

                                {/* <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                            success={props.approvedClaimAmountState === "success"}
                            error={props.approvedClaimAmountState === "error"}
                            labelText="Approved Claim Amount"
                            required={true}
                            value={props.fields.approvedClaimAmount}
                            name="approvedClaimAmount"
                            onChange={(evt) => props.onInputParamChange("approvedClaimAmount", evt)}
                            inputProps={{
                                //type: "number"
                            }}
                            formControlProps={{ fullWidth: true }} />
                    </GridItem>
                    */}

                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        // success={props.claimManagerRemarksState === "success"}
                                        error={this.state.claimManagerRemarksState}
                                        labelText="ManagerRemarks"
                                        required={true}
                                        multiline={true}
                                        value={this.state.fields.claimManagerRemarks}
                                        name="claimManagerRemarks"
                                        onChange={(evt) => this.onInputParamChange("claimManagerRemarks", evt)}
                                        inputProps={{
                                            //type: "number"
                                        }}
                                        formControlProps={{ fullWidth: true }} />
                                {this.props.claimDetailsprops.errormessage && (this.state.fields.claimManagerRemarks == "" || this.state.fields.claimManagerRemarks ==null) ? <p className="error">*Required field cannot be left blank</p> : null}

                                {this.props.claimDetailsprops.claimsremarksflag && (this.state.fields.claimManagerRemarks == "" || this.state.fields.claimManagerRemarks == null) ? <p className="error"> </p> : null}
                                </GridItem>

                                <GridContainer lg={12} justify="center">
                                    <GridItem xs={5} sm={3} md={3} lg={1}>
                                        <Button color="info" round onClick={() => this.onInternalFormSubmit()}>
                                            <TranslationContainer translationKey="Submit" />
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                            </GridContainer>
                        </GridContainer>
                    }

                </div>
                </div>
                              );
}
}

export default ClaimPayeeDetails;
