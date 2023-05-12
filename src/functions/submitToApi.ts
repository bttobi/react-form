const submitToApi = async (data: any) => {
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
    console.log(error);
    return error;
  }
};

export default submitToApi;
