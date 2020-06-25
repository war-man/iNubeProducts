const validationPage = {
    verifyAcCode(value,min,max) {
        if (value >= min && value <= max) {
            //console.log("Code Generated True");
            return true;
        }
        return false;
    },
   
    // function that returns true if value is name, false otherwise
    verifyName(value) {
        var nameRex = /^\S[a-zA-Z, ,#,/]+$/;
        if (nameRex.test(value)) {
            //console.log("data coming name", value);
            return true;
           
        }
        return false;
    },
    verifyAlphaNumeric(value) {
        var nameRex = /^[ A-Za-z0-9_@./#&+-]*$/;
        if (nameRex.test(value)) {
            //console.log("data coming name", value);
            return true;

        }
        return false;
    },

    verifyAccountCode(value) {
        var nameRex = /^[0-9]*$/;
        if (nameRex.test(value)) {
            //console.log("data coming name", value);
            return true;
        }
        return false;
    },

    verifyPhoneNum(value) {
        //var nameRex = /^((\+){1}91) {1}[1-9]{1}[0-9]{9}$/;
        var nameRex = /^[0-9]{10}$/;
        if (nameRex.test(value)) {
            //console.log("data coming name", value);
            return true;
        }
        return false;
    },
    verifyNum(value) {
        //var nameRex = /^((\+){1}91) {1}[1-9]{1}[0-9]{9}$/;
        var nameRex = /^[1-9]{2}$/;
        
        //if (nameRex.test(Number(value))) {
           
        //    if ((value) > 0) {
        //        return false;
        //    } else {
        //        return true;
        //    }
        //} else {
        //    return true;
        //}
      
    },
    verifyEmail(value) {
        // var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var emailRex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{1,7}$/;
        if (emailRex.test(value)) {
            return true;
        }
        return false;
    },
}
export default validationPage;