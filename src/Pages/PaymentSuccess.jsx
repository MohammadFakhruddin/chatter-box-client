import { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
  if (userId && user?.email) {
    axios
      .patch(`http://localhost:3000/users/${user.email}/make-member`)
      .then(() => {
        alert("You're now a Gold Member!");
        navigate("/");
      })
      .catch(() => alert("Failed to update user status."));
  }
}, [userId, user, navigate]);


  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful ✅</h2>
      <p>Upgrading your membership...</p>
    </div>
  );
};

export default PaymentSuccess;
