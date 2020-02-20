import React from "react";
import Card from "components/Card/Card.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import swal from 'sweetalert';
import Button from "components/CustomButtons/Button.jsx";
import PSDComponent from './PSD';
import PAGE from './Page1';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DynamicPageConfig from 'modules/DynamicPage/DynamicPageConfig.js';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/Label';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import * as MasterIcons from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import CustomInput from "components/CustomInput/CustomInput.jsx";


const useTreeItemStyles = theme => ({
    root: {
        color: theme.palette.text.secondary,
        '&:focus > $content': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: 'var(--tree-view-color)',
        },
    },
    content: {
        color: theme.palette.text.secondary,
        //borderTopRightRadius: theme.spacing(2),
        //borderBottomRightRadius: theme.spacing(2),
        //paddingRight: theme.spacing(1),
        height: "2.3rem",
        borderBottom: "1px solid #ddd",
        fontWeight: theme.typography.fontWeightMedium,
        '$expanded > &': {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        '& $content': {
            paddingLeft: "10px",
        },
    },
    expanded: {},
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
});


class MasterLayout extends React.Component {

    state = {
        PSDEdit: false,
        PSDOpen: true,
        PSDFlag: false,
        PageFlag: false,
        BtnDisable: false,
        FinalModel: [],
        PageData: [],
        responsivedata: [],
        DataSent: "",
        PsdName: "",
        TreeItemIndex: "root",
        NodeCount: 0,
        PagePath: "",
        TreeData: [{ NodeId: 1, label: 'Product', subMenu: [{ NodeId: 2, sublabel: 'Insurable Item' }, { NodeId: 3, sublabel: 'Cover' }, { NodeId: 4, sublabel: 'Benifit' }] },
        { NodeId: 5, label: 'User', subMenu: [{ NodeId: 6, sublabel: 'My Profile' }, { NodeId: 6, sublabel: 'Change Password' }] },
        { NodeId: 6, label: 'Claims', subMenu: [] }],

        data: [
            {
                id: 1,
                name: "Ajay Raikar",
                age: 29,
                qualification: "B.E",
                rating: 5,
                gender: "male",
                city: "Kerala",
                skills: ["reactjs", "angular", "vuejs"]
            },
            {
                id: 2,
                name: "Rashmi",
                age: 35,
                qualification: "B.Sc",
                rating: 5,
                gender: "female",
                city: "Mumbai",
                skills: ["reactjs", "angular"]
            },
            {
                id: 3,
                name: "Sumanth",
                age: 42,
                qualification: "B.E",
                rating: 3,
                gender: "male",
                city: "Bangalore",
                skills: ["reactjs"]
            }
        ],

        TreeMaster: [{ mID: "Package", mValue: "Package", mType: 1 },
        { mID: "Product", mValue: "Product", mType: 2 },
        { mID: "Insurable Item", mValue: "Insurable Item", mType: 3 },
        { mID: "Cover", mValue: "Cover", mType: 4 },
        { mID: "Benifit", mValue: "Benifit", mType: 5 },
        { mID: "Plan", mValue: "Plan", mType: 6 },
        { mID: "Relationship", mValue: "Relationship", mType: 7 },
        ],

        AttributeMaster: [{ mID: "Clauses", mValue: "Clauses", mType: 1 },
        { mID: "Warrenties", mValue: "Warrenties", mType: 2 },
        { mID: "Exclusion", mValue: "Exclusion", mType: 3 },
        { mID: "Risk", mValue: "Risk", mType: 4 },
        { mID: "Basic", mValue: "Basic", mType: 5 },
        { mID: "Claims", mValue: "Claims", mType: 6 },
        { mID: "Channels", mValue: "Channels", mType: 7 },
        { mID: "Premium", mValue: "Premium", mType: 8 },
        { mID: "PDF Template", mValue: "PDF Template", mType: 9 },
        { mID: "Rules", mValue: "Rules", mType: 10 },
        ],

        DynamicModel: {
            SchemaId: 1,
            ParentId: "root",
            SchemaName: "",
            SchemaType: "",
            AttributeList: [],
            SubMenu: []
        },

        ObjAttribute: {
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





    //This Function is Used to handle the SubMenus of Dynamic Tree
    //It Renders all the submenu which is created by the user.
    SubMenuCheck = (SubMenu, SuperPath) => {

        //let classes = useTreeItemStyles();
        const { classes } = this.props;

        let DynamicIcon = MasterIcons["Label"];
        //This SuperPath Specifies the Path of the Tree Item 
        //Which wants to add child tree in its view.
        let TreeIndex = SuperPath;

        //Here We Check if the Model sent contains the submenu or not
        //If Exsist we start the RECURSIVE LOOP to Print the Tree Item

        if (SubMenu.length != 0) {
            //Below SUBMENUData is the return type of this function 
            //which helps in rendering the tree.
            let SUBMENUData = SubMenu.map((sm, index) => {

                //Range Mentioned as per PSD
                let Range = sm.Range[0];

                //Here We Generate the Path for the Tree Item which we create 
                //This Path helps us to handle the addition of child tree item.
                let Path = TreeIndex + "/" + Number(index + 1);

                return (<React.Fragment>

                    {/*This is an Tree Item which gets created and rendered*/}
                    <TreeItem
                        className="dynamic-tree-padding"
                        nodeId={Path}
                        label={

                            <div className={classes.labelRoot}>
                                <DynamicIcon fontSize="small" className={classes.labelIcon} />
                                {/*  <img src={AccountCreate} className="svg-icon" />*/}
                                <Typography variant="body2" className={classes.labelText}>
                                    {sm.SchemaType}
                                </Typography>
                                <Typography variant="caption" color="inherit">
                                    {Range.rangeFrom} - {Range.rangeTo}
                                    {/*  Here we have to add  range data */}
                                </Typography>
                                <IconButton disabled={this.state.BtnDisable} className="padding-icon" onClick={(e) => this.handleSchemaAdd(e, "SubTreeItem", Path)} >
                                    <AddIcon fontSize="small" className="icon-add-hover" id={Path} />
                                </IconButton>
                                <IconButton disabled={this.state.BtnDisable} className="padding-icon" onClick={(e) => this.handleSchemaDelete(e, "SubTreeItem", Path)}>
                                    <Delete fontSize="small" className="icon-del-hover" />
                                </IconButton>
                                <IconButton disabled={this.state.BtnDisable} className="padding-icon" onClick={(e) => this.handleSchemaEdit(e, "SubTreeItem", Path)}>
                                    <Create fontSize="small" className="icon-edit-hover" />
                                </IconButton>
                            </div>


                        }
                        labelIcon={Label}
                        onClick={(e) => this.TreeItemFun(e, sm, Path)}
                        classes={{
                            root: classes.root,
                            content: classes.content,
                            expanded: classes.expanded,
                            group: classes.group,
                            label: classes.label,
                        }}


                    >

                        {/* This is a RECURSIVE LOOP "Here we are calling the same Function to generate Tree Item" */}
                        {this.SubMenuCheck(sm.SubMenu, Path)}


                    </TreeItem>

                    {/* This is the Add Icon Which we render with the Tree Item for Adding the Child Dynamically to the Tree*/}

                </React.Fragment>

                );

            });


            return SUBMENUData;


        }
    }


    componentDidMount() {

        console.log("Final", this.props.FinalModel);

        this.state.FinalModel = this.props.FinalModel;
        this.state.BtnDisable = this.props.disabled;
        this.setState({});

        this.TreeRender();
        console.log("Finalmodel statedata: ", this.state.FinalModel);
    };

    //This is the Function to handle the Main Parent Tree Rendering
    //Also the Parent [ROOT] of the TREE is Started from Here
    TreeRender = () => {
        //let classes = useTreeItemStyles();
        const { classes } = this.props;

        //formUI is Retured from this function.
        let formUI = this.state.FinalModel.map(m => {


            let NodeId = m.SchemaId;
            let Label = m.SchemaType;
            let SubMenu = m.SubMenu;
            let DynamicIcon = MasterIcons["Label"];

            let input = (<div> <h1>No Data</h1></div>);

            input = (<React.Fragment>
                <TreeView
                    className="dynamic-tree"
                    defaultExpanded={['3']}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    defaultEndIcon={<div style={{ width: 24 }} />}
                >

                    <TreeItem nodeId={NodeId} label={

                        <div className={classes.labelRoot} >
                            <DynamicIcon fontSize="small" className={classes.labelIcon} />
                            {/*  <img src={AccountCreate} className="svg-icon" />*/}
                            <Typography variant="body2" className={classes.labelText}>
                                {Label}
                            </Typography>
                            <IconButton disabled={this.state.BtnDisable} className="padding-icon" onClick={(e) => this.handleSchemaAdd(e, "ParentItem", "root")} >
                                <AddIcon fontSize="small" className="icon-add-hover" />
                            </IconButton>
                            <IconButton disabled={this.state.BtnDisable} className="padding-icon" onClick={(e) => this.handleSchemaDelete(e, "ParentItem", "root")}>
                                <Delete fontSize="small" className="icon-del-hover" />
                            </IconButton>
                            <IconButton disabled={this.state.BtnDisable} className="padding-icon" onClick={(e) => this.handleSchemaEdit(e, "ParentItem", "root")}>
                                <Create fontSize="small" className="icon-edit-hover" />
                            </IconButton>
                        </div>



                    }
                        onClick={(e) => this.TreeItemFun(e, m, "root")}
                        classes={{
                            root: classes.root,
                            content: classes.content,
                            expanded: classes.expanded,
                            group: classes.group,
                            label: classes.label,
                        }}

                    >

                        {this.SubMenuCheck(SubMenu, "root")}

                    </TreeItem>

                </TreeView>


            </React.Fragment>);


            return (<div>

                {/* Final Rendering Page Return  */}

                {input}


            </div>);
        });


        return formUI;


    };

    //onClick event handle funtion of TreeItem 
    TreeItemFun = (e, AttributeArray, Path) => {

        //Here e is the event
        //AttributeArray is the collection of object where the checkbox were selected in PSD 

        this.setState({ PagePath: Path, PageData: AttributeArray, PageFlag: true });

    };

    //onClick of the Add Icon Beside the Tree Item
    handleSchemaAdd = (event, TreeLevel, PATH) => {
        this.setState({ DataSent: TreeLevel, TreeItemIndex: PATH, PSDOpen: true, PageFlag: false, PSDFlag: true });
    }



    handleSchemaDelete = (event, TreeLevel, PATH) => {

        if (TreeLevel == "SubTreeItem") {

            var level = PATH.split("/");
            var currentObjState = this.state.FinalModel;

            for (var i = 0; i < level.length - 1; i++) {

                if (level[i] === "root") {

                    currentObjState = currentObjState[0];

                }
                else {

                    currentObjState = currentObjState.SubMenu[level[i] - 1];
                }
            }

            currentObjState.SubMenu.splice(level[level.lenght - 1], 1);

            this.setState({ PageFlag: false });

        }

        if (TreeLevel == "ParentItem") {

            this.setState({ FinalModel: [], DataSent: "", PageFlag: false, PSDFlag: true });

        }


    }



    handleSchemaEdit = (event, TreeLevel, PATH) => {

        this.setState({ DataSent: "PSDEdit", PSDEdit: true, TreeItemIndex: PATH, PSDFlag: true });

    }


    //This is the call back function from PSD Which 
    //Helps in handling the recursive data object push into correct path
    //Also helps in setting the data gathered in PSD.
    callbackPSDFunction = (PSDData) => {

        this.state.PSDEdit = false;

        if (this.state.DataSent == "") {

            this.state.FinalModel.push(PSDData);
            this.state.PsdName = PSDData.PsdName;
            // this.setState({ PageFlag: true , PageData: PSDData});
            this.setState({});

        }



        if (this.state.DataSent == "ParentItem") {

            this.state.NodeCount++;

            PSDData.ParentId = PSDData.ParentId + "/" + this.state.NodeCount;

            this.state.FinalModel[0].SubMenu.push(PSDData);

            //this.setState({ PageData: PSDData });
            //this.setState({ PageFlag: true });

            this.setState({});
        }

        if (this.state.DataSent == "SubTreeItem") {

            let PathData = PSDData.ParentId;

            var level = PathData.split("/");

            var currentObjState = this.state.FinalModel;


            for (var i = 0; i < level.length; i++) {

                if (level[i] === "root") {
                    currentObjState = currentObjState[0];

                }
                else {
                    currentObjState = currentObjState.SubMenu[level[i] - 1];
                }
            }


            let SubCount = currentObjState.SubMenu.length + 1;

            PSDData.ParentId = PSDData.ParentId + "/" + SubCount;

            currentObjState.SubMenu.push(PSDData);

            //this.setState({ PageData: PSDData });
            //this.setState({ PageFlag: true });
            this.setState({});
        }


        if (this.state.DataSent == "PSDEdit") {

            console.log("PSDDataPSDEDIT", PSDData);

            this.state.FinalModel = PSDData;
            this.setState({});
        }

        this.setState({ PSDFlag: false });

        this.TreeRender();



    }

    handleOk = () => {
        debugger;
        let savedata = this.state.FinalModel;

        this.setState({ savedata });

        console.log("dataresponsive", savedata);

        fetch(`${DynamicPageConfig.productConfigUrl}/api/PSD/Save`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
            body: JSON.stringify(this.state.FinalModel)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("responsivedata", data);
            swal({
                text: "Data Saved successfully!",
                icon: "success"
            });

        });

        //swal({
        //    text: "Data Saved successfully!",
        //    icon: "success"
        //});
    };




    render() {

        return (
            <GridContainer>

                {this.state.PSDFlag ?

                    <PSDComponent
                        TreeItemIndex={this.state.TreeItemIndex}
                        DataSent={this.state.DataSent}
                        PsdName={this.state.PsdName}
                        DynamicModel={this.state.DynamicModel}
                        ObjAttribute={this.state.ObjAttribute}
                        TreeMaster={this.state.TreeMaster}
                        AttributeMaster={this.state.AttributeMaster}
                        callbackPSDFunction={this.callbackPSDFunction}
                        FinalModel={this.state.FinalModel}
                        PSDEdit={this.state.PSDEdit}
                        PSDOpen={this.state.PSDOpen}
                    /> : null

                }
                <GridItem xs={4}>
                    <Card className="padding-10px">

                        {this.TreeRender()}

                    </Card>
                </GridItem>

                <GridItem xs={8}>

                    {this.state.PageFlag ?
                        <div>
                            <PAGE
                                PagePath={this.state.PagePath}
                                PageData={this.state.PageData}
                            />
                            {/* <GridContainer justify="center">
                                <Button color="info" round onClick={this.handleOk}> Save PSD </Button>
                            </GridContainer> */}
                        </div> : null

                    }
                </GridItem>
            </GridContainer>

        );
    }
}

export default withStyles(useTreeItemStyles)(MasterLayout);