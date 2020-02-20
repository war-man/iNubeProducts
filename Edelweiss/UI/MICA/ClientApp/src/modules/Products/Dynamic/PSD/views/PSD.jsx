import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Dropdown from "../../../components/Dropdown/Dropdown.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CoreButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
//import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DynamicPageConfig from 'modules/DynamicPage/DynamicPageConfig.js';

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
    headingPadding: {
        padding: "1rem",
        //textAlign: "center"
    }

};



class PSD extends React.Component {

    state = {
        TempModel:[],
        selectedType: "",
        open: true,
        Range: "",
        Attributes: [],
        TreeMasterData: [],
        errormessage: false,
        errorcheckbox: false,
        ValidationUI: true,
        DropDown:[],
        MasterDTO: {
            mID: "",
            mValue: "", 
        },

        DynamicPSDModel: {
            SchemaId: 1,
            ParentId:"",
            Range: "",
            SchemaType: "",
            AttributeList: [],
            SubMenu: []
        },

        ObjPSDAttribute: {
            AttributeId: 1,
            AttributeType: "Clauses",
            Icon: "Assignment",
            PageData: [
                {
                    id: "FirstName",
                    Name: "Mobile",
                    Year: "Submit"
                }
            ]
        },
    };

   constructor(props) {
        super(props);
    }


    handleSchemaType = (event) => {

           this.setState({ [event.target.name]: event.target.value });

            let Model = this.state.DynamicPSDModel
               
            Model.ParentId = this.props.TreeItemIndex;

        
        Model.SchemaType = event.target.value;

            this.setState({ Model });

              
    }


    handleRange = (event) => {

    
        this.setState({ [event.target.name]: event.target.value });

        let Model = this.state.DynamicPSDModel
        Model.Range = event.target.value;

        this.setState({ Model });
    
    }

    componentDidMount() {

        fetch(`${DynamicPageConfig.productConfigUrl}/api/PSD/FetchEntities`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {

                let StructuredEntities = data.filter(x => x.type == "Structured"); 

                for (var i = 0; i < StructuredEntities.length; i++) {
                    let Model = Object.assign({}, this.state.MasterDTO);
                    Model.mID = StructuredEntities[i].name;
                    Model.mValue = StructuredEntities[i].name; 

                    this.state.DropDown.push(Model);
                    
                }


                let UnstructuredEntities = data.filter(x => x.type == "UnStructured");

                this.setState({ TreeMasterData: StructuredEntities, Attributes: UnstructuredEntities });
                
            });

        
    }

    handleCheckBox = (event, index) => {

        let AttrType = event.target.value;

        if (event.target.checked == true) {

            let AttrModel =  Object.assign({},this.state.ObjPSDAttribute);
            AttrModel.AttributeId = index;
            AttrModel.AttributeType = AttrType;

            let DynamicMod = this.state.DynamicPSDModel;

            DynamicMod.AttributeList.push(AttrModel);
            this.setState({ errorcheckbox: false });
        }
        else if (event.target.checked == false) {

            let Mod = this.state.DynamicPSDModel;
            Mod.AttributeList = Mod.AttributeList.filter(s => s.AttributeType !== event.target.value);
            this.setState({ errorcheckbox: false });
        }
        else {
            this.setState({ errorcheckbox: true });
        }

        this.setState({});
       
    }


    handleButton = () => {

        this.state.ValidationUI = true;
        this.IsValidProductDetails();
        if (this.state.ValidationUI === true) {
            this.props.callbackPSDFunction(this.state.DynamicPSDModel);

            this.setState({ open: false });

        } else {
            this.setState({ errormessage: true });
            this.setState({ errorcheckbox: true });
            //swal("", "Some fields are missing", "error");

        }
        console.log("errormessagestatus", this.state.errormessage);
        console.log("errorcheckboxstatus", this.state.errorcheckbox);
    };

    IsValidProductDetails = () => {
    
        if (this.state.DynamicPSDModel.AttributeList.length > 0) {
        } else {
            this.state.ValidationUI = false;
            this.state.errormessage = true;
            this.state.errorcheckbox = true;
            this.setState({});
        }
    }

    //handleButton = () => {
     
    //    this.props.callbackPSDFunction(this.state.DynamicPSDModel);

    //    this.setState({ open: false });

    // };

    render() {

        return (
            <div>
                <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}

                >
                    <center> <DialogTitle dividers id="customized-dialog-title" >
                      Product Schema Definition 
  
                  </DialogTitle>

                        </center>
                   
                   
                    <Card className="no-shadow">
                        <CardBody >
                          
                            <GridContainer xs={12} justify="center">



                                <GridItem xs={4} sm={4} md={4}>
                                    <Dropdown
                                        required={true}
                                        labelText="Schema Type"
                                        id="Type"
                                        lstObject={this.state.DropDown}
                                        value={this.state.selectedType}
                                        name='selectedType'
                                        onChange={(e) => this.handleSchemaType(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />

                                    {this.state.errormessage && (this.state.selectedType == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>


                                <GridItem xs={4} sm={4} md={4}>

                                    <CustomInput
                                        required={true}
                                        // success={this.state.emailIdState == "success"}
                                        //error={this.state.emailIdState == "error"}
                                        labelText="Range"
                                        inputType = "number"
                                        name="Range"
                                        value={this.state.Range}
                                        onChange={(e) => this.handleRange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />


                                    {this.state.errormessage && (this.state.Range == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                </GridItem>
                                <GridContainer>
                                    {this.state.Attributes.map((item, index) => (


                                        <GridItem xs={12} sm={12} md={3} className="downlevel">
                                            <CustomCheckbox key={index}
                                                name={item.mValue}
                                                labelText={item.name}
                                                value={item.name}
                                                onChange={(e) => this.handleCheckBox(e, index)}
                                                //disabled={(props.componentData.viewdisable == true) ? true : false}
                                                //  checked={item.mIsRequired}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}

                                            />
                                        </GridItem>
                                    ))}




                                </GridContainer>
                             


                            </GridContainer>
                            <br />
                            <br />
                            {this.state.errorcheckbox ? <p className="error"> *Select atleast one attribute</p> : null}

                        </CardBody>
                    </Card>
                    
                        <center>    <CoreButton color="success" round onClick={this.handleButton} > OK </CoreButton> </center>
                   
                        </Dialog>
           </div>
        );
    }
}

export default withStyles(style)(PSD);