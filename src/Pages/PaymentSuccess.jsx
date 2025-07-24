import { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Provider/AuthContext";
import { toast } from "react-hot-toast"; // ✅ Import toast

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const userId = params.get("userId");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && user?.email) {
      axios
        .patch(`https://chatter-box-server-three.vercel.app/users/${user.email}/make-member`)
        .then(() => {
          toast.success("You're now a Gold Member!"); 
          navigate("/");
        })
        .catch(() => toast.error("Failed to update user status.")); 
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
