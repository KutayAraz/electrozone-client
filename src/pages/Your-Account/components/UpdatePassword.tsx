import { Form } from "react-router-dom";

const UpdatePassword = () => {
  return (
    <Form className="max-w-xs flex flex-col mx-auto text-center justify-items-center mt-2">
      <label htmlFor="currentPassword">Current Password:</label>
      <input
        id="currentPassword"
        name="currentPassword"
        type="text"
        className="border-2 border-[#13193F] rounded-lg"
      />
      <label htmlFor="newPassword">New Password:</label>
      <input
        id="newPassword"
        name="newPassword"
        type="text"
        className="border-2 border-[#13193F] rounded-lg"
      />
      <label htmlFor="retypedNewPassword">Confirm New Password:</label>
      <input
        id="retypedNewPassword"
        name="retypedNewPassword"
        type="text"
        className="border-2 border-[#13193F] rounded-lg"
      />
      <button
        type="button"
        className="bg-[#13193F] hover:bg-[#A34393] rounded-lg text-white max-w-[50%] my-2 mx-auto px-6 py-1"
      >
        Confirm
      </button>
    </Form>
  );
};

export default UpdatePassword;
