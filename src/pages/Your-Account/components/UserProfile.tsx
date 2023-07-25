import { RootState } from "@/setup/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.user.user.email);
  const address = useSelector((state: RootState) => state.user.user.address);
  const city = useSelector((state: RootState) => state.user.user.city);

  function handleSubmit() {}
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-xs mx-auto flex flex-col text-center"
      >
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder={email || ""}
          className="border-2 border-[#13193F] rounded-lg"
        ></input>
        <label htmlFor="">Address</label>
        <input
          type="text"
          placeholder={address || ""}
          className="border-2 border-[#13193F] rounded-lg"
        ></input>
        <label htmlFor="">City/State</label>
        <input
          type="text"
          placeholder={city || ""}
          className="border-2 border-[#13193F] rounded-lg"
        ></input>
      </form>
      <div className="max-w-xs flex flex-col mx-auto">
        <button>Update Profile</button>
        <button onClick={() => navigate("/your-profile/update-password")}>
          Change Password
        </button>
      </div>
    </>
  );
};

export default UserProfile;
