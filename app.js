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
  let stWepValue = document.getElementById("StWepValue").value || 0;
  let stGearValue = document.getElementById("StGearValue").value || 0;
  let exWepValue = document.getElementById("ExWepValue").value || 0;
  let exGearValue = document.getElementById("ExGearValue").value || 0;
  let hrItemValue = document.getElementById("HRItemValue").value || 0;
  let accValue = document.getElementById("AccValue").value || 0;
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

/**************************************
 * Toggle dark mode on/off
 */
document.getElementById("dark-mode").addEventListener("click", darkMode);
function darkMode(e) {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".white").classList.toggle("hidden");
  document.querySelector(".black").classList.toggle("hidden");
  document.querySelector(".ball").classList.toggle("moved-ball");
  const darkMode = document.body.classList.contains("dark-mode");
  try {
    window.localStorage.setItem("darkMode", darkMode);
  } catch (error) {
    console.log("Couldn't persist dark mode state through local storage");
    console.log("Error: ", error);
  }
}
/**************************************
 * Grab user dark mode preference
 */
(function darkModePref() {
  try {
    const darkMode = window.localStorage.getItem("darkMode");
    document.body.style.transitionDuration = "0s";
    document.querySelector(".ball").style.transitionDuration = "0s";
    if (darkMode === "true") {
      document.body.classList.add("dark-mode");
      document.querySelector(".white").classList.remove("hidden");
      document.querySelector(".black").classList.add("hidden");
      document.querySelector(".ball").classList.add("moved-ball");
    } else {
      document.body.classList.remove("dark-mode");
      document.querySelector(".white").classList.add("hidden");
      document.querySelector(".black").classList.remove("hidden");
      document.querySelector(".ball").classList.remove("moved-ball");
    }
    setTimeout(() => {
      document.body.style.transitionDuration = "1s";
      document.querySelector(".ball").style.transitionDuration = "1s";  
    }, 500);
  } catch (error) {
    console.log("Couldn't persist dark mode state through local storage");
    console.log("Error: ", error);
  }
})();
