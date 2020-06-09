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
//import ReactTable from "react-table";
import ReactTable from 'components/MuiTable/MuiTable.jsx';

import user from "assets/img/user.png";


import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Edit from "@material-ui/icons/Edit";
import Download from "@material-ui/icons/GetApp";
import NewBusinessConfig from 'modules/NewBusiness/NewBusinessConfig.js';


const dataTable = {
    headerRow: ["ProposalNo", "QuoteNo", "ProposerName", "PlanName", "Premium", "IssueDate"],
    // footerRow: ["Type", "Position", "Office", "Age", "Actions"],
    dataRows: [
        ["", "", "", "", "", ""],
       
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




class PendingRequirements extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
       
            editModal: false,
            btnvisibility: false,
            disabled: false,
            open: false,
            simpleSelect: "",
            selectedValue: null,
            masterList: [],
            data: [],
            show: false,
            submitshow: false,
            //data: dataTable.dataRows.map((prop, key) => {
            //    return {
            //        id: key,
            //        ProposalNo: prop[0],
            //        QuoteNo: prop[1],
            //        ProposerName: prop[2],
            //        PlanName: prop[3],
            //        Premium: prop[4],
            //        IssueDate: prop[5],
            //        actions: (
            //            <div className="actions-right">
            //                <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
            //                <Button color="info" justIcon round simple className="download" ><Download /></Button>
            //            </div>
            //        )
            //    };
            //})


        }

    };



    edittable = () => {

    }
    edittable = () => {
        this.setState({ open: true });
    }
    handleClose = () => {

        this.setState({ open: false });

    };
    handleSimple = () => {

    }
    componentDidMount() {
        fetch(`${NewBusinessConfig.ProposalConfigUrl}/api/Proposal/FetchPendingRequirements`)
            .then(response => response.json())
            .then(data => {
                console.log("PendingRequirementsDto:", data);
                this.leadTable(data);
                //this.setState({ ProposalDto: data });
            });
        console.log("data", this.state.ProposalSubmittedDto);
    }
    leadTable = (data) => {
        this.setState({
            data: data.map((prop, key) => {
                return {
                    id: key,
                    ProposalNo: prop.proposalNo,
                    QuoteNo: prop.quoteNo,
                    ProposerName: prop.fullName,
                    NIC: prop.nic,
                    LeadNo: prop.leadNo,
                    BancaIntroducerCode: prop.banca,
                    ProposalStatus: prop.proposalStatus,
                    actions: (
                        <div className="actions-right">
                            <Button color="info" justIcon round simple className="edit" onClick={() => this.edittable()}><Edit /></Button>
                            <Button color="info" justIcon round simple className="download" ><Download /></Button>
                        </div>
                    )
                };
            }
            )
        }
        )
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
                        {
                            <h4 >
                                <small> Proposal Submitted </small>
                            </h4>
                        }
                </CardHeader>
                </Card>
                <GridContainer xl={12}>
                                <CardBody>

                                    <ReactTable
                                        data={this.state.data}
                                        filterable
                                        columns={[
                                            {
                                                Header: "PROPOSAL NO",
                                                accessor: "ProposalNo",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,

                                            },
                                            {
                                                Header: "QUOTE NO",
                                                accessor: "QuoteNo",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                                /* minWidth: 150,
                                                   style: { textAlign: "center" },
                                                   headerClassName: 'react-table-center'*/
                                            },
                                            {

                                                Header: "PROPOSER NAME",
                                                accessor: "ProposerName",
                                                //minWidth: 150,
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "PLAN NAME",
                                                accessor: "PlanName",
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 100,
                                                resizable: false,
                                            },
                                            {
                                                Header: "PREMIUM",
                                                accessor: "Premium",

                                                ///style: { textAlign: "center" },
                                                ///headerClassName: 'react-table-center'
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                            },
                                            {
                                                Header: "ISSUE DATE",
                                                accessor: "IssueDate",
                                                style: { textAlign: "center" },
                                                headerClassName: 'react-table-center',
                                                minWidth: 70,
                                                resizable: false,
                                                //minWidth: 150,
                                                //style: { textAlign: "center" },
                                                //headerClassName: 'react-table-center'
                                            },

                                        ]}
                                        defaultPageSize={5}
                                        showPaginationTop={false}
                                        pageSize={([this.state.data.length + 1] < 5) ? [this.state.data.length + 1] : 5}
                                        showPaginationBottom
                                        className="-striped -highlight discription-tab"
                                    />



                                </CardBody>

                    </GridContainer>

            </div>
        );
    }


}


export default withStyles(styles)(PendingRequirements);