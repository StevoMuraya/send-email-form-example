import { useForm } from "react-hook-form";
import "./style.scss";
import RQSendEmail from "./RQSendEmail";
import { Loader } from "lucide-react";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.error(error);
  };

  const { mutate: sendEmailTest, isLoading } = RQSendEmail(onSuccess, onError);

  const sendMessage = (data) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);

    sendEmailTest(formData);
  };

  console.log(isLoading);
  return (
    <div className="main-container">
      <div className={`loading-container${isLoading === true ? " show" : ""}`}>
        <div className={`loading-icon`}>
          <Loader />
        </div>
      </div>
      <form className="form-action" onSubmit={handleSubmit(sendMessage)}>
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            Fullname
          </label>
          <input
            type="text"
            placeholder="Fullname"
            {...register("fullname", { required: "Fullname is required " })}
            className="form-input"
          />
          {errors.fullname && (
            <span className="error">{errors.fullname.message}</span>
          )}
        </div>

        <div className="split-form-group">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required " })}
              placeholder="Email"
              className="form-input"
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required " })}
              placeholder="Phone"
              className="form-input"
            />
            {errors.phone && (
              <span className="error">{errors.message.phone}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            placeholder="Message"
            className="form-input"
            {...register("message", {
              required: "Please type your message here ",
            })}
            rows="5"
          ></textarea>
          {errors.message && (
            <span className="error">{errors.message.message}</span>
          )}
        </div>

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
