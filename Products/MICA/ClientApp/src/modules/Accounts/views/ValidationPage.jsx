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
    }
}
export default validationPage;