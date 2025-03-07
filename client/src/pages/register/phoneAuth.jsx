import { useState } from "react";
import axios from "axios";

function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  //   let received_Otp;
  async function handlePhoneNumber() {
    try {
      const data = { phone_num: phoneNumber };
      const response = await axios.post(
        "http://localhost:3000/auth/sms",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <h2>Phone Number Verification</h2>
        <div>
          <input
            type="text"
            placeholder="Enter phone number (+countryCode)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handlePhoneNumber}>Get OTP</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button>Verify OTP</button>
        </div>
        {/* <div>
          <h3>Phone number verified! Proceed to registration.</h3>
        </div> */}
      </div>
    </div>
  );
}

export default PhoneAuth;
