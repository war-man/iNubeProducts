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
const dataTable = {

    dataRows: [  ["NO ITEMS"] ]
};


class Questionnaries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ddlval: "",
            MasterDataDto:[],

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
            selectedValueMH:null,
           
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
            showMHQ5: false,
            showMHQ6: false,
            showMHQ7: false,
            showMHQ8: false,
            showMHQ9: false,
            showMHQ10: false,
            data: [],
            radioVal: "",
            radioValPCIns: "",
            radioValMH: "",
               
           

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
       // debugger;
        this.state.radioVal = e.target.value;
        this.state.selectedValue = e.target.value;
        this.state.selectedValueMLLSQ2 = e.target.value;
        if (this.state.radioVal == "TabacoYes") {
            this.setState({
                showradioval: true
            })
            console.log("Radio value", this.state.radioVal)
        }
        else if (this.state.radioVal == "TabacoNo") {
            this.setState({
                showradioval: false
            })
            console.log("Radio value", this.state.radioVal)
        }

        else if (this.state.radioVal == "AlcoholYes") {
            this.setState({
                showAlcoholradioval: true
            })
            console.log("Radio value", this.state.radioVal)
        }
        else if (this.state.radioVal == "AlcoholNo") {
            this.setState({
                showAlcoholradioval: false
            })
            console.log("Radio value", this.state.radioVal)
        }

        else if (this.state.radioVal == "Question1Yes") {
            this.setState({
                showQuestion1: true
            })
        }
        else if (this.state.radioVal == "Question1no") {
            this.setState({
                showQuestion1: false
            })
        }

        else if (this.state.radioVal == "Question2Yes") {
            this.setState({
                showQuestion2: true
            })
        }
        else if (this.state.radioVal == "Question2No") {
            this.setState({
                showQuestion2: false
            })
        }

        else if (this.state.radioVal == "Question3Yes") {
            this.setState({
                showQuestion3: true
            })
        }
        else if (this.state.radioVal == "Question3No") {
            this.setState({
                showQuestion3: false
            })
        }

    }

    handleRadioChangePCIns = (e) => {
        debugger;
        this.state.radioValPCIns = e.target.value;
        this.state.selectedValueIns = e.target.value;
        

        console.log("radioval3", this.state.radioVal3)
        //let selected = this.state.selectedvalue;
        //let name = e.target.name;
        //let value = e.target.value;

        //selected[name] = value;
        //this.setstate({ selected });
        //this.state.selectedValueC = e.target.value;
        

      
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
        debugger;
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
            })
        }
        else if (this.state.radioValMH == "MHQues1No") {
            this.setState({
                showMHQ1: false
            })
        }
        else if (this.state.radioValMH == "MHQues2Yes") {
            this.setState({
                showMHQ2: true
            })
        }
        else if (this.state.radioValMH == "MHQues2No") {
            this.setState({
                showMHQ2: false
            })
            console.log("mhq2", this.state.showMHQ2)
        }
       

        else if (this.state.radioValMH == "MHQues3Yes") {
            this.setState({
                showMHQ3: true
            })
        }
        else if (this.state.radioValMH == "MHQues3No") {
            this.setState({
                showMHQ3: false
            })
        }

        else if (this.state.radioValMH == "MHQues4Yes") {
            this.setState({
                showMHQ4: true
            })
        }
        else if (this.state.radioValMH == "MHQues4No") {
            this.setState({
                showMHQ4: false
            })
        }
        else if (this.state.radioValMH == "MHQues5Yes") {
            this.setState({
                showMHQ5: true
            })
        }
        else if (this.state.radioValMH == "MHQues5No") {
            this.setState({
                showMHQ5: false
            })
        }
        else if (this.state.radioValMH == "MHQues6Yes") {
            this.setState({
                showMHQ6: true
            })
            console.log("Radio valueA", this.state.radioValA)
        }
        else if (this.state.radioValMH == "MHQues6No") {
            this.setState({
                showMHQ6: false
            })
        }
        else if (this.state.radioValMH == "MHQues7Yes") {
            this.setState({
                showMHQ7: true
            })
        }
        else if (this.state.radioValMH == "MHQues7No") {
            this.setState({
                showMHQ7: false
            })
        }
        else if (this.state.radioValMH == "MHQues8Yes") {
            this.setState({
                showMHQ8: true
            })
        }
        else if (this.state.radioValMH == "MHQues8No") {
            this.setState({
                showMHQ8: false
            })
        }
        else if (this.state.radioValMH == "MHQues9Yes") {
            this.setState({
                showMHQ9: true
            })
        }
        else if (this.state.radioValMH == "MHQues9No") {
            this.setState({
                showMHQ9: false
            })
        }
        else if (this.state.radioValMH == "MHQues10Yes") {
            this.setState({
                showMHQ10: true
            })
        }
        else if (this.state.radioValMH == "MHQues10No") {
            this.setState({
                showMHQ10: false
            })
        }
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
                        MasterDataDto={this.state.MasterDataDto}
                        LifeStyleQuesDTO={this.state.LifeStyleQuesDTO}
                        MedHistQuesDTO={this.state.MedHistQuesDTO}
                        FBQuesDTO={this.state.FBQuesDTO}
                        ADQuesDTO={this.state.ADQuesDTO}
                        PCQuesDTO={this.state.PCQuesDTO}



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


                        //MH
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
                        
                       
                       

                    />
                    </GridItem>
            </GridContainer>
        );
    }
}
export default Questionnaries;


