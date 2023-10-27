import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

//using actor class creates a new canister
actor DBank {

  //stable make variable into a persistant var
  stable var currentValue : Float = 300;

  //:= notation reassigns var
  //currentValue := 300;

  stable var startTime = Time.now();
  //startTime := Time.now();


  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    let tempValue : Float = currentValue - amount;
    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Not enough funds to complete withdraw request.");
    };
  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() {
    let currentTimeNanoSec = Time.now();
    let timeElapsedNanoSec = currentTimeNanoSec - startTime;
    let timeElapsedSec = timeElapsedNanoSec / 1000000000; //elapsed time in seconds
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedSec));
    startTime := currentTimeNanoSec;
  };

};
