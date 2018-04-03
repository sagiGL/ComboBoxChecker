'use strict';

//var objects = require('./examples.json');
var comdboData = require('./combo-data.js');
var comboNames = require('./ComboBoxNames')[0].comboBoxNames;
var nonComdboData = require('./non-combo-data.js');
var isComboCount = 0;
var isFalseComboCount = 0;


/**
 @returns
 true - combo
 false - not a combo
 */
function isCombobox(element){
    let isCombo = false;
    let StringOuterHTML = element.outerHTML;

    for (let k = 0; k < comboNames.length; k++){
        if (element.tagName == comboNames[k]){
            isCombo = true;
        }
    }

    (comboNames.indexOf(element.tagName.toUpperCase()) > -1)

    if (!isCombo && StringOuterHTML != null){
        isCombo = isComboString(StringOuterHTML,"class=");
        if(!isCombo){
            isCombo = isComboString(StringOuterHTML,"role=");
            if(!isCombo){
              // isCombo = isComboString(StringOuterHTML,"id=");
            }
        }
    }

    if (!isCombo && element.class != null){
        // || element.binding.toLowerCase().includes("select") will improve alot the finding of TP but add no less FP
        isCombo = element.class.toLowerCase().includes("combo");
    }

    if (!isCombo && element.binding != null){
        // || element.binding.toLowerCase().includes("select") will improve alot the finding of TP but add no less FP
        isCombo = element.binding.toLowerCase().includes("combo");
    }

    if (!isCombo && element.role != null){
        // || element.binding.toLowerCase().includes("select") will improve alot the finding of TP but add no less FP
        isCombo = element.role.toLowerCase().includes("combo");
    }

    console.log((i + 1) + "." + isCombo);
    return isCombo;
}
function isComboString(str,att){
    let isCombo = false;

    let firstCut = str.substring(str.indexOf(att));
    let firstQindex = firstCut.indexOf("\"",0);
    let secondQindex =firstCut.indexOf("\"",7);
    let secondCut = firstCut.substring(firstQindex,secondQindex + 1).toLowerCase();

    if ( secondCut.includes("select") ||  secondCut.includes("option") || secondCut.includes("k-input") || secondCut.includes("dropdown")) {
        isCombo =(!secondCut.includes("selectbox"))
    }
    return isCombo;
}


for (var i = 0; i < comdboData.length; i++){
    //debuging helper
    if (i == 0){
        console.log("stop");
    }
    if (isCombobox(comdboData[i].elementInfo.element)){
        isComboCount++;
    }
}

for (var i = 0; i < nonComdboData.length; i++){
    //debuging helper
    if (i == 0 ){
        console.log("stop");
    }
    if (isCombobox(nonComdboData[i].elementInfo.element)){
        isFalseComboCount++;
    }
}

console.log("COMBOBOX DATA");
console.log("DATA SAMPLES COUNTER: " + comdboData.length);
console.log("POSITIVE DATA SAMPLES: " + isComboCount);
console.log("POSITIVE PERCENTAGE: " + isComboCount/ comdboData.length * 100 +"%");

console.log("\nNON-COMBOBOX DATA");
console.log("DATA SAMPLES COUNTER: " + nonComdboData.length);
console.log("POSITIVE DATA SAMPLES: " + isFalseComboCount);
console.log("POSITIVE PERCENTAGE: " + isFalseComboCount/ nonComdboData.length * 100 +"%");


