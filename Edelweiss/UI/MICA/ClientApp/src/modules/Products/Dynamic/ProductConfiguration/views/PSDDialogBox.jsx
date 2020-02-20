import React from "react";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Dropdown from "components/Dropdown/Dropdown.jsx";
import CustomCheckbox from "components/Checkbox/CustomCheckbox";
import Modal from '@material-ui/core/Modal';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CoreButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DynamicPageConfig from 'modules/DynamicPage/DynamicPageConfig.js';
import { makeStyles } from '@material-ui/core/styles';

class PSDDialogBox extends React.Component {

    constructor(props) {
        super(props);
    }
    state = {
        
        PSDData:[],
        ProductSubMenu: [],
            DialogBoxName: "",
            pList: [],
            ListName: "",
            PSDList: [],
            PSDObj: {},
            PsdName: "",
            anchorEl: null,
            open: false,

            DynamicPSDModel: {
                SchemaId: 1,
                ParentId: "",
                Range: "",
                SchemaType: "",
                SchemaName:"",
                AttributeList: [],
                SubMenu: []
            },
        }
  
 
    handleName = (e) => {

        this.setState({ ListName: e.target.value });

    }


    handlePopupButton = () => {
        console.log("PSDData", this.state.PSDData, this.props.DialogBoxName)
     
        if (this.props.DataSent == "") {
            console.log("psdobj", this.state.PSDList, this.state.PSDData)
            let PSDList = this.state.PSDList;
            PSDList['SchemaName'] =this.state.ListName;
            this.setState({ PSDList, open: false });
            this.props.callbackPSDFunction(this.state.PSDList);


            console.log("psdobj", this.state.PSDList, this.state.PSDData)

            this.state.pList = this.state.ProductSubMenu.map(s => { return s.SchemaName });
        } else {
         
            console.log("psdobj11", this.state.PSDList, this.state.PSDData, this.props.TreeItemIndex)
            let PathData = this.props.TreeItemIndex;

            var level = PathData.split("/");

            var currentObjState = Object.assign([], this.state.PSDData);


            for (var i = 0; i < level.length; i++) {

                if (level[i] === "root") {
                    currentObjState = currentObjState[0];

                }
                else {
                    currentObjState = currentObjState.SubMenu[level[i] - 1];
                }
            }

            console.log("Current OBJ Before", currentObjState);

            let submenuList = currentObjState.SubMenu.filter(s => s.SchemaType == this.props.DialogBoxName);

          
        
            if (submenuList.length > 0) {
                console.log("Current OBJ ", submenuList);
                let DModel = this.state.DynamicPSDModel;
                DModel.ParentId = PathData;
                DModel.SchemaName = this.state.ListName;
               // DropDownList[0]['SchemaType'] =  this.state.ListName;

                console.log("Current OBJ After", currentObjState);




                //let submenu = this.state.ProductSubMenu.filter(s => s.SchemaType == this.props.DialogBoxName);
                //console.log("submenu", submenu);
                //if (submenu.length > 0) {

                //    submenu[0]['SchemaType'] = submenu[0]['SchemaType'] + ':' + this.state.ListName;
           
                this.props.callbackPSDFunction(DModel);
                    this.setState({ open: false });
                //}
                //let submenu = this.state.PSDData.filter(s => s.SchemaType == this.props.DialogBoxName);
                //console.log("submenu", submenu);
                //if (submenu.length > 0) {








                //    submenu[0]['SchemaType'] = submenu[0]['SchemaType'] + ':' + this.state.ListName;

                //    this.props.callbackPSDFunction(submenu[0]);
                //    this.setState({ open: false });
            }
        }
        //}
       // console.log("pLIst", this.state.pList);
        
    }
    //valid = (pList, path) => {
    //    pList.map(option => { if (option.ParentId == path) return option else valid(pList.submenu,path); })


    //}
    componentDidMount() {
        debugger
        console.log("ProductSubMenu", this.props, this.state.ProductSubMenu, this.props.submenuData, this.props.FilterSubMenu);
        this.state.ProductSubMenu = this.props.FilterSubMenu;
        this.setState({ open: this.props.open,pList: this.props.FilterSubMenu, PSDData: this.props.PSDData, PSDList: this.props.FinalModel});
      
        console.log("DIdMount", this.props.PSDData, this.props.PSDList, this.props.FinalModel);
    }
    dialobox = () => {
        let dialog = (<Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
        // onClose={this.handleClose}

        >
            <center> <DialogTitle dividers id="customized-dialog-title" >
                Give the Name of {(this.props.DialogBoxName != "") ? this.props.DialogBoxName : "List"}
            </DialogTitle>

            </center>


            <Card className="no-shadow">
                <CardBody >
                    <GridContainer xs={12} justify="center">

                        <GridItem xs={4} sm={4} md={12}>

                            <CustomInput
                                required={true}
                                // success={this.state.emailIdState == "success"}
                                //error={this.state.emailIdState == "error"}
                                labelText="Name"

                                name="Range"
                                //   value={this.state.Range}
                                onChange={(e) => this.handleName(e)}
                                formControlProps={{ fullWidth: true }}
                            />


                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>

            <center>    <Button color="success" round onClick={this.handlePopupButton} > Save </Button> </center>

        </Dialog>);
        return dialog;
    }
  
    handlePSDSeach = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }
    /*DropList for add btn */

    searchPSD = () => {
        console.log("psdname", this.state.PsdName);
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

            });
        // this.setState({
        //    PSDObj: {
        //        "_id": "5e17fe21b558a121c483e0ec",
        //        "PsdId": "b7519305-e7c2-45ac-ad25-82b0014b63da",
        //        "PsdName": "Travel PSD",
        //        "PsdData": [{ "SchemaId": 1, "ParentId": "root", "PsdName": "Travel PSD", "Range": [{ "rangeFrom": "0", "rangeTo": "4" }], "SchemaType": "Insurable Item", "AttributeList": [{ "AttributeId": 0, "AttributeType": "Claims", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 1, "AttributeType": "Premium", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 2, "AttributeType": "Warranties", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 3, "AttributeType": "Clouses", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 4, "AttributeType": "Exclusions", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }], "SubMenu": [] }],
        //    }
        //});
        this.state.PSDObj = {
            "_id": "5e17fe21b558a121c483e0ec",
            "PsdId": "b7519305-e7c2-45ac-ad25-82b0014b63da",
            "PsdName": "Travel PSD",
            "PsdData": [{
                "SchemaId": 1, "ParentId": "root", "PsdName": "Travel PSD", "Range": [{ "rangeFrom": "0", "rangeTo": "4" }], "SchemaType": "Product", "SchemaName": "", "AttributeList": [{ "AttributeId": 0, "AttributeType": "Claims", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 1, "AttributeType": "Premium", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 2, "AttributeType": "Warranties", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 3, "AttributeType": "Clouses", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 4, "AttributeType": "Exclusions", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }], "SubMenu": [{ "SchemaId": 1, "ParentId": "root/1", "PsdName": "Travel PSD", "Range": [{ "rangeFrom": "0", "rangeTo": "4" }], "SchemaType": "Insurable Item", "SchemaName": "", "AttributeList": [{ "AttributeId": 0, "AttributeType": "Claims", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 1, "AttributeType": "Premium", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 2, "AttributeType": "Warranties", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 3, "AttributeType": "Clouses", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 4, "AttributeType": "Exclusions", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }], "SubMenu": [{ "SchemaId": 1, "ParentId": "root/1/1", "PsdName": "Travel PSD", "Range": [{ "rangeFrom": "0", "rangeTo": "4" }], "SchemaType": "Cover", "SchemaName": "", "AttributeList": [{ "AttributeId": 0, "AttributeType": "Claims", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 1, "AttributeType": "Premium", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 2, "AttributeType": "Warranties", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 3, "AttributeType": "Clouses", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 4, "AttributeType": "Exclusions", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }], "SubMenu": [{ "SchemaId": 1, "ParentId": "root/1/1/1", "PsdName": "Travel PSD", "Range": [{ "rangeFrom": "0", "rangeTo": "4" }], "SchemaType": "Benefit","SchemaName": "", "AttributeList": [{ "AttributeId": 0, "AttributeType": "Claims", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 1, "AttributeType": "Premium", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 2, "AttributeType": "Warranties", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 3, "AttributeType": "Clouses", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }, { "AttributeId": 4, "AttributeType": "Exclusions", "Icon": "Assignment", "PageData": [{ "id": "FirstName", "Name": "Mobile", "Year": "Submit" }] }], "SubMenu": [] }] }] }, {
                    "SchemaId": 1,
                    "ParentId": "root/2",
                    "PsdName": "Travel PSD",
                    "Range": [
                        {
                            "rangeFrom": "0",
                            "rangeTo": "4"
                        }
                    ],
                    "SchemaType": "Insurable Item1",
                    "SchemaName": "",

                    "AttributeList": [
                        {
                            "AttributeId": 0,
                            "AttributeType": "Claims",
                            "Icon": "Assignment",
                            "PageData": [
                                {
                                    "id": "FirstName",
                                    "Name": "Mobile",
                                    "Year": "Submit"
                                }
                            ]
                        },
                        {
                            "AttributeId": 1,
                            "AttributeType": "Premium",
                            "Icon": "Assignment",
                            "PageData": [
                                {
                                    "id": "FirstName",
                                    "Name": "Mobile",
                                    "Year": "Submit"
                                }
                            ]
                        },
                        {
                            "AttributeId": 2,
                            "AttributeType": "Warranties",
                            "Icon": "Assignment",
                            "PageData": [
                                {
                                    "id": "FirstName",
                                    "Name": "Mobile",
                                    "Year": "Submit"
                                }
                            ]
                        },
                        {
                            "AttributeId": 3,
                            "AttributeType": "Clouses",
                            "Icon": "Assignment",
                            "PageData": [
                                {
                                    "id": "FirstName",
                                    "Name": "Mobile",
                                    "Year": "Submit"
                                }
                            ]
                        },
                        {
                            "AttributeId": 4,
                            "AttributeType": "Exclusions",
                            "Icon": "Assignment",
                            "PageData": [
                                {
                                    "id": "FirstName",
                                    "Name": "Mobile",
                                    "Year": "Submit"
                                }
                            ]
                        }
                    ],
                    "SubMenu": [
                        {
                            "SchemaId": 1,
                            "ParentId": "root/2/1",
                            "PsdName": "Travel PSD",
                            "Range": [
                                {
                                    "rangeFrom": "0",
                                    "rangeTo": "4"
                                }
                            ],
                            "SchemaType": "Cover1",
                            "SchemaName": "",
                            "AttributeList": [
                                {
                                    "AttributeId": 0,
                                    "AttributeType": "Claims",
                                    "Icon": "Assignment",
                                    "PageData": [
                                        {
                                            "id": "FirstName",
                                            "Name": "Mobile",
                                            "Year": "Submit"
                                        }
                                    ]
                                },
                                {
                                    "AttributeId": 1,
                                    "AttributeType": "Premium",
                                    "Icon": "Assignment",
                                    "PageData": [
                                        {
                                            "id": "FirstName",
                                            "Name": "Mobile",
                                            "Year": "Submit"
                                        }
                                    ]
                                },
                                {
                                    "AttributeId": 2,
                                    "AttributeType": "Warranties",
                                    "Icon": "Assignment",
                                    "PageData": [
                                        {
                                            "id": "FirstName",
                                            "Name": "Mobile",
                                            "Year": "Submit"
                                        }
                                    ]
                                },
                                {
                                    "AttributeId": 3,
                                    "AttributeType": "Clouses",
                                    "Icon": "Assignment",
                                    "PageData": [
                                        {
                                            "id": "FirstName",
                                            "Name": "Mobile",
                                            "Year": "Submit"
                                        }
                                    ]
                                },
                                {
                                    "AttributeId": 4,
                                    "AttributeType": "Exclusions",
                                    "Icon": "Assignment",
                                    "PageData": [
                                        {
                                            "id": "FirstName",
                                            "Name": "Mobile",
                                            "Year": "Submit"
                                        }
                                    ]
                                }
                            ],
                            "SubMenu": [
                                {
                                    "SchemaId": 1,
                                    "ParentId": "root/2/1/1",
                                    "PsdName": "Travel PSD",
                                    "Range": [
                                        {
                                            "rangeFrom": "0",
                                            "rangeTo": "4"
                                        }
                                    ],
                                    "SchemaType": "Benefit1",
                                    "SchemaName": "",
                                    "AttributeList": [
                                        {
                                            "AttributeId": 0,
                                            "AttributeType": "Claims",
                                            "Icon": "Assignment",
                                            "PageData": [
                                                {
                                                    "id": "FirstName",
                                                    "Name": "Mobile",
                                                    "Year": "Submit"
                                                }
                                            ]
                                        },
                                        {
                                            "AttributeId": 1,
                                            "AttributeType": "Premium",
                                            "Icon": "Assignment",
                                            "PageData": [
                                                {
                                                    "id": "FirstName",
                                                    "Name": "Mobile",
                                                    "Year": "Submit"
                                                }
                                            ]
                                        },
                                        {
                                            "AttributeId": 2,
                                            "AttributeType": "Warranties",
                                            "Icon": "Assignment",
                                            "PageData": [
                                                {
                                                    "id": "FirstName",
                                                    "Name": "Mobile",
                                                    "Year": "Submit"
                                                }
                                            ]
                                        },
                                        {
                                            "AttributeId": 3,
                                            "AttributeType": "Clouses",
                                            "Icon": "Assignment",
                                            "PageData": [
                                                {
                                                    "id": "FirstName",
                                                    "Name": "Mobile",
                                                    "Year": "Submit"
                                                }
                                            ]
                                        },
                                        {
                                            "AttributeId": 4,
                                            "AttributeType": "Exclusions",
                                            "Icon": "Assignment",
                                            "PageData": [
                                                {
                                                    "id": "FirstName",
                                                    "Name": "Mobile",
                                                    "Year": "Submit"
                                                }
                                            ]
                                        }
                                    ],
                                    "SubMenu": []
                                }
                            ]
                        }
                    ]
                }]
            }],
        };
        this.state.PSDList = Object.assign({}, this.state.PSDObj.PsdData[0]);
        this.state.PSDData= Object.assign([], this.state.PSDObj.PsdData);
        
        this.state.ProductSubMenu=this.state.PSDList.SubMenu;
        this.state.PSDList.SubMenu = [];
        ///  this.state.PSDList = [...[],...this.state.PSDObj.PsdData];
        this.setState({ open: true });

        console.log("psdData", this.state.PSDList);
    }

    render() {

        return (
            <GridContainer>

            <GridContainer xs={12} justify="center">

                <GridItem xs={4} sm={4} md={4}>

                    <CustomInput
                        required={true}
                        // success={this.state.emailIdState == "success"}
                        //error={this.state.emailIdState == "error"}
                        labelText="PSDName"

                        name="PsdName"
                        //   value={this.state.Range}
                        onChange={(e) => this.handlePSDSeach(e)}
                        formControlProps={{ fullWidth: true }}
                    />


                </GridItem>
                <GridItem xs={4} sm={4} md={2}>

                    <Button color="success" round onClick={this.searchPSD} > Search </Button>
                </GridItem>
            </GridContainer>

            <GridItem xs={4}>
              
                {this.state.open && this.dialobox()}
                </GridItem>
                </GridContainer>

                );

    }
   

}
export default PSDDialogBox;