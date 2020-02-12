import React from "react";
import ReactExport from "components/ExcelExport/react-data-export.js";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.jsx";
import Assignment from "@material-ui/icons/AssignmentReturned";
import GetAppIcon from '@material-ui/icons/GetApp';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function ExportToExcel({ ...props }) {
    const {
        value,
        name,
        onClick,
        lstObject,
        lstSheet
    } = props;
    console.log(props);
    return (
        <ExcelFile element={<Button color="success" round className="add" onClick={props.onClick} ><GetAppIcon />Download Excel</Button>}>
            {
                lstSheet.map(sheet =>
                    <ExcelSheet data={sheet.data} name={sheet.sheetName}>
                        {
                            sheet.columnArray.map(item =>
                                <ExcelColumn label={item.Header} value={item.accessor} />
                            )
                        }
                    </ExcelSheet>
                )}
        </ExcelFile>
    );
}

ExportToExcel.propTypes = {
    classes: PropTypes.object,
    value: PropTypes.node,
    dataset: PropTypes.node,
    id: PropTypes.string,
    header: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    lstObject: PropTypes.arrayOf(PropTypes.shape({
        header: PropTypes.string,
        value: PropTypes.string,
    })),
    lstSheet: PropTypes.arrayOf(PropTypes.shape({
        data: PropTypes.node,
        sheetName: PropTypes.string,
        columnArray: PropTypes.arrayOf(PropTypes.shape({
            header: PropTypes.string,
            value: PropTypes.string,
        })),

    }))

};

export default ExportToExcel;