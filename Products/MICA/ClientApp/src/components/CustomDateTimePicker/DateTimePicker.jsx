
import React, { useState } from "react";
import { DatePicker, DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function CustomDateTimePicker(props) {
    const { timeformate, labelText, disabled, name, required, id, onChange,value} = props;
  

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} >
            {(timeformate) ? <div >
                <DateTimePicker
                    variant="inline"
                    label={labelText}
                    name={name}
                    id={id}
                    required={required}
                    value={(value == undefined) ? null : value}
                    format="DD/MM/YYYY hh:mm a"
                    autoOk
                    disabled={disabled}
                    style={{ 'top': '8px' }}
                    //  editFormat={formatter} 
                    onChange={onChange}


                />
            </div> :
                <div>
                    <DatePicker
                        variant="inline"
                        label={labelText}
                        value={(value == undefined) ? null : value}
                        name={name}
                        id={id}
                        format="DD/MM/YYYY"
                        autoOk
                        disabled={disabled}
                        //  editFormat={formatter} 
                        onChange={onChange}


                    />
                </div>
            }
          

            </MuiPickersUtilsProvider>
        
    );
}

export default CustomDateTimePicker;