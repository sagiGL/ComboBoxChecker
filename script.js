'use strict';

var objects = require('./examples.json');
var comboNames = require('./ComboBoxNames')[0].comboBoxNames;
var isComboCount = 0;

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

    if (!isCombo){
        isCombo = isComboString(StringOuterHTML);
    }
    console.log((i + 1) + "." + isCombo);
    return isCombo;
}

for (var i = 0; i < objects.length; i++){
  if (isCombobox(objects[i].elementInfo.element)){
     isComboCount++;
  }
}

function isComboString(str){
    let firstCut = str.substring(str.lastIndexOf("class="));
    let firstQindex = firstCut.indexOf("\"",0);
    let secondQindex =firstCut.indexOf("\"",10);
    let secondCut = firstCut.substring(firstQindex,secondQindex + 1);

    return secondCut.includes("select");
}

console.log("DATA SAMPLES COUNTER: " + objects.length);
console.log("POSITIVE DATA SAMPLES: " + isComboCount);
console.log("POSITIVE PERCENTAGE: " + isComboCount/ objects.length * 100 +"%");

