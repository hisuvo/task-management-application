import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import useAxiosPublice from "../../hooks/useAxiosPublice";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signGoogle, user } = useContext(AuthContext);
  const axiosPublice = useAxiosPublice();

  const handleGoogleSign = () => {
    signGoogle()
      .then((res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
        };

        // Send user data to the backend
        axiosPublice
          .post("/users", userInfo)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Loing Success",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => console.log("Error:", error.code));
      })
      .catch((error) => {
        console.log("Sign-in error:", error.code);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSign}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        SingIn
      </button>
    </div>
  );
};

export default SignIn;
