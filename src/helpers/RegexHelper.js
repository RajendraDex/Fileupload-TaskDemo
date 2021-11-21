async function specialCharacter(text) {
    let str = text;
    // if (/^[[\ ^ $ . | ? * + ( )]*$/.test(text) == true) {
    if (text.length > 0) {
        str = "";
        const stringArray = text.split("");
        //console.log(stringArray);
        stringArray.map((val, key) => {
            if (/^[[\ ^ $ . | ? * + ( )]*$/.test(val) == true) {
                str += `\\${val}`;
                // console.log('I am inside if statement', str);
            } else {
                str += `${val}`;
                // console.log('I am inside else statement', str);
            }
        });
    }
    // }
    return str;
}
module.exports = {
    specialCharacter
}