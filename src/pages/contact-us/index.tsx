import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

type ContactInputType = {
  name?: string | null;
  email?: string | null;
  message: string;
  access_key: string;
};

const schema = yup.object().shape({
  name: yup.string().nullable().notRequired(),
  email: yup.string().email("Invalid email address").nullable().notRequired(),
  message: yup
    .string()
    .min(4, "The message should be at least 4 characters long.")
    .required("Message area is required."),
  access_key: yup.string().required(),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<any>();
  const { fetchData, isLoading } = useFetch();

  const inputClasses =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-theme-blue focus:border-theme-blue";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  const sendMessage = async (data: ContactInputType) => {
    const result = await fetchData(
      "https://api.web3forms.com/submit",
      "POST",
      data
    );

    if (result?.response.ok) {
      dispatch(
        displayAlert({
          type: "success",
          message: "Your message was sent successfuly. Thank you!",
          autoHide: true,
        })
      );

      reset({ message: "" });
    }
  };
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
      <p className="mb-4">
        Any feedback or suggestions on the project would be greatly appreciated!
      </p>
      <form onSubmit={handleSubmit(sendMessage)} className="space-y-4">
        <div>
          <input
            type="hidden"
            {...register("access_key")}
            value={`${import.meta.env.VITE_WEB3FORMS_ACCESS_KEY}`} // Replace with your actual Web3Forms access key
          />
          <label
            htmlFor="name"
            className="block text-sm"
          >
            Name (Optional)
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            className={inputClasses}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm "
          >
            Email (Optional)
          </label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className={inputClasses}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className={errorMessageClasses}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm"
          >
            Message<span aria-hidden="true">*</span>
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={4}
            className={inputClasses}
            placeholder="Your message..."
          />
          {errors.message && (
            <p className={errorMessageClasses}>{errors.message.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            aria-label="Send Message"
            className={`${isLoading("default")
                ? "bg-gray-200"
                : "bg-theme-blue hover:bg-theme-purple"
              }  rounded-lg font-[500] text-white max-w-[50%] mb-2 px-10 py-2`}
            disabled={isLoading("default")}
          >
            {isLoading("default") ? "Sending" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
