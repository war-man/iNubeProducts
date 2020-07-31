import React from "react";
import FilterNone from "@material-ui/icons/FilterNone";

// @material-ui/core components
import Modal from '@material-ui/core/Modal';

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import MasterDropdown from "components/MasterDropdown/MasterDropdown.jsx";
import AddProduct from "modules/Partners/Partner/views/_AddProduct.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import searchproduct from "assets/img/search-product.png";
import Icon from "@material-ui/core/Icon";
import $ from 'jquery';
import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import user from "assets/img/user.png";
import CustomDatetime from "components/CustomDatetime/CustomDatetime.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
//import ReactTable from "react-table"; import Modal from '@material-ui/core/Modal';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import { Animated } from "react-animated-css";
import SignaturePad from 'react-signature-canvas';
import Popup from 'reactjs-popup';
import styles from './sigCanvas.css';
import ProposalApp from "./ProposalApp.css";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

import CloudUpload from "@material-ui/icons/CloudUpload";

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

const submitBtn = {
    height: "35px",
    marginTop: "-10px"
}
const BtnStyle = {
    padding: "10px",
    width: "137px"
}; 
const dataTable = {
    headerRow: ["DocumentType", "UploadLink", "Member", "Action"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["", "", "", ""],
        ["", "", "", ""],

    ]
};
class DocumentUpdating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ProposerPlace: "",
            ProposerCountry: "",
            MasQuesDTO: [],
            openpop: false,
            radioVal: "",
            selectedValue: null,
            wealthPlannerDTO: {
                "otherCircumstances": false,
                "IsPolicy": false,
                "date": "",
                "wprComments": "",
                "checkbox": false
            },
            showMQ2: false,
            openProposerpop: false,
            openSpousepop: false,
            openWPpop: false,
            proposerSignature: [],
            spouseSignature: [],
            wpSignature: [],
            sigPad : {},
            data: dataTable.dataRows.map((prop, key) => {
                return {
                    id: key,
                    DocumentType: prop[0],
                         UploadLink: (
                            <div className="actions-right">
                                <Button color="info" justIcon round simple className="CloudUpload" onClick={() => this.Uploadable()}><CloudUpload /></Button>

                            </div>
                        ),
                    Member: prop[2],
                    Action: (<CustomInput
                        //labelText="Name"
                        //value="DINESH"
                        //value={props.ProductDTO.ProductName}
                        name="Action"
                        //onChange={props.SetValue}
                        id="Action"
                        formControlProps={{
                            fullWidth: true
                        }}
                    />),                  
                
                   

                };
            })
        };


    }

    componentDidMount() {
        debugger
        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/GetmasQuestions` + ``, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        })

            .then(response => response.json())
            .then(data => {
                this.state.MasQuesDTO.push(data[728]);
                this.state.MasQuesDTO.push(data[729]);
                this.state.MasQuesDTO.push(data[730]);
                this.setState({});
                console.log("wealthPlannerQuestions", this.state.MasQuesDTO);
            });
        
    }


    /********************* Signature Pad Clearing ********************/

    clear = () => {
        this.sigPad.clear()
    }

    /******************* Save Proposer Signature ******************************/

    saveProposerSignature = () => {
        debugger;
       
        this.state.proposerSignature= this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png');
       
        this.setState({});

        var base64result = this.state.proposerSignature.split(',')[1];

        this.props.proposerSigDetailsDTO.proposerSignaturedoc = base64result;

        //this.props.SaveModifiedProposalDetails.Proposerdoc = base64result;
        this.setState({});

        console.log("proposerSignature", this.state.proposerSignature, "base64result", base64result, "this.props.proposerSigDetailsDTO", this.props.proposerSigDetailsDTO );


    }

     /******************* Save Spouse Signature ******************************/

    saveSpouseSignature = () => {
        debugger;
       
        this.state.spouseSignature= this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png');
       
        this.setState({});
        console.log("spouseSignature", this.state.spouseSignature, "hgsdyegrweu", this.state.proposerSignature);


    }

     /******************* Save Wealth Planner Signature ******************************/

    saveWPSignature = () => {
        debugger;

        this.state.wpSignature = this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png');

        this.setState({});
        var base64result = this.state.wpSignature.split(',')[1];

        this.props.wealthSigDetailsDTO.wealthSignaturedoc = base64result;
        this.setState({});

        console.log("wpSignature", this.state.wpSignature);


    }

     /******************* Set Proposer Signature ******************************/

    setProposerSignatureCanvas = () => {
        debugger;

        this.state.openProposerpop = true;

        this.setState({  });
    }

    handleProposerClose = () => {
        debugger;

        this.state.openProposerpop = false;

        this.setState({});
    }

    /******************* Set Spouse Signature ******************************/

    setSpouseSignatureCanvas = () => {
        debugger;

        this.state.openSpousepop = true;

        this.setState({});
    }

    handleSpouseClose = () => {
        this.setState({ openSpousepop: false });
    }

    /******************* Set Wealth Planner Signature ******************************/

    setWPSignatureCanvas = () => {
        debugger;

        this.state.openWPpop = true;

        this.setState({});
    }
    handleWelathPlanClose = () => {
        this.setState({ openWPpop: false });
    }

    /*************************************** Proposer Signature And details Handling **************************/

    handleProposerDetails = (evt) => {
        let proposerSigDetailsDTO = this.props.proposerSigDetailsDTO;
        proposerSigDetailsDTO[evt.target.name] = evt.target.value;
        this.setState({ proposerSigDetailsDTO });

        console.log("proposerSigDetailsDTO", this.props.proposerSigDetailsDTO);
    }

    onDateChange = (formate, type, name, event) => {
        debugger;
        var today = event.toDate();

        var day = today.getDate();
        var month = today.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;

        }
        if (day < 10) {
            day = '0' + day;
        }

        var date = day + '/' + month + '/' + today.getFullYear();
        let proposerSigDetailsDTO = this.props.proposerSigDetailsDTO;
        proposerSigDetailsDTO[name] = date;
       
        this.setState({ proposerSigDetailsDTO });

        console.log("sampledate", proposerSigDetailsDTO )
    }

    handleWealthReport = () => {
        this.setState({ openpop: true });
    }

    handleRadioChangeWP = (e) => {
        this.state.radioVal = e.target.value;
        this.state.selectedValue = e.target.value;

        if (this.state.selectedValue === "WPMQ1Yes") {

            this.state.wealthPlannerDTO.otherCircumstances = true;
            this.setState({});

        } else if (this.state.selectedValue === "WPMQ1No") {

            this.state.wealthPlannerDTO.otherCircumstances = false;
            this.setState({});

        } if (this.state.selectedValue === "WPMQ2Yes") {

            this.setState({ showMQ2: true });
            this.state.wealthPlannerDTO.IsPolicy = true;
            this.setState({});

        } else if (this.state.selectedValue === "WPMQ2No") {

            this.setState({ showMQ2: false });
            this.state.wealthPlannerDTO.IsPolicy = false;
            this.setState({});
        }
    }

    handleWPRSetValues = (event) => {
        debugger;
        let wealthPlannerDTO = this.state.wealthPlannerDTO;
        let name = event.target.name;
        let value = event.target.value;
        wealthPlannerDTO[name] = [value];
        this.setState({ wealthPlannerDTO });
    }

    handleWPRSave = () => {
        debugger;
        this.props.wealthSigDetailsDTO.otherCircumstances = this.state.wealthPlannerDTO.otherCircumstances;
        this.props.wealthSigDetailsDTO.IsPolicy = this.state.wealthPlannerDTO.IsPolicy;
        this.props.wealthSigDetailsDTO.date = this.state.wealthPlannerDTO.date;
        this.props.wealthSigDetailsDTO.wprComments = this.state.wealthPlannerDTO.wprComments;
        this.props.wealthSigDetailsDTO.checkbox = this.state.wealthPlannerDTO.checkbox;
        this.setState({});

        console.log("wealthSigDetailsDTO", this.props.wealthSigDetailsDTO);
    }

    handleWPRCheckbox = (event) => {
        let state = this.state;

        if (event.target.checked == true) {
            state.wealthPlannerDTO.checkbox = true;
            this.setState({});
        } else {
            state.wealthPlannerDTO.checkbox = false;
            this.setState({});
        }
    }

    handleWPRClose = () => {
        this.setState({ openpop: false });
    };

    onWPRdateChange = (name, evt) => {
        var today = evt.toDate();

        var day = today.getDate();
        var month = today.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;

        }
        if (day < 10) {
            day = '0' + day;
        }

        var date = day + '/' + month + '/' + today.getFullYear();

        let wealthPlannerDate = this.state.wealthPlannerDTO;
        wealthPlannerDate[name] = date;

        this.setState({ wealthPlannerDate });

        console.log("wealthPlannerDate", wealthPlannerDate);
    }
   
    render() {
        let { trimmedDataURL } = this.state;
        const { classes } = this.props;

        return (

           
         
            <GridContainer lg={12} >
                <GridItem lg={12} md={12}>
                   
                        <CardBody>


                            <GridContainer xl={12}>
                                <GridItem lg={12}>

                                    <CardBody>

                                            <ReactTable
                                                data={this.state.data}
                                                filterable
                                                columns={[

                                                    {
                                                        Header: "DOCUMENT TYPE",
                                                        accessor: "DocumentType",
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 60,
                                                        resizable: false,
                                                        /* minWidth: 150,
                                                           style: { textAlign: "center" },
                                                           headerClassName: 'react-table-center'*/
                                                    },
                                                    {

                                                        Header: "UPLOAD LINK",
                                                        accessor: "UploadLink",
                                                        minWidth: 60,
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 70,
                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "MEMBER",
                                                        accessor: "Member",
                                                        minWidth: 50,
                                                        //style: { textAlign: "center" },
                                                        //headerClassName: 'react-table-center'
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',

                                                        resizable: false,
                                                    },
                                                    {
                                                        Header: "ACTION",
                                                        accessor: "Action",

                                                        ///style: { textAlign: "center" },
                                                        ///headerClassName: 'react-table-center'
                                                        style: { textAlign: "center" },
                                                        headerClassName: 'react-table-center',
                                                        minWidth: 60,
                                                        resizable: false,
                                                    }                                                   

                                                ]}
                                                defaultPageSize={5}
                                                showPaginationTop={false}
                                                pageSize={2}
                                                showPaginationBottom
                                                className="-striped -highlight discription-tab"
                                            />



                                            </CardBody>
                                      
                                    </GridItem>
                               
                            </GridContainer>

                        <GridContainer justify="center">
                        <GridItem >
                            <div>
                                <Button color="info"
                                    round className={this.props.classes.marginRight}
                                   // onClick={this.handleLeadSave}
                                    id="saveBtn" >
                                    Save
                                </Button>
                            </div>
                            </GridItem>
                        </GridContainer>
                                <div className="actions-right">
                                <GridItem xs={12} sm={12} md={12} className="downlevel">
                                    <CustomCheckbox
                                        name="checkbox"

                                        formControlProps={{
                                            fullWidth: true
                                        }}

                                    />
                                  
                                </GridItem>
                                <p> I/We DECLARE that the statements made in this proposal are true in every respect and that I/We have not withheld any information requested
                                  there in and that these statements and this declaration and any statement made to the medical examiner shall form the basis
                                  of the proposed contract and that if any untrue averment the said contract shall be absolutely null and void.
                             </p>
                                <p> In the event the proposal is filled by the sales person or any other on my behalf. I confirm having verified the
                                    information/ statements/ answers and declare that those are true in every aspect and to the best of my Knowledge.
                                </p>

                                 <p>    I/We consent to Metlife seeking from any doctor, clinic or hospital any medical information concerning anything which 
                                        affects the physical or mental health or seeking information from any other insurer to whom a proposal has been made for life 
                                         Insurance on the proposed Life Assured and I/We authorize the giving of such information.I/We agree to inform Metlife of any 
                                        changes in health or occupation of the proposed Life Assured between the data of this proposal and date of acceptance.
                              </p>
                                <p> I/We authorize and conseent to Metlife to use mylour use my/our mobile or other phone numbers for further communications with me/us
                                       and to obtain further information regarding any matter pertaining to the assessment and processing of this proposal regardless of
                                       whether this proposal is accepted or not. I/We understand that such telephone conversations may be recorded and any information given
                                       by me/us shall form part and parcel of this proposal and my/our duty of full disclosure of information.
                                    </p>
                            </div>
                           

                           
                        </CardBody >
                  
                </GridItem>
              
                <GridItem md={6}>
                    
                        <CardBody>
                            <h4>Proposer</h4>
                   
                            <GridItem >
                          
                                <div className={ProposalApp.App}>
                                <Popup modal
                                    open={this.state.openProposerpop}
                                    trigger={<div className="actions-right">
                                        <Button color="info"
                                            round className={this.props.classes.marginRight}
                                            onClick={this.setProposerSignatureCanvas}
                                            id="saveBtn" >
                                            Add Proposer Signature
                                </Button>
                                    </div>}
                                    closeOnDocumentClick={false}

                                    
                                >

                                    <h4><small >Tap to add Proposer Signature</small></h4>
                                     <div className={styles.container}>
                                        <div className={styles.sigContainer}>
                                            <SignaturePad canvasProps={{ width: 650, height: 300, className: styles.sigPad }}
                                        ref={(ref) => { this.sigPad = ref }}
                                    />

                                            <GridContainer justify="center">
                                                <GridItem xs={3} sm={3} md={3}>
                                            <Button
                                                color="info"
                                                round
                                                id="save-bnt"
                                                className={classes.marginRight} onClick={this.clear}>
                                                Clear
                                    </Button>
                                                </GridItem>
                                                <GridItem xs={3} sm={3} md={3}>
                                            <Button color="info"
                                                round
                                                id="save-bnt"
                                                className={classes.marginRight} onClick={this.saveProposerSignature}>
                                                Save
                                    </Button>
                                                </GridItem>
                                                    <GridItem xs={3} sm={3} md={3}>
                                            <Button color="info"
                                                round
                                                id="save-bnt"
                                                        className={classes.marginRight} onClick={this.handleProposerClose}>
                                                Close
                                    </Button>
                                                </GridItem>
                                            </GridContainer>

                                             </div>
                                        {/* {trimmedDataURL
                                            ? <img
                                                style={{ width: "05rem" }}
                                                className={styles.sigImage}
                                        src={trimmedDataURL} />
                                    : null}*/}
                                       </div>
    
                                </Popup>
                                </div>
                           
                            </GridItem>
                       


           
                        <GridItem xl={12} sm={4} md={4}>
                            <CustomDatetime
                                required={true}
                                onFocus={this.onClick}
                                validdate={this.validdate}
                                labelText="Proposer Date"
                                id='ProposerDate'
                                value={this.props.proposerSigDetailsDTO.proposerDate}
                                name='proposerDate'
                                onChange={(evt) => this.onDateChange('datetime', 'proposerSigDetailsDTO', 'proposerDate', evt)}
                                formControlProps={{ fullWidth: true }}
                            />
                        </GridItem>
                        <GridItem xl={12} sm={4} md={4}>
                        <CustomInput
                            success={this.ProposerPlace === "success"}
                            error={this.ProposerPlace === "error"}
                            labelText="Proposer Place"
                                name="proposerPlace"
                                value={this.props.proposerSigDetailsDTO.proposerPlace}
                            required={true}
                            onChange={(e) => this.handleProposerDetails(e)}
                            value={this.ProposerPlace}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                        <GridItem xl={12} sm={4} md={5}>
                        <CustomInput
                            success={this.ProposerCountry === "success"}
                            error={this.ProposerCountry === "error"}
                            labelText="Proposer Country"
                                value={this.props.proposerSigDetailsDTO.proposerCountry}
                                name="proposerCountry"
                            required={true}
                                onChange={(e) => this.handleProposerDetails(e)}
                            value={this.ProposerCountry}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                            </GridItem>
                             </CardBody>
                   
                  </GridItem>
                   
                <GridItem md={6}>
                   
                        <CardBody>
                            <h4>Spouse</h4>
                       

                       
                        <GridItem >

                            <div className={ProposalApp.App}>
                                <Popup modal
                                    open={this.state.openSpousepop}
                                    trigger={<div className="actions-right">
                                        <Button color="info"
                                            round className={this.props.classes.marginRight}
                                            onClick={this.setSpouseSignatureCanvas}
                                            id="saveBtn" >
                                            Add Spouse Signature
                                </Button>
                                    </div>}
                                    closeOnDocumentClick={false}


                                >

                                    <h4><small >Tap to add Spouse Signature</small></h4>
                                    <div className={styles.container}>
                                        <div className={styles.sigContainer}>
                                            <SignaturePad canvasProps={{ width: 650, height: 300, className: styles.sigPad }}
                                                ref={(ref) => { this.sigPad = ref }}
                                            />

                                            <GridContainer justify="center">
                                                <GridItem xs={3} sm={3} md={3}>
                                                    <Button
                                                        color="info"
                                                        round
                                                        id="save-bnt"
                                                        className={classes.marginRight} onClick={this.clear}>
                                                        Clear
                                    </Button>
                                                </GridItem>
                                                <GridItem xs={3} sm={3} md={3}>
                                                    <Button color="info"
                                                        round
                                                        id="save-bnt"
                                                        className={classes.marginRight} onClick={this.saveSpouseSignature}>
                                                        Save
                                    </Button>
                                                </GridItem>
                                                <GridItem xs={3} sm={3} md={3}>
                                                    <Button color="info"
                                                        round
                                                        id="save-bnt"
                                                        className={classes.marginRight} onClick={this.handleSpouseClose}>
                                                        Close
                                    </Button>
                                                </GridItem>
                                            </GridContainer>

                                        </div>
                                        {/* {trimmedDataURL
                                            ? <img
                                                style={{ width: "05rem" }}
                                                className={styles.sigImage}
                                        src={trimmedDataURL} />
                                    : null}*/}
                                    </div>

                                </Popup>
                            </div>

                        </GridItem>
                       


                    
                        <GridItem xl={12} sm={4} md={4}>
                        <CustomDatetime required={true} onFocus={this.onClick} validdate={this.validdate} labelText="Spouse Date" id='SpouseDate' name='SpouseDate' onChange={(evt) => this.onDateChange('datetime', 'ProductDTO', 'activeFrom', evt)} formControlProps={{ fullWidth: true }} />
                    </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                            success={this.SpousePlace === "success"}
                            error={this.SpousePlace === "error"}
                            labelText="Spouse Place"
                            name="SpousePlace"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.SpousePlace}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                        <CustomInput
                            success={this.SpouseCountry === "success"}
                            error={this.SpouseCountry === "error"}
                            labelText="Spouse Country"
                            name="Spouse Country"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
                            value={this.SpouseCountry}
                            formControlProps={{
                                fullWidth: true
                            }}
                        />
                    </GridItem>
                            
                        </CardBody>
                     
                </GridItem> 
         
              
                <GridItem lg={12} md={7}>
                    
                        <CardBody>
                        
                        <h4>Wealth Planner</h4>
               
                        <div className="actions-right">
                           


                            <GridItem >
                                <div className="actions-right">
                                    <Button color="info"
                                        round className={this.props.classes.marginRight}
                                        onClick={this.handleWealthReport}
                                        id="saveBtn" >
                                        WP/FPE Report
                                </Button>
                                </div>
                            </GridItem>
                       
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.openpop}
                                onClose={this.handleWPRClose}>
                                <div className={classes.paper} id="modal">
                                    <h4><small className="center-text">Wealth Planner's Confidential Report</small></h4>
                                    <Button color="info"
                                        round
                                        className={classes.marginRight}
                                        id="close-bnt"
                                        onClick={this.handleWPRClose}>
                                        &times;
                                    </Button>
                                    <div id="disp">
                                        <GridItem>

                                            <p>   1. {(this.state.MasQuesDTO[0] !== undefined) ? this.state.MasQuesDTO[0].questionText : ""}</p>

                                        </GridItem>

                                        <GridItem xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={this.state.selectedValue === "WPMQ1Yes"}
                                                        onChange={this.handleRadioChangeWP}
                                                        value="WPMQ1Yes"
                                                        name="radio1"
                                                        aria-label="B"
                                                        icon={
                                                            <FiberManualRecord
                                                                className={classes.radioUnchecked}
                                                            />
                                                        }
                                                        checkedIcon={
                                                            <FiberManualRecord
                                                                className={classes.radioChecked}
                                                            />
                                                        }
                                                        classes={{
                                                            checked: classes.radio,
                                                            root: classes.radioRoot
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label
                                                }}
                                                label="Yes"
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={this.state.selectedValue === "WPMQ1No"}
                                                        onChange={this.handleRadioChangeWP}
                                                        value="WPMQ1No"
                                                        name="radio1"
                                                        aria-label="B"
                                                        icon={
                                                            <FiberManualRecord
                                                                className={classes.radioUnchecked}
                                                            />
                                                        }
                                                        checkedIcon={
                                                            <FiberManualRecord
                                                                className={classes.radioChecked}
                                                            />
                                                        }
                                                        classes={{
                                                            checked: classes.radio,
                                                            root: classes.radioRoot
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label
                                                }}
                                                label="No"
                                            />
                                        </GridItem>

                                        <GridItem>

                                            <p>   2. {(this.state.MasQuesDTO[1] !== undefined) ? this.state.MasQuesDTO[1].questionText : ""}</p>

                                        </GridItem>
                                        <GridItem xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={this.state.selectedValue === "WPMQ2Yes"}
                                                        onChange={this.handleRadioChangeWP}
                                                        value="WPMQ2Yes"
                                                        name="radio1"
                                                        aria-label="B"
                                                        icon={
                                                            <FiberManualRecord
                                                                className={classes.radioUnchecked}
                                                            />
                                                        }
                                                        checkedIcon={
                                                            <FiberManualRecord
                                                                className={classes.radioChecked}
                                                            />
                                                        }
                                                        classes={{
                                                            checked: classes.radio,
                                                            root: classes.radioRoot
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label
                                                }}
                                                label="Yes"
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        checked={this.state.selectedValue === "WPMQ2No"}
                                                        onChange={this.handleRadioChangeWP}
                                                        value="WPMQ2No"
                                                        name="radio1"
                                                        aria-label="B"
                                                        icon={
                                                            <FiberManualRecord
                                                                className={classes.radioUnchecked}
                                                            />
                                                        }
                                                        checkedIcon={
                                                            <FiberManualRecord
                                                                className={classes.radioChecked}
                                                            />
                                                        }
                                                        classes={{
                                                            checked: classes.radio,
                                                            root: classes.radioRoot
                                                        }}
                                                    />
                                                }
                                                classes={{
                                                    label: classes.label
                                                }}
                                                label="No"
                                            />
                                        </GridItem>
                                        {this.state.showMQ2 &&
                                            <GridItem xs={3}>
                                                <CustomDatetime
                                                    labelText={(this.state.MasQuesDTO[2] !== undefined) ? this.state.MasQuesDTO[2].questionText : ""}
                                                    value={this.state.wealthPlannerDTO.date}
                                                    name='date'
                                                    onChange={(e) => this.onWPRdateChange('date', e)}
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        }

                                        <GridItem xs={12} sm={12} md={12}>
                                            <CustomInput
                                                //success={props.EmiratesId === "success"}
                                                //error={props.EmiratesId === "error"}
                                                labelText="Comments"
                                                name="comments"
                                                value={this.state.wealthPlannerDTO.wprComments }
                                                onChange={(e) => this.handleWPRSetValues(e)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>

                                        <GridItem xs={12} sm={12} md={12} className="downlevel">
                                            <CustomCheckbox
                                                name="checkbox"
                                                value={this.state.wealthPlannerDTO.checkbox}
                                                onChange={(e) => this.handleWPRCheckbox(e)}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}

                                            />
                                            I here by confirm that the signature of the policy owner / life assured was placed in my presence on the date specified below.
                                        </GridItem>

                                        <GridItem >
                                            <div>
                                                <Button color="info"
                                                    round className={this.props.classes.marginRight}
                                                    onClick={this.handleWPRSave}
                                                    id="saveBtn" >
                                                    Save
                                                </Button>
                                            </div>
                                        </GridItem>
                                    </div>

                                </div>
                            </Modal>
                   
                        <h6>Signature:</h6>

                            <GridItem >

                                <div className={ProposalApp.App}>
                                    <Popup modal
                                        open={this.state.openWPpop}
                                        trigger={<div className="actions-right">
                                            <Button color="info"
                                                round className={this.props.classes.marginRight}
                                                onClick={this.setWPSignatureCanvas}
                                                id="saveBtn" >
                                                WP/FPE Signature
                                </Button>
                                        </div>}
                                        closeOnDocumentClick={false}
                                    >

                                        <h4><small >Tap to add WP/FPE Signature</small></h4>
                                        <div className={styles.container}>
                                            <div className={styles.sigContainer}>
                                                <SignaturePad canvasProps={{ width: 650, height: 300, className: styles.sigPad }}
                                                    ref={(ref) => { this.sigPad = ref }}
                                                />

                                                <GridContainer justify="center">
                                                    <GridItem xs={3} sm={3} md={3}>
                                                        <Button
                                                            color="info"
                                                            round
                                                            id="save-bnt"
                                                            className={classes.marginRight} onClick={this.clear}>
                                                            Clear
                                    </Button>
                                                    </GridItem>
                                                    <GridItem xs={3} sm={3} md={3}>
                                                        <Button color="info"
                                                            round
                                                            id="save-bnt"
                                                            className={classes.marginRight} onClick={this.saveWPSignature}>
                                                            Save
                                    </Button>
                                                    </GridItem>
                                                    <GridItem xs={3} sm={3} md={3}>
                                                        <Button color="info"
                                                            round
                                                            id="save-bnt"
                                                            className={classes.marginRight} onClick={this.handleWelathPlanClose}>
                                                            Close
                                    </Button>
                                                    </GridItem>
                                                </GridContainer>

                                            </div>
                                            {/* {trimmedDataURL
                                            ? <img
                                                style={{ width: "05rem" }}
                                                className={styles.sigImage}
                                        src={trimmedDataURL} />
                                    : null}*/}
                                        </div>

                                    </Popup>
                                </div>

                            </GridItem>



                        </div>
                        </CardBody >
                   
                  </GridItem>
                    
            </GridContainer>
             

         


        );
    }
}
export default withStyles(style)(DocumentUpdating);