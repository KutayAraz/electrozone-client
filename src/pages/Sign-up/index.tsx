const SignUp = () => {
  return (
    <form className="flex text-center">
      <div className="flex flex-col mx-auto">
        <h4 className="underline">Create a new account</h4>
        <label>E-mail address:</label>
        <input
          type="text"
          className="border-2 border-[#13193F] rounded-md"
        ></input>
        <label>Password</label>
        <input
          type="text"
          className="border-2 border-[#13193F] rounded-md"
        ></input>
        <label>Verify your password:</label>
        <input
          type="text"
          className="border-2 border-[#13193F] rounded-md"
        ></input>
        <label>First Name</label>
        <input
          type="text"
          className="border-2 border-[#13193F] rounded-md"
        ></input>
        <label>Last Name</label>
        <input
          type="text"
          className="border-2 border-[#13193F] rounded-md"
        ></input>
        <label>Your Address</label>
        <input
          type="text"
          className="border-2 border-[#13193F] rounded-md"
        ></input>
        <label>Your City:</label>
        <input
          type="text"
          className="border-2 border-[#13193F] rounded-md"
        ></input>
      </div>
    </form>
  );
};

export default SignUp;
