import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProductBasic from "./_ProductBasic.jsx";
import ProductDetails from "./_ProductDetails"

import ProductSave from "./_ProductSave.jsx";
import $ from 'jquery';


import PageContentLoader from "components/Loaders/PageContentLoader.jsx";
import validationPage from "modules/Partners/Organization/views/ValidationPage.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import productConfig from 'modules/Products/Micro/ProductConfig.js';
import swal from 'sweetalert';

import Button from "components/CustomButtons/Button.jsx";
import { Redirect } from 'react-router-dom';
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Close from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/AddCircleOutline";
import Delete from "@material-ui/icons/Delete";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";

import MyUploader from "modules/Products/Micro/views/Document.jsx";

class ProductConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            pageloader: false,
            CEFvalueDisable: false,
            maxbenefitAmount: "",
            maxBenefitValue: "",
            minBenefitAmount: "",
            premiumerror: false,
            maxbenefiterror: false,
            maxbenefitinputdisable: false,
            benefitinputdisable: false,
            ValidationUI: true,
            nonedit: false,
            search: false,
            chdroplist: [],
            maxchlen: 0,
            chindex: -1,
            chlistarray: [],
            newmasterlist: [],
            effdate: [],
            channelstableData: [],
            Columns: [
                {
                    brokage: "",
                    effectiveFrom: "",
                    effectiveTo: "",
                    selectType: "",

                }],
            errormessage: false,
            viewdisable: false,
            inputdisabled: false,
            //btnhide:true,
            btnhide: true,
            disabled: true,
            benifittabledata: [],
            boolValue: false,
            tabledata: [],
            redirect: false,
            arraylist: [],
            validdate: true,
            productName: "",
            productNameState: "",
            productCode: "",
            productCodeState: "",
            LineofState: "",
            ClassofState: "",
            activeFrom: "",
            activeFromState: "",
            activeTo: "",
            activeToState: "",
            ProductstatusState: "",
            datetime: "",
            datetimeState: "",
            productStatusId: "",
            productStatusIdState: "error",
            validTo: 0,
            datediff: 1,
            benefitCriteriaValue: "",
            benefitCriteriaValueState: "",
            premiumAmount: "",
            premiumAmountState: "",

            servermessage: "",
            message: false,
            simpleSelect: "",
            desgin: false,
            code: false,
            develop: false,
            open: false,
            mshow: false,
            opendescription: false,
            topics: [],
            lob: "",
            show: false,
            dflag: false,
            floatFlag: false,
            ctable: false,
            masterList: [],
            dateVal: "",
            ProductReset: {},
            BeniftDTO: {
                coverEventFactorValueTo: "",
            },
            productBenefit:
            {
                "currencyId": "",
                "benefitId": 0,
                "productId": "",
                "benefitTypeId": "",
                "benefitAmount": "",
                "benefitCriteria": "",
                "benefitCriteriaValue": "",
                "maxBenefitAmount": "",
                "singleValue": true,
                "benifitRangeDetails": []
            },
            benifitRangeDetails: [
                {
                    // "benefitRangeId": 0,
                    //"benifitId": 0,
                    "fromValue": "",
                    "toValue": "",
                    "benefitAmount": ""
                }
            ],
            benifitrange: [{
                "benefitRangeId": 0,
                "benifitId": 0,
                "fromValue": "",
                "toValue": "",
                "benefitAmount": ""
            }],
            productChannel: [
                {
                    //"channelId": 0,
                    //"channelName": "",
                    //"productId": "",
                    "channelTypeId": "",
                    "effectiveFrom": "",
                    "effectiveTo": "",
                    "brokage": "",
                    //"channelType": "",
                    //"productName": ""
                }],
            productClausesWarrentiesExclusion: [],
            productinsurelist: [],
            productCover:
            {
                "coverId": 0,
                "productId": 0,
                "coverTypeId": "",
                "coverDescription": "",
                "singleValue": true,
                "coverEventFactorValueFrom": "",
                "coverEventFactorValueTo": "",
                "maximumBenefitAmount": 0,
                "coverEventId": "",
                "coverEventFactorId": "",
                "coverEventFactorValueUnitId": "",
                "singleValueSelected": 0,
                "channelId": "",
                "cweid": "",
                "effectiveFrom": "",
                "effectiveTo": "",
                "productPremium": [],
                "productBenefits": [],
            },
            productInsurableItem:
            {
                "insurableItemId": 0,
                "productId": 0,
                "insurableItemTypeId": "",
                "insurableCategoryId": "",
                "productCovers": [],
            },
            productRcbdetail:
            {
                "rcbdetailsId": 0,
                "productId": "",
                "productPolicyInputId": 0,
                "inputType": "",
                "isReqired": 0,
                "product": "",
                "productPolicyInput": ""
            },
            cvalue: [],
            cmvalue: [],
            CustomClause: {
                "cweid": 0,
                "cwetypeId": "",
                "productId": "",
                "typeName": "",
                "description": "",
                "isPrint": false,
                "label": "",
                "cwetypes": ""

            },
            masClausesWarrentiesExclusionsDTO:
            {
                "cweid": 0,
                "lobid": 0,
                "cweTypeID": 0,
                "typeName": "",
                "Label": "",
                "description": "",
                "isActive": "",
                "createdBy": 0,
                "createdDate": 0,
                "modifyBy": 0,
                "modifyDate": 0
            },
            productPremium:
            {
                "productId": 0,
                "premiumAmount": "",
                "currencyId": "",
                "levelId": 51,
                "subLevelId": 0,
            },
            ProductDTO: {
                "productId": 0,
                "lobid": "",
                isSingleCover: false,
                "Selection": false,
                "productName": "",
                "productCode": "",
                "activeFrom": "",
                "activeTo": "",
                "premiumAmount": "",
                "createdBy": 0,
                "createdDate": "",
                "modifyBy": 0,
                "modifyDate": "",
                "cobid": "",
                "coverId": "",
                "benefitCriteriaId": "",
                "benefitAmount": "",
                "coverEventId": "",
                "productStatusId": "",
                "currencyId": "",
                // "productBenefits": [],
                "productChannels": [],
                "productClausesWarrentiesExclusions": [],
                //  "productCovers": [],
                "productInsurableItems": [],
                "productRcbdetails": [],
                "riskDetails": [],
                "claimDetails": [],
                "tblmasClausesWarrentiesExclusions": [],
                "productPremium": []
            },
            description: "",
            indexRow: 0,
            clauseName: "",
            cwe: [],
            value: [],
            mvalue: [],
            prodchan: [],
            clauses: [],
            MasterDTO: {
                LOB: [],
                COB: [],
                Cover: [],
                CoverEvent: [],
                CoverEventFactor: [],
                CoverEventFactorValue: [],
                InsuranceType: [],
                InsurableCategory: [],
                Risk: [],
                Claim: [],
                channel: [],
                BenefitCriteria: []
            },
            visible: false,

        };
        this.ProductDetails = {
            "ProductDTO": this.state.ProductDTO,
            "productCover": this.state.productCover,
            "productBenefit": this.state.productBenefit,
            "productRcbdetail": this.state.productRcbdetail,
            "productInsurableItem": this.state.productInsurableItem,
            "productClausesWarrentiesExclusion": this.state.productClausesWarrentiesExclusion,
            "productPremium": this.state.productPremium,
            "productChannel": this.state.productChannel,
            "CustomClause": this.state.CustomClause,
            "newValue": 2,
            "handleOpen": this.handleOpen,
            "handleClose": this.handleClose,
            "handleShow": this.handleShow,
            "benifitRangeDetails": this.state.benifitRangeDetails,
            "clauseName": this.state.clauseName,
            "description": this.state.description,
            "ctable": this.state.ctable
        };
        this.GetMasterService = this.GetMasterService.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.AddClauses = this.AddClauses.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handledata = this.handledata.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handledescription = this.handledescription.bind(this);
        this.onDateClick = this.onDateClick.bind(this);
        this.setBenifitValue = this.setBenifitValue.bind(this);
        this.addRecord = this.addRecord.bind(this);
        this.SetProductDetailchannelsValue = this.SetProductDetailchannelsValue.bind(this);
        this.onBlur = this.onBlur.bind(this);
        ////this.compareBy=this.compareBy.bind(this);
        ////this.sortBy= this.sortBy.bind(this);
    }

    ValidatonProductName = (name) => {
        fetch(`${productConfig.productConfigUrl}/api/Product/ProductNamevalidation?productName=` + name, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("name validation ", data);
            });
    }


handleSubmit = event => {

    this.state.ValidationUI = true;
    event.preventDefault();

    this.IsValidProductDetails(this.ProductDetails);
    this.ValidatonProductName(this.ProductDetails.ProductDTO.productName);
    let pks = this.ProductDetails.ProductDTO.activeFrom;
    let dks = this.ProductDetails.ProductDTO.activeTo;
    if (this.state.ValidationUI === true) {
        if (this.state.message == false && this.state.maxbenefiterror == false && this.state.premiumerror == false) {

            let effTotal = this.ProductDetails.productChannel;
            //let effTo = this.ProductDetails.productChannel.effectiveTo;

            this.state.ProductDTO.activeFrom = this.datechange(this.ProductDetails.ProductDTO.activeFrom);
            this.state.ProductDTO.activeTo = this.datechange(this.ProductDetails.ProductDTO.activeTo);


            let productDTO = this.state.ProductDTO;


            // this.state.ProductDTO.productInsurableItems;;


            //if (this.IsValidCover(this.ProductDetails.productCover)) {
            let productCovers = [];
            let newCov = { ...this.ProductDetails.productCover };
            const list = [...productCovers, newCov];
            //  productDTO['productCovers'] = list;

            //}
            //if (this.IsValidBenefit(this.ProductDetails.productBenefit)) {
            console.log("i m here save", this.ProductDetails.benifitRangeDetails)
            productDTO['productBenefits'] = [];

            let productBenefits = [];
            if (this.ProductDetails.productCover.singleValue == true) {
                this.ProductDetails.productBenefit.benifitRangeDetails = [];
            } else {
                this.ProductDetails.productBenefit.benifitRangeDetails = this.ProductDetails.benifitRangeDetails;
            }



            let newBenefit = { ...this.ProductDetails.productBenefit };
            const benfitlist = [...productBenefits, newBenefit];
            //  productDTO['productBenefits'] = benfitlist; 


            // For Risk
            productDTO['riskDetails'] = this.state.MasterDTO.Risk;
            //For claims
            productDTO['claimDetails'] = this.state.MasterDTO.Claim;
            //Clauses
            productDTO['productClausesWarrentiesExclusions'] = this.ProductDetails.productClausesWarrentiesExclusion;
            //insurableitem
            productDTO['productInsurableItems'] = [];
            let productinsuerables = this.state.ProductDTO.productInsurableItems;
            let newinsurable = { ...this.ProductDetails.productInsurableItem };
            const inurablelist = [...productinsuerables, newinsurable];
            productDTO['productInsurableItems'] = inurablelist;
            //premium
            productDTO['productPremium'] = [];
            let productpremium = [];
            let newpremium = { ...this.ProductDetails.productPremium };
            const premiumlist = [...productpremium, newpremium];
            productDTO['productPremium'] = premiumlist;
            // this.ProductDetails.productCover

            // if (this.ProductDetails.productChannel.channelName) {
            //Channels


            productDTO['productChannels'] = [];
            console.log("pro channel", this.ProductDetails.productChannel);
            ////////////////////////////////////////////////////////////////////////////////////////////////////


            ///////////////////////////////////////////////////////////////////////////////////////////////


            //this.ProductDetails.productChannel.effectiveFrom = this.datechange(this.ProductDetails.productChannel.effectiveFrom);
            // this.ProductDetails.productChannel.effectiveTo = this.datechange(this.ProductDetails.productChannel.effectiveTo);

            // let productChannels = this.state.ProductDTO.tblProductChannels;
            //  let newChannel = { ...this.ProductDetails.productChannel };

            // console.log("channellist", newChannel);
            let efff = [];
            let effto = [];
            for (let i = 0; i <= this.ProductDetails.productChannel.length - 1; i++) {
                efff.push(this.ProductDetails.productChannel[i].effectiveFrom);
                effto.push(this.ProductDetails.productChannel[i].effectiveTo);
                this.ProductDetails.productChannel[i].effectiveFrom = this.datechange(this.ProductDetails.productChannel[i].effectiveFrom);
                this.ProductDetails.productChannel[i].effectiveTo = this.datechange(this.ProductDetails.productChannel[i].effectiveTo);

            }
            console.log("channellist", this.ProductDetails.productChannel);
            // let ProductCover = productCovers.concat(newCov);
            // const channellist = [...productChannels, newChannel];
            productDTO['productChannels'] = this.ProductDetails.productChannel;

            //this.setState({ productDTO });
            //}

            productDTO['productInsurableItems'][0].productCovers = list;

            productDTO['productInsurableItems'][0].productCovers[0].productPremium = premiumlist;

            productDTO['productInsurableItems'][0].productCovers[0].productBenefits = benfitlist;





            this.setState({ productDTO });
            console.log("last productDTO", this.state.ProductDTO)

            // fetch(`https://localhost:44347/api/Product/CreateProduct`, {
            fetch(`${productConfig.productConfigUrl}/api/Product/CreateProduct`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
                body: JSON.stringify(this.state.ProductDTO)
            }).then(response => response.json())
                .then(data => {
                    if (data.status === 2) {
                        swal({

                            text: data.responseMessage,
                            icon: "success"
                        });
                        this.setState({ redirect: true });
                        this.renderRedirect();
                    } else if (data.status === 8) {
                        swal({

                            text: data.errors[0].errorMessage,
                            icon: "error"
                        });

                    } else if (data.status === 400) {
                        swal({

                            text: data.title,
                            icon: "error"
                        });
                        this.setState({ errormessage: true });
                    } else if (data.status === 9) {
                        swal({

                            text: data.responseMessage,
                            icon: "error"
                        });
                    }



                }


                );

            for (let i = 0; i <= this.ProductDetails.productChannel.length - 1; i++) {
                this.ProductDetails.productChannel[i].effectiveFrom = efff[i];
                this.ProductDetails.productChannel[i].effectiveTo = effto[i];

            }

            this.ProductDetails.ProductDTO.activeFrom = pks;
            this.ProductDetails.ProductDTO.activeTo = dks;
            // this.ProductDetails.productChannel.effectiveFrom = effFrm;
            // this.ProductDetails.productChannel.effectiveTo = effTo;
            //} else {
            //    swal("", "Some fields are missing", "error");


            //    this.state.ProductDTO.productId = "";
            //    this.state.ProductDTO.productCode = "";
            //    this.state.ProductDTO.productStatusId = "";


            //}
        }
    } else {
        //this.state.ProductDTO.activeFrom = "";
        //this.state.ProductDTO.activeTo = "";

        this.setState({ errormessage: true });
        swal("", "Some fields are missing", "error");
    }

    this.ProductDetails.ProductDTO.activeFrom = pks;
    this.ProductDetails.ProductDTO.activeTo = dks;
};
//reset = () => {

//    this.state.ProductDTO = Object.assign({}, this.state.ProductReset);
//}
handleddlChange = (currentNode, selectedNodes) => {
    console.log("currentNode", currentNode, selectedNodes);
    let pks = this.state.clauses.filter(item => item.cweid == currentNode.cweid);
    if (currentNode.checked === true) {

        this.state.cwe.push(currentNode);

        console.log("pks", pks);
        pks[0].checked = true;
        this.setState(pks);
        console.log("pks", pks);
    } else {
        this.ProductDetails.productClausesWarrentiesExclusion = this.ProductDetails.productClausesWarrentiesExclusion.filter(p => p.cweid !== currentNode.cweid);
        console.log("currentNode", this.state.cwe);
        pks[0].checked = false;
        this.setState(pks);
    }
    this.AddClauses();
    console.log("pks1", this.ProductDetails.productClausesWarrentiesExclusion);
}
callbenefitmassage = (event, index) => {
    if (eval(this.ProductDetails.benifitRangeDetails[index].fromValue) > eval(this.ProductDetails.benifitRangeDetails[index].toValue)) {
        swal("", "Cover to value Can not more then from Cover From value", "error");
    }
    else if (eval(this.ProductDetails.benifitRangeDetails[index].fromValue) === eval(this.ProductDetails.benifitRangeDetails[index].toValue)) {
        swal("", "Cover event To value cannot be equal from Cover event from value", "error");
    }
    else if (eval(this.ProductDetails.benifitRangeDetails[index].toValue) > eval(this.ProductDetails.productCover.coverEventFactorValueTo)) {
        swal("", "Cover event factor to value can not be beyond range defined", "error");
    }
}
addRecord = (event, index) => {
    event.preventDefault();
    if (this.ProductDetails.benifitRangeDetails.length > 1) {
        this.setState({ CEFvalueDisable: true });
    } else {
        this.setState({ CEFvalueDisable: true });
    }
    this.setState({ CEFvalueDisable: true });
    if (this.ProductDetails.benifitRangeDetails[index].fromValue !== "" && this.ProductDetails.benifitRangeDetails[index].toValue !== "" && this.ProductDetails.benifitRangeDetails[index].benefitAmount !== "") {
        if (eval(this.ProductDetails.benifitRangeDetails[index].fromValue) < eval(this.ProductDetails.benifitRangeDetails[index].toValue) && eval(this.ProductDetails.benifitRangeDetails[index].toValue) < eval(this.ProductDetails.productCover.coverEventFactorValueTo) && eval(this.ProductDetails.benifitRangeDetails[index].fromValue) <= eval(this.ProductDetails.productCover.coverEventFactorValueTo)) {

            let len = this.ProductDetails.benifitRangeDetails.length - 1;
            let x = eval(this.ProductDetails.benifitRangeDetails[len].toValue) + 1;
            let ProductDetails = this.ProductDetails;
            ProductDetails['benifitRangeDetails'] = this.ProductDetails.benifitRangeDetails.concat({ fromValue: x, toValue: "", benefitAmount: "" });
            this.setState({ ProductDetails });
            this.benifitTable();
        }
        else if (eval(this.ProductDetails.benifitRangeDetails[index].fromValue) > eval(this.ProductDetails.benifitRangeDetails[index].toValue)) {
            swal("", "Cover to value cannot be more then from Cover From value", "error");
        }
        else if (eval(this.ProductDetails.benifitRangeDetails[index].fromValue) === eval(this.ProductDetails.benifitRangeDetails[index].toValue)) {
            swal("", "Cover event To value cannot be equal from Cover event from value", "error");
        }
        else if (eval(this.ProductDetails.benifitRangeDetails[index].toValue) > eval(this.ProductDetails.productCover.coverEventFactorValueTo)) {
            swal("", "Cover event factor to value cannot be beyond range defined", "error");
        }
    }
}
addChannelRecord = (event, index) => {

    if (this.ProductDetails.productChannel[index].channelTypeId !== "" && this.ProductDetails.productChannel[index].effectiveFrom !== "" && this.ProductDetails.productChannel[index].effectiveTo !== "" && this.ProductDetails.productChannel[index].brokage !== "") {
        let ProductDetails = this.ProductDetails;
        ProductDetails['productChannel'] = this.ProductDetails.productChannel.concat({ channelTypeId: "", effectiveFrom: "", effectiveTo: "", brokage: "" });
        this.setState({ ProductDetails });
        console.log("this.ProductDetails.productChannel[key].channelTypeId", this.ProductDetails.productChannel[index].channelTypeId, this.ProductDetails.productChannel);

        if (this.state.newmasterlist.length >= 1) {
            let pks = this.state.newmasterlist.filter(item => item.mID !== this.ProductDetails.productChannel[index].channelTypeId);
            this.state.newmasterlist = pks;

        }
        this.state.chlistarray.push(this.state.newmasterlist);
        console.log("chlistarray", this.state.chlistarray)
        // this.state.newmasterlist.splice();

        this.state.chindex = index;
        this.channelsTable();
        console.log("  this.ProductDetails.productChannel", this.ProductDetails.productChannel);
    }
}
deleteChannel = (event, index) => {

    let ProductDetails = this.ProductDetails;

    let deldata = this.state.chdroplist.filter(item => item.mID === this.ProductDetails.productChannel[index].channelTypeId);

    ProductDetails['productChannel'] = this.ProductDetails.productChannel.filter(item => item.channelTypeId !== this.ProductDetails.productChannel[index].channelTypeId);
    this.setState({ ProductDetails });
    this.state.chindex = this.ProductDetails.productChannel.length - 2;
    //  let sks = this.ProductDetails.productChannel.filter(item => item.channelTypeId == this.ProductDetails.productChannel[index].channelTypeId);
    if (deldata.length >= 0) {
        this.state.chlistarray.splice(index, 1);
        if (deldata.length > 0) {
            let count = this.state.chlistarray[index - 1].filter(item => item.mID == deldata[0].mID);

            if (count.length == 0) {


                this.state.chlistarray[this.ProductDetails.productChannel.length - 1].push(deldata[0]);
                // console.log("yoyo", pks, this.ProductDetails, this.state.chlistarray, deldata, index, this.ProductDetails.productChannel[index].channelTypeId, this.state.chdroplist, sks, this.state.chindex );

            }
        }
    }
    this.channelsTable();
}

handleOpen(index) {
    this.setState({ description: this.ProductDetails.productClausesWarrentiesExclusion[index].description, indexRow: index });
    this.setState({ open: true });

};

handleEdit(index) {
    this.setState({ description: this.ProductDetails.productClausesWarrentiesExclusion[index].description, indexRow: index });
    this.setState({ opendescription: true });
};

handledescription() {
    let editdescription = [...this.ProductDetails.productClausesWarrentiesExclusion];
    editdescription[this.state.indexRow].description = this.state.description;
    this.setState({ editdescription });
    this.setState({ opendescription: false });
}

handleShow() {
    this.setState({ mshow: true });

};
handleClose() {
    this.setState({ open: false });
    this.setState({ mshow: false });
    this.setState({ opendescription: false });
};

SetValue = (type, event) => {

    this.setState({ message: false });
    let ProductDTO = this.state.ProductDTO;
    let name = event.target.name;
    let value = event.target.value;
    ProductDTO[name] = value;

    this.setState({ ProductDTO });
    this.change(event, name, type);

    if (name === "productCode") {

        fetch(`${productConfig.productConfigUrl}/api/Product/ProductCodevalidation?productcode=` + value, {
            //fetch(`https://localhost:44347/api/Product/productCodevalidation?productCode=` + value,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("data status", data.status);
                if (data.status === 9) {
                    this.setState({ servermessage: data.responseMessage });
                    this.setState({ message: true });
                    this.setState({ productCodeState: "error" });
                } else {
                    this.setState({ message: false });

                }
            });
    }


}
setBenifitValue = (columnName, event, index) => {
    console.log("columnName", columnName, event);
    let responses = [...this.ProductDetails.benifitRangeDetails];
    if (columnName === 'benefitAmount') {
        responses[index].benefitAmount = event.target.value;
        this.callbenefitmassage(event, index)
    }
    if (columnName === 'toValue') {
        responses[index].toValue = event.target.value;
    }
    if (columnName === 'fromValue') {
        responses[index].fromValue = event.target.value;
    }
    this.setState({ responses });

    this.benifitTable();
    console.log("react table benefit", this.ProductDetails.benifitRangeDetails);

}

SetProductDetailsValue = (callcomponent, event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (callcomponent === 'clauseDescription') {
        this.setState({ description: value });
    } else {
        let ProductCover = this.ProductDetails[callcomponent];

        ProductCover[name] = value;

        this.setState({ ProductCover });
    }
    if (callcomponent === 'productCover') {
        if (event.target.name === "coverEventFactorValueFrom") {
            this.ProductDetails.benifitRangeDetails[0].fromValue = value;
            console.log(" this.ProductDetails.benifitRangeDetails", this.ProductDetails.benifitRangeDetails)
        }

    }

    if (name === "premiumAmount") {


        // this.checkRange();
        if (this.ProductDetails.ProductDTO.premiumAmount > 0) {
            // this.state.premiumerror = true;
            this.ProductDetails.ProductDTO.premiumAmount = value;


            //    swal("", "Some fields are missing", "error");
        }

    }


    if (value !== "") {
        if (name === "benefitCriteriaValue" && this.state.maxbenefitinputdisable === false) {
            this.setState({ maxbenefitinputdisable: true });
        } else if (name === "maxBenefitAmount" && this.state.benefitinputdisable === false) {
            this.setState({ benefitinputdisable: true });
        }

    } else {
        if (name === "benefitCriteriaValue") { this.setState({ maxbenefitinputdisable: false }); }
        if (name === "maxBenefitAmount") { this.setState({ benefitinputdisable: false }); }
    }

    console.log("SetProductDetailsValue", this.ProductDetails, name, value)
    this.benifitTable();
    //this.channelsTable();
}

checkRange = () => {
    if (this.ProductDetails.benifitRangeDetails.length > 0) {

        for (var i = 0; i < this.ProductDetails.benifitRangeDetails.length; i++) {
            this.state.maxbenefitAmount = this.ProductDetails.benifitRangeDetails[i].benefitAmount;
            this.state.minBenefitAmount = this.ProductDetails.benifitRangeDetails[i].benefitAmount;
            for (var j = 0; j < this.ProductDetails.benifitRangeDetails.length; j++) {
                if (this.state.maxbenefitAmount < this.ProductDetails.benifitRangeDetails[j].benefitAmount) {
                    this.state.maxbenefitAmount = this.ProductDetails.benifitRangeDetails[j].benefitAmount;
                }
                if (this.state.minBenefitAmount > this.ProductDetails.benifitRangeDetails[j].benefitAmount) {
                    this.state.minBenefitAmount = this.ProductDetails.benifitRangeDetails[j].benefitAmount;
                }
            }
        }
        this.setState({});
        console.log("maxmin", this.state.minBenefitAmount, this.state.maxbenefitAmount);
    }

}
onBlur = (callcomponent) => {


    let max = "";
    let min = "";

    if (this.ProductDetails.productCover.singleValueSelected == "1") {


        if (callcomponent == 'benifitRangeDetails') {
            this.setState({ maxbenefiterror: false });
            max = Math.max.apply(Math, this.ProductDetails[callcomponent].map(function (o) { return o.benefitAmount; }));
            if (max > eval(this.ProductDetails.productBenefit.maxBenefitAmount)) {
                this.state.maxBenefitValue = max;
                this.setState({ maxbenefiterror: true });
            }
        }
        if (callcomponent == 'productPremium') {
            this.setState({ premiumerror: false });
            min = Math.min.apply(Math, this.ProductDetails['benifitRangeDetails'].map(function (o) { return o.benefitAmount; }));
            if (min < eval(this.ProductDetails.productPremium.premiumAmount)) {
                this.setState({ premiumerror: true });
            }
        }
    } else {
        if (callcomponent == 'benifitRangeDetails') {
            this.setState({ maxbenefiterror: false });
            if (eval(this.ProductDetails.productBenefit.benefitAmount) > eval(this.ProductDetails.productBenefit.maxBenefitAmount)) {
                this.state.maxBenefitValue = this.ProductDetails.productBenefit.benefitAmount;
                this.setState({ maxbenefiterror: true });

            }
        }
        if (callcomponent == 'productPremium') {
            this.setState({ premiumerror: false });
            if (eval(this.ProductDetails.productBenefit.benefitAmount) < eval(this.ProductDetails.productPremium.premiumAmount)) {
                this.setState({ premiumerror: true });

            }
        }
    }

    console.log("max", max);



}
SetProductDetailchannelsValue = (type, addType, event, index) => {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;

    let ProductCover = this.ProductDetails[type];

    ProductCover[index][name] = value;

    this.setState({ ProductCover });

    console.log("SetProductDetailsValue", this.ProductDetails.productChannel[index], name, value)
    // this.state.newmasterlist.splice();

    this.channelsTable();
}


onDateClick = () => {
    //    console.log("activeFrom", this.state.ProductDTO.activeFrom);
    //    $(document).ready(function () {
    //      //  $(".datetime .rdt input").focus(function () {
    //          //  debugger;
    //        $(".rdt input").focus(function () {

    //            var dateVal = $(this).val();
    //            console.log("dateval", dateVal);
    //           // console.log(dateVal = "");
    //            if (dateVal == undefined) {
    //                alert(dateVal);
    //                $(this).parent().parent().find('label').removeClass('dateTimeLabel-shink');
    //            } else {
    //                $(this).parent().parent().find('label').addClass('dateTimeLabel-shink');
    //            }

    //        }
    //        );

    //    })
};

GetMasterData = (type, addType, event) => {
    this.SetValue(type, event);
    let reg = this.state[addType];
    let name = event.target.name;
    let value = event.target.value;
    reg[name] = value;
    console.log("event", event.target.name)
    this.setState({ reg });
    if (type === "Clauses") {
        this.GetCWEService(type, event.target.value);
    }
    else if (type === "channels") {



        this.state.prodchan.push(this.state.productChannel);
        this.state.value = (this.state.masterList.filter(e => e.mType === 'Channels')[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mType === 'Channels')[0].mdata
            ;
        this.state.mvalue = this.state.value.filter(o1 => this.state.prodchan.some(o2 => o1.mID === o2.channelTypeId));
        reg['channelName'] = this.state.mvalue[0].mValue;
        this.setState({ reg });
        console.log("reg", reg);
        const { show } = this.state.show;
        this.setState({ show: !show });
    }
    else {
        if (type != "") {
            this.GetMasterService(type, event.target.value);

        }
        if (type === "COB") {
            //COB based call

            //this.GetMasterService('InsuranceType', 0);
            this.GetMasterService('Cover', event.target.value);
            this.GetMasterService('CoverEvent', event.target.value);
        }
        if (type === "CoverEventFactor") {
            this.GetMasterService('BenefitCriteria', event.target.value);
            this.GetMasterService('Risk', event.target.value);
            this.GetMasterService('Claim', event.target.value);
        }
        if (type === "InsurableCategory") {
            this.GetMasterService('CoverEvent', event.target.value);
        }

    }
};
//GetMasterChannelsData = (type, addType, event, index) => {
//    debugger;
//    //this.SetValue(type, event);
//    //let reg = this.state[addType];
//    //let name = event.target.name;
//    //let value = event.target.value;
//    //reg[name] = value;
//    //console.log("event", event.target.name,reg)
//    //this.setState({ reg });
//    if (type == "Clauses") {
//        this.GetCWEService(type, event.target.value);
//    }
//    //else if (type == "channels") {



//    //    this.state.prodchan.push(this.state.productChannel);
//    //    this.state.value = (this.state.masterList.filter(e => e.mType === 'Channels')[0]) === undefined
//    //        ? []
//    //        : this.state.masterList.filter((e) => e.mType === 'Channels')[0].mdata
//    //        ;
//    //    this.state.mvalue = this.state.value.filter(o1 => this.state.prodchan.some(o2 => o1.mID === o2.channelTypeId));
//    //    reg['channelName'] = this.state.mvalue[0].mValue;
//    //  //  this.state.productChannel[index].channelTypeId= this.state.mvalue[0].mValue;
//    //    this.setState({ reg });

//    //    console.log("reg", reg);
//    //    const { show } = this.state.show;
//    //    this.setState({ show: !show });
//    //}
//    else {
//        if (type != "") {
//            this.GetMasterService(type, event.target.value);
//        }
//        if (type == "COB") {
//            //COB based call
//            this.GetMasterService('InsuranceType', 0);
//            this.GetMasterService('Cover', 0);
//            this.GetMasterService('CoverEvent', event.target.value);
//        }
//        if (type == "CoverEventFactor") {
//            this.GetMasterService('BenefitCriteria', event.target.value);
//            this.GetMasterService('Risk', event.target.value);
//            this.GetMasterService('Claim', event.target.value);
//        }
//    }
//   this.SetProductDetailchannelsValue('productChannel', '', event, index)
//    this.channelsTable();
//};

GetMasterService = (type, pID) => {
    //fetch(`https://localhost:44347/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID)
    fetch(`${productConfig.productConfigUrl}/api/Product/GetProductMaster?masterType=` + type + `&parentID=` + pID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        },
    })
        .then(response => response.json())
        .then(data => {
            const lData = data;
            let locDTO = this.state.MasterDTO;
            locDTO[type] = lData;
            this.setState({ locDTO });
            console.log("GetMasterService", data);
        });

};

GetCWEService = (type, pID) => {
    let that = this;
    //fetch(`https://localhost:44347/api/Product/CWEDetails?LOBId=`+this.state.ProductDTO.lobid +`&CWETypeID=`+ pID)
    fetch(`${productConfig.productConfigUrl}/api/Product/CWEDetails?LOBId=` + this.state.ProductDTO.lobid + `&CWETypeID=` + pID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        },
    })
        .then(response => response.json())
        .then(data => {
            this.calltruedata(data);
            this.setState({
                clauses: data,

            });

            console.log("clauses: ", this.state.clauses);

        });

}
calltruedata = (data) => {
    if (this.ProductDetails.productClausesWarrentiesExclusion.length > 0) {
        let checkdata = this.ProductDetails.productClausesWarrentiesExclusion.filter(p => p.checked === true);
        checkdata.map((prop, i) => {

            data.map((item, key) => { if (prop.cweid === item.cweid) { item.checked = true } });

        });
    }
    console.log(" this.state.clauses", data, this.ProductDetails.productClausesWarrentiesExclusion);
}

SetclauseValue = (index, event) => {
    console.log("check", event.target.checked)
    let responses = [...this.ProductDetails.productClausesWarrentiesExclusion];
    responses[index].isPrint = event.target.checked;

    this.setState({ responses });
    console.log("pks", this.ProductDetails.productClausesWarrentiesExclusion[index]);
}

SetRiskClaimsDetailsValue = (callcomponent, event) => {

    console.log('Componenet call', callcomponent, event);


    const index = this.state.MasterDTO[callcomponent].findIndex(item => item.mValue === event.target.name);
    if (index != -1) {


        let responses = [...this.state.MasterDTO[callcomponent]];
        responses[index].mIsRequired = event.target.checked;
        this.setState({ responses });

    }

};
onInputChange = (event) => {
    //let UserData = this.state.UserData;
    let name = event.target.name;
    let value = event.target.value;

    this.ProductDetails.productClausesWarrentiesExclusion[name] = value;


}
onInsurableChange = (event) => {

    let name = event.target.name;
    let value = event.target.value;

    this.ProductDetails.productInsurableItem[name] = value;


    this.setState({ ProductDetails });
}

onDateChange = (formate, type, name, event) => {
    const { validdate } = this.state;
    this.setState({ validdate: false });

    var today = event.toDate();
    if (today.getDate() < 10) {
        var dt = '0' + today.getDate();
    }
    else {
        var dt = today.getDate();
    }
    if (today.getMonth() < 10) {
        var mm = '0' + (today.getMonth() + 1);
    }
    else {
        var mm = (today.getMonth() + 1);
    }
    // var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var date = dt + '/' + mm + '/' + today.getFullYear();

    //   var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var date2 = new Date();
    var date1 = new Date(today);


    if (type === 'ProductDTO') {
        let ProductDTO = this.state.ProductDTO;
        ProductDTO[name] = date;
        this.setState({ ProductDTO });
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var datediff = this.state.date;
        datediff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var datediff = -Math.abs(datediff - 1);
        this.setState({ datediff });
    }
    if (type == 'Channel') {
        let productChannel = this.ProductDetails.productChannel;
        productChannel[name] = date;
    }
    console.log("after change", this.state.ProductDTO.activeFrom)

    this.change(event, name, formate, date);

};
onDateChangeChannels = (formate, type, name, event, index) => {
    const { validdate } = this.state;
    this.setState({ validdate: false });


    var today = event.toDate();
    if (today.getDate() < 10) {
        var dt = '0' + today.getDate();
    }
    else {
        var dt = today.getDate();
    }
    if (today.getMonth() < 10) {
        var mm = '0' + (today.getMonth() + 1);
    }
    else {
        var mm = (today.getMonth() + 1);
    }
    // var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var date = dt + '/' + mm + '/' + today.getFullYear();

    var date2 = new Date();
    var date1 = new Date(today);


    if (type === 'Channel') {
        let productChannel = this.ProductDetails.productChannel[index];
        productChannel[name] = date;
        this.setState({ productChannel });
    }
    console.log("after change", this.ProductDetails.productChannel)

    this.change(event, name, formate, date);

};

datechange = (date) => {
    const _date = date.split('/');
    const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

    return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
}
SetValueNew = (path, event) => {
    event.preventDefault();
    let sPath = path.split('.');
    let tempDTO = sPath[0];
    for (var i = 1; i < sPath.length; i++) {
        tempDTO = tempDTO[sPath[i]];
    }
    let name = event.target.name;
    let value = event.target.value;
    tempDTO[name] = value;
    this.setState({ tempDTO });
}

//IsValidCover(CoverDetails) {
//    if (CoverDetails.coverTypeId > 0 && CoverDetails.coverEventId && CoverDetails.coverDescription.length > 0)
//        return true;
//    else
//        this.state.ValidationUI = false;

//    this.state.errormessage = true;
//        return false;
//};

//IsValidBenefit(BenefitDetails) {
//    debugger;
//    if (BenefitDetails.benefitCriteriaValue ||BenefitDetails.maxBenefitAmount > 0)

//        return true;
//    else
//        this.state.ValidationUI = false;

//    this.state.errormessage = true;
//   // swal("error", "error", "error");
//        return false;
//};
IsValidProductDetails = (productDetails) => {


    if (productDetails.productPremium.premiumAmount > 0 && productDetails.productPremium.currencyId) { } else { this.state.ValidationUI = false; this.state.errormessage = true; }
    if (productDetails.productClausesWarrentiesExclusion.length > 0) { } else { this.state.ValidationUI = false; this.state.errormessage = true; }
    if (productDetails.productInsurableItem.insurableItemTypeId) { } else { this.state.ValidationUI = false; this.state.errormessage = true; }
    if (productDetails.productChannel.length > 0) {
        for (var i = 0; i < productDetails.productChannel.length; i++) {
            if (productDetails.productChannel[i].effectiveFrom !== "" && productDetails.productChannel[i].effectiveTo !== "" && productDetails.productChannel[i].brokage !== "" && productDetails.productChannel[i].channelTypeId !== "") {

            } else { this.state.ValidationUI = false; this.state.errormessage = true; }
        }
    } else { this.state.ValidationUI = false; this.state.errormessage = true; }
    if (productDetails.ProductDTO.productCode !== "" && productDetails.ProductDTO.activeFrom !== "" && productDetails.ProductDTO.activeTo !== "" && productDetails.ProductDTO.productName !== "" && productDetails.ProductDTO.productStatusId) { } else { this.state.ValidationUI = false; this.state.errormessage = true; }

    if (productDetails.productBenefit.benefitCriteriaValue || productDetails.productBenefit.maxBenefitAmount > 0) { } else { this.state.ValidationUI = false; this.state.errormessage = true; }
    //if (productDetails.productCover.coverTypeId > 0 && productDetails.productCover.coverEventId && productDetails.productCover.coverDescription.length > 0) { } else { this.state.ValidationUI = false; this.state.errormessage = true; }

}

handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
};

handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
};

//addDetails = (event) => {
//    document.getElementById('subHead').style.display = 'block'
//    document.getElementById('clauseDetTable').style.display = 'block';
//    var desc = $("#desc").val();
//    var cwe = $("#cwe").val();
//    var fullTxt = $("#fullTxt").val();
//    var prnt = $("#prnt").val();


//    var table = document.getElementById('clauseDetTable');
//    var row = table.insertRow(-1);
//    row.className = 'tableClassRow';
//    var cell1 = row.insertCell(-1);
//    var cell2 = row.insertCell(-1);
//    var cell3 = row.insertCell(-1);
//    var cell4 = row.insertCell(-1);
//    var cell5 = row.insertCell(-1);

//    cell1.innerHTML = desc;
//    cell2.innerHTML = cwe;
//    cell3.innerHTML = fullTxt;
//    cell4.innerHTML = prnt;
//    cell5.innerHTML = '<span class="delete"><i class="fa fa-trash del-btn" aria-hidden="true"></i><span/><span class="edit"><i class="fa fa-pencil ed-btn" aria-hidden="true"></i><span/>';

//    $(".delete").on('click', function () {
//        $(this).parent().parent().remove();
//    });
//};

componentDidMount() {
    let ProductCover = this.ProductDetails.productCover;
    ProductCover['singleValueSelected'] = "0";
    this.setState({ btnhide: true });
    fetch(`${productConfig.productConfigUrl}/api/Product/GetMasterData?sMasterlist=das`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        },
    })
        .then(response => response.json())
        .then(data => {
            this.setState({ masterList: data });
            if (data.length > 0) {
                setTimeout(
                    function () {
                        this.setState({ pageloader: true });
                    }
                        .bind(this),
                    2000
                );
            }
            console.log("masterlist", data);
            this.callchannel(data);
        });
    this.channelsTable();
    this.GetMasterService('LOB', 0);
    this.onDateClick();

    this.state.ProductReset = Object.assign({}, this.state.ProductDTO);

    if (this.props.sendproductid != null) {
        if (this.props.sendproductid != "") {
            this.setState({ btnhide: false });
            this.setState({ viewdisable: true });
            if (this.props.sendproductid == 613) {
                this.setState({ visible: true });
            } else {
                this.setState({ visible: false });
            }
            fetch(`${productConfig.productConfigUrl}/api/Product/GetProductById?productId=` + this.props.sendproductid, {
                //   fetch(`https://localhost:44347/api/Product/GetProductById?productId=` + this.props.sendproductid,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("product data from server", data);
                    this.setState({ productlist: data });
                    let pdata = this.state;
                    pdata['ProductDTO'] = data;

                    this.setState({ pdata });
                    this.state.ProductDTO.productCode = data.productCode;
                    this.ProductDetails['ProductDTO'] = data;
                    console.log("data coming ", data)
                    console.log("data coming pro", this.ProductDetails['ProductDTO'])
                    // this.GetMasterService('LOB', 0);
                    console.log("Active from date", data.activeFrom)
                    this.ProductDetails.ProductDTO.activeFrom = new Date(data.activeFrom).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    this.ProductDetails.ProductDTO.activeTo = new Date(data.activeTo).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                    console.log("Active from date", this.ProductDetails.ProductDTO.activeFrom)
                    //Clauses
                    let single;
                    this.GetMasterService("COB", this.ProductDetails.ProductDTO.lobid);
                    if (this.ProductDetails.ProductDTO['productInsurableItems'].length > 0) {
                        this.ProductDetails.productInsurableItem = this.ProductDetails.ProductDTO.productInsurableItems[0];
                        this.GetMasterService('InsurableCategory', this.ProductDetails.ProductDTO.cobid);
                        this.GetMasterService('InsuranceType', this.ProductDetails.ProductDTO.productInsurableItems[0].insurableCategoryId);
                        this.ProductDetails.productCover = this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0];

                        this.GetMasterService('Cover', this.ProductDetails.ProductDTO.productInsurableItems[0].insurableItemTypeId);
                        this.GetMasterService('CoverEvent', this.ProductDetails.ProductDTO.cobid);
                        if (this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'].length > 0) {
                            //   if (this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'].coverEventId != null && this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'].coverEventFactorId != null && this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'].coverEventFactorValueUnitId != null) {
                            this.GetMasterService('CoverEventFactor', this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].coverEventId);
                            this.GetMasterService('CoverEventFactorValue', this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].coverEventFactorId);
                            this.GetMasterService('BenefitCriteria', this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].coverEventId);
                            //    }
                            if (this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits != null || this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits.length > 0) {

                                this.ProductDetails.productBenefit = this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits[0];
                                if (this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits[0].benifitRangeDetails != null) {
                                    if (this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits[0].benifitRangeDetails.length > 0) {
                                        this.ProductDetails.benifitRangeDetails = this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits[0].benifitRangeDetails;
                                    }
                                }
                            }
                            if (this.ProductDetails.ProductDTO.productPremium.length > 0) {
                                this.ProductDetails.productPremium = this.ProductDetails.ProductDTO.productPremium[0];
                            }
                        }
                    }




                    //if (this.ProductDetails.ProductDTO.productInsurableItems[0]['productCover'].length > 0) {

                    //    this.ProductDetails.ProductDTO.productInsurableItems[0]['productCover'] = this.ProductDetails.ProductDTO.productInsurableItems[0].productCovers[0];

                    //this.GetMasterService('InsuranceType', 0);

                    //   this.GetMasterService('Cover', this.ProductDetails.ProductDTO['productInsurableItem'][0].ins);
                    //    //console.log(' this.ProductDetails.ProductDTO.lobid', this.ProductDetails.ProductDTO.lobid)
                    // this.GetMasterService('CoverEvent', this.ProductDetails.ProductDTO.cobid);

                    //    //   console.log(" this.ProductDetails.ProductDTO.lobid", this.ProductDetails.ProductDTO.lobid)
                    //    //  this.GetMasterService('CoverEventFactor', this.ProductDetails.ProductDTO.productCovers[0].coverEventId);

                    //    //                            this.GetMasterService('Clauses', this.ProductDetails.ProductDTO.productCovers[0].cweid);

                    //    this.GetMasterService('BenefitCriteria', this.ProductDetails.ProductDTO.productCovers[0].coverEventId);
                    //    console.log(" this.GetMasterService('BenefitCriteria', this.ProductDetails.ProductDTO.productCovers[0].coverEventId);", this.ProductDetails.ProductDTO.productCovers[0].coverEventId)
                    //    //  this.GetMasterService('CoverEvent', 0);
                    //    //   this.GetMasterService('coverEventFactorId', this.ProductDetails.ProductDTO.tblProductCovers[0].CoverEventFactorValue);
                    //    this.GetMasterService('CoverEventFactor', this.ProductDetails.ProductDTO.productCovers[0].coverEventId);
                    //    //this.GetMasterService('', this.ProductDetails.ProductDTO.tblProductCovers[0].coverTypeId);

                    //    this.GetMasterService('CoverEventFactorValue', this.ProductDetails.ProductDTO.productCovers[0].coverEventFactorId);

                    //    //this.GetMasterService('Risk', this.ProductDetails.ProductDTO.tblProductCovers[0].coverEventId);
                    //    //this.GetMasterService('Claim', this.ProductDetails.ProductDTO.tblProductCovers[0].coverEventId);
                    //    this.GetMasterService('', this.ProductDetails.ProductDTO.productCovers[0].coverEventId);
                    //    this.ProductDetails.productCover.coverEventId = this.ProductDetails.ProductDTO.productCovers[0].coverEventId;

                    //}
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //if (this.ProductDetails.ProductDTO.productInsurableItems[0].productCovers[0]['productBenefits'].length > 0) {
                    //    this.ProductDetails.productBenefit = this.ProductDetails.ProductDTO.productInsurableItems[0].productCovers[0].productBenefits[0];
                    //    this.ProductDetails.productBenefit['benifitRangeDetails'] = this.ProductDetails.ProductDTO.productInsurableItems[0].productCovers[0].productBenefits[0].benifitRangeDetails;
                    //    // console.log("SingleValue", this.ProductDetails.ProductDTO.productBenefits[0].singleValue);
                    single = this.ProductDetails.ProductDTO.productInsurableItems[0].productCovers[0].singleValue;


                    //    //if (this.ProductDetails.productCover.singleValue === true) {

                    //    //    let ProductCover = this.ProductDetails.productCover;
                    //    //    this.ProductDetails['productCover'].singleValue = true;
                    //    //    ProductCover['singleValueSelected'] = "0";
                    //    //    this.benifitTable();
                    //    //}

                    //}
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if (this.ProductDetails.ProductDTO.productChannels.length > 0) {
                        this.ProductDetails['productChannel'] = this.ProductDetails.ProductDTO.productChannels[0];
                    }
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    if (this.ProductDetails.ProductDTO.productClausesWarrentiesExclusions.length > 0) {
                        // this.ProductDetails['productClausesWarrentiesExclusion'] = this.ProductDetails.ProductDTO.productClausesWarrentiesExclusions[0];
                        this.ProductDetails['productClausesWarrentiesExclusion'] = [...this.ProductDetails.ProductDTO.productClausesWarrentiesExclusions];
                        this.ProductDetails.productCover.cweid = this.ProductDetails.ProductDTO.productClausesWarrentiesExclusions[0].cwetypeId;
                        //  this.GetCWEService("Clauses", this.ProductDetails.ProductDTO.tblProductClausesWarrentiesExclusions[0].cweid);
                        this.setState({ ctable: true });

                        this.dataTable();
                    }
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if (this.ProductDetails.ProductDTO.productRcbdetails.length > 0) {
                        this.ProductDetails['productRcbdetail'] = this.ProductDetails.ProductDTO.productRcbdetails[0];
                    }
                    this.setState({ show: true });
                    console.log("channel daya", this.ProductDetails.ProductDTO.productChannels, this.ProductDetails.ProductDTO.productChannels.length)
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if (this.ProductDetails.ProductDTO.productChannels.length > 0) {

                        for (var i = 0; i <= this.ProductDetails.ProductDTO.productChannels.length - 1; i++) {

                            this.ProductDetails.ProductDTO.productChannels[i].effectiveFrom = new Date(this.ProductDetails.ProductDTO.productChannels[i].effectiveFrom).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                            this.ProductDetails.ProductDTO.productChannels[i].effectiveTo = new Date(this.ProductDetails.ProductDTO.productChannels[i].effectiveTo).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        }
                        this.ProductDetails['productChannel'] = [...this.ProductDetails.ProductDTO.productChannels];

                        this.setState({ search: true });
                        this.setState({ nonedit: true });
                        this.channelsTable();

                    }
                    console.log("table data is here", this.ProductDetails.ProductDTO)
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if (this.ProductDetails.ProductDTO.productRcbdetails.length > 0) {
                        this.ProductDetails['productRcbdetails'] = this.ProductDetails.ProductDTO.productRcbdetails[0];
                        this.state.MasterDTO['Risk'] = this.ProductDetails.ProductDTO.productRcbdetails.filter(item => item.inputType === "Risk")
                        this.state.MasterDTO['Claim'] = this.ProductDetails.ProductDTO.productRcbdetails.filter(item => item.inputType === "Claim")

                        console.log("here table data", this.state.MasterDTO['Risk'], this.state.MasterDTO['Claim']);
                    }
                    //////////////////////////////////////////////////////////////////
                    //if (this.ProductDetails.ProductDTO.productPremium.length > 0) {
                    //    this.ProductDetails['productPremium'] = this.ProductDetails.ProductDTO.productPremium[0];

                    //}

                    // if (this.ProductDetails.productCover.singleValue === false) {
                    //this.ProductDetails['productCover'].singleValue = "1";
                    //this.ProductDetails['productCover'].singleValueSelected = "1";
                    //console.log("SingleValue1", this.ProductDetails['productCover'].singleValueSelected);
                    //let ProductCover = this.ProductDetails.productCover;
                    let ProductCover = this.ProductDetails.productCover;


                    //this.ProductDetails.productInsurableItem[0]['productCover'][0]['singleValueSelected'] = (single === true) ? "0" : "1";
                    this.ProductDetails['productCover'].singleValue = single;
                    ProductCover['singleValueSelected'] = (single === true) ? "0" : "1";
                    //  ProductCover['singleValueSelected'] = this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].singleValueSelected;

                    this.benifitTable();
                    //}
                });

        }
    }

    this.channelsTable();
}

renderRedirect = () => {
    if (this.state.redirect === true) {
        return <Redirect to={{
            pathname: '/dashboard/home',

        }} />
    }
}

AddClauses() {
    if (this.state.cwe.length > 0) {
        this.setState({ ctable: true });


        this.state.cvalue = (this.state.masterList.filter(e => e.mType === 'CWEType')[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mType === 'CWEType')[0].mdata
            ;

        this.state.cmvalue = this.state.cvalue.filter(o1 => this.state.clauses.some(o2 => o1.mID === o2.cwetypeId));

        let cwetype = this.state.CustomClause.cwetypes;
        if (this.state.cmvalue[0].mValue === 'Clauses') {
            this.setState({ cwetype: 'C' });
        }
        else if (this.state.cmvalue[0].mValue === 'Warrenties') {
            this.setState({ cwetype: 'W' });
        }
        else if (this.state.cmvalue[0].mValue === 'Exclusions') {
            this.setState({ cwetype: 'E' });
        }
        else { }

        let productDTO = this.ProductDetails;
        let productClause = this.ProductDetails.productClausesWarrentiesExclusion;
        let newCov = this.state.clauses.filter(o1 => this.state.cwe.some(o2 => o1.cweid === o2.cweid));

        const list = [...productClause, ...newCov];
        console.log("newCov", newCov, list);
        productDTO['productClausesWarrentiesExclusion'] = list;
        this.setState({ productDTO });

        this.state.cwe = [];


    }

    this.dataTable();
}
handledata() {
    this.state.CustomClause.label = this.state.CustomClause.typeName;

    let productDTO = this.ProductDetails;
    let productClause = this.ProductDetails.productClausesWarrentiesExclusion;
    let CustomClause = this.state.CustomClause;
    let cwetypeId = this.state.CustomClause.cwetypeId;
    this.state.cvalue = (this.state.masterList.filter(e => e.mType === 'CWEType')[0]) === undefined
        ? []
        : this.state.masterList.filter((e) => e.mType === 'CWEType')[0].mdata
        ;
    let mvalue = this.state.cvalue.filter(o1 => o1.mID === cwetypeId);
    let cvalue = '';

    if (mvalue[0].mValue === 'Clauses') {
        cvalue = 'C';
    }
    else if (mvalue[0].mValue === 'Warrenties') {
        cvalue = 'W';
    }
    else if (mvalue[0].mValue === 'Exclusions') {
        cvalue = 'E';
    }
    CustomClause['cwetypes'] = cvalue;
    this.setState({ CustomClause });
    let customInputClause = Object.assign({}, this.state.CustomClause);

    const list = [...productClause, customInputClause];

    productDTO['productClausesWarrentiesExclusion'] = list;
    this.setState({ productDTO });

    this.setState({ mshow: false });
    this.dataTable();
}

handleRadioChange = (event) => {
    let ProductCover = this.ProductDetails.productCover;


    ProductCover['singleValue'] = event.target.value === "1" ? false : true;
    ProductCover['singleValueSelected'] = event.target.value;
    this.setState({ ProductCover });
    if (this.ProductDetails.productCover.singleValue === false) {
        this.benifitTable();
    }
}

//RadioChangetrue = () => {
//    let ProductCover = this.ProductDetails.productCover;


//    ProductCover['singleValue'] = true;
//    ProductCover['singleValueSelected'] = "1";
//    this.setState({ ProductCover });
//    if (this.ProductDetails.productCover.singleValue === false) {
//        this.benifitTable();
//    }
//}
change(event, stateName, type, date, maxValue) {
    switch (type) {

        case "string":
            if (validationPage.verifyName(event.target.value)) {
                this.setState({ [stateName + "State"]: "success" });


            } else {
                this.setState({ [stateName + "State"]: "error" });


            }
            break;
        case "datetime":
            if (validationPage.verifydatetime(date)) {
                this.setState({ [stateName + "State"]: "success" });
            } else {
                this.setState({ [stateName + "State"]: "error" });
            }
            break;
        case "productBenefit":
            if (validationPage.verifydecimal(event.target.value)) {
                this.setState({ [stateName + "State"]: "success" });
            } else {
                this.setState({ [stateName + "State"]: "error" });
            }
            break;

        default:
            break;
    }


}
dataTable = () => {
    this.setState({
        tabledata: this.ProductDetails.productClausesWarrentiesExclusion.map((prop, key) => {

            return {
                id: key + 1,
                typeName: prop.typeName,
                cwetypes: prop.cwetypes,
                isPrint: <CustomCheckbox key={key}
                    name="isPrint"
                    value={prop.isPrint}
                    onChange={(e) => this.SetclauseValue(key, e)}
                    disabled={this.state.viewdisable}
                    formControlProps={{
                        fullWidth: true
                    }}

                />,
                btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpen.bind(this, key)}><Visibility /></Button>
                    {!this.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEdit.bind(this, key)}><Edit /></Button>}
                </div>
            };

        })

    });
}
/////////////////////////////////////////////////////////////////////////////////////
callchannel = (data) => {


    if (data.length > 0) {

        let chstate = (data.filter((e) => e.mType === 'Channels')[0]) === undefined
            ? []
            : data.filter((e) => e.mType === 'Channels')[0].mdata
            ;
        //   console.log("contents", contents);
        this.setState({ newmasterlist: chstate });
        this.setState({ chdroplist: chstate });
        console.log("newmasterlist", this.state.newmasterlist)
        this.state.chlistarray.push(this.state.newmasterlist);
        console.log("chlistarray", this.state.chlistarray)
        this.state.maxchlen = this.state.newmasterlist.length;
        this.channelsTable();
    }
}

channelsTable = () => {

    if (this.state.newmasterlist.length > 0) {
        console.log("product channel", this.state.masterList, this.state.newmasterlist);

        let con = this.state.newmasterlist;


        this.setState({
            channelstableData: this.ProductDetails.productChannel.map((prop, key) => {
                console.log("this.ProductDetails.productChannel[key].channelTypeId", key, con, this.ProductDetails.productChannel[key].channelTypeId, this.state.chindex + 1);
                return {
                    id: key + 1,
                    selectType: <Dropdown id="ProductDTO.lobid" labelText={(this.ProductDetails.productChannel[key].channelTypeId == "") ? "Select" : ""} lstObject={(this.state.search === true) ? this.state.chlistarray[0] : this.state.chlistarray[key]} value={this.ProductDetails.productChannel[key].channelTypeId} name='channelTypeId' onChange={(e) => this.SetProductDetailchannelsValue('productChannel', '', e, key)} disabled={(this.state.nonedit === true) ? true : (key === this.state.chindex + 1) ? false : true} formControlProps={{ fullWidth: true }} />,
                    //    selectType: <MasterDropdown labelText="Select Type" required={true} id="ProductDTO.ChannelID" lstObject={this.state.masterList} filterName='Channels' value={this.ProductDetails.productChannel[key].channelTypeId} model="ProductDTO" name='channelTypeId' onChange={(e) => this.SetProductDetailchannelsValue('productChannel', '', e, key)} disabled={this.state.viewdisable} formControlProps={{ fullWidth: true }} />,
                    effectiveFrom: <CustomDatetime id='dteffectiveFrom' name='effectiveFrom' onChange={(evt) => this.onDateChangeChannels('datetime', 'Channel', 'effectiveFrom', evt, key)} value={this.ProductDetails.productChannel[key].effectiveFrom} disabled={(this.state.nonedit === true) ? true : (key === this.state.chindex + 1) ? false : true} formControlProps={{ fullWidth: true }} />,
                    // fromValue: prop.fromValue,
                    effectiveTo: <CustomDatetime id='dteffectiveTo' name='effectiveTo' onChange={(evt) => this.onDateChangeChannels('datetime', 'Channel', 'effectiveTo', evt, key)} value={this.ProductDetails.productChannel[key].effectiveTo} disabled={(this.state.nonedit === true) ? true : (key === this.state.chindex + 1) ? false : true} formControlProps={{ fullWidth: true }} />,

                    brokage: <CustomInput labelText="" id="brokageText" value={this.ProductDetails.productChannel[key].brokage} inputType="number" name="brokage" onChange={(e) => this.SetProductDetailchannelsValue('productChannel', '', e, key)} disabled={(this.state.nonedit === true) ? true : (key === this.state.chindex + 1) ? false : true} formControlProps={{ fullWidth: true }
                    } />,

                    Action: <div><Button justIcon round simple color="info" className="add" disabled={(this.state.maxchlen > key + 1) ? ((this.state.nonedit === true) ? true : (key === this.state.chindex + 1) ? false : true) : true} onClick={(e) => this.addChannelRecord(e, key)} ><Add /> </Button >
                        <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteChannel(e, key)} ><Delete /> </Button >
                    </div>
                };

            })
        });
    }
}
////////////////////////////////////////////////////////////////////////////////////
benifitTable = () => {
    console.log("testing benefits", this.ProductDetails.benifitRangeDetails)
    if (this.ProductDetails.benifitRangeDetails.length > 0) {
        this.setState({
            benifittabledata: this.ProductDetails.benifitRangeDetails.map((prop, key) => {

                return {
                    id: key + 1,
                    // fromValue: < CustomInput value={prop.fromValue} disabled={this.state.disabled} name = "fromValue"  onChange = {(e) => this.setBenifitValue('fromValue', e, key) }     formControlProps = {{  fullWidth: true }} />,
                    fromValue: prop.fromValue,
                    toValue: < CustomInput id="padding-input" value={prop.toValue} disabled={(this.state.viewdisable == false) ? ((key == this.ProductDetails.benifitRangeDetails.length - 1) ? false : true) : true} type="numeric" inputType="number" name="toValue" onChange={(e) => this.setBenifitValue('toValue', e, key)} formControlProps={{ fullWidth: true }} />,
                    Amount: < CustomInput id="padding-input" value={prop.benefitAmount} type="numeric" inputType="number" disabled={(key == this.ProductDetails.benifitRangeDetails.length - 1) ? false : true} name="benefitAmount" onChange={(e) => this.setBenifitValue('benefitAmount', e, key)} formControlProps={{ fullWidth: true }} />,
                    Action: <div><Button color="info" disabled={(key == this.ProductDetails.benifitRangeDetails.length - 1) ? false : true} justIcon round simple className="add" onClick={(e) => this.addRecord(e, key)}><Add /></Button>
                        <Button justIcon round simple color="danger" className="remove" disabled={(key == this.ProductDetails.benifitRangeDetails.length - 1) ? false : true} onClick={(e) => this.deleteBenefit(e, key)} ><Delete /> </Button >

                    </div>
                };

            })

        });
    }
    //this.state.benifittabledata = this.ProductDetails.tblBenifitRangeDetails[0].fromValue;
    console.log("this.benefit", this.state.benifittabledata);
}

deleteBenefit = (e, index) => {
    if (this.ProductDetails.benifitRangeDetails.length > 1) {
        this.ProductDetails.benifitRangeDetails.splice(index, 1);
        this.setState({ CEFvalueDisable: true });
        this.benifitTable();

    } else {
        this.setState({ CEFvalueDisable: false });
    }
}
setbool = () => { this.setState({ boolValue: true }) }
///////////////////////////////////////////////
addRow = (value) => {

    let state = this.state;
    state.Columns = state.Columns.concat(value);
    this.setState({ state });
}

removeRow = (rowNumber) => {
    let Columns = this.state.Columns;
    Columns.splice(rowNumber, 1);
    this.setState({ Columns });
}

changeRow = (rowNumber, value) => {
    let Columns = this.state.Columns;
    Columns[rowNumber] = value;
    this.setState({ Columns });
}
//////////////////////////////////////////

handlesendemailsms = () => {
    console.log("hitting");
    fetch(`${productConfig.productConfigUrl}/api/Product/SMSBlast`, {
        method: 'Get',
        //body: JSON.stringify(this.state.productSearchDTO),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        }
    })
        .then(response => response.json())
        .then(data => {
            //if (data.status == 200) {
            swal({
                text: "Email & Text Messages sent",
                icon: "success"
            });
            //}
            //else {
            //    swal({
            //        text: "Try again later!",
            //        icon: "error"
            //    });
            //}
        });
}

render() {

    return (
        <div className="productconfig">
         
            <GridContainer>

                    <GridItem xs={12} sm={12} md={12}>
                    {this.state.pageloader ?
                    <ProductBasic ProductDTO={this.state.ProductDTO} ValidationUI={this.state.ValidationUI} errormessage={this.state.errormessage} onClick={this.onDateClick} message={this.state.message} servermessage={this.state.servermessage} onDateChange={this.onDateChange} MasterDTO={this.state.MasterDTO} GetMasterData={this.GetMasterData} masterList={this.state.masterList} SetValue={this.SetValue} classes={this.classes} activeToState={this.state.activeToState} activeFromState={this.state.activeFromState} productNameState={this.state.productNameState} productCodeState={this.state.productCodeState} productStatusIdState={this.state.productStatusIdState} message={this.state.message} validdate={this.state.validdate} datediff={this.state.datediff} viewdisable={this.state.viewdisable} />
                        : <PageContentLoader />}
                    {this.state.pageloader ?
                        <ProductDetails onBlur={this.onBlur} CEFvalueDisable={this.state.CEFvalueDisable} maxBenefitValue={this.state.maxBenefitValue} benefitinputdisable={this.state.benefitinputdisable} maxbenefiterror={this.state.maxbenefiterror} maxbenefitinputdisable={this.state.maxbenefitinputdisable} premiumerror={this.state.premiumerror} channelstableData={this.state.channelstableData} ValidationUI={this.state.ValidationUI} benifittabledata={this.state.benifittabledata} Columns={this.state.Columns} addRow={this.addRow} changeRow={this.changeRow} removeRow={this.removeRow} errormessage={this.state.errormessage} ProductDTO={this.ProductDetails} setBenifitValue={this.setBenifitValue} ctable={this.state.ctable} onInputChange={this.onInputChange} onInsurableChange={this.onInsurableChange} addRecord={this.addRecord} SetclauseValue={this.SetclauseValue} handledescription={this.handledescription} description={this.state.description} opendescription={this.state.opendescription} open={this.state.open} clauseName={this.state.clauseName} CustomClause={this.state.CustomClause} handleShow={this.handleShow} mshow={this.state.mshow} handledata={this.handledata} handleOpen={this.handleOpen} handleClose={this.handleClose} viewdisable={this.state.viewdisable} handleEdit={this.handleEdit} resultclauses={this.state.resultclauses} AddClauses={this.AddClauses} clauses={this.state.clauses} onDateChange={this.onDateChange} MasterDTO={this.state.MasterDTO} GetMasterData={this.GetMasterData} masterList={this.state.masterList} SetValue={this.SetProductDetailsValue} classes={this.classes} handleRadioChange={this.handleRadioChange} AddDetails={this.addDetails} SetRiskClaimsDetailsValue={this.SetRiskClaimsDetailsValue} masClausesWarrentiesExclusionsDTO={this.state.masClausesWarrentiesExclusionsDTO} show={this.state.show} onDateChange={this.onDateChange} handleddlChange={this.handleddlChange} benefitCriteriaValueState={this.state.benefitCriteriaValueState} premiumAmountState={this.state.premiumAmountState} tabledata={this.state.tabledata} tablelength={this.state.tabledata.length} setbool={this.setbool} boolValue={this.state.boolValue} disabled={this.state.disabled} />
                        : <PageContentLoader />}
                    {this.state.pageloader ?
                        <GridContainer lg={12} justify="center">
                            <GridItem xs={3} sm={3} md={3}>
                                <ProductSave onSave={this.handleSubmit} onCancel={this.reset} btnhide={this.state.btnhide} />
                            </GridItem>
                        </GridContainer>
                  :null}
                    {this.renderRedirect()}
                </GridItem>

          
            {this.state.visible ?
                <GridContainer>
                    <GridContainer justify="center">
                        <GridItem xs={6} sm={6} md={6}>
                            <MyUploader />
                        </GridItem>
                        <GridContainer lg={12} justify="center">
                            <GridItem xs={5} sm={2} md={3} lg={1} >
                                <Button round color="primary" onClick={() => this.handlesendemailsms()}>Send Email & SMS</Button>
                            </GridItem>
                        </GridContainer>
                    </GridContainer>
                </GridContainer>
                    : null}
                </GridContainer>
        </div>
    );
}
}
export default ProductConfig;