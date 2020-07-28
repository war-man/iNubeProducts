/// <reference path="_officedetails.jsx" />
import React from "react";
// @material-ui/icons
import ChromeReader from "@material-ui/icons/ChromeReaderMode";


import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Wizard from "components/Wizard/Wizard.jsx";
import MainlifeLifeStyle from "./MainLifeLifeStyle.jsx";
import QuestioneriesWizard from "./QuestioneriesWizard.jsx";
import Spouse from "./Spouse.jsx";
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import PrevCurrLifeInsurance from "./_PCLifeInsurance.jsx";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import Delete from "@material-ui/icons/Delete";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";






const dataTable = {

    dataRows: [  ["NO ITEMS"] ]
};


class Questionnaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ddlval: "",
            MasterDataDto: [],

            MasQuesDTO: [],
            LifeStyleQuesDTO:[],
            MedHistQuesDTO: [],
            FBQuesDTO: [],
            ADQuesDTO: [],
            PCQuesDTO:[], 

            
            showMLLS: false,
            selectedValue: null,
            selectedValueMLLSQ2: null,
            selectedValueIns: null,
            selectedValueMH: null,
            selectedValueFB: null,
           
            showradioval: false,
            showAlcoholradioval: false,
            showQuestion1: false,
            showQuestion2: false,
            showQuestion3: false,
            showPCL1: false,
            showPCL2: false,
            showPCL3: false,

            showMHQ1: false,
            showMHQ2: false,
            showMHQ3: false,
            showMHQ4: false,
            show4MHQ4: false,
            show4MHQ7: false,
            show4MHQ8: false,
            show4MHQ9: false,
            show4MHQ10: false,
            show4MHQ11: false,
            show4MHQ12: false,
            show4MHQ14: false,
            show4MHQ15: false,
            showMHQ5: false,
            showMHQ6: false,
            showMHQ7: false,
            showMHQ8: false,
            showMHQ9: false,
            showMHQ10: false,

            showFBQ1: false,
            data: [],
            radioVal: "",
            radioValPCIns: "",
            radioValMH: "",
            radioValFB: "",
               
           
            insurancedatatable: [],
            claimeddatatable: [],
            CMdatatable: [],
            LMdataTable: [],
            DHCdataTable: [],

            data1: dataTable.dataRows.map((prop, key) => {
                return {
                    id: key,
                    PolicyNo: prop[0],
                    TotalSA: prop[1],
                    AccidentalDeath: prop[2],
                    Criticalillness: prop[3],
                    PermanentDisability: prop[4],
                    Hospitalization: prop[5],
                    Status: prop[6],
                  
                };
            }),
        }
        console.log("QA", this.props.LifeStyleQA)
       
    }

    componentDidMount() {
        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/GetmasQuestions` + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
       // fetch(`https://localhost:44351/api/Proposal/GetmasQuestions`)

            .then(response => response.json())
            .then(data => {
                this.setState({ MasQuesDTO: data });
                console.log("MasQuesDTO", this.state.MasQuesDTO);
                this.filterData(data);
         });


        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/MastertypeData/GetMasterData` + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })
    // fetch(`https://localhost:44351/api/Proposal/MastertypeData/GetMasterData`)

         .then(response => response.json())
         .then(data => {
             this.setState({ MasterDataDto: data });
             console.log("MasQuestionDTO", this.state.MasterDataDto);
             
         });

        
    
    }

    filterData = (data) => {
       
        const LifeData = data.filter(item => item.questionType == "LifeStyle")
        
        const MedicalData = data.filter(item => item.questionType == "MedicalHistory")
        const FamilyBGData = data.filter(item => item.questionType == "FamilyBackGround")
        const PrivCurrentData = data.filter(item => item.questionType == "PreviousAndCurrentLifeInsurance")
        const additionalQuestions = data.filter(item => item.questionType == "AdditionalQuestions")


        this.setState({ LifeStyleQuesDTO: LifeData })
        this.setState({ MedHistQuesDTO: MedicalData })
        this.setState({ FBQuesDTO: FamilyBGData })
        this.setState({ PCQuesDTO: PrivCurrentData })
        this.setState({ ADQuesDTO: additionalQuestions })

            
      
        console.log(this.state.LifeStyleQuesDTO, 'lsdata')
        console.log(this.state.MedHistQuesDTO, 'lsdata1')
        console.log(this.state.FBQuesDTO, 'lsdata2')
        console.log(this.state.PCQuesDTO, 'lsdata3')
        console.log(this.state.ADQuesDTO, 'lsdata4')
    } 

    
    handleSimple = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ selectedValue: event.target.value });
    };
 
    handleRadioChangeT = (e) => {
        debugger;

        this.state.radioVal = e.target.value;
        this.state.selectedValue = e.target.value;
        this.state.selectedValueMLLSQ2 = e.target.value;
        if (this.state.radioVal == "TabacoYes") {
            this.setState({
                showradioval: true
            });
            this.props.LifeStyleQA.IsSmoker = true;
            this.setState({});
            console.log("Radio value", this.state.radioVal);
            console.log("LIFE STYLE TOBACCO", this.props.LifeStyleQA);
        }
        else if (this.state.radioVal == "TabacoNo") {
            this.setState({
                showradioval: false
            });
            this.props.LifeStyleQA.IsSmoker = false;
            this.setState({});
            console.log("Radio value", this.state.radioVal);
        }

        else if (this.state.radioVal == "AlcoholYes") {
            this.setState({
                showAlcoholradioval: true
            });
            this.props.LifeStyleQA.IsAlcholic = true;
            this.setState({});
            console.log("Radio value", this.state.radioVal)
        }
        else if (this.state.radioVal == "AlcoholNo") {
            this.setState({
                showAlcoholradioval: false
            });
            this.props.LifeStyleQA.IsAlcholic = false;
            this.setState({});
            console.log("Radio value", this.state.radioVal)
        }

        else if (this.state.radioVal == "Question1Yes") {
            this.setState({
                showQuestion1: true
            });
            this.props.LifeStyleQA.Question1 = true;
            this.setState({});
        }
        else if (this.state.radioVal == "Question1no") {
            this.setState({
                showQuestion1: false
            });
            this.props.LifeStyleQA.Question1 = false;
            this.setState({});
        }

        else if (this.state.radioVal == "Question2Yes") {
            this.setState({
                showQuestion2: true
            });
            this.props.LifeStyleQA.Question2 = true;
            this.setState({});
        }
        else if (this.state.radioVal == "Question2No") {
            this.setState({
                showQuestion2: false
            });
            this.props.LifeStyleQA.Question2 = false;
            this.setState({});
        }

        else if (this.state.radioVal == "Question3Yes") {
            this.setState({
                showQuestion3: true
            });
            this.props.LifeStyleQA.Question3 = true;
            this.setState({});
        }
        else if (this.state.radioVal == "Question3No") {
            this.setState({
                showQuestion3: false
            });
            this.props.LifeStyleQA.Question3 = false;
            this.setState({});
        }

    }

    handleRadioChangePCIns = (e) => {
        debugger;
        this.state.radioValPCIns = e.target.value;
        this.state.selectedValueIns = e.target.value;
        

        console.log("radioval3", this.state.radioVal3)
       
      
        if (this.state.radioValPCIns == "Question.1Yes") {
            this.setState({
                showPCL1: true
            })
            console.log("Radio value", this.state.radioValA)
        }
        else if (this.state.radioValPCIns == "Question.1No") {
            this.setState({
                showPCL1: false
            })
            console.log("Radio valueA", this.state.radioValA)
        }

        else if (this.state.radioValPCIns == "Question.2Yes") {
            this.setState({
                showPCL2: true
            })
            console.log("Radio valueA", this.state.radioValA)
        }
        else if (this.state.radioValPCIns == "Question.2No") {
            this.setState({
                showPCL2: false
            })
            console.log("Radio valueA", this.state.radioValA)
        }

        else if (this.state.radioValPCIns == "Question.3Yes") {
            this.setState({
                showPCL3: true
            })
            console.log("Radio valueA", this.state.radioValA)
        }
        else if (this.state.radioValPCIns == "Question.3No") {
            this.setState({
                showPCL3: false
            })
            console.log("Radio valueA", this.state.radioValA)
        }

       
        }

    
    handleRadioChangeMH = (e) => {
        this.state.radioValMH = e.target.value;
        this.state.selectedValueMH = e.target.value;

        console.log("mhq2", this.state.radioValMH)
        console.log("mhq2", this.state.selectedValueMH)
        //let selected = this.state.selectedvalue;
        //let name = e.target.name;
        //let value = e.target.value;

        //selected[name] = value;
        //this.setstate({ selected });
        //this.state.selectedValue = e.target.value;

        if (this.state.radioValMH == "MHQues1Yes") {
            this.setState({
                showMHQ1: true
            });

            this.props.medicalHistoryDTO.Question1 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues1No") {
            this.setState({
                showMHQ1: false
            });
            this.props.medicalHistoryDTO.Question1 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues2Yes") {
            this.setState({
                showMHQ2: true
            });
            this.props.medicalHistoryDTO.Question2 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues2No") {
            this.setState({
                showMHQ2: false
            });
            this.props.medicalHistoryDTO.Question2 = false;
            this.setState({});
            console.log("mhq2", this.state.showMHQ2)
        }
       

        else if (this.state.radioValMH == "MHQues3Yes") {
            this.setState({
                showMHQ3: true
            });
            this.props.medicalHistoryDTO.Question3 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues3No") {
            this.setState({
                showMHQ3: false
            });
            this.props.medicalHistoryDTO.Question3 = false;
            this.setState({});
        }

        else if (this.state.radioValMH == "MHQues4Yes") {
            this.setState({
                showMHQ4: true
            });
            this.props.medicalHistoryDTO.Question4 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4No") {
            this.setState({
                showMHQ4: false
            });
            this.props.medicalHistoryDTO.Question4 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.4Yes") {
            this.setState({
                show4MHQ4: true
            });
            this.props.medicalHistoryDTO.Question4of4 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.4No") {
            this.setState({
                show4MHQ4: false
            });
            this.props.medicalHistoryDTO.Question4of4 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.4.1Yes") {
            
            this.props.medicalHistoryDTO.Question4of4of1 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.4.1No") {
            this.props.medicalHistoryDTO.Question4of4of1 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.7Yes") {
            this.setState({
                show4MHQ7: true
            });
            this.props.medicalHistoryDTO.Question4of7 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.7No") {
            this.setState({
                show4MHQ7: false
            });
            this.props.medicalHistoryDTO.Question4of7 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.8Yes") {
            this.setState({
                show4MHQ8: true
            });
            this.props.medicalHistoryDTO.Question4of8 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.8No") {
            this.setState({
                show4MHQ8: false
            });
            this.props.medicalHistoryDTO.Question4of8 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.9Yes") {
            this.setState({
                show4MHQ9: true
            });
            this.props.medicalHistoryDTO.Question4of9 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.9No") {
            this.setState({
                show4MHQ9: false
            });
            this.props.medicalHistoryDTO.Question4of9 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.10Yes") {
            this.setState({
                show4MHQ10: true
            });
            this.props.medicalHistoryDTO.Question4of10 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.10No") {
            this.setState({
                show4MHQ10: false
            });
            this.props.medicalHistoryDTO.Question4of10 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.11Yes") {
            this.setState({
                show4MHQ11: true
            });
            this.props.medicalHistoryDTO.Question4of11 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.11No") {
            this.setState({
                show4MHQ11: false
            });
            this.props.medicalHistoryDTO.Question4of11 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.12Yes") {
            this.setState({
                show4MHQ12: true
            });
            this.props.medicalHistoryDTO.Question4of12 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.12No") {
            this.setState({
                show4MHQ12: false
            });
            this.props.medicalHistoryDTO.Question4of12 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.14Yes") {
            this.setState({
                show4MHQ14: true
            });
            this.props.medicalHistoryDTO.Question4of14 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.14No") {
            this.setState({
                show4MHQ14: false
            });
            this.props.medicalHistoryDTO.Question4of14 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.15Yes") {
            this.setState({
                show4MHQ15: true
            });
            this.props.medicalHistoryDTO.Question4of15 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues4.15No") {
            this.setState({
                show4MHQ15: false
            });
            this.props.medicalHistoryDTO.Question4of15 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues5Yes") {
            this.setState({
                showMHQ5: true
            });
            this.props.medicalHistoryDTO.Question5 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues5No") {
            this.setState({
                showMHQ5: false
            });
            this.props.medicalHistoryDTO.Question5 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues6Yes") {
            this.setState({
                showMHQ6: true
            });
            this.props.medicalHistoryDTO.Question6 = true;
            this.setState({});
            console.log("Radio valueA", this.state.radioValA)
        }
        else if (this.state.radioValMH == "MHQues6No") {
            this.setState({
                showMHQ6: false
            });
            this.props.medicalHistoryDTO.Question6 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues7Yes") {
            this.setState({
                showMHQ7: true
            });
            this.props.medicalHistoryDTO.Question7 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues7No") {
            this.setState({
                showMHQ7: false
            });
            this.props.medicalHistoryDTO.Question7 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues8Yes") {
            this.setState({
                showMHQ8: true
            });
            this.props.medicalHistoryDTO.Question8 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues8No") {
            this.setState({
                showMHQ8: false
            });
            this.props.medicalHistoryDTO.Question8 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues9Yes") {
            this.setState({
                showMHQ9: true
            });
            this.props.medicalHistoryDTO.Question9 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues9No") {
            this.setState({
                showMHQ9: false
            });
            this.props.medicalHistoryDTO.Question9 = false;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues10Yes") {
            this.setState({
                showMHQ10: true
            });
            this.props.medicalHistoryDTO.Question10 = true;
            this.setState({});
        }
        else if (this.state.radioValMH == "MHQues10No") {
            this.setState({
                showMHQ10: false
            });
            this.props.medicalHistoryDTO.Question10 = false;
            this.setState({});
        }
    }
    
    handleRadioChangeFB = (e) => {

        
       
        this.state.radioValFB = e.target.value;
        this.state.selectedValueFB = e.target.value;

        console.log("radioValFB", this.state.radioValFB)
        console.log("selectedValueFB", this.state.selectedValueFB)
        
        if (this.state.radioValFB == "FBQues1Yes") {
            this.setState({
                showFBQ1: true
            });
            
        }
        else if (this.state.radioValFB == "FBQues1No") {
            this.setState({
                showFBQ1: false
            })
        }
    }


    /////////////////////////////////////////Handlig Current/Previous Life Insurance///////////////////////////////////////////////////////////////////////////////

    handleInsurancedatatable = () => {
        this.setState({
            insurancedatatable: this.props.insurancetable.map((m, index) => {
                return {
                    insuranceCompanyName: <CustomInput value={m.insuranceCompanyName} onChange={(e) => this.handleInsuranceSetValues(e, index)} name="insuranceCompanyName" formControlProps={{ fullWidth: true }} />,
                    policyNo: <CustomInput value={m.policyNo} onChange={(e) => this.handleInsuranceSetValues(e, index)} name="policyNo" formControlProps={{ fullWidth: true }} />,
                    sumAssured: <CustomInput value={m.sumAssured} onChange={(e) => this.handleInsuranceSetValues(e, index)} name="sumAssured" formControlProps={{ fullWidth: true }} />,
                    accidentalDeathBenefit: <CustomInput value={m.accidentalDeathBenefit} onChange={(e) => this.handleInsuranceSetValues(e, index)} name="accidentalDeathBenefit" formControlProps={{ fullWidth: true }} />,
                    criticalIllnessBenefit: <CustomInput value={m.criticalIllnessBenefit} onChange={(e) => this.handleInsuranceSetValues(e, index)} name="criticalIllnessBenefit" formControlProps={{ fullWidth: true }} />,
                    permanentDisability: <CustomInput value={m.permanentDisability} onChange={(e) => this.handleInsuranceSetValues(e, index)} name="permanentDisability" formControlProps={{ fullWidth: true }} />,
                    hospitalization: <CustomInput value={m.hospitalization} onChange={(e) => this.handleInsuranceSetValues(e, index)} name="hospitalization" formControlProps={{ fullWidth: true }} />,
                    status: <CustomInput value={m.status} onChange={(e) => this.handleInsuranceSetValues(e, index)} name="status" formControlProps={{ fullWidth: true }} />,
                    actions: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteInsurancedata(e, index)} ><Delete /> </Button >
                };
            })
        })
    }

    handleInsuranceSetValues = (event, index) => {
        let insurancetabledto = this.props.insurancetable;
        let name = event.target.name;
        let value = event.target.value;
        insurancetabledto[index][name] = value;
        this.setState({ insurancetabledto });

        console.log("insurace table testing:", this.props.insurancetable);
        this.handleInsurancedatatable();
    }

    handleInsuranceAddButton = () => {
        let InsuranceObjectNew = Object.assign({}, this.props.insuranceDto);
        this.props.insurancetable.push(InsuranceObjectNew);
        this.setState({});
        this.handleInsurancedatatable();

    }

    deleteInsurancedata = (index) => {
        this.props.insurancetable.splice(index, 1);
        this.handleInsurancedatatable();
        console.log("insurancetable:", this.props.insurancetable);
    }

    /////////////////////////////////////////Handlig Current/Previously Claimed details///////////////////////////////////////////////////////////////////////////////

    handleClaimeddatatable = () => {
        this.setState({
            claimeddatatable: this.props.claimedtable.map((m, index) => {
                return {
                    companyName: <CustomInput value={m.companyName} onChange={(e) => this.handleClaimedSetValues(e, index)} name="companyName" formControlProps={{ fullWidth: true }} />,
                    policyNo: <CustomInput value={m.policyNo} onChange={(e) => this.handleClaimedSetValues(e, index)} name="policyNo" formControlProps={{ fullWidth: true }} />,
                    natureOfClaim: <CustomInput value={m.natureOfClaim} onChange={(e) => this.handleClaimedSetValues(e, index)} name="natureOfClaim" formControlProps={{ fullWidth: true }} />,
                    dateOfClaim: <CustomInput value={m.dateOfClaim} onChange={(e) => this.handleClaimedSetValues(e, index)} name="dateOfClaim" formControlProps={{ fullWidth: true }} />,
                    actions: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteClaimeddata(e, index)} ><Delete /> </Button >
                };
            })
        })
    }

    handleClaimedSetValues = (event, index) => {
        let claimedtabledto = this.props.claimedtable;
        let name = event.target.name;
        let value = event.target.value;
        claimedtabledto[index][name] = value;
        this.setState({ claimedtabledto });

        console.log("claimed table testing:", this.props.claimedtable);
        this.handleClaimeddatatable();
    }

    handleClaimedAddButton = () => {
        let ClaimedObjectNew = Object.assign({}, this.props.claimedDto);
        this.props.claimedtable.push(ClaimedObjectNew);
        this.setState({});
        this.handleClaimeddatatable();

    }

    deleteClaimeddata = (index) => {
        this.props.claimedtable.splice(index, 1);
        this.handleClaimeddatatable();
        console.log("claimedtable:", this.props.claimedtable);
    }

    ////////////////////////////////////////////////////////////////// Handling Currently taking Medicine details ///////////////////////////////////////////////////////////////////////////////////////

    handleCMDataTable = () => {
        this.setState({
            CMdatatable: this.props.cmedicinetable.map((m, index) => {
                return {
                    nameOfMedication: <CustomInput value={m.nameOfMedication} onChange={(e) => this.handleCMSetValues(e, index)} name="nameOfMedication" formControlProps={{ fullWidth: true }} />,
                    dose: <CustomInput value={m.dose} onChange={(e) => this.handleCMSetValues(e, index)} name="dose" formControlProps={{ fullWidth: true }} />,
                    frequency: <CustomInput value={m.frequency} onChange={(e) => this.handleCMSetValues(e, index)} name="frequency" formControlProps={{ fullWidth: true }} />,
                    actions: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteCMdata(e, index)} ><Delete /> </Button >
                };
            })
        })
    }

    handleCMSetValues = (event, index) => {
        let cmedicinetabledto = this.props.cmedicinetable;
        let name = event.target.name;
        let value = event.target.value;
        cmedicinetabledto[index][name] = value;
        this.setState({ cmedicinetabledto });

        console.log("cmedicine table testing:", this.props.cmedicinetable);
        this.handleCMDataTable();
    }

    handleCMAddButton = () => {
        let CMObjectNew = Object.assign({}, this.props.cmedicineDto);
        this.props.cmedicinetable.push(CMObjectNew);
        this.setState({});
        this.handleCMDataTable();

    }

    deleteCMdata = (index) => {
        this.props.cmedicinetable.splice(index, 1);
        this.handleCMDataTable();
        console.log("cmedicinetable:", this.props.cmedicinetable);
    }

    ////////////////////////////////////////////////////////////////// Handling Last Taken Medicine details ///////////////////////////////////////////////////////////////////////////////////////

    handleLMDataTable = () => {
        this.setState({
            LMdataTable: this.props.lmedicinetable.map((m, index) => {
                return {
                    nameOfMedication: <CustomInput value={m.nameOfMedication} onChange={(e) => this.handleLMSetValues(e, index)} name="nameOfMedication" formControlProps={{ fullWidth: true }} />,
                    dose: <CustomInput value={m.dose} onChange={(e) => this.handleLMSetValues(e, index)} name="dose" formControlProps={{ fullWidth: true }} />,
                    frequency: <CustomInput value={m.frequency} onChange={(e) => this.handleLMSetValues(e, index)} name="frequency" formControlProps={{ fullWidth: true }} />,
                    dateLastTaken: <CustomInput value={m.dateLastTaken} onChange={(e) => this.handleLMSetValues(e, index)} name="dateLastTaken" formControlProps={{ fullWidth: true }} />,
                    actions: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteLMdata(e, index)} ><Delete /> </Button >
                };
            })
        })
    }

    handleLMSetValues = (event, index) => {
        let lmedicinetabledto = this.props.lmedicinetable;
        let name = event.target.name;
        let value = event.target.value;
        lmedicinetabledto[index][name] = value;
        this.setState({ lmedicinetabledto });

        console.log("lmedicine table testing:", this.props.lmedicinetable);
        this.handleLMDataTable();
    }

    handleLMAddButton = () => {
        let LMedicineObjectNew = Object.assign({}, this.props.lmedicineDto);
        this.props.lmedicinetable.push(LMedicineObjectNew);
        this.setState({});
        this.handleLMDataTable();

    }

    deleteLMdata = (index) => {
        this.props.lmedicinetable.splice(index, 1);
        this.handleLMDataTable();
        console.log("lmedicinetable:", this.props.lmedicinetable);
    }

    ////////////////////////////////////////////////////////////////// Handling Treatent,Test or Investment details ///////////////////////////////////////////////////////////////////////////////////////

    handleTreatDataTable = () => {
        this.setState({
            TreatdataTable: this.props.Treatmenttable.map((m, index) => {
                return {
                    nameOfTreatment: <CustomInput value={m.nameOfTreatment} onChange={(e) => this.handleTreatSetValues(e, index)} name="nameOfTreatment" formControlProps={{ fullWidth: true }} />,
                    location: <CustomInput value={m.location} onChange={(e) => this.handleTreatSetValues(e, index)} name="location" formControlProps={{ fullWidth: true }} />,
                    date: <CustomInput value={m.date} onChange={(e) => this.handleTreatSetValues(e, index)} name="date" formControlProps={{ fullWidth: true }} />,
                    result: <CustomInput value={m.result} onChange={(e) => this.handleTreatSetValues(e, index)} name="result" formControlProps={{ fullWidth: true }} />,
                    actions: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteLMdata(e, index)} ><Delete /> </Button >
                };
            })
        })
    }

    handleTreatSetValues = (event, index) => {
        let Treattabledto = this.props.Treatmenttable;
        let name = event.target.name;
        let value = event.target.value;
        Treattabledto[index][name] = value;
        this.setState({ Treattabledto });

        console.log("lmedicine table testing:", this.props.Treatmenttable);
        this.handleTreatDataTable();
    }

    handleTreatAddButton = () => {
        let TreatObjectNew = Object.assign({}, this.props.TreatmentDto);
        this.props.Treatmenttable.push(TreatObjectNew);
        this.setState({});
        this.handleTreatDataTable();

    }

    deleteLMdata = (index) => {
        this.props.Treatmenttable.splice(index, 1);
        this.handleTreatDataTable();
        console.log("lmedicinetable:", this.props.Treatmenttable);
    }

    ////////////////////////////////////////////////////////////////// Handling Doctor,Hospital or Clinic details ///////////////////////////////////////////////////////////////////////////////////////

    handleDHCDataTable = () => {
        this.setState({
            DHCdataTable: this.props.DHCtable.map((m, index) => {
                return {
                    nameOfDoctor: <CustomInput value={m.nameOfDoctor} onChange={(e) => this.handleTreatSetValues(e, index)} name="nameOfDoctor" formControlProps={{ fullWidth: true }} />,
                    address: <CustomInput value={m.address} onChange={(e) => this.handleTreatSetValues(e, index)} name="address" formControlProps={{ fullWidth: true }} />,
                    dateOfLastConsult: <CustomInput value={m.dateOfLastConsult} onChange={(e) => this.handleTreatSetValues(e, index)} name="dateOfLastConsult" formControlProps={{ fullWidth: true }} />,
                    actions: <Button justIcon round simple color="danger" className="remove" disabled={(this.state.nonedit === true) ? true : false} onClick={(e) => this.deleteLMdata(e, index)} ><Delete /> </Button >
                };
            })
        })
    }

    handleDHCSetValues = (event, index) => {
        let DHCTabledto = this.props.DHCtable;
        let name = event.target.name;
        let value = event.target.value;
        DHCTabledto[index][name] = value;
        this.setState({ DHCTabledto });

        console.log("DHC table testing:", this.props.DHCtable);
        this.handleDHCDataTable();
    }

    handleDHCAddButton = () => {
        let DHCObjectNew = Object.assign({}, this.props.DHCtDto);
        this.props.DHCtable.push(DHCObjectNew);
        this.setState({});
        this.handleDHCDataTable();

    }

    deleteLMdata = (index) => {
        this.props.DHCtable.splice(index, 1);
        this.handleDHCDataTable();
        console.log("Treatmenttable:", this.props.Treatmenttable);
    }

    
    getRadioButtonVal = event => {
        this.setState({
            radioVal: event.target.value
        })
    }
    render() {
        return (
            <GridContainer lg={12}>
                <GridItem xs={12}>
                    <QuestioneriesWizard
                        LifeStyleQA={this.props.LifeStyleQA}
                        QuestionalDetailsSetValue={this.props.QuestionalDetailsSetValue}
                        TobaccoQuestionAddButton={this.props.TobaccoQuestionAddButton}
                        tobaccodata={this.props.tobaccodata}
                        AlcoholQuestionAddButton={this.props.AlcoholQuestionAddButton}
                        alcoholdata={this.props.alcoholdata}
                        MasterDataDto={this.state.MasterDataDto}
                        LifeStyleQuesDTO={this.state.LifeStyleQuesDTO}
                        MedHistQuesDTO={this.state.MedHistQuesDTO}
                        FBQuesDTO={this.state.FBQuesDTO}
                        ADQuesDTO={this.state.ADQuesDTO}
                        PCQuesDTO={this.state.PCQuesDTO}
                        medicalHistoryDTO={this.props.medicalHistoryDTO}
                        MHDetailsSetValue={this.props.MHDetailsSetValue}

                        selectedValue={this.state.selectedValue}
                        selectedValueMLLSQ2={this.state.selectedValueMLLSQ2}
                        selectedValueMH={this.state.selectedValueMH}

                        ddlval={this.state.ddlval}
                        handleSimple={this.handleSimple}
                        handleRadioChangeT={this.handleRadioChangeT}
                        showradioval={this.state.showradioval}
                        showAlcoholradioval={this.state.showAlcoholradioval}
                        showQuestion1={this.state.showQuestion1}
                        showQuestion2={this.state.showQuestion2}
                        showQuestion3={this.state.showQuestion3}
                        data={this.state.data}

                        selectedValueIns={this.state.selectedValueIns}
                        radioValPCIns={this.state.radioValPCIns}
                        handleRadioChangePCIns={this.handleRadioChangePCIns}
                        showPCL1={this.state.showPCL1}
                        showPCL2={this.state.showPCL2}
                        showPCL3={this.state.showPCL3}
                        data1={this.state.data1}


                        //MEDICAL HISTORY
                        handleRadioChangeMH={this.handleRadioChangeMH}
                        showMHQ1={this.state.showMHQ1}
                        showMHQ2={this.state.showMHQ2}
                        showMHQ3={this.state.showMHQ3}
                        showMHQ4={this.state.showMHQ4}
                        showMHQ5={this.state.showMHQ5}
                        showMHQ6={this.state.showMHQ6}
                        showMHQ7={this.state.showMHQ7}
                        showMHQ8={this.state.showMHQ8}
                        showMHQ9={this.state.showMHQ9}
                        showMHQ10={this.state.showMHQ10}
                        show4MHQ4={this.state.show4MHQ4}
                        show4MHQ7={this.state.show4MHQ7}
                        show4MHQ8={this.state.show4MHQ8}
                        show4MHQ9={this.state.show4MHQ9}
                        show4MHQ10={this.state.show4MHQ10}
                        show4MHQ11={this.state.show4MHQ11}
                        show4MHQ12={this.state.show4MHQ12}
                        show4MHQ14={this.state.show4MHQ14}
                        show4MHQ15={this.state.show4MHQ15}

                        // FAMILY BACKGROUND
                        handleRadioChangeFB={this.handleRadioChangeFB}
                        showFBQ1={this.state.showFBQ1}
                        selectedValueFB={this.state.selectedValueFB}
                        familydatatable={this.props.familydatatable}
                        handleAddButton={this.props.handleAddButton}

                        //CURRENT/PREVIOUS LIFE INSURANCE
                        handleInsuranceAddButton={this.handleInsuranceAddButton}
                        insurancedatatable={this.state.insurancedatatable}

                        //CURRENT/PREVIOUS CLAIMED DETAILS
                        handleClaimedAddButton={this.handleClaimedAddButton}
                        claimeddatatable={this.state.claimeddatatable}

                        //MEDICINE DETAILS
                        handleCMAddButton={this.handleCMAddButton}
                        CMdatatable={this.state.CMdatatable}
                        handleLMAddButton={this.handleLMAddButton}
                        LMdataTable={this.state.LMdataTable}
                        handleTreatAddButton={this.handleTreatAddButton}
                        TreatdataTable={this.state.TreatdataTable}
                        handleDHCAddButton={this.handleDHCAddButton}
                        DHCdataTable={this.state.DHCdataTable}
                    />
                    </GridItem>
            </GridContainer>
        );
    }
}
export default Questionnaries;


