import React from "react";

// @material-ui/core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ClaimConfig from "modules/Claims/ClaimConfig.js";
import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { Animated } from "react-animated-css";
import ReactTable from "components/MuiTable/MuiTable.jsx";
import TranslationContainer from "components/Translation/TranslationContainer.jsx";

import MyUploader from "./DocumentUpload.jsx"

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

const DocDetails = (props) => {
    console.log("docDetailsData1", props);
    // const { classes } = this.props;
    const docDetailsprops = props.componentData;
    console.log("docDetailsprops: ", docDetailsprops);
    console.log("docDetailsprops id: ", docDetailsprops.claimId);
    //console.log('Insurable data ', insurableData);
    //console.log('Insurable data props ', props);
    var ClaimId = docDetailsprops.claimId;

    return (
        <div>
            

                {/*<img id="upload" src={`data:image/jpeg;base64,${this.state.imagebyte}`}/>*/}
            
            {/*  <h3> View Document:{props.imagebyte} </h3>
            <img class="doc-icon" src="pdf.png" />
            <a href={`${ClaimConfig.claimConfigUrl}/api/ClaimManagement/Download?ClaimId=` + ClaimId}>Download</a>
            */}
              <CardHeader color="info" icon >
                {
                    <h3 >
                        <small><TranslationContainer translationKey="DocumentDetails" /></small>
                    </h3>
                }
            </CardHeader>


        
            <GridContainer justify="center" >
                <GridItem xs={12}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <ReactTable
                            data={docDetailsprops.docdata}
                            filterable
                            columns={[
                                {
                                    Header: "SerialNo",
                                    accessor: "id",
                                    headerClassName: 'react-table-center',
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                    minWidth: 20,
                                    sortable: false,
                                    //  filterable: false 
                                },
                                {
                                    // Header: "Cover Event Factor - From Value",
                                    Header: "DocumentName",
                                    accessor: "documentName",
                                    minWidth: 40,
                                    setCellProps: (value) => ({ style: { textAlign: "left" } }),
                                    headerClassName: 'react-table-center'
                                },
                                //{
                                //    Header: "Document Type",
                                //    accessor: "documentType",
                                //    minWidth: 40,
                                //    style: { textAlign: "center" },
                                //    headerClassName: 'react-table-center'
                                //},
                                

                               

                            ]}
                            defaultPageSize={2}
                            //pageSize={([docDetailsprops.docdata.length + 1] < 4) ? [docDetailsprops.docdata.length + 1] : 4}
                            showPaginationTop={false}
                            //showPaginationBottom={([this.state.data.length + 1] <= 5) ? false : true}
                            showPaginationBottom={true}
                            className="-striped -highlight discription-tab"

                        />
                    </Animated>
                 
                </GridItem>
            </GridContainer>  

            <MyUploader claimId={docDetailsprops.claimId} dmsdocId={docDetailsprops.dmsdocId} docidfunc={docDetailsprops.docidfunc} documentName={docDetailsprops.documentName} />

        </div>
    );

}

export default DocDetails;
