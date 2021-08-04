import { stWep, stGear, exWep, exGear, acc, hrItem } from "./itemCosts.js";
import { addComma } from "./addComma.js";

/**************************************
 * Retrieve data from DOM, Handle it, show it on DOM
 */
const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  /**
   * 1. Data retrieved
   */
  const stWepValue = document.getElementById("StWepValue").value;
  const stGearValue = document.getElementById("StGearValue").value;
  const exWepValue = document.getElementById("ExWepValue").value;
  const exGearValue = document.getElementById("ExGearValue").value;
  const hrItemValue = document.getElementById("HRItemValue").value;
  const accValue = document.getElementById("AccValue").value;
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
  document.getElementById("ZnOutput").textContent = result.zenny + "m";
  document.getElementById("craftZnOutput").textContent =
    result.craftZenny + "m";
});
