module.exports = {
  validator,
  writeResponseToFile,
  callToEtsy,
  buildReport,
  getEtsyShopInformation,
};

const deepDiff = require("deep-diff"),
  config = require("../config.json"),
  axios = require("axios"),
  fs = require("fs");

function validator(shopIDs, res) {
  if (Array.isArray(shopIDs)) {
    for (let i = 0; i < shopIDs.length; i++) {
      let x = shopIDs[i];
      x = parseInt(x);
      //Validate first make sure it is all numbers
      if (Number.isInteger(x)) {
        return true;
      } else {
        res.send(config.must_be_integer);
        return false;
      }
    }
  } else {
    shopIDs = parseInt(shopIDs);
    if (Number.isInteger(shopIDs)) {
      return true;
    } else {
      res.send(config.must_be_integer);
      return false;
    }
  }
}

async function writeResponseToFile(shopID) {
  // make call to get data from Etsy
  let response = await getEtsyShopInformation(shopID);

  //compare file and input to see whats different
  let msg = buildReport(shopID, response);

  //open and write the right file & verify there is data
  Object.keys(response).length != 0 &&
    response.constructor === Object &&
    (await fs.writeFileSync(
      "./db/" + shopID + ".json",
      JSON.stringify(response, null, 2)
    ));

  //HERE is where we would use sql/mongodb/azureSql/awsRDS/azureCosmos/awsDynamoDB to store the data

    return msg;
}

async function callToEtsy(shopID, offset) {
  let url = `https://openapi.etsy.com/v2/shops/${shopID}/listings/active`; //store in config file
  try {
    let obj = {};
    Object.assign(obj, config.etsy);
    obj.offset = offset ? offset : obj.offset;
    const res = await axios.get(url, { params: obj });
    if (typeof res.data == "object") return res.data;
    else return {};
  } catch (err) {
    console.info("error:" + err);
    return {};
  }
}

async function buildReport(shopID, result) {
  let header = "#" + shopID + "\n ",
    msg = "",
    fileObj = {};
  try {
    let fileData = await fs.readFileSync("./db/" + shopID + ".json");
    fileObj = JSON.parse(fileData);
  } catch (e) {
    msg = config.first_save + shopID + "\n ";
  }
  // compare result to file
  for (let listing_id in fileObj) {
    try {
      let temp = "",
        diffs = await deepDiff(fileObj[listing_id], result[listing_id]);
      (diffs || []).forEach((diff) => {
        //    Field: State active => inactive\n
        temp +=
          config.field +
          diff.path[0] +
          " " +
          diff.lhs +
          "  =>  " +
          diff.rhs +
          "\n ";
      });
      if (temp.length > 0) {
        msg += config.listing_change + listing_id + "\n ";
        msg += temp;
      }
    } catch (e) {
      console.info(e);
      return e;
    }
  }
  let finalmsg =
    msg.length > 0 ? header + msg : header + config.no_change + "\n ";
  console.info(finalmsg);
  return finalmsg;
}

async function getEtsyShopInformation(shopID, resultsObj = {}, offset) {
  let data = await callToEtsy(shopID, offset);
  (data.results || []).forEach((x) => {
    resultsObj[x.listing_id] = x;
  });
  //verify we have pagination and offset
  if (data && data.pagination && data.pagination.next_offset) {
    resultsObj = await getEtsyShopInformation(
      shopID,
      resultsObj,
      data.pagination.next_offset
    );
  }
  return resultsObj;
}
