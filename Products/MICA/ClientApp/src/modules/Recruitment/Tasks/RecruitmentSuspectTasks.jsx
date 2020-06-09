import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import $ from 'jquery';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Icon from "@material-ui/core/Icon";
import ReactTable from 'components/MuiTable/MuiTable.jsx';
import user from "assets/img/user.png";
import CreateProspect from "modules/Recruitment/createProspect/createProspect.jsx";
import suspectedit from "modules/Recruitment/Tasks/suspectedit.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import Download from "@material-ui/icons/GetApp";
import { Animated } from "react-animated-css";
const dataTable = {
    headerRow: ["SuspectCode", "FirstName", "LastName", "MobileNo", "Email", "CreateDate"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["SUS000003931", "Chythra", "Mohan", "078765678", "", "17-07-2019"],
        ["SUS000003932", "Vyshaka", "Yadav", "078765679", "Vyshaka@gmail.com", "04-07-2019"],
        ["SUS000003933", "Tharang", "Varn", "078765677", "", "17-06-2019"],
        ["SUS000003934", "Nurani", "Illam", "078765676", "", "17-06-2019"],
        ["SUS000003935", "Shreshta", "Krishna", "078765675", "", "22-04-2019"],
        ["SUS000003936", "ram", "asis", "078765678", "", "17-07-2019"],
        ["SUS000003937", "brajesh", "misra", "078765679", "brajesh@gmail.com", "04-07-2019"],
        ["SUS000003938", "vithal", "reddy", "078765677", "", "17-06-2019"],
        ["SUS000003939", "asis", "Illam", "078765676", "", "17-06-2019"],
        ["SUS000003940", "prasant", "kumar", "078765675", "", "22-04-2019"],

    ]
};

const searchClose = {
    float: "right",
    position: 'relative',
    width: "26px",
    height: "28px",
    borderRadius: "4px",
    fontSize: "larger",
    padding: "0px",
    right: '10px',

}
const searchBtn = {
    left: "140%",

}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

    },
});




class RecruitmentSuspect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           redirect:false,
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
         
            show: false,
            submitshow: false,
            data: dataTable.dataRows.map((prop, key) => {
                return {
                    id: key,
                    SuspectCode: prop[0],
                    FirstName: prop[1],
                    LastName: prop[2],
                    MobileNo: prop[3],
                    Email: prop[4],
                    CreateDate: prop[5],
                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
                            
                        </div>
                    )
                };
            })


        }

    };



   
    edittable = () => {
        document.getElementById("disp");
        this.setState({ open: true });
    }
    handleClose = () => {

        this.setState({ open: false });

    };
    handleSimple = () => {

    }
    render() {
        const { classes } = this.props;

        return (
            <div>
            <Card className="assignCard">
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Icon><img id="icon" src={user} /></Icon>
                    </CardIcon>
                        {<h4> <small>Suspects </small></h4>
                    }
                </CardHeader>

                <CardBody>

                    

                   

                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open}
                        onClose={this.handleClose}>

                        <div className={classes.paper} id="modal" >
                            <h4>  <small className="center-text">   </small> </h4>
                            <Button color="info"
                                round
                                className={classes.marginRight}
                                id="close-bnt"
                                //style={searchClose}
                                onClick={this.handleClose}>
                                &times;
                                        </Button>
                            <div id="disp" >
                                <CreateProspect  />
                            </div>
                        </div>
                    </Modal>
                </CardBody>


            </Card>
            
                <GridContainer xl={12}>
                   

                        <GridItem lg={12}>

                            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                              

                                    <ReactTable
                                        data={this.state.data}
                                        filterable
                                        columns={[
                                            {
                                                Header: " Suspect Code",
                                                accessor: "SuspectCode",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 20,
                                                resizable: false,

                                            },
                                            {
                                                Header: "FirstName",
                                                accessor: "FirstName",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {

                                                Header: "LastName",
                                                accessor: "LastName",

                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 30,
                                                resizable: false,
                                            },
                                            {
                                                Header: "MobileNo",
                                                accessor: "MobileNo",

                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 30,
                                                resizable: false,
                                            },
                                            {
                                                Header: "E-Mail",
                                                accessor: "Email",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 30,
                                                resizable: false,
                                            },
                                            {
                                                Header: "Create Date",
                                                accessor: "CreateDate",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 30,
                                                resizable: false,

                                            },
                                            {
                                                Header: "Action",
                                                accessor: "actions",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 50,
                                                resizable: false,
                                            }

                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />



                                
                            </Animated>
                        </GridItem>
                   
                </GridContainer>
               </div>
        );
    }


}


export default withStyles(styles)(RecruitmentSuspect);