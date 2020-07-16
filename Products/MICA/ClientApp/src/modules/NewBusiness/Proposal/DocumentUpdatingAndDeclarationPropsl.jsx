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


    clear = () => {
        this.sigPad.clear()
    }

    /******************* Save Proposer Signature ******************************/

    saveProposerSignature = () => {
        debugger;
       
        this.state.proposerSignature= this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png');
       
        this.setState({});
        console.log("proposerSignature", this.state.proposerSignature);


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
                        <CustomDatetime required={true} onFocus={this.onClick} validdate={this.validdate} labelText="Proposer Date" id='ProposerDate' name='ProposerDate' onChange={(evt) => this.onDateChange('datetime', 'ProductDTO', 'activeFrom', evt)} formControlProps={{ fullWidth: true }} />
                </GridItem>
                        <GridItem xl={12} sm={4} md={4}>
                        <CustomInput
                            success={this.ProposerPlace === "success"}
                            error={this.ProposerPlace === "error"}
                            labelText="Proposer Place"
                            name="ProposerPlace"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
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
                            name="Proposer Country"
                            required={true}
                            onChange={(e) => this.detailsChange("string", e)}
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
                                        // onClick={this.handleLeadSave}
                                        id="saveBtn" >
                                        WP/FPE Report
                                </Button>
                                </div>
                            </GridItem>
                       
                    
                   
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