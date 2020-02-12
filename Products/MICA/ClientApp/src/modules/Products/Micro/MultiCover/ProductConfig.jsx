import React from "react";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ProductBasic from "./_ProductBasic.jsx";
import ProductDetails from "./_ProductDetails"

import ProductSave from "./_ProductSave.jsx";
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
import Insurables from "./Covers/_Insurables.jsx";
import CWEDetails from "../MultiCover/_CWEDetails.jsx";
import CoverInterface from "../MultiCover/CoverInterface.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';
import Mapping from "./Covers/Mapping.jsx";
import Modal from '@material-ui/core/Modal';
import withStyles from "@material-ui/core/styles/withStyles";
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
   
};

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    marginBottom: "1rem",
    right: '10px',

}

//import { content } from "html2canvas/dist/types/css/property-descriptors/content";
class ProductConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideRatingCheckBox: false,
            RatingCheckBox: false,
            errMassage: "",
            hidepremiumAmount: false,
            SelectedName: "",
            pageloader: false,
            validationmaxbenefit: false,
            checkboxdisabled: false,
            CoverCollapseShow: false,
            InitialCover: [],
            FilterCoverDTO: [],
            InsurableRiskLIst: [],
            InitialInsurable: [],
            tableInsurabledata: [],
            TypeId: "",
            RiskList: [],
            ClaimList: [],
            TypeList: [],
            checkBox: false,
            Insurabletitle: [],
            Covertitle: [],
            MasterDTOlist: [],
            countlist: 0,
            insurablecollapeslist: [
                {
                    title: "Insurables",
                    content: <Insurables />,

                }


            ],
            addbtncovershow: false,
            // addbtnshow: false,
            radiolist: [],
            // { value: "0", labelText: "Product Level", selectedValue: "1", name: "Product", flag: true }, { value: "1", labelText: "Insurable Level", selectedValue: "0", name: "Insurable", flag: false }, { value: "2", labelText: "Cover Level", selectedValue: "0", name: "Cover", flag: false }
            radiolist1: [{ cob: null, disable: false, label: null, lob: null, mID: 1, mIsRequired: false, mType: "Type", mValue: "Single Risk", planCode: null, selectedValue: 1, value: null }, { cob: null, disable: false, label: null, lob: null, mID: 0, mIsRequired: false, mType: "Type", mValue: "Multiple Risk", planCode: null, selectedValue: 1, value: null }],
            // radiolist2: [{ cob: null, disable: false, label: null, lob: null, mID: 0, mIsRequired: false, mType: "Type", mValue: "SingleCover", planCode: null, selectedValue: 0, value: null }, { cob: null, disable: false, label: null, lob: null, mID: 1, mIsRequired: false, mType: "Type", mValue: "MultipleCover", planCode: null, selectedValue: 0, value: null }],
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
            productBenefits: [
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
                }],
            benifitRangeDetails: [
                {
                    // "benefitRangeId": 0,
                    //"benifitId": 0,
                    "fromValue": "",
                    "toValue": "",
                    "benefitAmount": "",
                    "premiumAmount": ""
                }
            ],
            benifitrange: [{
                "benefitRangeId": 0,
                "benifitId": 0,
                "fromValue": "",
                "toValue": "",
                "benefitAmount": "",
                "premiumAmount": ""

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
            productCovers: [
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
                    "singleValueSelected": "0",
                    "channelId": "",
                    "cweid": "",
                    "effectiveFrom": "",
                    "effectiveTo": "",
                }],
            productInsurableItem: [],
            productInsurableItems:
            {
                "insurableItemId": 0,
                "productId": 0,
                "cweid": "",
                "isSingle": 1,
                "insurableItemTypeId": "",
                "insurableCategoryId": "",
                "productCovers": []
            },

            productCover: {

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
                "singleValueSelected": "0",
                "channelId": "",
                "cweid": "",
                "effectiveFrom": "",
                "effectiveTo": "",
                "productBenefits": [
                    //{
                    //    "currencyId": "",
                    //    "benefitId": 0,
                    //    "cweid": "",
                    //    "productId": "",
                    //    "benefitTypeId": "",
                    //    "benefitAmount": "",
                    //    "benefitCriteria": "",
                    //    "benefitCriteriaValue": "",
                    //    "maxBenefitAmount": "",
                    //    "singleValue": true,
                    //    benifitRangeDetails: [
                    //        {
                    //            // "benefitRangeId": 0,
                    //            //"benifitId": 0,
                    //            "fromValue": "",
                    //            "toValue": "",
                    //            "benefitAmount": ""
                    //        }
                    //    ],
                    //    "benifitRangeTableDetails": [],
                    //}
                ],

            },
            productRcbdetail:
            {
                "rcbdetailsId": 0,
                "productId": "",
                "productPolicyInputId": 0,
                "inputType": "",
                "isReqired": 0,
                "product": "",
                "productPolicyInput": "",
                "levelId": 0,
                "subLevelId": 0
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
                "cwetypes": "",
                "levelId": 0,
                "subLevelId": 0,

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
            "productPremium": [
                {
                    "premiumId": 0,
                    "productId": 0,
                    "currencyId": 0,
                    "premiumAmount": "",
                    "coverId": 0,
                    "levelId": 0,
                    "subLevelId": 0,
                    "description": ""
                }
            ],
            // insurableRcbdetailsDTO: [],
            insurableRcbdetails: [{

                "inputType": "string",
                "isReqired": true,
                "inputId": 0,
                "levelId": 0,
                "productId": 0,
                "coverRcbdetails": [
                    //{

                    //    "inputType": "string",
                    //    "isReqired": true,
                    //    "inputId": 0,
                    //    "levelId": 0,
                    //    "insurableRcbdetailsId": 0,
                    //    "coverChildRcbdetails": [
                    //        {

                    //            "inputType": "string",
                    //            "isReqired": true,
                    //            "inputId": 0,
                    //            "coverRcbdetailsId": 0
                    //        }
                    //    ]
                    //}
                ],
                "insurableChildRcbdetails": [
                    {

                        "inputType": "string",
                        "isReqired": true,
                        "inputId": 0,
                        "insurableRcbdetailsId": 0
                    }
                ]
            }

            ],
            ProductDTO: {
                "productId": 0,
                "lobid": "",
                "rateingId":0,
                "isSingleCover": true,
                "isMasterPolicy": false,
                "isCoverEvent": false,
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
                //"productCovers": [],
                "productInsurableItems": [],
                "productRcbdetails": [],
                "riskDetails": [],
                "claimDetails": [],
                "tblmasClausesWarrentiesExclusions": [],
                "productPremium": [],
                "insurableRcbdetails": [],
                "productSwitchOnProperty": [],
                "CalculateConfig":[]
            },
            ProductDTOs: {},
            description: "",
            indexRow: 0,
            clauseName: "",
            cwe: [],
            cweList: [],
            value: [],
            mvalue: [],
            prodchan: [],
            clauses: [],
            MasterDTO: {
                Switchon: [],
                InsurableTypeMaster: [],
                CoverMaster: [],
                LOB: [],
                COB: [],
                Cover: [],
                CoverEvent: [],
                CoverEventFactor: [],
                CoverEventFactorValue: [],
                InsuranceType: [],
                Risk: [],
                Claim: [],
                channel: [],
                BenefitCriteria: [],
                InsurableCategory: [],
                TableList: {
                    InsurablesTable: [],


                },
                MasterList: {
                    InsurablesClause: [],


                },
                checkBox: false,
                ChangeTableList: {
                    tableInsurabledata: []
                },
                tableInsurabledata: [],
                mappingPop: false,
                
            },
        };
        this.ProductDetails = {
            "insurableRcbdetails": this.state.insurableRcbdetails,
            "ProductDTO": this.state.ProductDTO,
            "productCover": this.state.productCover,
            "productBenefit": this.state.productBenefits,
            "productRcbdetail": this.state.productRcbdetail,
            "productInsurableItem": this.state.productInsurableItem,
            "productInsurableItems": this.state.productInsurableItems,
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
        this.addInsurableCWEFun = this.addInsurableCWEFun.bind(this);
        this.GetInusrableMasterData = this.GetInusrableMasterData.bind(this);
        this.GetMasterData = this.GetMasterData.bind(this);
        this.GetMasterService = this.GetMasterService.bind(this);
        this.GetClausesData = this.GetClausesData.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.AddClauses = this.AddClauses.bind(this);
        this.AddCWEClauses = this.AddCWEClauses.bind(this);
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

        this.onChangeradio = this.onChangeradio.bind(this);
        this.handleTreeChange = this.handleTreeChange.bind(this);
        this.SetCoverEventValue = this.SetCoverEventValue.bind(this);
        this.dataCWETable = this.dataCWETable.bind(this);
        this.handledescriptionCWE = this.handledescriptionCWE.bind(this);
        this.handleEditCWE = this.handleEditCWE.bind(this);
        this.handleOpenCWE = this.handleOpenCWE.bind(this);
        this.handleShowCWE = this.handleShowCWE.bind(this);
        this.handleCloseCWE = this.handleCloseCWE.bind(this);
        this.SetValueCWE = this.SetValueCWE.bind(this);
        this.SetCoverProductDetailsValue = this.SetCoverProductDetailsValue.bind(this);
        this.GetClausesMasterData = this.GetClausesMasterData.bind(this);
        this.SetInsurableRiskClaimsDetailsValue = this.SetInsurableRiskClaimsDetailsValue.bind(this);
        this.SetCoverRiskClaimsDetailsValue = this.SetCoverRiskClaimsDetailsValue.bind(this);
        this.addinurablelist = this.addinurablelist.bind(this);
        //this.compareBy=this.compareBy.bind(this);
        ////this.sortBy= this.sortBy.bind(this);
    }

    handleSubmit = event => {
        this.state.ValidationUI = true;
        event.preventDefault();

        console.log("save Data", this.ProductDetails);
        this.IsValidProductDetails(this.ProductDetails);

        if (this.state.ValidationUI === true) {


            let pks = this.ProductDetails.ProductDTO.activeFrom;
            let dks = this.ProductDetails.ProductDTO.activeTo;
            let effTotal = this.ProductDetails.productChannel;
            //let effTo = this.ProductDetails.productChannel.effectiveTo;

            this.state.ProductDTO.activeFrom = this.datechange(this.ProductDetails.ProductDTO.activeFrom);
            this.state.ProductDTO.activeTo = this.datechange(this.ProductDetails.ProductDTO.activeTo);

            if (this.state.MasterDTO.TableList.InsurablesTable.length > 0) {
                for (var i = 0; i < this.state.MasterDTO.TableList.InsurablesTable.length; i++) {
                    this.ProductDetails.productClausesWarrentiesExclusion = [...this.ProductDetails.productClausesWarrentiesExclusion, ...this.state.MasterDTO.TableList.InsurablesTable[i].InsurablesTableList];
                    if (this.state.MasterDTO.TableList.InsurablesTable[i].CoversTable.length > 0) {
                        for (var j = 0; j < this.state.MasterDTO.TableList.InsurablesTable[i].CoversTable.length; j++) {
                            this.ProductDetails.productClausesWarrentiesExclusion = [...this.ProductDetails.productClausesWarrentiesExclusion, ...this.state.MasterDTO.TableList.InsurablesTable[i].CoversTable[j].CoversTableList];

                            if (this.state.MasterDTO.TableList.InsurablesTable[i].CoversTable[j].BenefitTable.BenefitTableList.length > 0) {
                                this.ProductDetails.productClausesWarrentiesExclusion = [...this.ProductDetails.productClausesWarrentiesExclusion, ...this.state.MasterDTO.TableList.InsurablesTable[i].CoversTable[j].BenefitTable.BenefitTableList];
                            }
                        }

                    }
                }
            }


            let productDTO = this.state.ProductDTO;

            let Inlen = this.ProductDetails.insurableRcbdetails.length - 1;
            while (Inlen >= 0) {
                this.ProductDetails.insurableRcbdetails[Inlen].coverRcbdetails = this.ProductDetails.insurableRcbdetails[Inlen].coverRcbdetails.filter(item => item.inputId !== 0);
                Inlen--;
            }




            this.ProductDetails.insurableRcbdetails = this.ProductDetails.insurableRcbdetails.filter(item => item.inputId !== 0);

            console.log("insurableRcbdetails", this.ProductDetails.insurableRcbdetails, this.ProductDetails.productInsurableItem);




            //if (this.IsValidCover(this.ProductDetails.productCover)) {
            //let productCovers = this.state.ProductDTO.productCovers;
            //let newCov = { ...this.ProductDetails.productCover };
            //const list = [...productCovers, newCov];
            //productDTO['productCovers'] = list;
            //}
            //if (this.IsValidBenefit(this.ProductDetails.productBenefit)) {
            console.log("i m here")
            //  productDTO['productBenefits'] = [];

            //let productBenefits = this.state.ProductDTO.productBenefits;
            //let newBenefit = { ...this.ProductDetails.productBenefit };
            //const benfitlist = [...productBenefits, newBenefit];
            //productDTO['productBenefits'] = benfitlist;

            //if (this.ProductDetails.productCover.singleValue == true) {
            //    this.ProductDetails.productBenefit.benifitRangeDetails = [];
            //}
            //else {
            //    this.ProductDetails.productBenefit.benifitRangeDetails = this.ProductDetails.benifitRangeDetails;
            //}

            if (this.ProductDetails.productPremium.length > 0) {


                productDTO.premiumAmount = this.ProductDetails.productPremium[0].premiumAmount;
            }
            // For Risk
            productDTO['riskDetails'] = this.state.MasterDTO.Risk;
            //For claims
            productDTO['claimDetails'] = this.state.MasterDTO.Claim;
            //Clauses
            productDTO['productClausesWarrentiesExclusions'] = this.ProductDetails.productClausesWarrentiesExclusion;
            //insurableitem
            productDTO['productInsurableItems'] = [];

            //let productinsuerables = this.state.ProductDTO.productInsurableItems;
            //let newinsurable = { ...this.ProductDetails.productInsurableItem };
            //const inurablelist = [...productinsuerables, newinsurable];
            productDTO['productInsurableItems'] = this.ProductDetails.productInsurableItem;

            // const Inlen = productDTO['productInsurableItems'].length;


            //premium
            //productDTO['productPremium'] = [];
            //let productpremium = this.state.ProductDTO.productPremium;
            //let newpremium = { ...this.ProductDetails.productPremium };
            //const premiumlist = [...productpremium, newpremium];
            productDTO['productPremium'] = this.ProductDetails.productPremium;


            productDTO['productSwitchOnProperty'] = this.state.MasterDTO.Switchon;


            productDTO['insurableRcbdetails'] = this.ProductDetails.insurableRcbdetails;


            // if (this.ProductDetails.productChannel.channelName) {
            //Channels


            productDTO['productChannels'] = [];
            console.log("pro channel", this.ProductDetails.productChannel);



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

            //  this.state.ProductDTOs = this.state.ProductDTO;

            //let Ilen = this.ProductDetails.productInsurableItem.length - 1;
            //while (Ilen >= 0) {

            //    console.log("this.ProductDetails.productInsurableItem[Ilen]", this.ProductDetails.productInsurableItem, this.ProductDetails.productInsurableItems)
            //    for (var j = 0; j < this.ProductDetails.productInsurableItem[Ilen].productCovers.length; j++) {

            //        if (this.ProductDetails.productInsurableItem[Ilen].productCovers[j].singleValue == true) {

            //            this.ProductDetails.productInsurableItem[Ilen].productCovers[j].productBenefits[0].benifitRangeDetails = [];
            //        } else {


            //            // this.ProductDetails.productInsurableItem[Ilen].productCovers[j].productBenefit[0].benifitRangeDetails=
            //        }

            //    }
            //    Ilen--;
            //    console.log("check benifitRangeDetails", this.ProductDetails.productInsurableItem[Ilen], Ilen)
            //}



            this.setState({ productDTO });




            // let productDTOs = this.state.ProductDTOs;

            //productDTOs['productInsurableItems'].pop();//delete insurable
            //const deleteinsurable = productDTOs['productInsurableItems'].pop();//delete insurable
            //console.log("deleteinsurable", deleteinsurable);
            //const currlen = productDTOs['productInsurableItems'].length
            ////const lastcover=productDTO['productInsurableItems'][currlen - 1].productCovers.length;
            //// const deletedCover = productDTO['productInsurableItems'][currlen - 1].productCovers[lastcover-1];
            //debugger
            //for (var i = 0; i < currlen; i++) {
            //    const coverlen = productDTOs['productInsurableItems'][i].productCovers.length;
            //    if (coverlen > 0) {
            //        productDTOs['productInsurableItems'][i].productCovers.pop();//delete cover
            //        //delete cover
            //    }
            //}
            //this.setState({ productDTOs });
            /*
            const FilterDTO = this.state.ProductDTOs.productInsurableItems.filter(item => item.insurableCategoryId !== "");
            const FilterinsurableRcbdetails = this.state.ProductDTOs.insurableRcbdetails.filter(item => item.inputId !== 0);
            for (var i = 0; i < FilterDTO.length; i++) {
                const coverlen = productDTOs['productInsurableItems'][i].productCovers.length;
                if (coverlen > 0) {
                    productDTOs['insurableRcbdetails'][i].coverRcbdetails.pop();//delete RCBcover
                    productDTOs['productInsurableItems'][i].productCovers.pop();//delete cover
                    //delete cover
                    for (var s = 0; s < productDTOs['productInsurableItems'][i].productCovers.length; s++) {
                        if (productDTOs['productInsurableItems'][i].productCovers[s].singleValue === true) {
    
                            productDTOs['productInsurableItems'][i].productCovers[s].productBenefits[0].benifitRangeDetails = [];
                        }
                    }
                }
            }
            console.log("last productDTO", this.state.ProductDTO)
            productDTOs['productInsurableItems'] = FilterDTO;
            productDTOs['insurableRcbdetails'] = FilterinsurableRcbdetails;
            this.setState({ productDTOs });
            console.log("last productDTO", this.state.ProductDTOs)
            */

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
                    }


                }


                );


            this.ProductDetails.ProductDTO.activeFrom = pks;
            this.ProductDetails.ProductDTO.activeTo = dks;
            for (let i = 0; i <= this.ProductDetails.productChannel.length - 1; i++) {
                this.ProductDetails.productChannel[i].effectiveFrom = efff[i];
                this.ProductDetails.productChannel[i].effectiveTo = effto[i];

            }
            // this.ProductDetails.productChannel.effectiveFrom = effFrm;
            // this.ProductDetails.productChannel.effectiveTo = effTo;
            //} else {
            //    swal("", "Some fields are missing", "error");


            //    this.state.ProductDTO.productId = "";
            //    this.state.ProductDTO.productCode = "";
            //    this.state.ProductDTO.productStatusId = "";



        } else {
            //this.state.ProductDTO.activeFrom = "";
            //this.state.ProductDTO.activeTo = "";

            this.setState({ errormessage: true });
            swal("", this.state.errMassage, "error");

        }
        //const lenn=productDTO['productInsurableItems'].length;
        //productDTO['productInsurableItems'] = productDTO['productInsurableItems'].concat(deleteinsurable)
        //for (var i = 0; i < lenn; i++) {
        //    const coverlenn = productDTO['productInsurableItems'][i].productCovers.length;
        //    if (coverlenn > 0) {

        //        productDTO['productInsurableItems'][i].productCovers.concat(deletedCover);//delete cover
        //    }
        //}
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
            this.setState({});
            console.log("pks", pks);
        } else {
            this.ProductDetails.productClausesWarrentiesExclusion = this.ProductDetails.productClausesWarrentiesExclusion.filter(p => p.cweid !== currentNode.cweid);
            console.log("currentNode", this.state.cwe);
            pks[0].checked = false;
            this.setState({});
        }
        this.AddClauses();
        console.log("pks1", this.ProductDetails.productClausesWarrentiesExclusion);
    }

    handleTreeChange = (currentNode, level, Iindex = 0, Cindex = 0) => {

        //if (level === "Insurable Item") {
        //    console.log("currentNode", currentNode);
        //    let InsurList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList.filter(item => item.cweid == currentNode.cweid);
        //    if (currentNode.checked === true) {

        //        this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.push(currentNode);

        //        console.log("pks", InsurList);
        //        InsurList[0].checked = true;
        //        this.setState({});

        //    } else {
        //        this.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].InsurablesClauseList.filter(item => item.cweid !== currentNode.cweid);
        //        console.log("currentNode", this.state.cweList);
        //        InsurList[0].checked = false;
        //        this.setState({});
        //    }
        //} else if (level === "Cover") {
        //    let CoverList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList.filter(item => item.cweid == currentNode.cweid);
        //    if (currentNode.checked === true) {

        //        this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.push(currentNode);

        //        console.log("pks", CoverList);
        //        CoverList[0].checked = true;
        //        this.setState({});

        //    } else {
        //        this.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].CoversList.filter(item => item.cweid !== currentNode.cweid);
        //        console.log("currentNode", this.state.cweList);
        //        CoverList[0].checked = false;
        //        this.setState({});
        //    }

        //} else if (level === "Benefit") {

        //    let BenefitList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList.filter(item => item.cweid == currentNode.cweid);
        //    if (currentNode.checked === true) {

        //        this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.push(currentNode);

        //        console.log("pks", BenefitList);
        //        BenefitList[0].checked = true;
        //        this.setState({});

        //    } else {
        //        this.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause[Cindex].BenefitList.filter(item => item.cweid !== currentNode.cweid);
        //        console.log("currentNode", this.state.cweList);
        //        BenefitList[0].checked = false;
        //        this.setState({});
        //    }

        // }
        this.AddCWEClauses(level, Iindex, Cindex);
        console.log("pks1", this.state.MasterDTO.MasterList.InsurablesClause);
    }
    callbenefitmassage = (event, index, Iindex, Cindex) => {
        if (eval(this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].fromValue) > eval(this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].toValue)) {
            swal("", "Cover to value Can not more then from Cover From value", "error");
        }
        else if (eval(this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].fromValue) === eval(this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].toValue)) {
            swal("", "Cover event To value cannot be equal from Cover event from value", "error");
        }
        else if (eval(this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails[index].toValue) > eval(this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].coverEventFactorValueTo)) {
            swal("", "Cover event factor to value can not be beyond range defined", "error");
        }
    }
    addRecord = (event, index, Iindex, Cindex) => {
        event.preventDefault();
        const benefitValues = this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0];
        const CoverValue = this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex];
        if (benefitValues.benifitRangeDetails[index].fromValue !== "" && benefitValues.benifitRangeDetails[index].toValue !== "" && benefitValues.benifitRangeDetails[index].benefitAmount !== "") {
            if (eval(benefitValues.benifitRangeDetails[index].fromValue) < eval(benefitValues.benifitRangeDetails[index].toValue) && eval(benefitValues.benifitRangeDetails[index].toValue) < eval(CoverValue.coverEventFactorValueTo) && eval(benefitValues.benifitRangeDetails[index].fromValue) <= eval(CoverValue.coverEventFactorValueTo)) {

                let len = benefitValues.benifitRangeDetails.length - 1;
                let x = eval(benefitValues.benifitRangeDetails[len].toValue) + 1;
                //  let ProductDetails = this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0];
                benefitValues['benifitRangeDetails'] = benefitValues.benifitRangeDetails.concat({ fromValue: x, toValue: "", benefitAmount: "" });

            }
            else if (eval(benefitValues.benifitRangeDetails[index].fromValue) > eval(benefitValues.benifitRangeDetails[index].toValue)) {
                swal("", "Cover to value cannot be more then from Cover From value", "error");
            }
            else if (eval(benefitValues.benifitRangeDetails[index].fromValue) === eval(benefitValues.benifitRangeDetails[index].toValue)) {
                swal("", "Cover event To value cannot be equal from Cover event from value", "error");
            }
            else if (eval(benefitValues.benifitRangeDetails[index].toValue) > eval(CoverValue.coverEventFactorValueTo)) {
                swal("", "Cover event factor to value cannot be beyond range defined", "error");
            }
        }
        this.setState({ benefitValues, CoverValue });
        this.benifitTable(Iindex, Cindex);
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

    handleOpenCWE(level, Iindex, Cindex, index) {


        //if (level == "Insurable Item") {
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex = index;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].open = true;

        //    // this.setState({ description: this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
        //    this.setState({});
        //}

        //if (level == "Cover") {
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList[index].description;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex = index;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].open = true;

        //    // this.setState({ description: this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
        //    this.setState({});
        //}

        //if (level == "Benefit") {
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex = index;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].open = true;

        //    // this.setState({ description: this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description, indexRow: index });
        //    this.setState({});
        //}

    };
    handleEdit(index) {
        this.setState({ description: this.ProductDetails.productClausesWarrentiesExclusion[index].description, indexRow: index });
        this.setState({ opendescription: true });
    };

    handleEditCWE(level, Iindex, Cindex, index) {

        //if (level == "Insurable Item") {
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList[index].description;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex = index;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = true;
        //    this.setState({});
        //}
        //if (level == "Cover") {
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList[index].description;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex = index;
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = true;
        //    this.setState({});

        //}
    };

    handledescription() {
        let editdescription = [...this.ProductDetails.productClausesWarrentiesExclusion];
        editdescription[this.state.indexRow].description = this.state.description;
        this.setState({ editdescription });
        this.setState({ opendescription: false });
    }
    handledescriptionCWE(level, Iindex, Cindex = 0) {
        //if (level == "Insurable Item") {
        //    let editdescription = [...this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList];
        //    editdescription[this.state.MasterDTO.TableList.InsurablesTable[Iindex].tindex].description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].description;
        //    this.setState({ editdescription });
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = false;
        //    this.setState({});
        //}
        //if (level == "Cover") {

        //    let editdescription = [...this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList];
        //    editdescription[this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].tindex].description = this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description;
        //    this.setState({ editdescription });
        //    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = false;
        //    this.setState({});
        //}

    }


    handleShow() {
        this.setState({ mshow: true });

    };
    handleShowCWE = (level, Iindex, Cindex = 0) => {
        if (level == "Insurable Item") {
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].mshow = true;

            this.setState({});
        }
        if (level == "Cover") {
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].mshow = true;

            this.setState({});
        }

    };
    handleClose() {
        this.setState({ open: false });
        this.setState({ mshow: false });
        this.setState({ opendescription: false });
    };
    handleCloseCWE(level, Iindex, Cindex) {
        if (level == "Insurable Item") {
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].open = false;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].mshow = false;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].opendespcription = false;
            this.setState({});
        }
        if (level == "Cover") {
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].open = false;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].mshow = false;
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].opendespcription = false;
            this.setState({});
        }
    };

    SetValue = (type, event) => {

        this.setState({ message: false });
        let ProductDTO = this.state.ProductDTO;
        let name = event.target.name;
        let value = event.target.value;
        ProductDTO[name] = value;
        console.log("check validation value", value);
        this.setState({ ProductDTO });
        this.change(event, name, type);

        if (name === "productCode") {

            fetch(`${productConfig.productConfigUrl}/api/Product/ProductCodevalidation?productcode=` + value, {

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
    setBenifitValue = (columnName, event, index, Iindex, Cindex) => {
        //console.log("columnName", columnName, event);
        //let responses = [... this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails];
        //if (columnName === 'benefitAmount') {
        //    responses[index].benefitAmount = event.target.value;
        //    this.callbenefitmassage(event, index, Iindex, Cindex)
        //}
        //if (columnName === 'toValue') {
        //    responses[index].toValue = event.target.value;
        //}
        //if (columnName === 'fromValue') {
        //    responses[index].fromValue = event.target.value;
        //}
        //this.setState({ responses });

        //this.benifitTable(Iindex, Cindex);
        //console.log("react table benefit", this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails);

    }


    SetValueCWE = (event, level, Iindex, Cindex = 0) => {

        const value = event.target.value;
        if (level == "Insurable Item") {
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].description = value;
            this.setState({});
        }
        if (level == "Cover") {
            this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].description = value;
            this.setState({});
        }

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
            this.ProductDetails.ProductDTO.premiumAmount = value;

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
        // this.benifitTable();
        //this.channelsTable();
    }
    /////////////////////////////////////////////////////////////////////
    SetCoverProductDetailsValue = (callcomponent, event, index, Iindex) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log("Insurableindex", Iindex)
        if (callcomponent === 'clauseDescription') {
            this.setState({ description: value });
        } else {
            if (callcomponent === 'productBenefits') {

                let ProductBenefit = this.ProductDetails.productInsurableItem[Iindex]['productCovers'][index][callcomponent][0];

                ProductBenefit[name] = value;

                this.setState({ ProductBenefit });

            }
            else if (callcomponent === 'productPremium') {

                let Productpremium = this.ProductDetails.productPremium;

                if (name === "currencyId") {

                    let Prelen = this.ProductDetails.productPremium.length - 1;
                    while (Prelen >= 0) {
                        this.ProductDetails.productPremium[Prelen].currencyId = value;
                        Prelen--;
                    }
                }


                Productpremium[index][name] = value;

                this.setState({ Productpremium });
            }
            else {
                let ProductCover = this.ProductDetails.productInsurableItem[Iindex][callcomponent][index];

                ProductCover[name] = value;

                this.setState({ ProductCover });
            }
        }


        if (callcomponent === 'productCovers') {

            if (event.target.name === "coverEventFactorValueFrom") {

                const ProductCoverData = this.ProductDetails.productInsurableItem[Iindex][callcomponent][index];
                ProductCoverData.productBenefits[0].benifitRangeDetails[0].fromValue = value;
                //  this.ProductDetails.productInsurableItem[Iindex].productCovers[index].productBenefits[0].benifitRangeDetails[0].fromValue = value;
                this.setState({ ProductCoverData });
                console.log(" this.ProductDetails.benifitRangeDetails", this.ProductDetails.benifitRangeDetails)
            }

        }

        //if (name === "premiumAmount") {
        //    this.ProductDetails.ProductDTO.premiumAmount = value;
        //}

        //if (value !== "") {
        //    if (name === "benefitCriteriaValue" && this.state.maxbenefitinputdisable === false) {
        //        this.setState({ maxbenefitinputdisable: true });
        //    } else if (name === "maxBenefitAmount" && this.state.benefitinputdisable === false) {
        //        this.setState({ benefitinputdisable: true });
        //    }

        //} else {
        //    if (name === "benefitCriteriaValue") { this.setState({ maxbenefitinputdisable: false }); }
        //    if (name === "maxBenefitAmount") { this.setState({ benefitinputdisable: false }); }
        //}

        console.log("SetProductDetailsValue", this.ProductDetails, name, value)
        //this.benifitTable(Iindex, index);
        //this.channelsTable();
    }
    /////////////////////////////////////////////////////////////////////////

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

    GetInusrableMasterData = (type, addType, event, Iindex, Cindex = 0) => {
        //index=>Cindex
        console.log("index", Cindex, Iindex);
        this.SetValue(type, event);
        let name = event.target.name;
        let value = event.target.value;
        console.log("insurablelist", this.ProductDetails);
        const filtertype = this.state.RiskList.filter(m => m.mValue === "Insurable Item");
        const filterClaimtype = this.state.ClaimList.filter(m => m.mValue === "Insurable Item");

        if (name == "coverTypeId") {
            const Covertemp = this.state.MasterDTO.Cover[Iindex][0].filter(item => item.mID == value);
            console.log("Covertemp", Covertemp, this.state.MasterDTO.Cover[Iindex]);
            this.ProductDetails.insurableRcbdetails[Iindex].coverRcbdetails[Cindex].inputType = Covertemp[0].mValue;
            this.ProductDetails.insurableRcbdetails[Iindex].coverRcbdetails[Cindex].levelId = filtertype[0].mID;
            this.ProductDetails.insurableRcbdetails[Iindex].coverRcbdetails[Cindex].inputId = value;
            this.GetRiskClaimMaster('Risk', filtertype[0].mID, event.target.value);
            this.GetRiskClaimMaster('Claim', filterClaimtype[0].mID, event.target.value);
        }
        if (name === "insurableItemTypeId" || name === "insurableCategoryId") {
            const reg = this.ProductDetails[addType];

            reg[name] = value;
            this.setState({ reg });

            if (name === "insurableItemTypeId") {

                this.ProductDetails.insurableRcbdetails[Iindex].levelId = filtertype[0].mID;
                const Insurabletypetemp = this.state.MasterDTO.InsuranceType.filter(item => item.mID == value);
                this.ProductDetails.insurableRcbdetails[Iindex].inputType = Insurabletypetemp[0].mValue;

                this.ProductDetails.insurableRcbdetails[Iindex].inputId = value;

            }

            console.log("event", event.target.name)
            console.log("insurableRcbdetails", this.ProductDetails.insurableRcbdetails[Iindex])

        } else {
            const reg = this.ProductDetails.productInsurableItem[Iindex];
            reg[addType][Cindex][name] = value;
            this.setState({ reg });
        }
        if (type === "Cover") {

            if (filtertype.length > 0) {
                this.GetRiskClaimMaster('Risk', filtertype[0].mID, event.target.value);
                this.GetRiskClaimMaster('Claim', filterClaimtype[0].mID, event.target.value);
            }
        }

        if (type != "") {
            if (type === "CoverEventFactorValue") {
                this.GetMasterService(type, event.target.value, Iindex, Cindex);
                console.log("sending index", Iindex, Cindex);
            } else if (type !== "CoverEventFactor") {
                this.GetMasterService(type, event.target.value);
            }
            else {
                if (type === "CoverEventFactor") {
                    this.GetMasterService('BenefitCriteria', event.target.value, Iindex, Cindex);
                    // this.GetMasterService('Risk', event.target.value);
                    //this.GetMasterService('Claim', event.target.value);
                }
                this.GetMasterService(type, event.target.value, Iindex, Cindex);
                console.log("sending index2", Iindex, Cindex);
            }

        }

        this.setState({});
        console.log("reg", this.ProductDetails.productInsurableItem);
    }
    GetClausesData = (type, addType, event, level, Iindex = 0, Cindex = 0) => {

        console.log("index", Iindex);
        //// this.SetValue(type, event);


        ////let reg = this.state[addType][0];
        ////let name = event.target.name;
        ////let value = event.target.value;
        ////reg[name] = value;
        ////console.log("event", event.target.name)
        ////this.setState({ reg });

        //if (type === "Clauses") {
        //    //if (level === "Product") {
        //    //    this.ProductDetails.productInsurableItem[0].productCovers[0].cweid = event.target.value;

        //    //    this.GetCWEService(type, event.target.value, "51");
        //    //}
        //    if (level === "Insurable Item") {
        //        this.ProductDetails.productInsurableItem[Iindex].cweid = event.target.value;
        //        this.GetCWEService(type, event.target.value, "52", Iindex);
        //    }
        //    if (level === "Cover") {
        //        this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].cweid = event.target.value;
        //        this.GetCWEService(type, event.target.value, "53", Iindex, Cindex);
        //    }
        //    if (level === "Benefit") {
        //        this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].cweid = event.target.value;
        //        this.GetCWEService(type, event.target.value, "54", Iindex, Cindex);
        //    }
        //}
        //this.setState({});
    }

    GetClausesFilterData = (type, addType, event, level, Iindex = 0, Cindex = 0) => {

        console.log("index", Iindex);
        // this.SetValue(type, event);


        //let reg = this.state[addType][0];
        //let name = event.target.name;
        //let value = event.target.value;
        //reg[name] = value;
        //console.log("event", event.target.name)
        //this.setState({ reg });

        if (type === "Clauses") {
            //if (level === "Product") {
            //    this.ProductDetails.productInsurableItem[0].productCovers[0].cweid = event.target.value;

            //    this.GetCWEService(type, event.target.value, "51");
            //}
            const LevelmID = this.state.TypeList.filter(s => s.mValue == level)[0].mID;
            if (LevelmID != undefined) {
                if (level === "Insurable Item") {
                    this.ProductDetails.productInsurableItem[Iindex].cweid = event.target.value;
                    this.GetCWEService(type, event.target.value, LevelmID, Iindex);
                }
                if (level === "Cover") {
                    this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].cweid = event.target.value;
                    this.GetCWEService(type, event.target.value, LevelmID, Iindex, Cindex);
                }
                if (level === "Benefit") {
                    this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].cweid = event.target.value;
                    this.GetCWEService(type, event.target.value, LevelmID, Iindex, Cindex);
                }
            }
        }
        this.setState({});
    }

    GetClausesMasterData = (type, addType, event, index) => {

        console.log("index", index);
        this.SetValue(type, event);


        let reg = this.state[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[0][name] = value;
        console.log("event", event.target.name)
        this.setState({ reg });

        if (type === "Clauses") {


            this.GetCWEService(type, event.target.value, "51");
        }
    }

    GetMasterData = (type, addType, event, index) => {

        console.log("index", index);
        this.SetValue(type, event);


        let reg = this.state[addType];
        let name = event.target.name;
        let value = event.target.value;
        reg[name] = value;
        console.log("event", event.target.name)
        this.setState({ reg });

        if (type === "Clauses") {


            this.GetCWEService(type, event.target.value, "51");
        }
        else if (type === "channels") {

            const reg = this.state[addType];

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

                const filtertype = this.state.TypeList.filter(m => m.mValue === "Product");




                // console.log("FilterTypeList", FilterTypeList);
                //this.GetMasterService('InsuranceType', 0);
                ////this.GetMasterService('Cover', event.target.value);
                //// this.GetMasterService('CoverEvent', event.target.value);
            }
            if (type === "CoverEventFactor") {
                this.GetMasterService('BenefitCriteria', event.target.value);
                //  this.GetMasterService('Risk', event.target.value);
                //this.GetMasterService('Claim', event.target.value);
            }
            if (type === "InsurableCategory") {
                this.GetMasterService('Switchon', value);
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

    GetMasterService = (type, pID, Iindex = 0, Cindex = 0) => {

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
                console.log("data come from server", data);
                if (type === "Cover") {
                    this.state.MasterDTO['CoverMaster'] = this.state.MasterDTO['CoverMaster'].concat(data);

                    const arr = [];
                    arr.push(data);
                    this.state.MasterDTO[type].push(arr);
                    console.log("MasterDTOData", this.state.MasterDTO);
                    this.setState({});


                    //let len = this.ProductDetails.productInsurableItem.productCovers[];

                    ///*remove dublicate  List obj  for Cover  */

                    //while (len > 0) {
                    //    const findex = lData.findIndex(x => x.mID == this.ProductDetails.productInsurableItem[Iindex].coverTypeId);
                    //        if (findex != -1) {
                    //            lData.splice(findex, 1);
                    //        }
                    //        console.log("sData", findex, lData, this.ProductDetails.productInsurableItem[Iindex])
                    //        len--;
                    //    }


                }




                //else if (type == "CoverEventFactor") {
                //    debugger
                //    const arr = [];
                //    arr.push(data);

                //    if (Iindex >= this.state.MasterDTO[type].length) {
                //        this.state.MasterDTO[type].push(arr);
                //        console.log("MasterDTOData1", this.state.MasterDTO, Iindex);
                //        this.setState({});
                //    } else {
                //        if (Cindex <= this.state.MasterDTO[type][Iindex].length) {
                //            this.state.MasterDTO[type][Iindex][Cindex] = data;
                //            console.log("MasterDTOData2", data, this.state.MasterDTO);
                //            this.setState({});
                //        } else {
                //            this.state.MasterDTO[type][Iindex][Cindex].push(data);
                //            console.log("MasterDTOData2", data, this.state.MasterDTO);
                //            this.setState({});
                //        }
                //    }
                //}
                //else if (type == "CoverEventFactorValue") {//SAME AS CoverEventFactor
                //    console.log("sending index1", Iindex, Cindex);
                //    const arr = [];
                //    arr.push(data);

                //    if (Iindex >= this.state.MasterDTO[type].length) {
                //        this.state.MasterDTO[type].push(arr);
                //        console.log("MasterDTOData5", this.state.MasterDTO, Iindex, Cindex);
                //        this.setState({});
                //    } else {
                //        if (Cindex <= this.state.MasterDTO[type][Iindex].length) {
                //            this.state.MasterDTO[type][Iindex][Cindex] = data;
                //            console.log("MasterDTOData4", data, this.state.MasterDTO, Iindex, Cindex);
                //            this.setState({});
                //        } else {
                //            this.state.MasterDTO[type][Iindex][Cindex].push(data);
                //            console.log("MasterDTOData3", data, this.state.MasterDTO, Iindex, Cindex);
                //            this.setState({});
                //        }
                //    }
                //}
                //else if (type == "BenefitCriteria") {//SAME AS CoverEventFactor
                //    console.log("sending index1", Iindex, Cindex);
                //    const arr = [];
                //    arr.push(data);

                //    if (Iindex >= this.state.MasterDTO[type].length) {
                //        this.state.MasterDTO[type].push(arr);
                //        console.log("MasterDTOData5", this.state.MasterDTO, Iindex, Cindex);
                //        this.setState({});
                //    } else {
                //        if (Cindex <= this.state.MasterDTO[type][Iindex].length) {
                //            this.state.MasterDTO[type][Iindex][Cindex] = data;
                //            console.log("MasterDTOData4", data, this.state.MasterDTO, Iindex, Cindex);
                //            this.setState({});
                //        } else {
                //            this.state.MasterDTO[type][Iindex][Cindex].push(data);
                //            console.log("MasterDTOData3", data, this.state.MasterDTO, Iindex, Cindex);
                //            this.setState({});
                //        }
                //    }
                //}
                //if (type === "Risk") {


                //    this.state.MasterDTO[type] = this.state.MasterDTO[type].concat(data);


                //}

                else {
                    const lData = data;
                    let locDTO = this.state.MasterDTO;


                    console.log("GetMasterService", data, pID, this.ProductDetails.productInsurableItem);

                    if (type === "InsuranceType") {
                        let len = this.ProductDetails.productInsurableItem.length;

                        /*remove dublicate  List obj  for Insurable  */
                        if (this.ProductDetails.productInsurableItem.filter(s => s.insurableCategoryId === pID).length > 0) {

                            while (len > 0) {
                                const findex = lData.findIndex(x => x.mID == this.ProductDetails.productInsurableItem[len - 1].insurableItemTypeId);
                                if (findex != -1) {
                                    lData.splice(findex, 1);
                                }
                                console.log("sData", findex, lData, this.ProductDetails.productInsurableItem[len - 1])
                                len--;
                            }
                            locDTO[type] = lData;

                        } else {
                            locDTO[type] = lData;
                        }

                        locDTO["InsurableTypeMaster"] = locDTO["InsurableTypeMaster"].concat(lData);

                    } else {
                        locDTO[type] = lData;
                    }

                    this.setState({ locDTO });

                }
            });

        //if (type === "COB") {
        //    this.FilterType();
        //}
        console.log("MasterDTOData", this.state.MasterDTO);
    };
    //FilterType = () => {

    //    const FilterTypeList = this.state.TypeList.filter(item => item.mValue == "Product");
    //    const Risklen = this.state.MasterDTO.Risk.length;
    //    if (Risklen > 0) {
    //        for (var i = 0; i < Risklen; i++) {
    //            if (this.state.MasterDTO.Risk[i].levelId === "") {
    //                this.state.MasterDTO.Risk[i].levelId = FilterTypeList[0].mID;
    //            }
    //        }
    //    }
    //}

    GetRiskClaimMaster = (type, typeId, pID) => {

        //fetch(`https://localhost:44347/api/Product/GetRiskClaimMaster?masterType=` + type + `&parentID=` + pID)
        fetch(`${productConfig.productConfigUrl}/api/Product/GetRiskClaimMaster?masterType=` + type + `&typeId=` + typeId + `&parentID=` + pID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("data  server", data);
                if (type === "Risk") {


                    if (typeId == "0") {

                        const masterDTO = this.state.MasterDTO;
                        //const FilterDTO = [];

                        //if (this.state.MasterDTO.Risk.length=== 0) {

                        //    masterDTO['Risk'] = this.state.MasterDTO['Risk'].concat(data);

                        //    console.log("Risk Filter", this.state.MasterDTO['Risk'])
                        //} else {

                        //    //masterDTO['Risk'].map((item, index) => (


                        //    //    data.map((m, i) => {
                        //    //        if (item.subLevelId !== m.subLevelId) {
                        //    //            FilterDTO.concat(m)
                        //    //        }
                        //    //    })


                        //));
                        //  this.state.FilterCoverDTO = data.filter(item => item.levelId == "56");
                        //this.setState({});
                        //console.log("FilterDTO", this.state.FilterCoverDTO)
                        masterDTO['Risk'] = this.state.MasterDTO['Risk'].concat(data);
                        // }

                        this.setState({ masterDTO });
                    }
                    if (typeId == "55") {

                        this.state.InsurableRiskLIst = data;
                        this.setState({});
                    }
                }
                else if (type === "Claim") {
                    const masterDTO = this.state.MasterDTO;
                    masterDTO['Claim'] = this.state.MasterDTO['Claim'].concat(data);
                    this.setState({ masterDTO });
                }
                else {
                    const lData = data;
                    let locDTO = this.state.MasterDTO;
                    locDTO[type] = lData;
                    this.setState({ locDTO });
                    console.log("GetMasterService", data);
                }
            });


        console.log("MasterDTOData", this.state.MasterDTO);
    };
    GetCWEService = (type, pID, Lid, Iindex = 0, Cindex = 0) => {
        //let that = this;
        //fetch(`https://localhost:44347/api/Product/   ?LOBId=`+this.state.ProductDTO.lobid +`&CWETypeID=`+ pID)
        fetch(`${productConfig.productConfigUrl}/api/Product/CWEDetails?LOBId=` + this.state.ProductDTO.lobid + `&CWETypeID=` + pID + `&typeId=` + Lid, {
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
                    for (var i = 0; i < data.length; i++) {
                        data[i].levelId = 51;
                        // data[i].subLevelId = 0;

                    }
                }

                if (Lid === "51") {
                    this.calltruedata(data);

                    this.setState({
                        clauses: data,

                    });
                }
                //        if (Lid === "52") {
                //            const InsurablesClause = this.state.MasterDTO.MasterList.InsurablesClause;
                //            //if (this.state.MasterDTO.MasterList.InsurablesClause.length == 1) {

                //            InsurablesClause[Iindex].InsurablesClauseList = data;
                //            //} else {


                //            //}
                //            this.setState({ InsurablesClause });
                //        }

                //        if (Lid === "53") {

                //            const CoversClause = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause;


                //            CoversClause[Cindex].CoversList = data;
                //            this.setState({ CoversClause });

                //        }
                //        if (Lid === "54") {

                //            //  const BenefitList = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].BenefitList;
                //            const CoversClause = this.state.MasterDTO.MasterList.InsurablesClause[Iindex].CoversClause;

                //            CoversClause[Cindex].BenefitList = data;

                //            //this.setState({ BenefitList });
                //            this.setState({ CoversClause });
                //        }

                //        console.log("clauses: ", this.state.clauses);
                //        console.log("InsurablesClause: ", this.state.MasterDTO.MasterList.InsurablesClause);

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
    SetCWEValue = (index, event) => {
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

    SetInsurableRiskClaimsDetailsValue = (event, i) => {

        console.log('Componenet call', event.target.name);


        const index = this.ProductDetails.insurableRcbdetails[i].insurableChildRcbdetails.findIndex(item => item.mValue === event.target.name);
        if (index != -1) {


            let responses = [...this.ProductDetails.insurableRcbdetails[i].insurableChildRcbdetails];
            responses[index].mIsRequired = event.target.checked;
            this.setState({ responses });

        }

    };
    SetCoverRiskClaimsDetailsValue = (event, i, key) => {

        console.log('Componenet call', event.target.name);


        const index = this.ProductDetails.insurableRcbdetails[i].coverRcbdetails[key].coverChildRcbdetails.findIndex(item => item.mValue === event.target.name);
        if (index != -1) {


            let responses = [...this.ProductDetails.insurableRcbdetails[i].coverRcbdetails[key].coverChildRcbdetails];
            responses[index].mIsRequired = event.target.checked;
            this.setState({ responses });

        }

    };
    SetCoverEventValue = (event) => {

        const masterDTO = this.state.MasterDTO;
        console.log('Componenet call', event.target.checked);

        if (event.target.checked != undefined) {
            masterDTO['checkBox'] = event.target.checked;
        }
        this.setState({ masterDTO });

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

        //var today = event.toDate();
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


        //var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
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
        let CoverCount = 0;
        if (productDetails.ProductDTO.productCode === "" || productDetails.ProductDTO.activeFrom === "" || productDetails.ProductDTO.activeTo === "" || productDetails.ProductDTO.productName === "" || productDetails.ProductDTO.productStatusId === 0) {
            this.state.errMassage = "Some Fields are missing in Product Basic";
            this.state.ValidationUI = false; this.state.errormessage = true;
        }

        if (productDetails.productInsurableItem.length > 0) {
            for (var i = 0; i < productDetails.productInsurableItem.length; i++) {
                if (productDetails.productInsurableItem[i].insurableCategoryId === "" || productDetails.productInsurableItem[i].insurableItemTypeId === "") {
                    this.state.ValidationUI = false; this.state.errormessage = true;
                    this.state.errMassage = "Some Fields are missing in Insurable Item";
                }
                if (productDetails.productInsurableItem[i].productCovers.length > 0) {
                    for (var j = 0; j < productDetails.productInsurableItem[i].productCovers.length; j++) {
                        CoverCount++;

                        if (this.state.MasterDTO.checkBox == true) {

                            if (productDetails.productInsurableItem[i].productCovers[j].coverTypeId == "" || productDetails.productInsurableItem[i].productCovers[j].coverDescription == "") {
                                this.state.errMassage = "Some Fields are missing in Cover";
                                this.state.ValidationUI = false; this.state.errormessage = true;
                                if (productDetails.productInsurableItem[i].productCovers[j].coverEventId == "" || productDetails.productInsurableItem[i].productCovers[j].coverEventFactorId == "" || productDetails.productInsurableItem[i].productCovers[j].coverEventFactorValueUnitId == "") {
                                    this.state.errMassage = "Some Fields are missing in Cover";
                                    this.state.ValidationUI = false; this.state.errormessage = true;


                                }
                            }
                        }
                        if (productDetails.productInsurableItem[i].productCovers[j].productBenefits.length > 0) {
                            console.log("check validation", productDetails.productInsurableItem[i].productCovers[j].productBenefits[0])
                            if (productDetails.productInsurableItem[i].productCovers[j].productBenefits[0].benefitCriteriaValue === "" && productDetails.productInsurableItem[i].productCovers[j].productBenefits[0].maxBenefitAmount === "") {
                                this.state.errMassage = "Some Fields are missing in Benefit";
                                this.state.ValidationUI = false; this.state.errormessage = true;
                            }
                        } else {
                            this.state.ValidationUI = false; this.state.errormessage = true;
                            this.state.errMassage = "Some Fields are missing in Benefit";
                        }
                        if (productDetails.productInsurableItem[i].productCovers[j].singleValue == false) {
                            if (productDetails.productInsurableItem[i].productCovers[j].productBenefits[0].benifitRangeDetails.length > 0) {
                                for (var k = 0; k < productDetails.productInsurableItem[i].productCovers[j].productBenefits[0].benifitRangeDetails.length; k++) {
                                    if (productDetails.productInsurableItem[i].productCovers[j].productBenefits[0].benifitRangeDetails[k].fromValue == "" || productDetails.productInsurableItem[i].productCovers[j].productBenefits[0].benifitRangeDetails[k].toValue == "" || productDetails.productInsurableItem[i].productCovers[j].productBenefits[0].benifitRangeDetails[k].brokage == "") {
                                        this.state.ValidationUI = false; this.state.errormessage = true;
                                        this.state.errMassage = "Some Fields are missing in Benefit Range Details";


                                    }
                                }
                            }



                        }


                    }
                } else {
                    //if (CoverCount == 0) {
                    //    this.state.ValidationUI = false; this.state.errormessage = true;
                    //    this.state.errMassage = "Some Fields are missing in Cover";
                    //}
                }
            }
        } else {
            this.state.ValidationUI = false; this.state.errormessage = true;
            this.state.errMassage = "Some Fields are missing in Insurable Item";
        }




        if (productDetails.productChannel.length > 0) {
            for (var i = 0; i < productDetails.productChannel.length; i++) {
                if (productDetails.productChannel[i].effectiveFrom !== "" && productDetails.productChannel[i].effectiveTo !== "" && productDetails.productChannel[i].brokage !== "" && productDetails.productChannel[i].channelTypeId !== "") {

                } else {
                    this.state.errMassage = "Some Fields are missing in Channel";
                    this.state.ValidationUI = false; this.state.errormessage = true;
                }
            }
        } else {
            this.state.errMassage = "Some Fields are missing in Channel";
            this.state.ValidationUI = false; this.state.errormessage = true;
        }
        //if (productDetails.productPremium.length > 0) {
        //    for (var i = 0; i < productDetails.productPremium.length; i++) {
        //        if (productDetails.productPremium[i].currencyId !== "" && productDetails.productPremium[i].premiumAmount !== "") {

        //        } else { this.state.ValidationUI = false; this.state.errormessage = true; }
        //    }
        //} else {
        //    this.state.ValidationUI = false; this.state.errormessage = true;
        //}


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


    GetAllMasterService = (type, pID, Iindex = 0, Cindex = 0) => {
        type = "LOB,COB,CWEType,Channels,Type,Risk,Claim,InsurableCategory,BenefitCriteria,InsuranceType,Cover,CoverEvent,CoverEventFactor,CoverEventFactorValue";
        //  fetch(`https://localhost:44347/api/Product/GetAllProductMaster?masterType=` + type + `&parentID=` + 0, {
        fetch(`${productConfig.productConfigUrl}/api/Product/GetAllProductMaster?masterType=` + type + `&parentID=` + 0, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log("data come from server", data);


                //.state.MasterDTO['LOB'] = data.filter(id => id.mType == "LOB");
                //this.state.MasterDTO['COB'] = data.filter(id => id.mType == "COB");
                //this.state.MasterDTO['COB'] = data.filter(id => id.mID == this.ProductDetails.ProductDTO.cobid);



                this.state.MasterDTO['InsurableCategory'] = data.filter(id => id.mType == "InsurableCategory");
                this.state.MasterDTO['InsuranceType'] = data.filter(id => id.mType == "InsuranceType");
                this.state.MasterDTO['InsurableTypeMaster'] = data.filter(id => id.mType == "InsuranceType");
                this.state.MasterDTO['CoverMaster'] = data.filter(id => id.mType == "Cover");

                // this.state.MasterDTO['Cover'] = data.filter(id => id.mType == "Cover");
                const len = this.ProductDetails.productInsurableItem.length;
                if (len > 0) {
                    for (var i = 0; i < this.ProductDetails.productInsurableItem[len].productCover.length; i++) {
                        const arr = [];
                        arr.push(data.filter(id => id.mType == "Cover"));
                        this.state.MasterDTO[type].push(arr);



                    }
                }


                if (type === "Cover") {

                    if (this.state.MasterDTO[type].length > 0) {

                        const arr = [];
                        arr.push(data);
                        this.state.MasterDTO[type].push(arr);
                        console.log("MasterDTOData", this.state.MasterDTO);
                        this.setState({});
                    }
                }


                this.setState({});
                console.log("MasterDTO Arr", this.state.MasterDTO);




            });
    }

    GetCWEDetails = (data, typeId, refID, Iindex = 0, Cindex = 0) => {



        const filterCWEtype = this.state.TypeList.filter(s => s.mID == typeId)[0].mValue;

        const CWEdata = data.productClausesWarrentiesExclusions.filter(s => s.levelId == typeId && s.refId == refID && data.productId)

        if (CWEdata.length > 0) {
            console.log("CWEdata", CWEdata, filterCWEtype)

            if (filterCWEtype != undefined) {

                if (filterCWEtype == "Product") {
                    this.ProductDetails['productClausesWarrentiesExclusion'] = CWEdata;


                    this.setState({ ctable: true });

                    this.dataTable();
                    console.log("productClausesWarrentiesExclusion", this.ProductDetails['productClausesWarrentiesExclusion']);
                }


                if (filterCWEtype == "Insurable Item") {

                    this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList = CWEdata;
                    this.state.MasterDTO.TableList.InsurablesTable[Iindex].ptable = true
                    this.dataCWETable(filterCWEtype, Iindex);
                }

                if (filterCWEtype == "Cover") {

                    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList = CWEdata;
                    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].ptable = true;
                    this.dataCWETable(filterCWEtype, Iindex, Cindex);
                }
                if (filterCWEtype == "Benefit") {
                    this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList = CWEdata;


                }

                this.setState({});
                //  console.log("GetCWEDetails", this.ProductDetails['productClausesWarrentiesExclusion'], this.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList);
            }



        }







    }

    componentDidMount() {
        this.GetRiskClaimMaster('Risk', 0, 0);
        this.GetRiskClaimMaster('Claim', 0, 0);
        this.GetMasterService('Switchon', 0);
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
                localStorage.setItem('listdata', JSON.stringify(data));
                if (this.state.countlist === 0) {
                    this.setState({ MasterDTOlist: data });
                    this.setState({ countlist: this.state.countlist + 1 });
                }
                this.LevelTypeFun();
                this.CheckedRadioFun("Product", "radiolist");
                console.log("masterlist", data, this.state.masterList);
                this.callchannel(data);
            });
        this.channelsTable();
        //this.GetAllMasterService('LOB', 0);
        this.GetMasterService('LOB', 0);
        this.onDateClick();

        this.state.ProductReset = Object.assign({}, this.state.ProductDTO);


        if (this.props.sendproductid != null) {
            if (this.props.sendproductid != "") {
                this.setState({ btnhide: false });
                this.setState({ viewdisable: true });
                fetch(`${productConfig.productConfigUrl}/api/Product/GetProductById?productId=` + this.props.sendproductid, {
                    //  fetch(`https://localhost:44347/api/Product/GetProductById?productId=` + this.props.sendproductid, {
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
                        if (data.productSwitchOnDetails.length > 0) {
                            this.state.MasterDTO.Switchon = data.productSwitchOnDetails;
                        }
                        this.ProductDetails.productInsurableItem = data.productInsurableItems;
                        this.ProductDetails.insurableRcbdetails = data.insurableRcbdetails;
                        for (var i = 0; i < data.insurableRcbdetails.length; i++) {
                            this.ProductDetails.insurableRcbdetails[i].coverRcbdetails = data.insurableRcbdetails[i].coverRcbdetails;

                            this.ProductDetails.insurableRcbdetails[i].insurableChildRcbdetails = data.insurableRcbdetails[i].insurableChildRcbdetail;
                            for (var j = 0; j < data.insurableRcbdetails[i].coverRcbdetails.length; j++) {
                                this.ProductDetails.insurableRcbdetails[i].coverRcbdetails[j].coverChildRcbdetails = data.insurableRcbdetails[i].coverRcbdetails[j].coverChildRcbdetail;

                            }
                        }
                        // this.updateCollapse(data);
                        this.setState({ productlist: data });

                        let that = this;
                        const type = "LOB,COB,CWEType,Channels,Type,Risk,Claim,InsurableCategory,BenefitCriteria,InsuranceType,Cover,CoverEvent,CoverEventFactor,CoverEventFactorValue";
                        // fetch(`https://localhost:44347/api/Product/GetAllProductMaster?masterType=` + type + `&parentID=` + 0, {
                        fetch(`${productConfig.productConfigUrl}/api/Product/GetAllProductMaster?masterType=` + type + `&parentID=` + 0, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                            },
                        })
                            .then(response => response.json())
                            .then(sdata => {
                                console.log("data come from server", sdata);
                                //Insurable level C/W/E
                                const filterCWEid = that.state.TypeList.filter(s => s.mValue == "Product")[0].mID;
                                if (filterCWEid != undefined) {
                                    that.GetCWEDetails(data, filterCWEid, data.productId);

                                }


                                this.state.MasterDTO['LOB'] = sdata.filter(id => id.mType == "LOB");
                                this.state.MasterDTO['COB'] = sdata.filter(id => id.mType == "COB");
                                //this.state.MasterDTO['COB'] = data.filter(id => id.mID == this.ProductDetails.ProductDTO.cobid);



                                that.state.MasterDTO['InsurableCategory'] = sdata.filter(id => id.mType == "InsurableCategory");
                                that.state.MasterDTO['InsuranceType'] = sdata.filter(id => id.mType == "InsuranceType");
                                that.state.MasterDTO['InsurableTypeMaster'] = sdata.filter(id => id.mType == "InsuranceType");
                                that.state.MasterDTO['CoverMaster'] = sdata.filter(id => id.mType == "Cover");
                                that.state.MasterDTO['BenefitCriteria'] = sdata.filter(id => id.mType == "BenefitCriteria");

                                //   const len = data.productInsurableItems.length - 1;
                                for (var i = 0; i < data.productInsurableItems.length; i++) {

                                    for (var j = 0; j < data.productInsurableItems[i].productCovers.length; j++) {
                                        const arr = [];
                                        arr.push(sdata.filter(id => id.mType == "Cover"));
                                        this.state.MasterDTO["Cover"].push(arr);




                                    }

                                }



                                that.setState({});
                                console.log("MasterDTO Arr", that.state.MasterDTO);


                                if (that.state.MasterDTO.InsurableCategory.length > 0 && that.state.MasterDTO.InsuranceType.length > 0) {

                                    for (var i = 0; i < data.productInsurableItems.length; i++) {


                                        that.addInsurableCWEFun(i, that);
                                        //Insurable level C/W/E
                                        const filterCWEid = that.state.TypeList.filter(s => s.mValue == "Insurable Item")[0].mID;
                                        if (filterCWEid != undefined) {
                                            that.GetCWEDetails(data, filterCWEid, data.productInsurableItems[i].insurableItemId, i);

                                        }

                                        // data.productClausesWarrentiesExclusions.filter(s=>s.s)

                                        //that.state.MasterDTO.TableList.InsurablesTable[i].ptable = true
                                        //that.state.MasterDTO.ChangeTableList.tableInsurabledata[i].InsurablesTableDataList = data.productClausesWarrentiesExclusions;


                                        console.log("title", that.state.Insurabletitle);
                                        const radioType = this.state.radiolist1.filter(item => item.mID == (this.ProductDetails.productInsurableItem[i].isSingle))[0].mValue;
                                        const category = that.state.MasterDTO.InsurableCategory.filter(item => item.mID === data.productInsurableItems[i].insurableCategoryId)[0].mValue;
                                        const Type = that.state.MasterDTO.InsuranceType.filter(item => item.mID === data.productInsurableItems[i].insurableItemTypeId)[0].mValue;
                                        this.state.Insurabletitle.push([category, Type]);


                                        that.state.InitialInsurable = that.state.InitialInsurable.concat({ view: !this.state.viewdisable, title: "Insurable Category:", value: category, title1: "Insurable Item:", value1: Type, title2: "Risk Type:", value2: radioType, content: <CoverInterface props={that} ProductDTO={that.ProductDetails} productClausesWarrentiesExclusions={data.productClausesWarrentiesExclusions} Iindex={i} />, InitialCover: [] })

                                    }
                                    that.setState({});
                                }


                                if (that.state.radiolist.length > 0) {
                                    const name = that.state.radiolist.filter(item => item.mID === data.productPremium[0].levelId)[0].mValue;
                                    if (name !== undefined) {
                                        let checkedRadio = that.state['radiolist'].filter(item => item.mValue === name);
                                        checkedRadio[0].selectedValue = checkedRadio[0].mID;
                                        checkedRadio[0].mIsRequired = true;




                                        let uncheckedRadio = that.state['radiolist'].filter(item => item.mValue !== name);
                                        uncheckedRadio.map((item) => item.selectedValue = "0");
                                        uncheckedRadio.map((item) => item.mIsRequired = false);
                                        that.setState({ checkedRadio, uncheckedRadio });

                                        //if (name == "Cover") {
                                        //    let plen=that.state.productPremium.length;
                                        //    while (plen >= 0) {
                                        //        that.state.productPremium[plen]['Defination'] = productInsurableItems[i].productCovers.filter(s => s.coverId == that.state.productPremium[Plen].subLevelId);
                                        //        plen--;
                                        //    }

                                        //}
                                        console.log("plen for cover", that.state.productPremium);
                                    }

                                }

                                const risklist = (this.state.masterList.filter(e => e.mType === 'RiskType')[0]) === undefined
                                    ? []
                                    : this.state.masterList.filter((e) => e.mType === 'RiskType')[0].mdata
                                    ;
                                this.setState({ RiskList: risklist });
                                console.log("RiskList", this.state.RiskList)




                            });






                        let pdata = this.state;
                        pdata['ProductDTO'] = data;




                        this.setState({ pdata });
                        this.state.ProductDTO.productCode = data.productCode;
                        this.ProductDetails['ProductDTO'] = data;

                        console.log("data coming ", data)
                        console.log("data coming pro", this.ProductDetails['ProductDTO'])
                        // this.GetMasterService('LOB', 0);
                        //Clauses
                        let single;
                        //this.GetMasterService("COB", this.ProductDetails.ProductDTO.lobid);
                        if (this.ProductDetails.ProductDTO['productInsurableItems'].length > 0) {
                            this.ProductDetails.productInsurableItem = this.ProductDetails.ProductDTO.productInsurableItems;
                            // this.GetMasterService('InsurableCategory', this.ProductDetails.ProductDTO.cobid);
                            //this.GetMasterService('InsuranceType', this.ProductDetails.ProductDTO.productInsurableItems[0].insurableCategoryId);
                            //this.ProductDetails.productCover = this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'];

                            //                            this.GetMasterService('Cover', this.ProductDetails.ProductDTO.productInsurableItems[0].insurableItemTypeId);
                            //                          this.GetMasterService('CoverEvent', this.ProductDetails.ProductDTO.cobid);
                            //  if (this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'].length > 0) {
                            //this.GetMasterService('CoverEventFactor', this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].coverEventId);
                            //this.GetMasterService('CoverEventFactorValue', this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].coverEventFactorId);
                            //this.GetMasterService('BenefitCriteria', this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].coverEventId);
                            //  if (this.ProductDetails.ProductDTO.productPremium.length > 0 || this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits.length > 0) {
                            //    this.ProductDetails.productPremium = this.ProductDetails.ProductDTO.productPremium;
                            //    this.ProductDetails.productBenefit = this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits[0];
                            //  if (this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits[0].benifitRangeDetails.length > 0) {
                            //  this.ProductDetails.benifitRangeDetails = this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].productBenefits[0].benifitRangeDetails;
                            //}
                            //}
                            //  }
                        }
                        if (this.ProductDetails.ProductDTO.productPremium.length > 0) {
                            this.ProductDetails.productPremium = this.ProductDetails.ProductDTO.productPremium;
                        }
                        this.ProductDetails.ProductDTO.activeFrom = new Date(data.activeFrom).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
                        this.ProductDetails.ProductDTO.activeTo = new Date(data.activeTo).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric', });
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
                        //single = this.ProductDetails.ProductDTO.productInsurableItems[0].productCovers[0].singleValue;


                        //    //if (this.ProductDetails.productCover.singleValue === true) {

                        //    //    let ProductCover = this.ProductDetails.productCover;
                        //    //    this.ProductDetails['productCover'].singleValue = true;
                        //    //    ProductCover['singleValueSelected'] = "0";
                        //    //    this.benifitTable();
                        //    //}

                        //}
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        if (this.ProductDetails.ProductDTO.productChannels.length > 0) {
                            this.ProductDetails['productChannel'] = this.ProductDetails.ProductDTO.productChannels;
                        }
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        if (this.ProductDetails.ProductDTO.productClausesWarrentiesExclusions.length > 0) {


                            //                            this.ProductDetails['productClausesWarrentiesExclusion'] = this.ProductDetails.ProductDTO.productClausesWarrentiesExclusions;
                            const filterCWEid = that.state.TypeList.filter(s => s.mValue == "Product");

                            if (filterCWEid.length > 0) {

                                const pCWEList = this.ProductDetails.ProductDTO.productClausesWarrentiesExclusions.filter(s => s.levelId == filterCWEid[0].mID);
                                if (pCWEList.length > 0) {

                                    this.ProductDetails['productClausesWarrentiesExclusion'] = [...pCWEList];
                                    this.ProductDetails.productCover.cweid = this.ProductDetails.ProductDTO.productClausesWarrentiesExclusions[0].cwetypeId;
                                    //  this.GetCWEService("Clauses", this.ProductDetails.ProductDTO.tblProductClausesWarrentiesExclusions[0].cweid);
                                    this.setState({ ctable: true });

                                    this.dataTable();
                                }
                            }
                        }
                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        if (this.ProductDetails.ProductDTO.productRcbdetails.length > 0) {
                            this.ProductDetails['productRcbdetail'] = this.ProductDetails.ProductDTO.productRcbdetails;
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
                        //this.ProductDetails['productCover'].singleValue = single;
                        //ProductCover['singleValueSelected'] = (single === true) ? "0" : "1";
                        ////  ProductCover['singleValueSelected'] = this.ProductDetails.ProductDTO.productInsurableItems[0]['productCovers'][0].singleValueSelected;

                        //this.benifitTable();
                        //}

                        // this.updateCollapse(this.ProductDetails.ProductDTO, this.ProductDetails.ProductDTO.productInsurableItems.length);

                        this.setState({ CoverCollapseShow: true });


                    });

            }
        }

        // this.channelsTable();

    }
    updateCollapse = (data, index) => {

        console.log("insurableCategoryId", this.state.MasterDTO);
        //insurable collapse
        if (this.state.MasterDTO.InsurableCategory.length > 0 && this.state.MasterDTO.InsuranceType.length > 0) {

            for (var i = 0; i < index; i++) {


                // this.addInsurableFun(i);


                console.log("title", this.state.Insurabletitle);
                //const radioType = this.state.radiolist1.filter(item => item.mID == (this.ProductDetails.productInsurableItem[i].isSingle));
                const category = this.state.MasterDTO.InsurableCategory.filter(item => item.mID === this.ProductDetails.productInsurableItem[i].insurableCategoryId)[0].mValue;
                const Type = this.state.MasterDTO.InsuranceType.filter(item => item.mID === this.ProductDetails.productInsurableItem[i].insurableItemTypeId)[0].mValue;

                //   if (this.state.Insurabletitle.length > 0) {


                this.state.InitialInsurable = this.state.InitialInsurable.concat({ view: !this.state.viewdisable, title: "Insurable Category:", value: category, title1: "Insurable Item:", value1: Type, title2: "Risk Type:", value2: " radioType", content: <CoverInterface props={this} ProductDTO={this.ProductDetails} Iindex={i} />, InitialCover: [] })
                // }
                //  cover collapse 
                if (data.productInsurableItems[i].productCovers.length > 0) {

                    for (var j = 0; j < data.productInsurableItems[i].productCovers.length; j++) {
                        this.state.InitialInsurable[i].InitialCover = this.state.InitialInsurable[i].InitialCover.concat({ view: !this.state.viewdisable, title: "Cover:", value: "this.state.Insurabletitle[i][this.ProductDetails.productInsurableItem[i].productCovers.length][0]", content: <CWEDetails props={this} ProductDTO={this.ProductDetails} Bindex={j} Iindex={i} /> })

                    }
                }
            }
            this.setState({});
        }


    }

    addInsurableCWEFun = (index, that = this) => {
        //this.state.productInsurableItemList.push(this.ProductDetails.productInsurableItem);
        //const categoryId = this.state.MasterDTO.InsurableCategory.filter(item => item.mID === this.ProductDetails.productInsurableItem.insurableCategoryId);
        //const TypeId = this.state.MasterDTO.InsuranceType.filter(item => item.mID === this.ProductDetails.productInsurableItem.insurableItemTypeId);

        //this.state.Insurabletitle.push([categoryId[0].mValue, TypeId[0].mValue]);
        ////this.state.Insurabletitle.push(TypeId[0].mValue);
        //this.setState({});
        //console.log("productInsurableItemList", this.state.productInsurableItemList, categoryId, TypeId, this.state.Insurabletitle);




        //const categoryId = this.state.MasterDTO.InsurableCategory.filter(item => item.mID === this.ProductDetails.productInsurableItem[index].insurableCategoryId);
        //const TypeId = this.state.MasterDTO.InsuranceType.filter(item => item.mID === this.ProductDetails.productInsurableItem[index].insurableItemTypeId);
        //this.state.Insurabletitle.push([categoryId[0].mValue, TypeId[0].mValue]);
        that.state.MasterDTO.MasterList.InsurablesClause = that.state.MasterDTO.MasterList.InsurablesClause.concat({ "InsurablesClauseList": [], "CoversClause": [{ "CoversList": [], "BenefitList": [] }] });

        that.state.MasterDTO.TableList.InsurablesTable = that.state.MasterDTO.TableList.InsurablesTable.concat({ "InsurablesTableList": [], "CoversTable": [{ "CoversTableList": [], "BenefitTable": { "BenefitTableList": [], "ptable": false, "description": "", "tindex": 0, "open": false, "opendespcription": false, "mshow": false }, "ptable": false, "description": "", "tindex": 0, "open": false, "opendespcription": false, "mshow": false }], "ptable": false, "description": "", "tindex": 0, "open": false, "opendespcription": false, "mshow": false });

        that.state.MasterDTO.ChangeTableList.tableInsurabledata = that.state.MasterDTO.ChangeTableList.tableInsurabledata.concat({ "InsurablesTableDataList": [], "tableCoversdata": [{ "CoversTableDataList": [], "tableBenefitdata": { "BenefitTableDataList": [], "ptable": false, "descriptions": "", "tindex": 0, "open": false, "opendespcription": false, "mshow": false }, "ptable": false, "descriptions": "", "tindex": 0, "open": false, "opendespcription": false, "mshow": false }], "ptable": false, "descriptions": "", "tindex": 0, "open": false, "opendespcription": false, "mshow": false });



        console.log("Insurabletitle", that.state.Insurabletitle, that.state.MasterDTO.MasterList);
        //that.setState({});

    }



    renderRedirect = () => {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }

    }
    LevelTypeFun = () => {

        this.state.TypeList = (this.state.masterList.filter(e => e.mType === 'Type')[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mType === 'Type')[0].mdata
            ;

        //  const Prelist = this.state.TypeList.filter(item => item.mValue !== "Benefit");
        this.setState({ radiolist: this.state.TypeList });

        const risklist = (this.state.masterList.filter(e => e.mType === 'RiskType')[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mType === 'RiskType')[0].mdata
            ;
        this.setState({ RiskList: risklist });
        console.log("RiskList", this.state.RiskList)
        const claimlist = (this.state.masterList.filter(e => e.mType === 'ClaimType')[0]) === undefined
            ? []
            : this.state.masterList.filter((e) => e.mType === 'ClaimType')[0].mdata
            ;
        this.setState({ ClaimList: claimlist });

        //this.state.radiolist = this.state.TypeList.map((item, index) => {

        //    return {

        //        value: item.mID,
        //        name: item.mValue,
        //        labelText: item.mValue,
        //        flag: item.mIsRequired,
        //        selectedValue:"0"
        //    };
        //})
        console.log(this.state.radiolist, 'TypeList');
    }
    FilterCWEType = () => {
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

    }
    AddClauses() {
        if (this.state.cwe.length > 0) {
            this.setState({ ctable: true });

            this.FilterCWEType();

            let productDTO = this.ProductDetails;
            let productClause = this.ProductDetails.productClausesWarrentiesExclusion;
            let newCov = this.state.clauses.filter(o1 => this.state.cwe.some(o2 => o1.cweid === o2.cweid));
            console.log("clausessome", newCov);
            const list = [...productClause, ...newCov];
            console.log("newCov", newCov, list);
            productDTO['productClausesWarrentiesExclusion'] = list;
            this.setState({ productDTO });

            this.state.cwe = [];


        }

        this.dataTable();
    }
    AddCWEClauses(level, Iindex, Cindex) {
        ////  this.FilterCWEType();

        //if (level == "Insurable Item") {
        //    if (this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.length > 0) {

        //        this.state.MasterDTO.TableList.InsurablesTable[Iindex].ptable = true;

        //    }
        //}
        //if (level === "Cover") {

        //    if (this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.length > 0) {

        //        this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].ptable = true;

        //    }
        //}
        //if (level === "Benefit") {
        //    if (this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.length > 0) {

        //        this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.ptable = true;

        //    }

        //}

        ////if (this.state.cwe.length > 0) {
        ////    this.setState({ ctable: true });

        ////   



        ////    debugger
        ////    //let productDTO = this.ProductDetails;
        ////    //let productClause = this.ProductDetails.productClausesWarrentiesExclusion;
        ////    //let newCov = this.state.clauses.filter(o1 => this.state.cwe.some(o2 => o1.cweid === o2.cweid));
        ////    //console.log("clausessome", newCov);
        ////    //const list = [...productClause, ...newCov];
        ////    //console.log("newCov", newCov, list);
        ////    //productDTO['productClausesWarrentiesExclusion'] = list;
        ////    //this.setState({ productDTO });

        ////    this.state.cwe = [];


        ////   }

        //this.setState({});
        //this.dataCWETable(level, Iindex, Cindex);
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

    handleRadioChange = (event, Iindex, Cindex) => {

        //let ProductCover = this.ProductDetails.productInsurableItem[Iindex]['productCovers'][Cindex];


        //ProductCover['singleValue'] = event.target.value === "1" ? false : true;
        //ProductCover['singleValueSelected'] = event.target.value;
        //this.setState({ ProductCover });
        //this.benifitTable(Iindex, Cindex);
        //if (this.ProductDetails.productInsurableItem[Iindex]['productCovers'][Cindex].singleValue === false) {
        //    this.benifitTable(Iindex, Cindex);
        //}
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

    dataCWETable = (level, Iindex, Cindex) => {

        if (level === "Insurable Item") {
            console.log("InsurableList", this.state.MasterDTO.TableList.InsurablesTable[Iindex])

            this.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].InsurablesTableDataList = this.state.MasterDTO.TableList.InsurablesTable[Iindex].InsurablesTableList.map((prop, key) => {

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
                    btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
                        {!this.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
                    </div>
                };

            })

            this.setState({});
        }

        //if (level === "Cover") {


        //    this.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].CoversTableDataList = this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].CoversTableList.map((prop, key) => {

        //        return {
        //            id: key + 1,
        //            typeName: prop.typeName,
        //            cwetypes: prop.cwetypes,
        //            isPrint: <CustomCheckbox key={key}
        //                name="isPrint"
        //                value={prop.isPrint}
        //                onChange={(e) => this.SetclauseValue(key, e)}
        //                disabled={this.state.viewdisable}
        //                formControlProps={{
        //                    fullWidth: true
        //                }}

        //            />,
        //            btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
        //                {!this.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
        //            </div>
        //        };

        //    })

        //    this.setState({});
        //}
        //if (level === "Benefit") {


        //    this.state.MasterDTO.ChangeTableList.tableInsurabledata[Iindex].tableCoversdata[Cindex].tableBenefitdata.BenefitTableDataList = this.state.MasterDTO.TableList.InsurablesTable[Iindex].CoversTable[Cindex].BenefitTable.BenefitTableList.map((prop, key) => {

        //        return {
        //            id: key + 1,
        //            typeName: prop.typeName,
        //            cwetypes: prop.cwetypes,
        //            isPrint: <CustomCheckbox key={key}
        //                name="isPrint"
        //                value={prop.isPrint}
        //                onChange={(e) => this.SetclauseValue(key, e)}
        //                disabled={this.state.viewdisable}
        //                formControlProps={{
        //                    fullWidth: true
        //                }}

        //            />,
        //            btn: <div><Button color="info" justIcon round simple className="view" onClick={this.handleOpenCWE.bind(this, level, Iindex, Cindex, key)}><Visibility /></Button>
        //                {!this.state.viewdisable && <Button color="info" justIcon round simple className="edit" onClick={this.handleEditCWE.bind(this, level, Iindex, Cindex, key)}><Edit /></Button>}
        //            </div>
        //        };

        //    })

        //    this.setState({});
        //}
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

                        brokage: <CustomInput labelText="" id="brokageText" inputType="number" value={this.ProductDetails.productChannel[key].brokage} name="brokage" onChange={(e) => this.SetProductDetailchannelsValue('productChannel', '', e, key)} disabled={(this.state.nonedit === true) ? true : (key === this.state.chindex + 1) ? false : true} formControlProps={{ fullWidth: true }
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
    benifitTable = (Iindex, Cindex) => {

        if (this.ProductDetails.benifitRangeDetails.length > 0) {

            this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeTableDetails = this.ProductDetails.productInsurableItem[Iindex].productCovers[Cindex].productBenefits[0].benifitRangeDetails.map((prop, key) => {

                return {
                    id: key + 1,
                    // fromValue: < CustomInput value={prop.fromValue} disabled={this.state.disabled} name = "fromValue"  onChange = {(e) => this.setBenifitValue('fromValue', e, key) }     formControlProps = {{  fullWidth: true }} />,
                    fromValue: prop.fromValue,
                    toValue: < CustomInput value={prop.toValue} disabled={this.state.viewdisable} name="toValue" onChange={(e) => this.setBenifitValue('toValue', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                    Amount: < CustomInput value={prop.benefitAmount} disabled={this.state.viewdisable} name="benefitAmount" onChange={(e) => this.setBenifitValue('benefitAmount', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                    PremiumAmount: < CustomInput value={prop.premiumAmount} disabled={this.state.viewdisable} name="premiumAmount" onChange={(e) => this.setBenifitValue('premiumAmount', e, key, Iindex, Cindex)} formControlProps={{ fullWidth: true }} />,
                    Action: <Button color="info" disabled={this.state.viewdisable} justIcon round simple className="add" onClick={(e) => this.addRecord(e, key, Iindex, Cindex)}><Add /></Button>

                };

            })


        }



        //this.state.benifittabledata = this.ProductDetails.tblBenifitRangeDetails[0].fromValue;
        console.log("this.benefit", this.state.benifittabledata);
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
    onChangeradio = (e, listname) => {

        const name = e.target.name;
        this.state.SelectedName = e.target.name;
        console.log("radio Name", e.target.name);
        this.CheckedRadioFun(e.target.name, listname);
    }
    CheckedRadioFun = (name, listname) => {
        this.setState({ hideRatingCheckBox: false });
        this.setState({ hidepremiumAmount: false });
        let checkedRadio = this.state[listname].filter(item => item.mValue === name);

        checkedRadio[0].selectedValue = checkedRadio[0].mID;
        checkedRadio[0].mIsRequired = true;

        if (listname === "radiolist") {
            if (checkedRadio[0].value === "1") {
                this.state.addbtnshow = true;


                console.log("addbtnshow1", this.state.addbtnshow);
            } else {
                this.state.addbtnshow = false;

            }
        }
        //if (listname === "radiolist1") {
        //    if (checkedRadio[0].value === "1") {
        //        this.state.addbtncovershow = true;


        //        console.log("addbtncovershow", this.state.addbtncovershow);
        //    } else {
        //        this.state.addbtncovershow = false;

        //    }
        //}
        console.log("addbtnshow", this.state.addbtnshow);
        let uncheckedRadio = this.state[listname].filter(item => item.mValue !== name);
        uncheckedRadio.map((item) => item.selectedValue = "0");
        uncheckedRadio.map((item) => item.mIsRequired = false);

        if (listname == "radiolist1") {

            if (name === "Single Risk") {

                this.ProductDetails.productInsurableItems.isSingle = checkedRadio[0].mID;
                // this.addPremiumFun(1, checkedRadio[0].mID);
            }
            if (name === "Multiple Risk") {
                this.ProductDetails.productInsurableItems.isSingle = checkedRadio[0].mID;
                // this.addPremiumFun(1, checkedRadio[0].mID);
            }
        }

        this.ProductDetails.productPremium = [];
        if (name === "Product") {
            this.setState({ hideRatingCheckBox: true });
            this.addPremiumFun(1, checkedRadio[0].mID, name);
        }
        if (name === "Insurable Item") {
            this.addPremiumFun(this.ProductDetails.productInsurableItem.length, checkedRadio[0].mID, name);
        }
        if (name === "Cover") {

            let coverlen = 0;
            for (var k = 0; k < this.ProductDetails.productInsurableItem.length; k++) {
                coverlen++;
            }
            this.addPremiumFun(coverlen, checkedRadio[0].mID, name);
            // this.addPremiumFun(lenData);
        }

        if (name === "Benefit") {
            this.setState({ hidepremiumAmount: true });
            let benelen = 0;
            for (var k = 0; k < this.ProductDetails.productInsurableItem.length; k++) {
                benelen++;
            }
            // this.addPremiumFun(benelen, checkedRadio[0].mID, name);
            // this.addPremiumFun(lenData);
        }

        //  this.addPremiumFun(lenData);
        this.setState({ checkedRadio, uncheckedRadio });
    }
    /////////////////////////////////////////////////////////
    addbtnfun = (e) => {
        this.state.insurablecollapeslist = this.state.insurablecollapeslist.concat({
            title: "Insurables", content: <Insurables />
        });
        // this.setState({ insurablecollapeslist});
        console.log("insurablecollapeslist", this.state.insurablecollapeslist);
        this.setState({});
    }
    addInsurableItemFun = (index, that = this) => {


        const categoryId = this.state.MasterDTO.InsurableCategory.filter(item => item.mID === this.ProductDetails.productInsurableItem[index].insurableCategoryId);
        const TypeId = this.state.MasterDTO.InsuranceType.filter(item => item.mID === this.ProductDetails.productInsurableItem[index].insurableItemTypeId);
        this.state.Insurabletitle.push([categoryId[0].mValue, TypeId[0].mValue]);
        this.setState({});
    }


    deleteAccordion = (e, index) => {
        console.log("deleteAccordion", e, index);
        this.state.InitialInsurable.splice(index, 1);
        this.ProductDetails.productInsurableItem.splice(index, 1);
        this.setState({});
        console.log("delete insurable", this.state.InitialInsurable, this.ProductDetails.productInsurableItem);



    }




    //////////////////////////////////////////////////////////
    addinurablelist = (e, Iindex) => {


        console.log("adding");
        if (this.ProductDetails.productInsurableItems.insurableCategoryId != "" && this.ProductDetails.productInsurableItems.insurableItemTypeId != "") {
            const pInsurableItem = Object.assign({}, this.ProductDetails.productInsurableItems);
            this.ProductDetails.productInsurableItem = this.ProductDetails.productInsurableItem.concat(pInsurableItem);

            let insulen = this.ProductDetails.insurableRcbdetails.length - 1;
            this.ProductDetails.insurableRcbdetails = this.ProductDetails.insurableRcbdetails.concat(
                {

                    "inputType": "string",
                    "isReqired": true,
                    "inputId": 0,
                    "levelId": 0,
                    "productId": 0,
                    "coverRcbdetails": [
                        //{

                        //    "inputType": "string",
                        //    "isReqired": true,
                        //    "inputId": 0,
                        //    "levelId": 0,
                        //    "insurableRcbdetailsId": 0,
                        //    "coverChildRcbdetails": [
                        //        {

                        //            "inputType": "string",
                        //            "isReqired": true,
                        //            "inputId": 0,
                        //            "coverRcbdetailsId": 0
                        //        }
                        //    ]
                        //}
                    ],

                    "insurableChildRcbdetails": [
                        {

                            "inputType": "string",
                            "isReqired": true,
                            "inputId": 0,
                            "insurableRcbdetailsId": 0
                        }
                    ]
                });






            this.ProductDetails.insurableRcbdetails[insulen].insurableChildRcbdetails = this.state.InsurableRiskLIst;
            // this.ProductDetails.insurableRcbdetails[insulen].coverRcbdetails[0].coverChildRcbdetails = this.state.FilterCoverDTO;

            console.log("adding", this.ProductDetails.productInsurableItem, this.ProductDetails.insurableRcbdetails, insulen, this.state.InsurableRiskLIst);
            const radioType = this.state.radiolist1.filter(item => item.mID == (this.ProductDetails.productInsurableItem[this.state.InitialInsurable.length].isSingle));
            const category = this.state.MasterDTO.InsurableCategory.filter(item => item.mID === this.ProductDetails.productInsurableItems.insurableCategoryId)[0].mValue;
            const Type = this.state.MasterDTO.InsuranceType.filter(item => item.mID === this.ProductDetails.productInsurableItems.insurableItemTypeId)[0].mValue;
            console.log("category & type", category, Type);


            this.state.InitialInsurable = this.state.InitialInsurable.concat({ view: !this.state.viewdisable, title: "Insurable Category:", value: category, title1: "Insurable Item:", value1: Type, title2: "Risk Type:", value2: radioType[0].mValue, deleteAccordion: this.deleteAccordion, content: <CoverInterface props={this} ProductDTO={this.ProductDetails} Iindex={this.ProductDetails.productInsurableItem.length - 1} />, InitialCover: [] })

            this.addInsurableCWEFun(Iindex);
            this.addInsurableItemFun(Iindex);

            ////this.state.MasterDTO['InsuranceType'] = this.state.MasterDTO['InsuranceType'].filter(s => s.mID !== this.ProductDetails.productInsurableItems.insurableItemTypeId);


            this.ProductDetails.productInsurableItems.insurableItemTypeId = "";
            this.ProductDetails.productInsurableItems.insurableCategoryId = "";


            this.setState({});
        }
    }

    ////////////////////////////////////////////////////////


    addPremiumFun = (len, Lid, name) => {
        if (name === "Product") {
            for (var i = 0; i < len; i++) {
                this.ProductDetails.productPremium = this.ProductDetails.productPremium.concat({
                    "productId": 0,
                    "premiumAmount": "",
                    "currencyId": "",
                    "levelId": Lid,
                    "subLevelId": ""
                });
            }
        }
        if (name === "Insurable Item") {

            for (var i = 0; i < len; i++) {
                this.ProductDetails.productPremium = this.ProductDetails.productPremium.concat({
                    "SNo": i,
                    "productId": 0,
                    "premiumAmount": "",
                    "currencyId": "",
                    "levelId": Lid,
                    "subLevelId": this.ProductDetails.productInsurableItem[i].insurableItemTypeId
                });
            }
        }

        if (name === "Cover") {

            const Ilen = this.ProductDetails.productInsurableItem.length;

            for (var i = 0; i < Ilen; i++) {

                for (var j = 0; j < this.ProductDetails.productInsurableItem[i].productCovers.length; j++) {

                    this.ProductDetails.productPremium = this.ProductDetails.productPremium.concat({
                        "description": this.state.Insurabletitle[i][1],
                        "productId": 0,
                        "premiumAmount": "",
                        "currencyId": "",
                        "levelId": Lid,
                        "subLevelId": this.ProductDetails.productInsurableItem[i].productCovers[j].coverTypeId
                    });

                }
            }
        }


        if (name === "Benefit") {

            const Ilen = this.ProductDetails.productInsurableItem.length;

            for (var i = 0; i < Ilen; i++) {

                for (var j = 0; j < this.ProductDetails.productInsurableItem[i].productCovers.length; j++) {

                    this.ProductDetails.productPremium = this.ProductDetails.productPremium.concat({

                        "productId": 0,
                        "premiumAmount": "",
                        "currencyId": "",
                        "levelId": Lid,
                        "subLevelId": ""
                    });

                }
            }
        }
        console.log("List Premium", this.ProductDetails.productPremium, len);
    }

    CheckCoverEventFun = (e) => {

        this.setState({ checkBox: !this.state.checkBox });
        console.log("checkBox", this.state.checkBox);
    }
    SetMasterPolicyCheckBox = (event) => {

        if (event.target.checked != undefined) {
            let pDTO = this.ProductDetails.ProductDTO;
            pDTO.isMasterPolicy = event.target.checked
            this.setState({ pDTO });


        }

    }
    SetRatingCheckBox = (event) => {
        if (event.target.checked != undefined) {
            //let pDTO = this.ProductDetails.ProductDTO;
            this.setState({ RatingCheckBox: event.target.checked });
            let proPremium = this.ProductDetails.productPremium[0];
            if (event.target.checked == true) {



                proPremium.premiumAmount = "10";
                proPremium.currencyId = "47";
                proPremium.levelId = 55;
                proPremium.subLevelId = "";


            } else {


                proPremium.premiumAmount = "";
                proPremium.currencyId = "";
                proPremium.levelId = 0;
                proPremium.subLevelId = "";


            }

            this.setState({ proPremium });

        }


    }
    mappingPopUp = () => {
        this.setState({ mappingPop: true });
    }
    handleClose = () => {
        this.setState({ mappingPop: false });
    };
    savemappingFun = (mapdata) => {

        console.log("mapdata", mapdata, this.state.ProductDTO);

        let map=mapdata.mapping.map((m, i) => {

            return ({

                "rateParameterName" : m.rateName,
                "riskParameterName" : m.riskName,
                "isActive":true,
                "ratingConfigId":m.RateParameter

            })
        })



      let pDTO=this.state.ProductDTO;
        pDTO.CalculateConfig = map;
        this.setState({ pDTO });
        console.log("mapdata", mapdata, map, this.state.ProductDTO);
        this.handleClose();
    }


    render() {
        const { classes } = this.props;
        return (
            <div className="productconfig">
                <GridContainer>

                    <GridItem xs={12} sm={12} md={12}>
                        {this.state.pageloader ?
                            <ProductBasic SetMasterPolicyCheckBox={this.SetMasterPolicyCheckBox} ProductDTO={this.state.ProductDTO} ValidationUI={this.state.ValidationUI} errormessage={this.state.errormessage} onClick={this.onDateClick} message={this.state.message} servermessage={this.state.servermessage} onDateChange={this.onDateChange} MasterDTO={this.state.MasterDTO} GetMasterData={this.GetMasterData} masterList={this.state.masterList} SetValue={this.SetValue} classes={this.classes} activeToState={this.state.activeToState} activeFromState={this.state.activeFromState} productNameState={this.state.productNameState} productCodeState={this.state.productCodeState} productStatusIdState={this.state.productStatusIdState} message={this.state.message} validdate={this.state.validdate} datediff={this.state.datediff} viewdisable={this.state.viewdisable} />
                            : <PageContentLoader />}
                        {this.state.pageloader ?
                            <ProductDetails SetRatingCheckBox={this.SetRatingCheckBox} hideRatingCheckBox={this.state.hideRatingCheckBox} RatingCheckBox={this.state.RatingCheckBox} hidepremiumAmount={this.state.hidepremiumAmount} checkBox={this.state.checkBox} RiskList={this.state.RiskList} SetCWEValue={this.SetCWEValue} SetCoverRiskClaimsDetailsValue={this.SetCoverRiskClaimsDetailsValue} SetInsurableRiskClaimsDetailsValue={this.SetInsurableRiskClaimsDetailsValue} insurableRcbdetails={this.ProductDetails.insurableRcbdetails} InitialInsurable={this.state.InitialInsurable} ClaimList={this.state.ClaimList} GetClausesMasterData={this.GetClausesMasterData} TypeList={this.state.TypeList} tableInsurabledata={this.state.tableInsurabledata} SetValueCWE={this.SetValueCWE} handleCloseCWE={this.handleCloseCWE} handleShowCWE={this.handleShowCWE} handleEditCWE={this.handleEditCWE} handleOpenCWE={this.handleOpenCWE} handledescriptionCWE={this.handledescriptionCWE} SetCoverEventValue={this.SetCoverEventValue} Covertitle={this.state.Covertitle} CheckCoverEventFun={this.CheckCoverEventFun} handleTreeChange={this.handleTreeChange} addInsurableFun={this.addInsurableCWEFun} GetClausesData={this.GetClausesData} Insurabletitle={this.state.Insurabletitle} radiolist1={this.state.radiolist1} radiolist={this.state.radiolist} onChangeradio={this.onChangeradio} MasterDTOlist={this.state.MasterDTOlist} addinurablelist={this.addinurablelist} SetCoverProductDetailsValue={this.SetCoverProductDetailsValue} GetInusrableMasterData={this.GetInusrableMasterData} insurablecollapeslist={this.state.insurablecollapeslist} addbtnfun={this.addbtnfun} addbtnshow={this.state.addbtnshow} benefitinputdisable={this.state.benefitinputdisable} maxbenefitinputdisable={this.state.maxbenefitinputdisable} channelstableData={this.state.channelstableData} ValidationUI={this.state.ValidationUI} benifittabledata={this.state.benifittabledata} Columns={this.state.Columns} addRow={this.addRow} changeRow={this.changeRow} removeRow={this.removeRow} errormessage={this.state.errormessage} ProductDTO={this.ProductDetails} setBenifitValue={this.setBenifitValue} ctable={this.state.ctable} onInputChange={this.onInputChange} onInsurableChange={this.onInsurableChange} addRecord={this.addRecord} SetclauseValue={this.SetclauseValue} handledescription={this.handledescription} description={this.state.description} opendescription={this.state.opendescription} open={this.state.open} clauseName={this.state.clauseName} CustomClause={this.state.CustomClause} handleShow={this.handleShow} mshow={this.state.mshow} handledata={this.handledata} handleOpen={this.handleOpen} handleClose={this.handleClose} viewdisable={this.state.viewdisable} handleEdit={this.handleEdit} resultclauses={this.state.resultclauses} AddClauses={this.AddClauses} clauses={this.state.clauses} onDateChange={this.onDateChange} MasterDTO={this.state.MasterDTO} GetMasterData={this.GetMasterData} masterList={this.state.masterList} SetValue={this.SetProductDetailsValue} classes={this.classes} handleRadioChange={this.handleRadioChange} AddDetails={this.addDetails} SetRiskClaimsDetailsValue={this.SetRiskClaimsDetailsValue} masClausesWarrentiesExclusionsDTO={this.state.masClausesWarrentiesExclusionsDTO} show={this.state.show} onDateChange={this.onDateChange} handleddlChange={this.handleddlChange} benefitCriteriaValueState={this.state.benefitCriteriaValueState} premiumAmountState={this.state.premiumAmountState} tabledata={this.state.tabledata} tablelength={this.state.tabledata.length} setbool={this.setbool} boolValue={this.state.boolValue} disabled={this.state.disabled} mappingPop={this.state.mappingPop} mappingPopUp={this.mappingPopUp} handleClose={this.handleClose} />
                            : <PageContentLoader />}
                        {this.state.pageloader ?
                            <ProductSave onSave={this.handleSubmit} onCancel={this.reset} btnhide={this.state.btnhide} />
                            : null}
                        {this.renderRedirect()}
                    </GridItem>

                </GridContainer>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.mappingPop}
                    onClose={this.state.handleClose}

                >
                    <div className={classes.paper} id="modal">

                        <Button color="info"
                            round
                            className={classes.marginRight}
                            style={searchClose}
                            onClick={this.state.handleClose}>
                            &times;
                                                        </Button>
                        <h4><small className="center-text"> Mapping </small></h4>

                        <Mapping savemappingFun={this.savemappingFun}/>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default withStyles(style)(ProductConfig);