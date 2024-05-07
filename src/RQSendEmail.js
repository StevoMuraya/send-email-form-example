import axios from "axios";
import { useMutation } from "react-query";

const RQSendEmail = (onSuccess, onError) => {
  const sendEmailEndpoint = async (data) => {
    const response = await axios.post(
      "https://apis.kbtc.ac.ke/SendEmail.php",
      data
    );
    return response.data;
  };

  return useMutation(sendEmailEndpoint, {
    onSuccess,
    onError,
  });
};

export default RQSendEmail;
