const SignIn = () => {
  return (
    <form className="flex flex-col mx-auto max-w-lg text-center">
      <label htmlFor="">Your E-mail</label>
      <input type="text" className="border-2 border-[#13193F] rounded-md" />
      <label htmlFor="">Password</label>
      <input type="text" className="border-2 border-[#13193F] rounded-md" />
    </form>
  );
};

export default SignIn;
