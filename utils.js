"use strict";

const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
    // if the conversion isn't successful, throw a BadRequestError and will
    // be handled in your route
    let nums = [];
    for(let strNum of strNums.split(',')){
      nums.push(parseInt(strNum));
    }
    
    if(nums.includes(NaN)){
      //throw error
      throw new BadRequestError("Request contains non-integers")
    }else{
      return nums;
    }
}


module.exports = { convertStrNums };