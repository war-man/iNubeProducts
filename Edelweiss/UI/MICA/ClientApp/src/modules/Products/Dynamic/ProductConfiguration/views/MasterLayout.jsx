import React from "react";
import Card from "components/Card/Card.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import swal from 'sweetalert';
import Button from "components/CustomButtons/Button.jsx";
import PSDComponent from './PSD';
import PSDDialogBox from './PSDDialogBox.jsx';
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
import PropTypes, { object } from 'prop-types';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import * as MasterIcons from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import CardBody from "components/Card/CardBody.jsx";
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Tooltip from '@material-ui/core/Tooltip';
import ReactTable from 'components/MuiTable/MuiTable.jsx';
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


class DynamicProduct extends React.Component {

    state = {
        SchemaType: "",
        psddata: [],
        showtable: false,
        showSearch: true,
        TempModel: [],
        open: false,
        DynamicPSDModel: {

            SchemaId: 1,
            ParentId: "",
            Range: "",
            SchemaType: "",
            SchemaName: "",
            AttributeList: [],
            SubMenu: [],
            Count: 0
        },
        FirstPSDList: [],
        SubMenuPSDList: [],
        FlagPSD: true,
        FilterSubMenu: [],
        submenuData: [],
        ProductSubMenu: [],
        PSDData: [],
        DialogBoxName: "",
        pList: [],
        ListName: "",
        PSDList: {},
        PSDObj: {},
        PsdName: "",
        anchorEl: null,
        PSDFlag: true,
        PageFlag: false,
        FinalModel: [],
        PageData: [],
        responsivedata: [],
        DataSent: "",
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
            SchemaName: "",
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


    searchPSD = () => {

        fetch(`${DynamicPageConfig.productConfigUrl}/api/PSD/GetPSDByPsdName?PsdName=` + this.state.PsdName, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('userToken')
            },
        }).then(response => response.json())
            .then(data => {

                console.log("psdData", data);
                this.state.PSDObj = data[0];
                if (data.length > 0) {

                    // this.state.PSDList.SubMenu = [];
                    //this.setState({ open: true });

                    this.dataTable(data);
                }
            });


        //this.state.PSDObj = {
        //    "_id": "5e17fe21b558a121c483e0ec",
        //    "PsdId": "b7519305-e7c2-45ac-ad25-82b0014b63da",
        //    "PsdName": "Travel PSD",
        //    "PsdData": [{ "SchemaId": 1, "ParentId": "root", "PsdName": "AVO", "Range": [{ "rangeFrom": "1", "rangeTo": "2" }], "SchemaName": "", "SchemaType": "Product", "AttributeList": [{ "AttributeId": 3, "AttributeMongoId": "5e16bcde705c0a48145e60fe", "AttributeType": "Clauses", "Icon": "Assignment", "PageData": [{ "type": "Dropdown", "labelText": "Select C/W/E", "required": false }] }, { "AttributeId": 1, "AttributeMongoId": "5e1482c6c71f443d7a31808a", "AttributeType": "Basic", "Icon": "Assignment", "PageData": [{ "type": "Text", "labelText": "Product Name", "required": false }, { "type": "Text", "labelText": "Product Code", "required": false }, { "type": "DateTime", "labelText": "Active From", "required": false }, { "type": "DateTime", "labelText": "Active To", "required": false }, { "type": "Dropdown", "labelText": "Line Of Business", "required": false }, { "type": "Dropdown", "labelText": "Class Of Business", "required": false }, { "type": "Dropdown", "labelText": "Product Status", "required": false }] }], "SubMenu": [{ "SchemaId": 1, "ParentId": "root/1", "PsdName": "", "Range": [{ "rangeFrom": "1", "rangeTo": "4" }], "SchemaName": "", "SchemaType": "Insurable Item", "AttributeList": [{ "AttributeId": 3, "AttributeMongoId": "5e16bcde705c0a48145e60fe", "AttributeType": "Clauses", "Icon": "Assignment", "PageData": [{ "type": "Dropdown", "labelText": "Select C/W/E", "required": false }] }, { "AttributeId": 2, "AttributeMongoId": "5e16bbcf705c0a48145e60fc", "AttributeType": "Warranties", "Icon": "Assignment", "PageData": [{ "type": "Dropdown", "labelText": "Select C/W/E", "required": false }] }, { "AttributeId": 4, "AttributeMongoId": "5e16bd11705c0a48145e60ff", "AttributeType": "Exclusions", "Icon": "Assignment", "PageData": [{ "type": "Dropdown", "labelText": "Select C/W/E", "required": false }, { "type": "Text", "labelText": "Choose", "required": false }] }, { "AttributeId": 1, "AttributeMongoId": "5e14645529e009b0b33576aa", "AttributeType": "Basic", "Icon": "Assignment", "PageData": [{ "type": "Radio", "labelText": "Single or Multiple", "required": false }, { "type": "Text", "labelText": "Insurable item name", "required": false }] }], "SubMenu": [{ "SchemaId": 1, "ParentId": "root/1/1", "PsdName": "", "Range": [{ "rangeFrom": "1", "rangeTo": "2" }], "SchemaName": "", "SchemaType": "Benefits", "AttributeList": [{ "AttributeId": 1, "AttributeMongoId": "5e16ba82705c0a48145e60fb", "AttributeType": "Premium", "Icon": "Assignment", "PageData": [{ "type": "Text", "labelText": "Premium Amount", "required": false }, { "type": "Dropdown", "labelText": "Currency", "required": false }] }, { "AttributeId": 1, "AttributeMongoId": "5e16bd82705c0a48145e6100", "AttributeType": "Basic", "Icon": "Assignment", "PageData": [{ "type": "Text", "labelText": "Benefit Amount", "required": false }, { "type": "Dropdown", "labelText": "Benefit Criteria", "required": false }, { "type": "Dropdown", "labelText": "Currency", "required": false }] }], "SubMenu": [] }] }] }],

        //};  



        console.log("Product menu", this.state.FinalModel, this.state.ProductSubMenu);
    }


    //This Function is Used to handle the SubMenus of Dynamic Tree
    //It Renders all the submenu which is created by the user.
    SubMenuCheck = (SubMenu, SuperPath) => {

        console.log("submenu", SubMenu);
        //let classes = useTreeItemStyles();
        const { classes } = this.props;

        let DynamicIcon = MasterIcons["Label"];
        //This SuperPath Specifies the Path of the Tree Item 
        //Which wants to add child tree in its view.

        //Here We Check if the Model sent contains the submenu or not
        //If Exsist we start the RECURSIVE LOOP to Print the Tree Item

        if (SubMenu.length != 0) {
            //Below SUBMENUData is the return type of this function 
            //which helps in rendering the tree.
            let SUBMENUData = SubMenu.map((sm, index) => {
                let TreeIndex = SuperPath;
                let res = this.handleHideAdd(sm.SchemaType);

                console.log("return", res);
                //Here We Generate the Path for the Tree Item which we create 
                //This Path helps us to handle the addition of child tree item.
                let Path = TreeIndex + "/" + Number(index + 1);

                return (<React.Fragment>

                    {/*This is an Tree Item which gets created and rendered*/}
                    <TreeItem className="dynamic-tree-padding" nodeId={Path}
                        label={

                            <div className={classes.labelRoot}>
                                <DynamicIcon fontSize="small" className={classes.labelIcon} />
                                {/*  <img src={AccountCreate} className="svg-icon" />*/}
                                <Typography variant="body2" className={classes.labelText}>
                                    <Tooltip title="View" placement="bottom" arrow title={sm.SchemaType}>
                                        <div>
                                            {sm.SchemaName}
                                        </div>
                                    </Tooltip>

                                </Typography>
                                <Typography variant="caption" color="inherit">
                                    {/*  Here we have to add  range data */}
                                </Typography>
                                {/*      <IconButton className="padding-icon" onClick={(e) => this.handleSchemaAdd(e, "SubTreeItem", Path)} >
                                    <AddIcon fontSize="small" className="icon-add-hover" id={Path} />
                                </IconButton>
                                */}
                                {res ? <IconButton className="padding-icon" onClick={(e) => this.handleClick(e, "SubTreeItem", Path, sm.SchemaType)} >
                                    <AddIcon fontSize="small" className="icon-add-hover" />
                                </IconButton> : ""}

                                <IconButton className="padding-icon" onClick={(e) => this.handleSchemaDelete(e, "SubTreeItem", Path)}>
                                    <Delete fontSize="small" className="icon-del-hover" />
                                </IconButton>
                                {/*<IconButton className="padding-icon">
                                    <Create fontSize="small" className="icon-edit-hover" />
                                </IconButton>*/}
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
    //This is the Function to handle the Main Parent Tree Rendering
    //Also the Parent [ROOT] of the TREE is Started from Here
    TreeRender = () => {
        //let classes = useTreeItemStyles();
        const { classes } = this.props;
        console.log("currentObjState-->TreeRender", this.state.FinalModel)
        //formUI is Retured from this function.
        let formUI = this.state.FinalModel.map(m => {


            let NodeId = m.SchemaId;
            let maxRange = m.Range[0].rangeTo;
            //let minRange = m.Range[0].rangeFrom;
            let SchemaType = m.SchemaType;
            let Label = m.SchemaName;
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
                                <Tooltip title="View" placement="bottom" arrow title={SchemaType}>
                                    <div>
                                        {Label}
                                    </div>
                                </Tooltip>

                            </Typography>
                            {/*   <IconButton className="padding-icon" onClick={(e) => this.handleSchemaAdd(e, "ParentItem", "root")} >
                                <AddIcon fontSize="small" className="icon-add-hover" />
                            </IconButton>
                            */}
                            <IconButton className="padding-icon" onClick={(e) => this.handleClick(e, "ParentItem", "root", SchemaType)} >
                                <AddIcon fontSize="small" className="icon-add-hover" />
                            </IconButton>

                            <IconButton className="padding-icon" onClick={(e) => this.handleSchemaDelete(e, "ParentItem", "root")}>
                                <Delete fontSize="small" className="icon-del-hover" />
                            </IconButton>
                            {/* <IconButton className="padding-icon">
                                <Create fontSize="small" className="icon-edit-hover"/>  
                                </IconButton>*/}
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
        this.setState({ DataSent: TreeLevel, TreeItemIndex: PATH, PageFlag: false, PSDFlag: true });
    }

    //handleHideAddbtn
    handleHideAdd = (SchemaType) => {

        //console.log("Current OBJ-->PATH ", this.state.PSDData, PATH);
        //var level = PATH.split("/");
        //var currentObjState = Object.assign([], this.state.PSDData);


        //for (var i = 0; i < level.length; i++) {


        //    if (level[i] === "root") {
        //        currentObjState = currentObjState[0];

        //    }
        //    else {
        //        currentObjState = currentObjState.SubMenu[level[i] - 1];

        //    }
        //}
        //console.log("Current OBJ-->handleHideAdd ", this.state.PSDData, currentObjState);
        //let len = 0;
        //if (currentObjState.SubMenu.length>0) {
        //    len = currentObjState.SubMenu[0].SubMenu.length;
        //}
        //else {
        //    len = currentObjState.SubMenu.length;
        //}
        //console.log("retrun Data",currentObjState,currentObjState.SubMenu)
        //if (len > 0) {
        //    return true;
        //} else {
        //    return false;
        //}
        console.log("Current OBJ-->SchemaType ", this.state.PSDData, SchemaType);
        var currentObj = this.state.PSDData;

        let Len = currentObj.length;

        let res = this.findType(this.state.PSDData, SchemaType);

        console.log("Find function3", res);
        //debugger
        //for (var i = 0; i < Len; i++) {


        //    for (var j = 0; j < currentObj[i].SubMenu.length; j++) {
        //        if (currentObj[0].SchemaType == SchemaType) {

        //            currentObj = currentObj;
        //        } else {
        //            currentObj = currentObj[j].SubMenu;
        //            //Len++;

        //        }
        //    }

        //}

        //for (var i = 0; i < Len; i++) {
        //    for (var j = 0; j < currentObj[i].SubMenu.length; j++) {
        //        if (currentObj[j].SchemaType == SchemaType) {

        //            currentObj = currentObj;
        //        } else {
        //            console.log("loop", currentObj[j].SubMenu)
        //            currentObj = currentObj[j].SubMenu;
        //            //Len++;


        //        }

        //    }
        //}




        //let Len = currentObj.lenght;

        //for (var i = 0; i < Len; i++) {

        //    Len += currentObj.lenght;

        //    if (SchemaType == currentObj[i].SchemaType) {
        //        currentObj = currentObj;

        //    }
        //    else {
        //        currentObj = currentObj[i].SubMenu;
        //    }
        //}
        console.log("Current OBJ-->handleHideAdd ", currentObj);

        if (res.SubMenu.length > 0) {
            return true;
        }

        else {
            return false;
        }
        //for (var i = 0; i < level.length; i++) {

        //    if (level[i] === "root") {
        //        currentObjState = currentObjState[0];

        //    }
        //    else {
        //        currentObjState = currentObjState.SubMenu[level[i] - 1];
        //    }
        //}

        //console.log("Current OBJ Data", currentObj, Path);



    }
    //function menuCheck(SubMenu, SchemaType, i) {
    //    if (SubMenu[i].SchemaType == SchemaType) {
    //        return SubMenu;
    //    } else {
    //        return menuCheck(SubMenu[i].SubMenu, SchemaType,i++)
    //    }

    // }

    findType = (col, SchemaType) => {
        var i, temp;
        for (i = 0; i < col.length; i++) {
            if (col[i].SchemaType == SchemaType) {
                console.log("Find function", col[i]);
                return col[i];
            }
            if (col[i].SubMenu.length > 0) {
                console.log("Find function1", col[i]);
                temp = this.findType(col[i].SubMenu, SchemaType);
                if (temp) {
                    return temp;
                }
            }
        }
        return null;
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

            this.setState({ FinalModel: [], PageFlag: false, PSDFlag: true, showtable: true, showSearch: false });

        }


    }


    //This is the call back function from PSD Which 
    //Helps in handling the recursive data object push into correct path
    //Also helps in setting the data gathered in PSD.
    callbackPSDFunction = (PSDData) => {


        console.log("PSD data--callbackPSDFunction", PSDData);
        this.setState({ FlagPSD: false, open: false });

        if (this.state.DataSent == "") {

            this.state.FinalModel.push(PSDData);


            this.setState({ PageData: PSDData, PageFlag: true });

            this.setState({});

        }



        if (this.state.DataSent == "ParentItem") {

            this.state.NodeCount++;

            PSDData.ParentId = PSDData.ParentId + "/" + this.state.NodeCount;

            this.state.FinalModel[0].SubMenu.push(PSDData);

            this.setState({ PageData: PSDData });
            this.setState({ PageFlag: true });

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

            currentObjState.SubMenu.push(PSDData);


            console.log("currentObjState", currentObjState, this.state.FinalModel);
            this.setState({ PageData: PSDData });
            this.setState({ PageFlag: true });

        }

        this.setState({ PSDFlag: false });

        this.TreeRender();
        console.log("PSD data--callbackPSDFunction1", PSDData, this.state.PSDList, this.state.PSDData);
    }

    handleOk = () => {

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


    setAnchorEl = (value) => {
        let statevar = this.state;
        statevar['anchorEl'] = value;
        this.setState({ statevar });
    }

    handleClick = (event, TreeLevel, Path, SchemaType) => {

        let SubmenuData = [];
        let MenuList = this.findType(this.state.PSDData, SchemaType);
        if (MenuList.SubMenu.length > 0) {
            SubmenuData = MenuList.SubMenu.map(s => { return s.SchemaType });
        }
        console.log("SubmenuData11111", SubmenuData);
        this.state.FilterSubMenu = SubmenuData;

        this.setState({ SchemaType: SchemaType, FilterSubMenu: SubmenuData, FlagPSD: true, DataSent: TreeLevel, TreeItemIndex: Path })
        this.setAnchorEl(event.currentTarget);
        this.state.submenuData = SubmenuData;
        this.setState({});
        console.log("SubmenuData", SubmenuData, this.state.submenuData, Path, TreeLevel);
        console.log("FilterSubMenu", this.state.FilterSubMenu);

    };

    handleDropDown = (SchemaType) => {



        //let PathData = Path;

        //var level = PathData.split("/");



        console.log("Current OBJ-->handleDropDown ", this.state.PSDData);
        var currentObj = this.state.PSDData;

        for (var i = 0; i < currentObj.length; i++) {

            if (SchemaType == currentObj[i].SchemaType) {
                currentObj = currentObj;

            }
            else {
                currentObj = currentObj[i].SubMenu;
            }
        }
        console.log("Current OBJ-->handleDropDown ", currentObj);


        //for (var i = 0; i < level.length; i++) {

        //    if (level[i] === "root") {
        //        currentObjState = currentObjState[0];

        //    }
        //    else {
        //        currentObjState = currentObjState.SubMenu[level[i] - 1];
        //    }
        //}

        //console.log("Current OBJ Data", currentObj, Path);

        return currentObj;
    }

    handleOK = (value) => {



        this.setAnchorEl(null);
        //    console.log("hanlde close ", value);
        this.state.DialogBoxName = value;
        //   if (value == false) {
        this.state.open = true;
        // }
        this.state.FlagPSD = true;
        this.state.showSearch = false;

        this.setState({});
        //    // this.setState({ DialogBoxName: value, FlagPSD: true, open: true });
        //    console.log("hanlde DialogBoxName ", this.state.DialogBoxName, this.state.FlagPSD, this.state.open);
        //    //   this.dialobox();

    };

    handleAddHower = () => {

        const options = this.state.FilterSubMenu;

        console.log("options", options)
        const open = Boolean(this.state.anchorEl);
        const ITEM_HEIGHT = 48;
        let Menuitem = (<div>

            <Menu
                id="long-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={open}
                onClose={this.handleOK}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                {options.map(option => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => this.handleOK(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>);
        console.log("menuitem", Menuitem);
        return Menuitem;
    }
    /*search page Fun*/

    handlePSDInput = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }
    /* dialog Bx popup */
    handleClose = () => {

        this.setState({ open: false });



    };
    dialobox = () => {
        const { classes } = this.props;
        let dialog = (<Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            fullWidth="xs"
            maxWidth="xs"
        // onClose={this.handleClose}

        >
            <center> <DialogTitle dividers id="customized-dialog-title" >
                Give the Name of {(this.state.DialogBoxName != "") ? this.state.DialogBoxName : "List"}
            </DialogTitle>

            </center>
            <div className={classes.paper}>
                <Button color="info"
                    round
                    className={classes.marginRight}
                    id="close-bnt"
                    onClick={this.handleClose}

                >
                    &times;
                     </Button>
            </div>

            <Card className="no-shadow">
                <CardBody >
                    <GridContainer xs={12} justify="center">

                        <GridItem xs={4} sm={4} md={12}>

                            <CustomInput
                                required={true}
                                // success={this.state.emailIdState == "success"}
                                //error={this.state.emailIdState == "error"}
                                labelText="Name"

                                name="ListName"
                                //   value={this.state.Range}
                                onChange={(e) => this.handlePSDInput(e)}
                                formControlProps={{ fullWidth: true }}
                            />


                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>

            <center>    <Button color="success" round onClick={this.handlePopupButton} > Ok</Button> </center>

        </Dialog>);
        return dialog;
    }

    handlePopupButton = () => {
        console.log("PSDData", this.state.TreeItemIndex, this.state.PSDData, this.props.DialogBoxName, this.state.DataSent)

        if (this.state.DataSent == "") {

            console.log("psdobj", this.state.PSDList, this.state.FinalModel, this.state.PSDData)
            let PSDList = this.state.PSDList;
            PSDList['SchemaName'] = this.state.ListName;
            this.setState({ PSDList, open: false, showSearch: false, showtable: false });
            this.callbackPSDFunction(this.state.PSDList);


            console.log("psdobj", this.state.PSDList, this.state.PSDData, this.state.ProductSubMenu)

            // this.state.pList = this.state.ProductSubMenu.map(s => { return s.SchemaName });
        }
        if (this.state.DataSent == "ParentItem") {

            let PathData = this.state.TreeItemIndex;

            var level = PathData.split("/");

            console.log("Parent Item ---this.state.PSDData", this.state.PSDData);

            //      var currentObjState = Object.assign([], this.state.PSDData);
            var currentObjState = [];


            //for (var i = 0; i < level.length; i++) {

            //    if (level[i] === "root") {
            //        currentObjState = currentObjState[0];

            //    }
            //    else {
            //        currentObjState = currentObjState.SubMenu[level[i] - 1];
            //    }
            //}

            currentObjState = this.findType(this.state.PSDData, this.state.DialogBoxName);
            console.log("Current OBJ Before", currentObjState);
            //if (currentObjState.SubMenu.length > 0) {
            //    let SubmenuList = currentObjState.SubMenu.filter(s => s.SchemaType == this.state.DialogBoxName);


            //   console.log("Filter Data", SubmenuList);


            let DModel = Object.assign({}, this.state.DynamicPSDModel);
            DModel.ParentId = PathData;
            DModel.SchemaName = this.state.ListName;
            DModel.SchemaType = this.state.DialogBoxName;
            //  DModel.Count = SubmenuList.SubMenu.lenght;
            DModel.AttributeList = currentObjState.AttributeList;
            DModel.SubMenu = [];
            this.callbackPSDFunction(DModel);
            this.setState({ open: false });

            //}
        }
        if (this.state.DataSent == "SubTreeItem") {

            let PathData = this.state.TreeItemIndex;

            var level = PathData.split("/");

            console.log("Child Item ---this.state.PSDData", this.state.PSDData);

            //var currentObjState = Object.assign([], this.state.PSDData);


            //for (var i = 0; i < level.length; i++) {

            //    if (level[i] === "root") {
            //        currentObjState = currentObjState[0];

            //    }
            //    else {
            //        currentObjState = currentObjState.SubMenu[level[i] - 1];
            //    }
            //}

            //console.log("Current OBJ Before", currentObjState);


            //let SubmenuList = currentObjState.SubMenu.filter(s => s.SchemaType == this.state.DialogBoxName);

            // currentObjState = this.handleDropDown(this.state.SchemaType);
            console.log("Current OBJ Before", currentObjState);
            //if (currentObjState.length > 0) {
            //    let SubmenuList = currentObjState[0].SubMenu.filter(s => s.SchemaType == this.state.DialogBoxName);

            // console.log("Filter Data", SubmenuList);

            currentObjState = this.findType(this.state.PSDData, this.state.DialogBoxName);
            let DModel = Object.assign({}, this.state.DynamicPSDModel);
            DModel.ParentId = PathData;
            DModel.SchemaName = this.state.ListName;
            DModel.SchemaType = this.state.DialogBoxName;
            DModel.AttributeList = currentObjState.AttributeList;
            DModel.SubMenu = [];
            this.callbackPSDFunction(DModel);
            this.setState({ open: false });



            // }
        }

        //    let FilterData = this.state.PSDData.filter(x => x.SchemaType == this.state.DialogBoxName )

        //    console.log("Filter Data", FilterData);

        //    debugger
        //    console.log("psdobj11", this.state.PSDList, this.state.PSDData, this.state.TreeItemIndex)
        //    let PathData = this.state.TreeItemIndex;

        //    //var level = PathData.split("/");

        //    //var currentObjState = Object.assign([], this.state.PSDData);


        //    //for (var i = 0; i < level.length; i++) {

        //    //    if (level[i] === "root") {
        //    //        currentObjState = currentObjState[0];

        //    //    }
        //    //    else {
        //    //        currentObjState = currentObjState.SubMenu[level[i] - 1];
        //    //    }
        //    //}

        //    //console.log("Current OBJ Before", currentObjState);

        //    //let submenuList = currentObjState.SubMenu.filter(s => s.SchemaType == this.state.DialogBoxName);



        //  //  if (submenuList.length > 0) {
        //    //   console.log("Current OBJ ", submenuList);
        //    let DModel = Object.assign({}, this.state.DynamicPSDModel);
        //        DModel.ParentId = PathData;
        //        DModel.SchemaName = this.state.ListName;
        //        DModel.SchemaType = this.state.DialogBoxName;
        //        // DropDownList[0]['SchemaType'] =  this.state.ListName;

        //    //    console.log("Current OBJ After", currentObjState);

        //       // this.callbackPSDFunction(DModel);
        //        this.setState({ open: false });

        //    //}
        //}

    }


    /*search*/

    dataTable = (data) => {
        console.log("showdt", data);
        this.setState({ showtable: true })
        this.setState({
            psddata: data.map((prop, key) => {
                return {
                    id: key + 1,
                    psdName: prop.psdName,
                    btn: < input type="radio" name="product" onClick={this.editFunction.bind(this, prop.psdData)} />

                };
            })
        });
    }

    editFunction = (PsdData) => {
        this.setState({ open: true, DialogBoxName: PsdData[0].SchemaType });

        this.state.PSDList = Object.assign({}, PsdData[0]);
        this.state.PSDData = Object.assign([], PsdData);


        this.state.ProductSubMenu = this.state.PSDList.SubMenu;
        this.state.PSDList.SubMenu = [];


    }
    render() {

        return (
            <GridContainer>


                {this.handleAddHower()}

                {!this.state.showSearch && <GridItem xs={4}>
                    <Card className="padding-10px">


                        {this.TreeRender()}

                    </Card>
                </GridItem>}
                {/*this.state.FlagPSD && <PSDDialogBox handleDropDown={this.handleDropDown} open={this.state.open} handleClose={this.handleClose} FinalModel={this.state.FinalModel}  FilterSubMenu={this.state.FilterSubMenu} PSDData={this.state.PSDData} PSDList={this.state.PSDList} FilterSubMenu={this.state.FilterSubMenu} submenuData={this.state.submenuData} callbackPSDFunction={this.callbackPSDFunction} DataSent={this.state.DataSent} anchorEl={this.state.anchorEl} DialogBoxName={this.state.DialogBoxName} TreeItemIndex={this.state.TreeItemIndex} /*/}
                <GridItem xs={8}>

                    {this.state.PageFlag ?
                        <div>
                            <PAGE
                                PagePath={this.state.PagePath}
                                PageData={this.state.PageData}
                            />
                            <GridContainer justify="center">
                                <Button color="info" round onClick={this.handleOk}> Save</Button>
                            </GridContainer>
                        </div> : null

                    }
                </GridItem>



                {this.state.showSearch && <Card className="no-shadow"><GridContainer xs={12} justify="center" alignItems="center">

                    <GridItem xs={4} sm={4} md={4}>

                        <CustomInput
                            required={true}
                            // success={this.state.emailIdState == "success"}
                            //error={this.state.emailIdState == "error"}
                            labelText="PSDName"

                            name="PsdName"
                            //   value={this.state.Range}
                            onChange={(e) => this.handlePSDInput(e)}
                            formControlProps={{ fullWidth: true }}
                        />


                    </GridItem>
                    <GridItem xs={4} sm={4} md={2}>

                        <Button color="success" round onClick={this.searchPSD} > Search </Button>
                    </GridItem>
                </GridContainer>
                </Card>
                }
                <GridItem xs={4}>

                    {this.state.open && this.dialobox()}
                </GridItem>
                {this.state.showtable ?
                    <GridItem xs={12}>
                        <ReactTable
                            title={"PSD"}
                            data={this.state.psddata}
                            filterable
                            columns={[
                                {
                                    Header: "Select",
                                    accessor: "btn",
                                    minwidth: 30,
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                    headerclassname: 'react-table-center',
                                    resizable: false,
                                },
                                {
                                    Header: "S.No",
                                    accessor: "id",
                                    sortable: false,
                                    filterable: false,
                                    minWidth: 30,
                                    resizable: false,
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                },

                                {
                                    Header: "PSD Name",
                                    accessor: "psdName",
                                    headerClassName: 'react-table-center',
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                    // width: '50'
                                    minWidth: 40,
                                    resizable: false,

                                },


                            ]}
                            defaultPageSize={4}
                            showPaginationTop={false}
                            //pageSize={([this.state.data.length + 1] < 4) ? [this.state.data.length + 1] : 4}
                            //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                            showPaginationBottom={true}
                            className="-striped -highlight"
                        />
                    </GridItem>
                    : null}

            </GridContainer>

        );
    }
}

export default withStyles(useTreeItemStyles)(DynamicProduct);