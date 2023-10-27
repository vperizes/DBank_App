import {dbank_backend} from "../../declarations/dbank_backend";


//need to use async/await since check balance is async
window.addEventListener("load", async () => {
  const currentBalance = await dbank_backend.checkBalance();
  const currentBalanceRounded = currentBalance.toFixed(2);
  document.getElementById("value").innerText = currentBalanceRounded;
});

document.querySelector("form").addEventListener("submit", async () => {
  console.log("submitted");
})
