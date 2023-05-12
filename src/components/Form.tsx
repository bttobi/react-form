import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DishOptions from "./DishOptions";
import submitToApi from "../functions/submitToApi";

type FormInputs = {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices: number;
  diameter: number;
  slices_of_bread: number;
  spiciness_scale: number;
};

export const Form: React.FC = () => {
  const [currentDish, setcurrentDish] = useState<string | undefined>("pizza");
  const [showNotification, setshowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [errorHappened, setErrorHappened] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      preparation_time: "00:00:00",
      type: "pizza",
    },
    shouldUnregister: true,
  });
  const options: string[] = ["pizza", "soup", "sandwich"];

  const sendForm = async (data: FormInputs): Promise<void> => {
    [
      {
        name: "name",
        type: "custom",
      },
      {
        name: "preparation_time",
        type: "focus",
      },
      {
        name: "preparation_time",
        type: "custom",
      },
      {
        name: "no_of_slices",
        type: "custom",
      },
      {
        name: "diameter",
        type: "custom",
      },
      {
        name: "slices_of_bread",
        type: "custom",
      },
      {
        name: "spiciness_scale",
        type: "custom",
      },
    ].forEach(({ name, type }) => setError(name, { type }));

    const response: any = await submitToApi(data);
    const toLog = await response.json();
    reset();
    if (response?.ok) {
      console.log(toLog);
      setErrorHappened(false);
      setNotificationMessage("Successfully sent to API!");
      setshowNotification(true);
      setTimeout(() => {
        setshowNotification(false);
      }, 3000);
      return;
    }
    setErrorHappened(true);
    setNotificationMessage(toLog);
    setshowNotification(true);
    setTimeout(() => {
      setshowNotification(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center align-center">
      <motion.form
        onSubmit={handleSubmit(sendForm)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-10 px-14 rounded-xl shadow-lg shadow-black form-wrapper flex flex-col gap-4 justify-center align-center items-center bg-slate-800"
      >
        {errors?.name && (
          <p className="text-red-400 text-center">{errors?.name?.message}</p>
        )}
        <TextField
          id="outlined-basic"
          label="Dish name"
          variant="outlined"
          {...register("name", {
            required: { value: true, message: "This field is required" },
            minLength: { value: 3, message: "Min length is 3" },
            maxLength: { value: 30, message: "Max length is 30" },
          })}
          type="text"
          aria-label="Dish name"
          placeholder="Dish name"
          className="text-white"
        />
        {errors?.preparation_time && (
          <p className="text-red-400 text-center">
            {errors?.preparation_time?.message}
          </p>
        )}
        <InputLabel id="simple-select-outlined-label" className="mt-4">
          Preparation time
        </InputLabel>
        <TextField
          id="time"
          {...register("preparation_time", {
            required: { value: true, message: "This field is required" },
          })}
          type="time"
          variant="outlined"
          aria-label="Preparation time"
          placeholder="Preparation time"
          inputProps={{ step: 1 }}
        />
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="simple-select-outlined-label">Dish type</InputLabel>
          <Select
            labelId="simple-select-outlined-label"
            id="simple-select-outlined"
            label="Dish type"
            value={currentDish}
            {...register("type")}
            onChange={(e: any) => setcurrentDish(e.target.value)}
            name="type"
            className="text-white"
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
        <DishOptions
          register={register}
          errors={errors}
          chosenDish={currentDish}
        />
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </motion.form>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed top-16 m-0 bottom-auto w-full flex justify-center align-center items-center content-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert
              severity={errorHappened ? "error" : "success"}
              onClose={() => {
                setshowNotification(false);
              }}
              className="w-min"
            >
              {notificationMessage}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
