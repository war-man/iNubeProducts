import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Dropdown from "../../../../components/Dropdown/Dropdown.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CoreButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
//import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ProductConfig from 'modules/Products/Micro/ProductConfig.js';

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



class EntityPopup extends React.Component {

    state = {
        TempModel:[],
        selectedType: "",
        open: true,
        SchemaName: "",
        Attributes: [],
        TreeMasterData: [],

        DynamicPSDModel: {
            SchemaId: 1,
            ParentId:"",
            EntityName: "",
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
        AttributeList: [],
        //Entitydto: {
        //    name: "",
        //    AttributeList: [],
        //},
        //dto: {
        //    displayName: "",
        //    order: "",
        //    valueMapping: "",
        //    valid: "",
        //}
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


    handleSchemaName = (event) => {

    
        this.setState({ [event.target.name]: event.target.value });

        let Model = this.state.DynamicPSDModel
        Model.SchemaName = event.target.value;

        this.setState({ Model });
    
    }

    componentDidMount() {

        //fetch(`${DynamicPageConfig.productConfigUrl}/api/PSD/GetMasterData?sMasterlist=Schema%20Type`, {
        //    method: 'get',
        //    headers: {
        //        'Accept': 'application/json',
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
        //    },
        //}).then(response => response.json())
        //    .then(data => {
        //        this.setState({ TreeMasterData: data });
        //        console.log("TreeMasterData", this.state.TreeMasterData);
        //    });

        fetch(`${ProductConfig.productConfigUrl}/api/PSD/GetAttribute`,{
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {
                this.setState({ Attributes: data });

                console.log("AttributesData", this.state.Attributes);
            });
    }

    handleCheckBox = (event, index) => {

        let AttrType = event.target.value;
        console.log("attributetype:", AttrType);
        if (event.target.checked == true) {

            
            let AttrModel = this.state.Attributes[index];
            let DynamicMod = this.state.AttributeList;

                AttrModel["displayName"] = "";
                AttrModel["order"] = "";
                AttrModel["valueMapping"] = "";
                AttrModel["validation"] = "";
        
            DynamicMod.push(AttrModel);
       
            console.log("attdata", DynamicMod, AttrModel);

        }
        else {
         
            let Mod = this.state.AttributeList;

            Mod = Mod.filter(s => s.name !== event.target.value);

        }
        console.log("entity:", this.state.AttributeList);
       
        this.setState({});
       
    }

    handleButton = () => {
     
       // this.props.callbackPSDFunction(this.state.DynamicPSDModel);

        this.setState({ open: false });
        //if (this.state.AttributeList >= 0) {
        //this.props.GridFalg = true;
        //}
        if (this.state.AttributeList.length != []) {
            for (var i = 0; i < this.state.AttributeList.length; i++) {
                this.props.AttributesList.push(this.state.AttributeList[i]);
                
            }
            console.log("Attributelist parent", this.props.AttributesList);
            // this.props.GridFalg = true;
        }
        this.props.gridDisplay();
     };
    
    render() {
        const { classes } = this.props;
        console.log("props coming", this.props, this.state.AttributeList);
        
        return (
            <div>
                <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}

                >
                    <center> <DialogTitle dividers id="customized-dialog-title" >
                      Attribute List 
  
                  </DialogTitle>

                        </center>
                   
                   
                    <Card className="no-shadow">
                        <CardBody >
                          
                            <GridContainer xs={12} >
                                <GridContainer>
                                    {this.state.Attributes.map((item, index) => (


                                        <GridItem xs={12} sm={12} md={3} className="downlevel">
                                            <CustomCheckbox key={index}
                                                name={item.name}
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
                        </CardBody>
                    </Card>
                    
                    <center>    <CoreButton color="success" style={{ marginBottom: "1rem" }} round onClick={this.handleButton} > OK </CoreButton> </center>
                        </Dialog>
           </div>
        );
    }
}

export default withStyles(style)(EntityPopup);