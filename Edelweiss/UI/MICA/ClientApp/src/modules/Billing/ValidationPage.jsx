const validationPage = {
    verifyCDvalue(value) {
        console.log("got it");
          var numRex = /^\d+(\.\d{1,2})?$/;
        //
        if (numRex.test(value)) {
            console.log("data coming decimal");
            return true;

        }
        return false;
    },

    verifydecimal(value) {
        var numRex = /^[1-9]\d*(\.\d+)?$/;
        //
        if (numRex.test(value)) {
            console.log("data coming decimal");
            return true;

        }
        return false;
    },


    verifydatetime(value) {
        var dateRex = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
        if (dateRex.test(value)) {
            console.log("date coming");
            return true;

        }
        return false;
    },
    // function that returns true if value is name, false otherwise
    verifyName(value) {
        var nameRex = /^\S[0-9a-zA-Z, ,#,/]+$/;
        //--->/^[0-9a-zA-Z\s-\, ,#,/]+$/;
        //var nameRex = /^[0-9a-zA-Z]+$/;
        //var str = document.value;
        //if (str.name.value.trim() == "") {
        //    alert("Enter your name");
        //    str.name.focus();
        //    return false;
        //} else
        if (nameRex.test(value)) {
            console.log("data coming name", value);
            return true;

        }
        return false;
    },
    // function that returns true if value is email, false otherwise
    verifyEmail(value) {
        // var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var emailRex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{1,7}$/;
        if (emailRex.test(value)) {
            return true;
        }
        return false;
    },
    // function that verifies if a string has a given length or not
    verifyPanNum(value, length) {
        // var panNum = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        var panNum = /^([a-zA-Z]){3}([P]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;
        if (panNum.test(value)) {
            return true;
        }
        return false;
    },
    verifyPanIndNum(value, length) {
        if (length == 8)//individual
        {
            var panNum = /^([a-zA-Z]){3}([P]){1}([a-zA-Z]){1}([0-9]){4}([a-zA-Z]){1}?$/;
            if (panNum.test(value)) {
                return true;
            }
        }
        else {
            var panNum = /^[A-Z]{3}[ABCEFGHLJPT]{1}[A-Z]{1}[0-9]{4}[A-Z]$/;
            if (panNum.test(value)) {
                return true;
            }
        }
        return false;
    },

    verifynumspchars(value) {
        //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^[ A-Za-z0-9_@./#&+-]*$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;
    },

    verifyInvNo(value) {
        //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^[ A-Z0-9/-]*$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;
    },

    verifydecimals(value) {
        //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^ (\d*\.)?\d + $/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;

    },

    verifyNumber(value) {
        console.log("not comming");
        //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^[6-9]\d{9}$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;
    },

    verifyNumeric(value) {
        var numRex = /^\S[0-9, ,#,/]+$/;

        if (numRex.test(value)) {
            console.log("data coming name", value);
            return true;
        }
        return false;
    },
    verifyLandLineNumber(value) {
        var numberRex = /^[0-9]\d{2,4}-\d{6,8}$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;

    },
}
export default validationPage;