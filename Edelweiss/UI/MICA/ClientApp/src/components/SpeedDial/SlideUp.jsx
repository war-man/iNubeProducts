import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    console.log("switch role:", props, props.switchroles);
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    //const { roledata, setroledata } = props.switchroles;


    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = value => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Select Role to Switch </DialogTitle>
            <List>
                {emails.map(email => (
                    <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={email} />
                    </ListItem>
                ))}

                {/*<ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="add account" />
                </ListItem>*/}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
    console.log("switch role: ", props);
    //if (props != {}) {
    //    if (props.switchroles.length != 0) {
    //        console.log("switch role: ", props.userroles[0].mdata);
    //    }
    //}
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
               Switch Role
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} switchroles={props.switchroles} onClose={handleClose} />
        </div>
    );
}