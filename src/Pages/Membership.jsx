import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";

const Membership = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) return alert("Please login first!");

    try {
      const res = await axios.post("https://chatter-box-server-three.vercel.app/create-checkout-session", {
        email: user.email,
        userId: user._id,
      });
      window.location.href = res.data.url; 
    } catch (error) {
      console.error("Stripe session error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 shadow bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Become a Gold Member</h2>
      <ul className="list-disc ml-5 mb-6 text-gray-700">
        <li>Post unlimited content (more than 5)</li>
        <li>Get the <span className="text-yellow-500 font-semibold">Gold Badge 🥇</span></li>
        <li>Priority in search results</li>
      </ul>

      <div className="text-center">
        <button
          onClick={handlePayment}
          className="btn btn-primary px-6"
        >
          Pay ৳500 to Join Now
        </button>
      </div>
    </div>
  );
};

export default Membership;
