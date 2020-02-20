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
        var numRex = /^\d+(\.\d{1,2})?$/;
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
              	
        var emailRex =/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{1,7}$/;
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
    verifyLength(value, length) {
        // var panNum = /^[0-9]+$/;
        // var panNum = /^[6-9]\d{1}[0-9]\d{0,9}$/;
        console.log("comming value", value);
        //  var panNum =/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        var panNum = /^\(?([0]\d{1}[0-9]{1}\d{0,4})\)?[- ]?(\d{5,8})$/;
        //   value = value.replace(/[^\d]/g, "");
        //  var panNum = /^([0]\d{1}[0-9]\d{2,4})[/-][0-9]\d{6,8}$/;
        // && value.length == length
        if (panNum.test(value)) {
            return true;
        }
        return false;
    },

    // function that verifies if two strings are equal
    compare(string1, string2) {
        if (string1 == string2) {
            return true;
        }
        return false;
    },
    // function that verifies if value contains only numbers
    verifyNumber(value) {
        console.log("not comming");
     //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^[6-9]\d{9}$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;
       
    },
    // verifies if value is a valid URL
    verifyUrl(value) {
        var Url = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (Url.test(value)) {
            return true;
        } else {
            return false;
        }

        //try {
        //    new URL(value);
        //    return true;
        //} catch (_) {
        //    return false;
        //}
    },
    //verify the address
    verifyAddress(value) {

    },

    verifyTanNum(value, length) {
        // var panNum = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        var tanNum = /^([a-zA-Z]){4}([0-9]){5}([a-zA-Z]){1}?$/;
        if (tanNum.test(value)) {
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
     verifyID(value) {
        //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /^[0-9]\d*$/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;

    },
    verifynumspchars(value) {
        //   var numberRex = new RegExp("^[0-9]+$");
        //var numberRex = /^[0-9_@./+-]*$/;
        var numberRex = /^[ A-Za-z0-9_@./#&+-]*$/ ;
        if (numberRex.test(value)) {
            return true;
        }
        return false;

    },
    verifydecimals(value) {
        //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /\d+(\.\d{1,2})?/;
        if (numberRex.test(value)) {
            return true;
        }
        return false;

    },

    verifytelephone(value) {
        //   var numberRex = new RegExp("^[0-9]+$");
        var numberRex = /\d{5}([- ]*)\d{6}$/;
        if (numberRex.test(value)) {
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