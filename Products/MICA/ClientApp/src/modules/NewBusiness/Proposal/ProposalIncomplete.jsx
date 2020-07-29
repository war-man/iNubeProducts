import React from 'react';
import { Animated } from "react-animated-css";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import user from "assets/img/user.png";

import ModifyProposal from "./ModifyProposal.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import Download from "@material-ui/icons/GetApp";
import Proposal from './Proposal.jsx';
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import Delete from "@material-ui/icons/Delete";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";


const dataTable = {
    headerRow: ["ProposalNo", "ProposerName", "NIC", "LeadNo", "BancaIntroducerCode", "ProposalStatus", "Actions"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["P190002382", "MR RAVICHANDRAN MAHALINGAM", "198001002388", "", "", "PROPOSALSTAGE", ""],
        ["P190002382", "MR DINESH TIWARI", "198001002388", "", "", "PROPOSALSTAGE", ""],
        ["P190002382", "MR RAVICHANDRAN MAHALINGAM", "198001002388", "", "", "PROPOSALSTAGE", ""],
        ["P190002382", "MR RAVICHANDRAN MAHALINGAM", "198001002388", "", "", "PROPOSALSTAGE", ""],
        ["P190002382", "MR RAVICHANDRAN MAHALINGAM", "198001002388", "", "", "PROPOSALSTAGE",],

    ]
};

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
const searchBtn = {
    left: "140%",

}

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




class ProposalIncomplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showTable: true,
            singleValueSelected: "0",
            singleValueSelectedProposer: "0",
            singleValueCheckboxSelected: false,
            citizenshipCheckboxSelected: false,
            NPMcitizenshipSelected: false,
            NPMpermanentAddSelected: false,
            singleValue: "0",
            singleValue1: "0",
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            show: false,
            submitshow: false,
            data: [],
            filterData: [],
            ProposalDto: [],
            proposalFormFlag: true,
            selectOccPNM: "0",
            selectOccPOM: "0",
           
            PolicyOwnerDetailsdataOnYesConditioin: [],//we dont have to send this data to next page becouse in editable fucntion i sa filtering it and storing it into its Dto object 
            //so we have to send niche vala data to next page
            //Agar Yes condition par date bind nahi hot rha hai toh data jo yes condition par aarha hia toh uske paramaeter name check karo name and all

            PolicyOwnerDetailsdataOnYesConditioinDto: [],
            //   FilterPolicyOwnerDetailsdata: [],
            PolicyOwnerDetailsdataOnNoCondition: 
            {
                   "relationShipWithProposer": 0,
                    "salutation": "",
                    "nameWithInitial": "",
                    "givenName": "",
                    "surname": "",
                    "emiratesId": "",
                    "dateOfBirth": "",
                    "age": "",
                    "genderID": "",
                    "maritialStatus": "",
                    "occupation": "",
                    "annualIncome": "",
                    "passportNumber": "",
                    "nameOfEmployee": "",
                    "nationality": "",
                    "countryOfResidence": "",
                    "ageProof": "",
                    "occupationRequireHarzasousWork": 0,
                    "specifyOccupationWork": "",
                    "countryOfOccupation": "",
                "citizenShip": false,
                "citizenship1": "",
                "citizenship2": "",
                    "mobileNo": "",
                    "home": "",
                    "officeNo": "",
                    "email": "",
                    "address1": "",
                    "address2": "",
                    "address3": "",
                "postalCode": "",
                    "city": "",
                    "district": "",
                "province": "",
                    "isPermanentAddrSameasCommAddr": false,
                    "pAddress1": "",
                    "pAddress2": "",
                    "pAddress3": "",
                    "pPostalCode": "",
                    "pDistrict": "",
                    "pProvince": ""
                   
                },


            //  Master Data for all the dropdowns
            MasterData: [],
            MasterDataDto: [],
            tobaccodata: [],
            TobData: [],
            alcoholdata: [],
            AlcoData: [],

            //Questionaris part start from here
            LifeStyleQA: {
                "MemberLifeStyleID": "",
                "Height": "",
                "HeightFeets": "",
                "Weight": "",
               // "SteadyWeight": "",
               // "HeightUnit": "",
                "WeightUnit": "",
                "IsSmoker": false,
                "SmokeType": "",
                "SmokeQuantity": "",
                "SmokePerDay": "",
                "SmokeDuration": "",
                "IsAlcholic": false,
                "AlcholType": "",
                "AlcholQuantity": "",
                "AlcholPerDay": "",
                "AlcholDuration": "",
                "IsNarcoticDrugs": "",
                "Question1": false,
                "Question2": false,
                "Question3": false,
                "Q1Specification": "",
                "Q2Specification": "",
                "Q3Specification": ""
            },

            medicalHistoryDTO: {
                "Question1": false,
                "Question1of1": "",
                "Question1of2": "",
                "Question1of3": "",
                "Question1of4": "",
                "Question1of5": "",
                "Question2": false,
                "Question2of1": "",
                "Question2of2": "",
                "Question2of3": "",
                "Question2of4": "",
                "Question2of5": "",
                "Question2of6": "",
                "Question2of7": "",
                "Question2of8": "",
                "Question2of9": "",
                "Question2of10": "",
                "Question2of11": "",
                "Question2of12": "",
                "Question2of13": "",
                "Question2of14": "",
                "Question3": false,
                "Question3of1": "",
                "Question4": false,
                "Question4of1": "",
                "Question4of2": "",
                "Question4of3": "",
                "Question4of4": "",
                "Question4of4of1": false,
                "Question4of5": "",
                "Question4of6": "",
                "Question4of7": "",
                "Question4of7of1": "",
                "Question4of8": "",
                "Question4of8of1": "",
                "Question4of9": false,
                "Question4of9of1": [],
                "Question4of10": false,
                "Question4of10of1": [],
                "Question4of11": false,
                "Question4of11of1": [],
                "Question4of12": false,
                "Question4of12of1": "",
                "Question4of13": [],
                "Question4of14": false,
                "Question4of14of1": "",
                "Question4of15": false,
                "Question4of15of1": "",
                "Question4of16": "",
                "Question6": false,
                "Question6of1": "",
                "Question7": false,
                "Question7of1": "",
                "Question8": false,
                "Question8of1": "",
                "Question9": false,
                "Question9of1": "",
                "Question10": false,
                "Question10of1": "",
            },

            familyBackgroundDto: {
                "relationship": "",
                "presentage": "",
                "stateofhealth": "",
                "ageatdeath": "",
                "cause": ""
            },
            familyBackground: [],
            familytable: [],
            familydatatable: [],
            insurancetable: [],
            insuranceDto: {
                "insuranceCompanyName": "",
                "policyNo": "",
                "sumAssured": "",
                "accidentalDeathBenefit": "",
                "criticalIllnessBenefit": "",
                "permanentDisability": "",
                "hospitalization": "",
                "status": ""
            },
            claimedtable: [],
            claimedDto: {
                "companyName": "",
                "policyNo": "",
                "natureOfClaim": "",
                "dateOfClaim": ""
            },
            cmedicinetable: [],
            cmedicineDto: {
                "nameOfMedication": "",
                "dose": "",
                "frequency": ""
            },
            lmedicinetable: [],
            lmedicineDto: {
                "nameOfMedication": "",
                "dose": "",
                "frequency": "",
                "dateLastTaken": ""
            },
            Treatmenttable: [],
            TreatmentDto: {
                "nameOfTreatment": "",
                "location": "",
                "date": "",
                "result": ""
            },
            DHCtable: [],
            DHCtDto: {
                "nameOfDoctor": "",
                "address": "",
                "dateOfLastConsult": ""
            },

            premiumPayingDto: {
                "premiumPaymentMethod": "",
                "paymentPaidBy": "",
                "Relationshipwithproposer": "",
                "paymentRecieptPreferredBy": "",
                "totalAnnualPremium": "",
                "proposalDepositPremium": "",
                "bankAccNo": "",
                "nameOfBranch": "",
                "creditCardNo": "",
                "nameOfBank": ""
            },

            preferredCommunication: {
                "preferredLanguage": "",
                "premiumMethodOfComm": ""
            },
           
            proposerSigDetailsDTO: {
                //"proposerSignaturedoc": "",
                "proposerDate": "",
                "proposerPlace": "",
                "proposerCountry": ""
            },

            spouseSigDetailsDTO: {
                "spouseDate": "",
                "spousePlace": "",
                "spouseCountry": ""
            },

            wealthSigDetailsDTO: {
               // "wealthSignaturedoc": "",
                "otherCircumstances": "",
                "IsPolicy": "",
                "comments": "",
                "checkbox": ""
            },

            SaveProposalDto: {
                "policyStartDate": "2019-10-16T05:30:00.625Z",
                "policyEndDate": "2019-10-16T05:30:00.625Z",
                "quoteNo": "q23457",
                "proposalNo": "p123456",
                "policyIssueDate": "2019-10-16T05:30:00.625Z",
                "planId": 0,
                "paymentFrequency": "string",
                "proposalSubmitDate": "2019-10-16T05:30:00.626Z",
                "tblPolicyMemberDetails": [],
                "familyBackgroundDetails": [],
            },
            
            tblPolicyMemberDetails: {

                "salutation": "",
                "fullname": "",
                "givenName": "",
                "nameWithInitial": "",
                "emiratesId": "",
                "preferredName": "",
                "dob": "",
                "age": 0,
                "relationShipWithProposer": 0,
                "occupationId": 0,
                "oldnicno": "",
                "newnicno": "",
                "annualIncome": "",
                "companyName": "",
                "natureOfDuties": "",
                "nationality": "",
                "mobile": "",
                "landline": "",
                "email": "",
                "isDeleted": true,
                "firstName": "",
                "surname": "",
                "middleName": "",
                "alternateMobileNo": "",
                "home": "",
                "work": "",
                "adressId": 0,
                "address1": "",
                "address2": "",
                "address3": "",
                "city": "",
                "district": "",
                "province": "",
                "isPermanentAddrSameasCommAddr": false,
                "permanetAddressId": 0,
                "quoteMemberid": 0,
                "isSameasProposerAddress": true,
                "citizenship1": "",
                "citizenship2": "",
              //"residentialNationality": "string",
             // "residentialNationalityStatus": "string",
                "occupationHazardousWork": 0,
                "passportNumber": "",
             // "countryOccupation": "string",
             // "specifyResidental": "string",
                "specifyHazardousWork": "",
                "citizenShip": false,
                "gender": "",
                "maritialStatus": "",
                "countryOfResidence": "",
                "countryOfOccupation": "",
                "ageProof": "",
                "pAddress1": "",
                "pAddress2": "",
                "pAddress3": "",
                "pPostalCode": "",
                "pDistrict": "",
                "pProvince": ""

            },

            modifiedPolicyOwnerDetails: {
                "nameWithInitial": "",
                "passportNumber": "",
                "nameOfTheEmp": "",
                "nationality": "",
                "countryOfResidence": "",
            },

            "SaveModifiedProposalDetails": {
                "quoteNo": "",  
                "policyNo": "",
                "policyMemberOwnerDetails": [],  // this.state.tblPolicyMemberDetails
                "policyNewMemberDetails": [],   //this.state.PolicyOwnerDetailsdataOnNoCondition
                "QuestioneriesDetails": [],
                "DocumentationUpdating": [], //this.state.premiumPayingDto,this.state.preferredCommunication
                "ProposerSignatureDetails": [], //this.state.proposerSigDetailsDTO
                "WealthSignatureDetails": []   //this.state.wealthSigDetailsDTO
            }

        }

        this.PolicyOwnerDetailsSetValue = this.PolicyOwnerDetailsSetValue.bind(this);
        this.QuestionalDetailsSetValue = this.QuestionalDetailsSetValue.bind(this);
        this.proposalPolicyOwnerSetValue = this.proposalPolicyOwnerSetValue.bind(this)
        this.MasterSetValue = this.MasterSetValue.bind(this)

    };

    SubmitProposal = () => {
        debugger;
        
        // this.state.fields.IsActive = 1;
        // this.state.fields.CreatedDate = date();
        // ${ NewBusinessConfig.ProposalConfigUrl }

        //storing the child data into parent decaleard array
        // let tblPolicyMemberDetail = this.state.tblPolicyMemberDetails;
        // debugger;
        //if (this.state.tblPolicyMemberDetails.dob != undefined) {
        //    tblPolicyMemberDetail.dob = this.newdatechange(this.state.tblPolicyMemberDetails.dob);
        //}
        // tblPolicyMemberDetail.dob = this.newdatechange(this.state.tblPolicyMemberDetails.dob);
        // tblPolicyMemberDetail.doj = this.newdatechange(this.state.tblPolicyMemberDetails.doj);
        // this.setState({ tblPolicyMemberDetail})
        //this.state.SaveProposalDto.tblPolicyMemberDetails = this.state.tblPolicyMemberDetails;

        this.state.medicalHistoryDTO.Question4of9of1 = this.state.cmedicinetable;
        this.state.medicalHistoryDTO.Question4of10of1 = this.state.lmedicinetable;
        this.state.medicalHistoryDTO.Question4of11of1 = this.state.Treatmenttable;
        this.state.medicalHistoryDTO.Question4of13 = this.state.DHCtable;
        this.setState({});
        console.log("medicalhistorydtodata", this.state.medicalHistoryDTO);

        this.state.SaveModifiedProposalDetails.quoteNo = this.state.filterData.quoteNo;
       // this.state.SaveModifiedProposalDetails.policyNo = this.state.filterData.quoteNo;

        this.state.SaveModifiedProposalDetails.policyMemberOwnerDetails.push(this.state.tblPolicyMemberDetails);
        this.state.SaveModifiedProposalDetails.QuestioneriesDetails.push(this.state.LifeStyleQA);
        this.state.SaveModifiedProposalDetails.QuestioneriesDetails.push(this.state.familytable);
        this.state.SaveModifiedProposalDetails.QuestioneriesDetails.push(this.state.insurancetable);
        this.state.SaveModifiedProposalDetails.QuestioneriesDetails.push(this.state.claimedtable);
        this.state.SaveModifiedProposalDetails.QuestioneriesDetails.push(this.state.medicalHistoryDTO);
        this.state.SaveModifiedProposalDetails.DocumentationUpdating.push(this.state.premiumPayingDto);
        this.state.SaveModifiedProposalDetails.DocumentationUpdating.push(this.state.preferredCommunication);
        this.state.SaveModifiedProposalDetails.ProposerSignatureDetails.push(this.state.proposerSigDetailsDTO);
        this.state.SaveModifiedProposalDetails.WealthSignatureDetails.push(this.state.wealthSigDetailsDTO);

        this.setState({});

        console.log("sendingdata", this.state.SaveModifiedProposalDetails);

        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/CreateAccounts/PartialFormData`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.SaveModifiedProposalDetails)
        }).then(function (data) {
            console.log(data);
            alert("Parameter Saved");

        });
    }

    proposalSetValue = (evt) => {

        let proposalSetValue = this.state.SaveProposalDto;
        proposalSetValue[evt.target.name] = evt.target.value;
        this.setState({ proposalSetValue });
        console.log("PropsalSetValued", this.state.SaveProposalDto)

    }
    proposalPolicyOwnerSetValue = (evt) => {
        debugger;
        let tblPolicyMemberDetails = this.state.tblPolicyMemberDetails;
        tblPolicyMemberDetails[evt.target.name] = evt.target.value;
        this.setState({ tblPolicyMemberDetails });
        console.log("proposalPolicyOwnerSetValue", this.state.tblPolicyMemberDetails, tblPolicyMemberDetails)

    }
    //setting the master values  
    MasterSetValue = (evt) => {
        // debugger;
        let masterSetValue = this.state.tblPolicyMemberDetails;
        masterSetValue[evt.target.name] = evt.target.value;
        this.setState({ masterSetValue });
        console.log("PropsalSetValued", this.state.tblPolicyMemberDetails)

    }


    //DateChange = (name, event) => {
    //    console.log(event);
    //    var today = event.toDate();
    //    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    //    let userdDTO = this.state.tblPolicyMemberDetails;
    //    userdDTO[0][name] = date;
    //    this.setState({ userdDTO });
    //};
    //newdatechange = (date) => {
    //    const _date = date.split('/');
    //    const dateObj = { month: _date[1], year: _date[2], day: _date[0] };

    //    return dateObj.year + '-' + dateObj.month + '-' + dateObj.day;
    //}

    DateChange = (name, event) => {
        //debugger
        const fields = this.state.tblPolicyMemberDetails;
        console.log('event', event);
        var today = event.toDate();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        fields[0][name] = date;
        this.setState({ fields })
    };


    componentDidMount() {
        
        //this is for grid data which is comming into the gridtable when we click on incompleted proposal 
        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/ProposalPoll/GetProposalIncompleteData` + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })

            // fetch(`https://localhost:44351/api/Proposal/ProposalPoll/GetProposalIncompleteData`)

            .then(response => response.json())
            .then(data => {
                console.log("ProposalDto:", data);
                this.leadTable(data);
                this.setState({ ProposalDto: data });
            });

        //this fetch method is used for Master tables data 

        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/MastertypeData/GetMasterData` + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })

            // fetch(`https://localhost:44351/api/Proposal/ProposalPoll/GetProposalIncompleteData`)

            .then(response => response.json())
            .then(data => {
                console.log("MasterDto:", data);
                //this.leadTable(data);
                this.setState({ MasterDataDto: data });
            });




        console.log("MasterDataDto", this.state.MasterDataDto)


        if (this.props.gridShow !== undefined && this.props.gridShow !== true) {
            this.setState({ showTable: false, open: true });
        }
    }

    //setting the master values data



    //it will set the values for not same as the assured condition
    PolicyOwnerDetailsSetValue = (evt) => {
        debugger;
        let modifiedPolicyOwnerDetailsDataonNo = this.state.PolicyOwnerDetailsdataOnNoCondition;
        modifiedPolicyOwnerDetailsDataonNo[evt.target.name] = evt.target.value;
        this.setState({ modifiedPolicyOwnerDetailsDataonNo });

        console.log("filterdata: ", this.state.PolicyOwnerDetailsdataOnNoCondition)
    }

    //GetmasterData = (type, event) => {
    //    this.PolicyOwnerDetailsSetValue(event);
    //}

    // Setting values for questinaries part

    PremiumPaymentSetValue = (evt) => {
        debugger;
        let premiumPayingDto = this.state.premiumPayingDto;
        premiumPayingDto[evt.target.name] = evt.target.value;
        this.setState({ premiumPayingDto });

        console.log("premiumPayingDto", this.state.premiumPayingDto);
        
    }

    CommunicationSetValues = (evt) => {

        let preferredCommunication = this.state.preferredCommunication;
        preferredCommunication[evt.target.name] = evt.target.value;
        this.setState({ preferredCommunication });

        console.log("preferredCommunication", this.state.preferredCommunication);
    }


    QuestionalDetailsSetValue = (evt) => {
        debugger;
        let LifeStyleQA = this.state.LifeStyleQA;
        LifeStyleQA[evt.target.name] = evt.target.value;
        this.setState({ LifeStyleQA });

        console.log("lifeStyleQa ", this.state.LifeStyleQA);

    }

    MHDetailsSetValue = (evt) => {
        debugger;
        let medicalHistoryDTO = this.state.medicalHistoryDTO;
        medicalHistoryDTO[evt.target.name] = evt.target.value;
        this.setState({ medicalHistoryDTO });

        console.log("medicalHistoryDTO ", this.state.medicalHistoryDTO);

    }

    tobaccoDataTable = () => {

        this.setState({
            tobaccodata: this.state.TobData.map((prop, key) => {
                return {
                    Type: prop.smoketype,
                    SticksCount: prop.smokecount,
                    Years: prop.smokeduration,
                    actions: (
                        <div className="actions-right">
                            <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDeleteTobaccodata()} ><Delete /></Button>
                        </div>
                    )
                };
            }
            )
        }
        )
    }

    onDeleteTobaccodata = () => {
        debugger;
        this.state.TobData = [];
        this.setState({});

        this.tobaccoDataTable();
    }


    //Questionaries Part Button Add to show the enterd data

    TobaccoQuestionAddButton = () => {
        debugger;

        var obj = {};

        const LifeStyleQA = this.state.LifeStyleQA;

        const MasterDataDto1 = this.state.MasterDataDto[143].mdata;
        const MasterDataDto2 = this.state.MasterDataDto[223].mdata;

        obj.smokecount = MasterDataDto2.filter(a => a.mID == LifeStyleQA.SmokeQuantity)[0].mValue === undefined
            ? [] : MasterDataDto2.filter(a => a.mID == LifeStyleQA.SmokeQuantity)[0].mValue;
       
        obj.smoketype = MasterDataDto1.filter(a => a.mID == LifeStyleQA.SmokeType)[0].mValue === undefined
            ? [] : MasterDataDto1.filter(a => a.mID == LifeStyleQA.SmokeType)[0].mValue;

        obj.smokeduration = LifeStyleQA.SmokeDuration;

        this.state.TobData.push(obj);
        this.setState({});
        console.log("abcwwededs", this.state.TobData);
        this.tobaccoDataTable();
    }


    AlcoholQuestionAddButton = () => {
        debugger;

        var obj = {};

        const LifeStyleQA = this.state.LifeStyleQA;

        const MasterDataDto3 = this.state.MasterDataDto[145].mdata;
        const MasterDataDto4 = this.state.MasterDataDto[142].mdata;

        console.log("MasterDataDto1", MasterDataDto3, MasterDataDto4, MasterDataDto3.filter(a => a.mID == LifeStyleQA.AlcoholTypes) );

        obj.alcoholType = MasterDataDto3.filter(a => a.mID == LifeStyleQA.AlcholType)[0].mValue === undefined
            ? [] : MasterDataDto3.filter(a => a.mID == LifeStyleQA.AlcholType)[0].mValue;

        obj.alcoholPer = MasterDataDto4.filter(a => a.mID == LifeStyleQA.AlcholPerDay)[0].mValue === undefined
            ? [] : MasterDataDto4.filter(a => a.mID == LifeStyleQA.AlcholPerDay)[0].mValue;

        obj.alcoholQuantity = LifeStyleQA.AlcholQuantity;
        obj.alcoholDuration = LifeStyleQA.AlcholDuration;

        this.state.AlcoData.push(obj);
        this.setState({});
        console.log("AlcoData", this.state.AlcoData);
        this.alcoholDataTable();
    }

    alcoholDataTable = () => {

        this.setState({
            alcoholdata: this.state.AlcoData.map((prop, key) => {
                return {
                    type: prop.alcoholType,
                    quantity: prop.alcoholQuantity,
                    per: prop.alcoholPer,
                    longYears: prop.alcoholDuration,
                    actions: (
                        <div className="actions-right">
                            <Button color="danger" justIcon round simple className="edit" onClick={() => this.onDeleteAlcoholdata()} ><Delete /></Button>
                        </div>
                    )
                };
            }
            )
        }
        )
    }

    onDeleteAlcoholdata = () => {
        debugger;
        this.state.AlcoData = [];
        this.setState({});

        this.alcoholDataTable();
    }


    

    leadTable = (data) => {
        console.log("incompletedata", data);
        this.setState({
            data: data.map((prop, key) => {
                return {
                    id: key,
                    ProposalNo: prop.proposalNo,
                    ProposerName: prop.fullName,
                    NIC: prop.nic,
                    LeadNo: prop.leadNo,
                    BancaIntroducerCode: prop.banca,
                    ProposalStatus: prop.proposalStatus,
                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable(key)}><Edit /></Button>
                            <Button color="info" justIcon round simple className="download" ><Download /></Button>
                        </div>
                    )
                };
            }
            )
        }
        )
    }

    edittable = (index) => {
        //debugger;
        this.setState({ open: true });
        this.setState({ showTable: false });
        this.state.filterData = this.state.ProposalDto[index];
        this.state.PolicyOwnerDetailsdataOnYesConditioinDto.push(this.state.PolicyOwnerDetailsdataOnYesConditioin[index]);
        this.setState({});
        let policyId = this.state.filterData.policyID;
        // console.log("filterdata", this.state.PolicyOwnerDetailsdataOnYesConditioinDto)
        this.handlePolicyOwnerData(policyId);

        console.log("this.state.tblPolicyMemberDetails", this.state.tblPolicyMemberDetails);
    }

    handlePolicyOwnerData = (id) => {
        //debugger;
        //fetch("https://localhost:44351/api/Proposal/PolicyOwnerDetails/GePolicyOwnerDetails?PolicyID="+id , {
        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/PolicyOwnerDetails/GePolicyOwnerDetails?PolicyID=`+ id + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })

            .then(response => response.json())
            .then(data => {
                console.log("PolicyOwnerDetailsDto:", data);

                this.setState({ tblPolicyMemberDetails: data });
                this.state.tblPolicyMemberDetails.dob = new Date(this.state.tblPolicyMemberDetails.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
                this.setState({});

                console.log("PolicyOwnerDetailsDto:jdhfuwehoe", this.state.tblPolicyMemberDetails);

            });
        
    }

    //////////////// Handling policy owner's permanent address checkbox (Is Permanent address same as communication address....?)//////////////////////////////

    SetPermanentAddCheckBox = (event) => {
        debugger;

        let state = this.state;
        
        if (event.target.checked == true) {
            state.singleValueCheckboxSelected = true;
            this.setState({});
        } else {
            state.singleValueCheckboxSelected = false;
            this.setState({});
        }

        if (this.state.singleValueCheckboxSelected === true) {
            this.state.tblPolicyMemberDetails.pAddress1 = this.state.tblPolicyMemberDetails.address1;
            this.state.tblPolicyMemberDetails.pAddress2 = this.state.tblPolicyMemberDetails.address2;
            this.state.tblPolicyMemberDetails.pAddress3 = this.state.tblPolicyMemberDetails.address3;
            this.state.tblPolicyMemberDetails.pPostalCode = this.state.tblPolicyMemberDetails.city;
            this.state.tblPolicyMemberDetails.pDistrict = this.state.tblPolicyMemberDetails.district;
            this.state.tblPolicyMemberDetails.pProvince = this.state.tblPolicyMemberDetails.province;
            this.setState({});
        }

        if (this.state.singleValueCheckboxSelected === false) {
            this.state.tblPolicyMemberDetails.pAddress1 = "";
            this.state.tblPolicyMemberDetails.pAddress2 = "";
            this.state.tblPolicyMemberDetails.pAddress3 = "";
            this.state.tblPolicyMemberDetails.pPostalCode = "";
            this.state.tblPolicyMemberDetails.pDistrict = "";
            this.state.tblPolicyMemberDetails.pProvince = "";
            this.setState({});
        }
        console.log("policy owner details", this.state.tblPolicyMemberDetails);
    }

    /////////////////////////////////////Handling New policy member permanent address checkbox (Is Permanent address same as communication address....?) ///////////////////////////////

    handlePermanentAdd = (event) => {
        debugger;

        let state = this.state;

        if (event.target.checked == true) {
            state.NPMpermanentAddSelected = true;
            this.setState({});
        } else {
            state.NPMpermanentAddSelected = false;
            this.setState({});
        }

        if (this.state.NPMpermanentAddSelected === true) {
            this.state.PolicyOwnerDetailsdataOnNoCondition.pAddress1 = this.state.PolicyOwnerDetailsdataOnNoCondition.address1;
            this.state.PolicyOwnerDetailsdataOnNoCondition.pAddress2 = this.state.PolicyOwnerDetailsdataOnNoCondition.address2;
            this.state.PolicyOwnerDetailsdataOnNoCondition.pAddress3 = this.state.PolicyOwnerDetailsdataOnNoCondition.address3;
            this.state.PolicyOwnerDetailsdataOnNoCondition.pPostalCode = this.state.PolicyOwnerDetailsdataOnNoCondition.postalCode;
            this.state.PolicyOwnerDetailsdataOnNoCondition.pDistrict = this.state.PolicyOwnerDetailsdataOnNoCondition.district;
            this.state.PolicyOwnerDetailsdataOnNoCondition.pProvince = this.state.PolicyOwnerDetailsdataOnNoCondition.province;
            this.setState({});
        }

        if (this.state.NPMpermanentAddSelected === false) {
            this.state.PolicyOwnerDetailsdataOnNoCondition.pAddress1 = "";
            this.state.PolicyOwnerDetailsdataOnNoCondition.pAddress2 = "";
            this.state.PolicyOwnerDetailsdataOnNoCondition.pAddress3 = "";
            this.state.PolicyOwnerDetailsdataOnNoCondition.pPostalCode = "";
            this.state.PolicyOwnerDetailsdataOnNoCondition.pDistrict = "";
            this.state.PolicyOwnerDetailsdataOnNoCondition.pProvince = "";
            this.setState({});
        }
        console.log("policy new member details", this.state.PolicyOwnerDetailsdataOnNoCondition);
    }

    /////////////// Citizenship checkbox changes for policy owner/////////////////////

    SetCitizenshipCheckBox = (event) => {
        // debugger;

        let state = this.state;

        if (event.target.checked == true) {
            state.citizenshipCheckboxSelected = true;
            this.setState({});
        } else {
            state.citizenshipCheckboxSelected = false;
            this.setState({});
        }

    }

    //////////////////////// Citizenship checkbox set up for new policy member//////////////////

    handleCitizenshipCheckBox = (event) => {
        // debugger;

        let state = this.state;

        if (event.target.checked == true) {
            state.NPMcitizenshipSelected = true;
            this.setState({});
        } else {
            state.NPMcitizenshipSelected = false;
            this.setState({});
        }

    }

    handleClose = () => {

        this.setState({ open: false });

    };
    handleSimple = () => {

    }
    SetValue = (type, event) => {
        //debugger;
        // event.preventDefault();
        let ProposalDto = this.state[type];
        let name = event.target.name;
        let value = event.target.value;
        ProposalDto[0][name] = value;
        this.setState({ ProposalDto });
        console.log("FilterPolicyOwnerDetailsdata", this.state.PolicyOwnerDetailsdataOnYesConditioinDto)
    }
    handleRadioChange = (event) => {
        debugger;
        let value = event.target.value;

        this.state.singleValue = event.target.value == "1" ? false : true;
        this.state.singleValueSelected = event.target.value;
        this.state.singleValueSelectedProposer = event.target.value;
        this.state.selectOccPOM = event.target.value; 
        this.setState({ value });
        console.log("singleValueSelected", this.state.singleValueSelected);

       
    }

    ///////// Occupation Hazardous work set up for policy owner details//////

    handlePolicyOwnerRadio = (event) => {
        debugger;

        this.state.selectOccPOM = event.target.value;    // "selectOccPOM" -> means OccupationHazardousWork selection for existing proposer when user selects Yes
        this.setState({});

        console.log("selectOccPOM", this.state.selectOccPOM)

        if (this.state.selectOccPOM === "1") {
            this.state.tblPolicyMemberDetails.occupationHazardousWork = "1"; // "1" -> means Is OccupationHazardousWork require = No
            this.setState({});
        }
        if (this.state.selectOccPOM === "0") {
            this.state.tblPolicyMemberDetails.occupationHazardousWork = "0"; // "0" -> meeans Is OccupationHazardousWork require = Yes
            this.setState({});
        }
    }
    
    ///////// Occupation Hazardous work set up for policy new member details//////

    handleNewPolicyRadio = (event) => {

        this.state.selectOccPNM = event.target.value;    // "selectOccPNM" -> means OccupationHazardousWork selection for new proposer when user selects No
        this.setState({}); 

        if (this.state.selectOccPNM === "1") {
            this.state.PolicyOwnerDetailsdataOnNoCondition.occupationRequireHarzasousWork = "1"; // "1" -> means Is OccupationHazardousWork require = No
            this.setState({});
        } else {
            this.state.PolicyOwnerDetailsdataOnNoCondition.occupationRequireHarzasousWork = "0"; // "0" -> meeans Is OccupationHazardousWork require = Yes
            this.setState({});
        }
    }

    handleRadioOnChange = (event) => {

        let value = event.target.value;

        this.state.singleValue1 = event.target.value == "1" ? false : true;

        this.state.singleValueSelectedProposer = event.target.value;
        this.setState({ value });

    }


    ///////////////////Handling Family Background//////////////////////


    handleFamilydatatable = () => {
        this.setState({
            familydatatable: this.state.familytable.map((m, index) => {
                return {
                    relationship : <MasterDropdown value={m.relationship} lstObject={this.state.MasterDataDto} filterName='FamilyBackGroundRelationship' name='relationship' onChange={(e) => this.handleFamilySetValues(e, index)} formControlProps={{ fullWidth: true }} />,
                    presentage : <CustomInput value={m.presentage} onChange={(e) => this.handleFamilySetValues(e, index)} name="presentage" formControlProps={{ fullWidth: true }} />,
                    stateofhealth : <MasterDropdown value={m.stateofhealth} lstObject={this.state.MasterDataDto} filterName='StateOfHealth' onChange={(e) => this.handleFamilySetValues(e, index)} name="stateofhealth" formControlProps={{ fullWidth: true }} />,
                    ageatdeath : <CustomInput value={m.ageatdeath} onChange={(e) => this.handleFamilySetValues(e, index)} name="stateofhealth" formControlProps={{ fullWidth: true }} />,
                    cause : <MasterDropdown value={m.cause} lstObject={this.state.MasterDataDto} filterName='CauseOfDeath' onChange={(e) => this.handleFamilySetValues(e, index)} name="cause" formControlProps={{ fullWidth: true }} />,
                    actions: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteFamilydata(e, index)} ><Delete /> </Button >

                };
            })
        })
    }

    handleFamilySetValues = (event, index) => {
        let familytabledto = this.state.familytable;
        let name = event.target.name;
        let value = event.target.value;
        familytabledto[index][name] = value;
        this.setState({ familytabledto });
        
        console.log("dssythfkgui", this.state.familytable);
        this.handleFamilydatatable();
    }

    handleAddButton = () => {
        let FamilyObjectNew = Object.assign({}, this.state.familyBackgroundDto);
        this.state.familytable.push(FamilyObjectNew);
        this.handleFamilydatatable();

    }

    deleteFamilydata = (index) => {
        this.state.familytable.splice(index, 1);
        this.handleFamilydatatable();
        console.log("familytable", this.state.familytable);
    }


    render() {
        const { classes } = this.props;

        return (
            <div>
                <Card className="assignCard">
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <Icon><img id="icon" src={user} /></Icon>
                        </CardIcon>
                        {
                            <h4 >
                                <small> Proposal Incomplete </small>
                            </h4>
                        }
                    </CardHeader>
                </Card>
                <GridContainer xl={12}>
                    <CardBody>

                        {this.state.showTable &&

                            <ReactTable
                                data={this.state.data}
                                filterable
                                columns={[
                                    {
                                        Header: "PROPOSAL NO",
                                        accessor: "ProposalNo",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,

                                    },
                                    {
                                        Header: "PROPOSER NAME",
                                        accessor: "ProposerName",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                        /* minWidth: 150,
                                           style: { textAlign: "center" },
                                           headerClassName: 'react-table-center'*/
                                    },
                                    {

                                        Header: "NIC",
                                        accessor: "NIC",
                                        minWidth: 60,
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                    },
                                    {
                                        Header: "LEAD NO",
                                        accessor: "LeadNo",
                                        minWidth: 50,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',

                                        resizable: false,
                                    },
                                    {
                                        Header: "BANCA INTRODUCER CODE",
                                        accessor: "BancaIntroducerCode",

                                        ///style: { textAlign: "center" },
                                        ///headerClassName: 'react-table-center'
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 100,
                                        resizable: false,
                                    },
                                    {
                                        Header: "PROPOSAL STATUS",
                                        accessor: "ProposalStatus",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 70,
                                        resizable: false,
                                        //minWidth: 150,
                                        //style: { textAlign: "center" },
                                        //headerClassName: 'react-table-center'
                                    },
                                    {
                                        Header: "Actions",
                                        accessor: "actions",
                                        style: { textAlign: "center" },
                                        headerClassName: 'react-table-center',
                                        minWidth: 60,
                                        resizable: false,
                                    }
                                ]}
                                defaultPageSize={5}
                                showPaginationTop={false}
                                //pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                showPaginationBottom
                                className="-striped -highlight discription-tab"
                            />
                        }
                        {/*
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}

                    >
                    
                        <div className={classes.paper} id="modal">


                            <Button color="info"
                                round
                                className={classes.marginRight}
                                style={searchClose}
                                onClick={this.handleClose}>
                                &times;
                                                        </Button>
                                                        */}
                        {this.state.open &&
                            <ModifyProposal handlePolicyOwnerRadio={this.handlePolicyOwnerRadio} selectOccPOM={this.state.selectOccPOM} handlePermanentAdd={this.handlePermanentAdd} NPMpermanentAddSelected={this.state.NPMpermanentAddSelected} handleCitizenshipCheckBox={this.handleCitizenshipCheckBox} NPMcitizenshipSelected={this.state.NPMcitizenshipSelected} selectOccPNM={this.state.selectOccPNM} handleNewPolicyRadio={this.handleNewPolicyRadio} SaveModifiedProposalDetails={this.state.SaveModifiedProposalDetails} MHDetailsSetValue={this.MHDetailsSetValue} medicalHistoryDTO={this.state.medicalHistoryDTO} wealthSigDetailsDTO={this.state.wealthSigDetailsDTO} proposerSigDetailsDTO={this.state.proposerSigDetailsDTO} proposalFormFlag={this.state.proposalFormFlag} premiumPayingDto={this.state.premiumPayingDto} PremiumPaymentSetValue={this.PremiumPaymentSetValue} preferredCommunication={this.state.preferredCommunication} CommunicationSetValues={this.CommunicationSetValues} cmedicinetable={this.state.cmedicinetable} cmedicineDto={this.state.cmedicineDto} lmedicinetable={this.state.lmedicinetable} lmedicineDto={this.state.lmedicineDto} Treatmenttable={this.state.Treatmenttable} TreatmentDto={this.state.TreatmentDto}
                            DHCtable={this.state.DHCtable} DHCtDto={this.state.DHCtDto} claimedDto={this.state.claimedDto} claimedtable={this.state.claimedtable} insurancetable={this.state.insurancetable} insuranceDto={this.state.insuranceDto} handleAddButton={this.handleAddButton} familydatatable={this.state.familydatatable} familyBackground={this.state.familyBackground} FamilyDetailSetValue={this.FamilyDetailSetValue} familyBackgroundDto={this.state.familyBackgroundDto} AlcoholQuestionAddButton={this.AlcoholQuestionAddButton} alcoholdata={this.state.alcoholdata}
                            TobaccoQuestionAddButton={this.TobaccoQuestionAddButton} tobaccodata={this.state.tobaccodata} handlePolicyOwnerData={this.handlePolicyOwnerData} DateChange={this.DateChange} MasterSetValue={this.MasterSetValue} proposalPolicyOwnerSetValue={this.proposalPolicyOwnerSetValue} tblPolicyMemberDetails={this.state.tblPolicyMemberDetails}
                            SubmitProposal={this.SubmitProposal} SaveProposalDto={this.state.SaveProposalDto} proposalSetValue={this.proposalSetValue} LifeStyleQA={this.state.LifeStyleQA} QuestionalDetailsSetValue={this.QuestionalDetailsSetValue} singleValue={this.state.singleValue} GetmasterData={this.GetmasterData} singleValueSelectedProposer={this.state.singleValueSelectedProposer}
                            singleValueSelected={this.state.singleValueSelected} handleRadioChange={this.handleRadioChange} handleRadioOnChange={this.handleRadioOnChange} leadTable={this.leadTable} SetValue={this.SetValue} MasterDataDto={this.state.MasterDataDto} filterData={this.state.filterData} PolicyOwnerDetailsDto={this.state.PolicyOwnerDetailsDto} PolicyOwnerDetailsSetValue={this.PolicyOwnerDetailsSetValue}
                            PolicyOwnerDetailsdataOnYesConditioinDto={this.state.PolicyOwnerDetailsdataOnYesConditioinDto} PolicyOwnerDetailsdataOnNoCondition={this.state.PolicyOwnerDetailsdataOnNoCondition} handleClose={this.handleClose} SetPermanentAddCheckBox={this.SetPermanentAddCheckBox} singleValueCheckboxSelected={this.state.singleValueCheckboxSelected} citizenshipCheckboxSelected={this.state.citizenshipCheckboxSelected}
                            SetCitizenshipCheckBox={this.SetCitizenshipCheckBox} />
                        }
                        {/*</div>
                    </Modal>*/}
                    </CardBody>
                </GridContainer>


            </div>
        );
    }


}


export default withStyles(styles)(ProposalIncomplete);