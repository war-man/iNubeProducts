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
import { Redirect } from 'react-router-dom';
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
        PSDEditModel: [],
        EditFinalModel: [],
        disabled: false,
        PsdName: "",
        selectedType: "",
        open: true,
        redirect: false,
        close: true,
        //Range: "",
        rangeFrom: "",
        rangeTo: "",
        rangeFromState: false,
        rangeToState: false,
        Attributes: [],
        TreeMasterData: [],
        errorrange: false,
        errormessage: false,
        errorcheckbox: false,
        DropDown: [],
        MasterDTO: {
            mID: "",
            mValue: "",
            UniqueID: "",
            CheckboxRequired: false,
        },

        DynamicPSDModel: {
            SchemaId: 1,
            ParentId: "",
            PsdName: "",
            Range: [],
            SchemaType: "",
            AttributeList: [],
            SubMenu: []
        },
        range: {
            rangeFrom: "",
            rangeTo: ""
        },
        ObjPSDAttribute: {
            AttributeId: 1,
            AttributeMongoId: "",
            AttributeType: "Basic",
            Icon: "Assignment",
            PageData: []
        },
        PageData: {
            GetMaster: true,
            StructuredId: "",
            UnStructuredLstId: [],
        },

    };

    constructor(props) {
        super(props);
    }



    CurrentObjectRecursive = (InputPath, InputModelObject) => {

        console.log("CurrentObjectRecursive Input Parameters", InputPath, InputModelObject);

        let PATH = InputPath;

        var level = PATH.split("/");

        var currentObj = InputModelObject;

        for (var i = 0; i < level.length; i++) {

            if (level[i] === "root") {

                currentObj = currentObj[0];

            }
            else {

                currentObj = currentObj.SubMenu[level[i] - 1];
            }
        }

        console.log("CurrentObjectRecursive Returning Object", currentObj);

        return currentObj;

    }






    componentDidMount() {
        this.state.open = this.props.PSDOpen;


        fetch(`${DynamicPageConfig.productConfigUrl}/api/PSD/FetchEntities`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.PageData)
        }).then(function (response) {
            return response.json();
        }).then(data => {
            console.log("MASTERDATA", data);
            let StructuredEntities = data.filter(x => x.type == "Structured");

            for (var i = 0; i < StructuredEntities.length; i++) {
                let Model = Object.assign({}, this.state.MasterDTO);
                Model.mID = StructuredEntities[i].name;
                Model.mValue = StructuredEntities[i].name;
                Model.UniqueID = StructuredEntities[i].id;
                this.state.DropDown.push(Model);

            }


            let UnstructuredEntities = data.filter(x => x.type == "UnStructured");

            for (var i = 0; i < UnstructuredEntities.length; i++) {
                let Model = Object.assign({}, this.state.MasterDTO);
                Model.mID = UnstructuredEntities[i].name;
                Model.mValue = UnstructuredEntities[i].name;
                Model.UniqueID = UnstructuredEntities[i].id;
                Model.CheckboxRequired = "";
                this.state.Attributes.push(Model);

            }
            this.setState({});

            if (this.props.PSDEdit == true) {


                let currentObjState = this.CurrentObjectRecursive(this.props.TreeItemIndex, this.props.FinalModel);

                this.state.PSDEditModel.push(currentObjState);

                let SpecificData = this.state.PSDEditModel.filter(x => x.ParentId == this.props.TreeItemIndex);

                this.state.selectedType = SpecificData[0].SchemaType;
                this.state.rangeFrom = SpecificData[0].Range[0].rangeFrom;
                this.state.rangeTo = SpecificData[0].Range[0].rangeTo;
                this.state.PsdName = SpecificData[0].PsdName;

                let AttrLst = SpecificData[0].AttributeList;

                AttrLst = AttrLst.filter(x => x.AttributeType != "Basic");


                for (var i = 0; i < AttrLst.length; i++) {

                    let checkbox = this.state.Attributes.filter(x => x.mValue == AttrLst[i].AttributeType);

                    checkbox[0].CheckboxRequired = true;
                }


                this.setState({});

            }

        });



        if (this.props.DataSent == "") {

            this.state.disabled = false;
        }
        else {
            this.state.PsdName = this.props.FinalModel[0].PsdName;

            this.state.disabled = true;

        }

    }



    handlePsdName = (event) => {

        this.setState({ [event.target.name]: event.target.value });

        let Model = this.state.DynamicPSDModel
        Model.PsdName = event.target.value;

        this.setState({ Model });
        // console.log("Schema Custom", this.state.DynamicPSDModel);

    }


    handleSchemaType = (event) => {
        if (this.props.PSDEdit == true) {

            this.setState({ [event.target.name]: event.target.value });

            this.state.EditFinalModel = this.props.FinalModel;

            let currentObjState = this.CurrentObjectRecursive(this.state.PSDEditModel[0].ParentId, this.state.EditFinalModel);

            let SpecificData = currentObjState;

            if (SpecificData != null) {
                SpecificData.SchemaType = event.target.value;

            }

            this.setState({ SpecificData });


        } else {


            this.setState({ [event.target.name]: event.target.value });

            let Model = this.state.DynamicPSDModel


            Model.ParentId = this.props.TreeItemIndex;

            Model.SchemaType = event.target.value;

            this.setState({ Model });
        }

    }



    handleRange = (event) => {


        if (this.props.PSDEdit == true) {

            this.setState({ [event.target.name]: event.target.value });

            this.state.EditFinalModel = this.props.FinalModel;

            let currentObjState = this.CurrentObjectRecursive(this.state.PSDEditModel[0].ParentId, this.state.EditFinalModel);

            let SpecificData = currentObjState;

            if (SpecificData != null) {

                if (event.target.name == "rangeFrom") {

                    SpecificData.Range[0].rangeFrom = event.target.value;

                }
                else {

                    SpecificData.Range[0].rangeTo = event.target.value;
                }

            }

            if (this.state.rangeTo < this.state.rangeFrom) {

                this.state.ValidationUI = false;
                this.state.errorrange = true;

            }
            else {
                this.state.ValidationUI = true;
                this.state.errorrange = false;
            }

            this.setState({ SpecificData });

        } else {

            this.setState({ [event.target.name]: event.target.value });

            if (this.state.rangeTo < this.state.rangeFrom) {
                this.state.ValidationUI = false;
                this.state.errorrange = true;
            }
            else {
                this.state.ValidationUI = true;
                this.state.errorrange = false;
            }


        }

    }

    handleCheckBox = (event, index, MongoId) => {

        if (this.props.PSDEdit == true) {

            this.state.EditFinalModel = this.props.FinalModel;

            let currentObjState = this.CurrentObjectRecursive(this.state.PSDEditModel[0].ParentId, this.state.EditFinalModel);

            let SpecificData = currentObjState;

            if (SpecificData != null) {

                let AttrType = event.target.value;

                if (event.target.checked == true) {

                    this.state.Attributes[index].CheckboxRequired = true;

                    let AttrModel = Object.assign({}, this.state.ObjPSDAttribute);
                    AttrModel.AttributeId = index;
                    AttrModel.AttributeType = AttrType;
                    AttrModel.AttributeMongoId = MongoId;

                    SpecificData.AttributeList.push(AttrModel);
                    //this.setState({ ValidationUI: true });
                    //this.setState({ errorcheckbox: false });

                }
                else if (event.target.checked == false) {

                    this.state.Attributes[index].CheckboxRequired = false;


                    let Mod = SpecificData;
                    Mod.AttributeList = Mod.AttributeList.filter(s => s.AttributeType !== event.target.value);
                    this.setState({ Mod });


                }


            }


            if (SpecificData.AttributeList.length > 0) {
                this.setState({ ValidationUI: true, errorcheckbox: false });

            } else {
                this.setState({ ValidationUI: false, errorcheckbox: true });


            }



        } else {


            let AttrType = event.target.value;

            if (event.target.checked == true) {


                this.state.Attributes[index].CheckboxRequired = true;

                let AttrModel = Object.assign({}, this.state.ObjPSDAttribute);
                AttrModel.AttributeId = index;
                AttrModel.AttributeType = AttrType;
                AttrModel.AttributeMongoId = MongoId;

                let DynamicMod = this.state.DynamicPSDModel;

                DynamicMod.AttributeList.push(AttrModel);
                this.setState({ ValidationUI: true });
                this.setState({ errorcheckbox: false });
            }
            else if (event.target.checked == false) {

                this.state.Attributes[index].CheckboxRequired = false;


                let Mod = this.state.DynamicPSDModel;
                Mod.AttributeList = Mod.AttributeList.filter(s => s.AttributeType !== event.target.value);
                this.setState({ ValidationUI: true });
                this.setState({ errorcheckbox: false });
            }
            else {
                this.setState({ ValidationUI: false });
                this.setState({ errorcheckbox: true });
            }


        }

    }


    handleButton = () => {
        this.state.validateUI = false
        let range = this.state.range;
        range.rangeFrom = this.state.rangeFrom;
        range.rangeTo = this.state.rangeTo;
        this.setState({ range });

        let Model = this.state.DynamicPSDModel;
        Model.Range.push(this.state.range);
        this.setState({ Model });

        this.IsValidProductDetails();


        if (this.props.DataSent == "PSDEdit") {

            if (this.state.errorcheckbox == false && this.state.ValidationUI == true) {

                this.state.EditFinalModel = this.props.FinalModel;

                let currentObjState = this.CurrentObjectRecursive(this.state.PSDEditModel[0].ParentId, this.state.EditFinalModel);

                let SpecificData = currentObjState;

                let RemovedBasic = SpecificData.AttributeList.filter(x => x.AttributeType != "Basic");

                SpecificData.AttributeList = RemovedBasic;

                let EntityMaster = this.state.DropDown;

                let StructuredEntityId = EntityMaster.filter(x => x.mValue == SpecificData.SchemaType)[0].UniqueID;

                let AttrIdLst = [];

                SpecificData.AttributeList.map(m => {

                    let AttrMaster = this.state.Attributes;

                    let UnStructuredEntityId = AttrMaster.filter(x => x.mValue == m.AttributeType)[0].UniqueID;

                    AttrIdLst.push(UnStructuredEntityId)

                });

                this.state.PageData.GetMaster = false;
                this.state.PageData.StructuredId = StructuredEntityId;
                this.state.PageData.UnStructuredLstId = AttrIdLst;

                fetch(`${DynamicPageConfig.productConfigUrl}/api/PSD/FetchEntities`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    },
                    body: JSON.stringify(this.state.PageData)
                }).then(response => {
                    return response.json();
                }).then(data => {

                    let AttrPageData = data.unStructuredData;

                    SpecificData.AttributeList.map(m => {

                        let DynamicData = AttrPageData.filter(x => x.id == m.AttributeMongoId)[0].data;

                        if (DynamicData != undefined) {
                            m.PageData = DynamicData;
                        }

                    });

                    let EntityBasic = Object.assign({}, this.state.ObjPSDAttribute);
                    EntityBasic.AttributeMongoId = StructuredEntityId;
                    EntityBasic.PageData = data.structuredData.data;

                    SpecificData.AttributeList.push(EntityBasic);

                    this.setState({});


                });

                console.log("FinalDATA SENT PARENT PSDEdit", this.state.EditFinalModel);


                this.props.callbackPSDFunction(this.state.EditFinalModel);
                this.setState({ open: false, errormessage: false });


            } else {
                // this.setState({ errorcheckbox: true });
                this.setState({ errormessage: true });
            }

        }
        else {

            if (this.state.DynamicPSDModel.AttributeList.length > 0) {
                if (this.state.PsdName !== "" && this.state.selectedType !== "" && this.state.rangeFrom !== "" && this.state.rangeTo !== "") {

                    let EntityMaster = this.state.DropDown;

                    let StructuredEntityId = EntityMaster.filter(x => x.mValue == this.state.DynamicPSDModel.SchemaType)[0].UniqueID;

                    let AttrIdLst = [];

                    this.state.DynamicPSDModel.AttributeList.map(m => {

                        let AttrMaster = this.state.Attributes;

                        let UnStructuredEntityId = AttrMaster.filter(x => x.mValue == m.AttributeType)[0].UniqueID;

                        AttrIdLst.push(UnStructuredEntityId)


                    });

                    this.state.PageData.GetMaster = false;
                    this.state.PageData.StructuredId = StructuredEntityId;
                    this.state.PageData.UnStructuredLstId = AttrIdLst;


                    fetch(`${DynamicPageConfig.productConfigUrl}/api/PSD/FetchEntities`, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                        },
                        body: JSON.stringify(this.state.PageData)
                    }).then(response => {
                        return response.json();
                    }).then(data => {

                        let AttrPageData = data.unStructuredData;

                        this.state.DynamicPSDModel.AttributeList.map(m => {

                            let DynamicData = AttrPageData.filter(x => x.id == m.AttributeMongoId)[0].data;

                            if (DynamicData != undefined) {
                                m.PageData = DynamicData;
                            }

                        });


                        let EntityBasic = Object.assign({}, this.state.ObjPSDAttribute);
                        EntityBasic.AttributeMongoId = StructuredEntityId;
                        EntityBasic.PageData = data.structuredData.data;

                        this.state.DynamicPSDModel.AttributeList.push(EntityBasic);

                        this.setState({});


                    });


                    console.log("FinalDATA SENT PARENT", this.state.DynamicPSDModel);


                    this.props.callbackPSDFunction(this.state.DynamicPSDModel);

                    this.setState({ open: false });

                    this.setState({ errormessage: false });
                } else {
                    this.setState({ errormessage: true });
                }

            } else {
                if (this.state.selectedType !== "" && this.state.rangeFrom !== "" && this.state.range.rangeTo !== "") {
                    this.setState({ errormessage: false });
                }
                else {
                    this.setState({ errormessage: true });
                }
                this.setState({ errorcheckbox: true });
            }
        }

    };

    IsValidProductDetails = () => {
        if (this.props.DataSent != "PSDEdit" && this.state.rangeFromState == false && this.state.rangeToState == false) {
        } else {
            this.state.ValidationUI = true;
            this.setState({});
        }
    }
    renderRedirect = () => {
        if (this.state.redirect == true) {
            return <Redirect to={{
                pathname: '/dashboard/home',

            }} />
        }
    }



    handleClose = () => {

        this.props.handlePSDClose();

    };



    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    //onClose={this.handleClose}
                    fullWidth="md"
                    maxWidth="md"
                >
                    <center> <DialogTitle dividers id="customized-dialog-title" >
                        Product Schema Definition

                  </DialogTitle>

                    </center>
                    <GridItem className={classes.paper}>
                        <Button color="info"
                            round
                            className={classes.marginRight}
                            id="close-bnt"
                            onClick={this.handleClose}

                        >
                            &times;
                     </Button>
                    </GridItem>
                    <Card className="no-shadow-bottom">
                        <CardBody >

                            <GridContainer xs={12} justify="center">

                                <GridItem xs={12} sm={4} md={3}>

                                    <CustomInput
                                        //error={this.state.emailIdState == "error"}
                                        disabled={this.state.disabled}
                                        required={true}
                                        labelText="PSD Name"
                                        name="PsdName"
                                        value={this.state.PsdName}
                                        onChange={(e) => this.handlePsdName(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />
                                    {this.state.errormessage && (this.state.PsdName == "") ? <p className="error">*Required field cannot be left blank</p> : null}
                                </GridItem>


                                <GridItem xs={12} sm={4} md={3}>
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


                                <GridItem xs={12} sm={4} md={3}>

                                    <CustomInput
                                        required={true}
                                        // success={this.state.rangeFromState == "success"}
                                        error={this.state.rangeFromState}
                                        labelText="Range From"
                                        inputType="number"
                                        name="rangeFrom"
                                        value={this.state.rangeFrom}
                                        onChange={(e) => this.handleRange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />

                                    {this.state.errormessage && (this.state.rangeFrom == "") ? <p className="error">*Required field cannot be left blank</p> : null}


                                </GridItem>

                                <GridItem xs={12} sm={4} md={3}>

                                    <CustomInput
                                        required={true}
                                        // success={this.state.rangeToState == "success"}
                                        error={this.state.rangeToState}
                                        labelText="Range To"
                                        inputType="number"
                                        name="rangeTo"
                                        value={this.state.rangeTo}
                                        onChange={(e) => this.handleRange(e)}
                                        formControlProps={{ fullWidth: true }}
                                    />

                                    {this.state.errormessage && (this.state.rangeTo == "") ? <p className="error">*Required field cannot be left blank</p> : null}

                                    {this.state.errorrange && (this.state.rangeTo < this.state.rangeFrom) ? <p className="error">*Range To must be greater than Range From </p> : null}


                                </GridItem>
                                <GridContainer>
                                    {this.state.Attributes.map((item, index) => (


                                        <GridItem xs={12} sm={12} md={3} className="downlevel">
                                            <CustomCheckbox key={index}
                                                name={item.UniqueID}
                                                labelText={item.mValue}
                                                value={item.mValue}
                                                onChange={(e) => this.handleCheckBox(e, index, item.UniqueID)}
                                                //disabled={(props.componentData.viewdisable == true) ? true : false}
                                                checked={item.CheckboxRequired}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}

                                            />
                                        </GridItem>
                                    ))}




                                </GridContainer>

                                <br />
                                <br />
                                {this.state.errorcheckbox ? <p className="error"> *Select atleast one attribute</p> : null}


                            </GridContainer>

                        </CardBody>
                    </Card>

                    <center>    <Button color="success" round onClick={this.handleButton} > OK </Button> </center>

                </Dialog>
            </div>
        );
    }
}

export default withStyles(style)(PSD);