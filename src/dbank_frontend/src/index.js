import { dbank_backend } from "../../declarations/dbank_backend";


//need to use async/await since check balance is async
window.addEventListener("load", async () => {
  updateBalance();
});

document.querySelector("form").addEventListener("submit", async (event) => {

  //getting the user input on deposit and withdraw amount and converting to floats 
  event.preventDefault();

  //getting hold of button so we can make it unclickable on submit
  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);

  //button become disabled on click to submit
  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank_backend.topUp(inputAmount);
  }

  if (document.getElementById("withdraw-amount").value.length != 0) {
    await dbank_backend.withdraw(withdrawAmount);
  }

  await dbank_backend.compound();

  //updating new balance amount based on deposit or withdraw amount
  updateBalance();

  //resets deposit and withdraw fields/input values and remove disabled css styling
  document.getElementById("input-amount").value = "";
  document.getElementById("withdraw-amount").value = "";
  button.removeAttribute("disabled");
});

async function updateBalance(){
  const currentBalance = await dbank_backend.checkBalance();
  const currentBalanceRounded = currentBalance.toFixed(2);
  document.getElementById("value").innerText = currentBalanceRounded;
}