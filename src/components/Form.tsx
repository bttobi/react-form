import { useState } from "react";
import { useForm } from "react-hook-form";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DishOptions from "./DishOptions";
import submitToApi from "../functions/submitToApi";
import errorTypes from "../data/errorTypes";
import Alert from "./Notifications/Alert";

export type FormInputs = {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices: number;
  diameter: number;
  slices_of_bread: number;
  spiciness_scale: number;
};

export const Form: React.FC = () => {
  const [currentDish, setCurrentDish] = useState<string | undefined>("pizza");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNotification, setshowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [errorHappened, setErrorHappened] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      preparation_time: "00:01:00",
      type: "pizza",
    },
    mode: "onChange",
  });
  const options: string[] = ["pizza", "soup", "sandwich"];

  const sendForm = async (data: FormInputs): Promise<void> => {
    //@ts-ignore
    errorTypes.forEach(({ name, type }) => setError(name, { type }));

    /*checking if errors object is not empty - that means errors happened
    and loading animation should not be triggered*/
    if (Object.keys(errors).length != 0) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    const response: any = await submitToApi(data);
    const toLog = await response.json();
    reset(); //resetting form after submitting

    if (response.ok) {
      const parsedResponse = JSON.stringify(toLog, null, "\n");
      setApiResponse(parsedResponse);
      setErrorHappened(false);
      setIsLoading(false);
      setNotificationMessage(
        ` code: ${response.status} - Successfully sent to API!`
      );
      setshowNotification(true);
      setIsLoading(false);
      setTimeout(() => {
        setshowNotification(false);
      }, 3000);
      return;
    }
    setErrorHappened(true);
    setIsLoading(false);
    setNotificationMessage(` code: ${response.status} - ${toLog.body[0]}`);
    setshowNotification(true);
    setIsLoading(false);
    setTimeout(() => {
      setshowNotification(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center align-center my-16 m-0">
      <motion.form
        onSubmit={handleSubmit(sendForm)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-4 rounded-xl shadow-lg shadow-black form-wrapper flex flex-col gap-4 justify-center align-center items-center bg-slate-800"
        noValidate
      >
        <div className="w-full h-full relative pt-2 pb-5 mx-4 flex flex-col justify-center items-center">
          <AnimatePresence>
            {errors?.name && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-min z-10 left-4 bottom-0 absolute text-sm text-red-400"
              >
                {errors?.name?.message}
              </motion.p>
            )}
          </AnimatePresence>
          <TextField
            label="Dish name *"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("name", {
              required: { value: true, message: "This field is required" },
              minLength: {
                value: 3,
                message: "Length must be between 3 and 30",
              },
              maxLength: {
                value: 30,
                message: "Length must be between 3 and 30",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Only letters allowed",
              },
            })}
            type="text"
            aria-label="Dish name"
            className="text-white w-full px-0"
          />
        </div>
        <div className="w-full h-full relative pb-5 flex flex-col justify-center items-center">
          <AnimatePresence>
            {errors?.preparation_time && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-min z-10 left-4 top-auto bottom-0 absolute text-sm text-red-400"
              >
                {errors?.preparation_time?.message}
              </motion.p>
            )}
          </AnimatePresence>
          <TextField
            label="Preparation time ⏰ *"
            InputLabelProps={{ shrink: true }}
            {...register("preparation_time", {
              required: { value: true, message: "This field is required" },
              min: {
                value: "00:01:00",
                message: "Min value is 00:01:00",
              },
            })}
            type="time"
            variant="outlined"
            aria-label="Preparation time"
            placeholder="Preparation time"
            inputProps={{ step: 1 }}
            className="w-full text-center"
          />
        </div>
        <div className="w-full h-full relative pb-5 flex flex-col justify-center items-center">
          <FormControl variant="outlined" sx={{ minWidth: "100%" }}>
            <InputLabel id="dish_type">Dish type *</InputLabel>
            <Select
              labelId="dish_type"
              id="simple-select-outlined"
              label="Dish type"
              value={currentDish}
              {...register("type")}
              onChange={(e: any) => setCurrentDish(e.target.value)}
              name="type"
              className="text-white w-full"
            >
              {options.map((val) => {
                return (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <DishOptions
          register={register}
          errors={errors}
          chosenDish={currentDish}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          className="h-12 w-full"
        >
          {isLoading ? <TailSpin width={"32px"} /> : "Submit"}
        </Button>
      </motion.form>
      <Alert
        showNotification={showNotification}
        errorHappened={errorHappened}
        setshowNotification={setshowNotification}
        notificationMessage={notificationMessage}
      />
      <AnimatePresence>
        {apiResponse != "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mx-24 flex flex-col flex-wrap p-4 bg-slate-800 rounded-lg mt-8 shadow-lg shadow-black"
          >
            <strong className="text-orange-300">
              Last successful API Response:
            </strong>
            {apiResponse}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
