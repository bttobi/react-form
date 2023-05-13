import { FormInputs } from "../components/Form";

const submitToApi = async (data: FormInputs) => {
  try {
    const result = await fetch(
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export default submitToApi;
