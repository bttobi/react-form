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

export const Form: React.FC = () => {
  const [currentDish, setcurrentDish] = useState<string | undefined>("pizza");
  const [showNotification, setshowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [errorHappened, setErrorHappened] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      preparation_time: "00:00:00",
      type: "pizza",
    },
    shouldUnregister: true,
  });
  const options: string[] = ["pizza", "soup", "sandwich"];

  const checkErrors = async (data: any): Promise<void> => {
    const response: any = await submitToApi(data);
    const tolog = await response.json();
    if (response?.ok) {
      setErrorHappened(false);
      setNotificationMessage("Successfully sent to API!");
      setshowNotification(true);
      setTimeout(() => {
        setshowNotification(false);
      }, 3000);
      return;
    }
    setErrorHappened(true);
    setNotificationMessage(tolog.body[0] ?? errors?.name?.message);
    setshowNotification(true);
    setTimeout(() => {
      setshowNotification(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          checkErrors(data);
        })}
        className="p-10 px-14 rounded-xl shadow-lg shadow-black form-wrapper flex flex-col gap-4 justify-center align-center items-center bg-slate-800"
      >
        <TextField
          id="outlined-basic"
          required
          label="Dish name"
          variant="outlined"
          {...register("name", {
            required: true,
            maxLength: { value: 30, message: "Max length is 30" },
          })}
          type="text"
          aria-label="Dish name"
          placeholder="Dish name"
          className="text-white"
        />
        <TextField
          id="time"
          {...register("preparation_time", {
            required: true,
          })}
          type="time"
          variant="outlined"
          required
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
        <DishOptions register={register} chosenDish={currentDish} />
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </form>
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="absolute top-16 bottom-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert
              severity={errorHappened ? "error" : "success"}
              onClose={() => {
                setshowNotification(false);
              }}
            >
              {notificationMessage}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
