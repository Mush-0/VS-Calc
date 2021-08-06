import { stWep, stGear, exWep, exGear, acc, hrItem } from "./itemCosts.js";
import { addComma } from "./addComma.js";

/**************************************
 * Retrieve data from DOM, Handle it, show it on DOM
 */
const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", calcAndUpdate);
document.getElementById("resetBtn").addEventListener("click", calcAndUpdate);

function calcAndUpdate(e) {
  // Check if event fired is submit or reset
  e.target.type === "reset" || e.preventDefault();
  /**
   * 1. Data retrieved
   */
  let stWepValue = document.getElementById("StWepValue").value;
  let stGearValue = document.getElementById("StGearValue").value;
  let exWepValue = document.getElementById("ExWepValue").value;
  let exGearValue = document.getElementById("ExGearValue").value;
  let hrItemValue = document.getElementById("HRItemValue").value;
  let accValue = document.getElementById("AccValue").value;
  // Change values to 0 if resetBtn was clicked
  e.target.type === "reset" &&
    ((stWepValue = 0),
    (stGearValue = 0),
    (exWepValue = 0),
    (exGearValue = 0),
    (hrItemValue = 0),
    (accValue = 0));
  /**
   * 2. Data handled
   */
  const result = {
    pale: 0,
    amber: 0,
    molten: 0,
    bp: 0,
    zenny: 0,
    craftZenny: 0,
  };
  function calcMats() {
    const keys = Object.keys(result);
    keys.forEach((key) => {
      result[key] =
        stWep[key] * stWepValue +
        stGear[key] * stGearValue +
        exWep[key] * exWepValue +
        exGear[key] * exGearValue +
        acc[key] * accValue +
        hrItem[key] * hrItemValue;
    });
  }
  calcMats();
  /********************
   * 3.Show data on DOM
   */

  document.getElementById("paleFragOutput").textContent = result.pale;
  document.getElementById("burningAmbOutput").textContent = result.amber;
  document.getElementById("moltenShardOutput").textContent = result.molten;
  document.getElementById("BPOutput").textContent = addComma(result.bp);
  document.getElementById("ZnOutput").textContent =
    result.zenny.toString().slice(0, 5) + "m";
  document.getElementById("craftZnOutput").textContent =
    result.craftZenny.toString().slice(0, 5) + "m";
}
