import { useState } from "react";
import { InputLabel, TextField, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import setBetween from "../../functions/setBetween";

const PizzaOptions: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  const [slicesVal, setSlicesVal] = useState<string>("1");
  const [diameterVal, setDiameterVal] = useState<string>("10");
  return (
    <AnimatePresence>
      <motion.div
        className="pizza-options flex flex-col justify-center items-center"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <InputLabel id="simple-select-outlined-label">
          Number of slices (1-12) *
        </InputLabel>
        <div className="w-full h-full relative py-2 flex flex-row justify-center items-center">
          <AnimatePresence>
            {errors?.no_of_slices && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-min z-10 right-auto left-auto top-auto bottom-0 bg-slate-800 px-1 absolute text-sm text-red-400"
              >
                {errors?.no_of_slices?.message}
              </motion.p>
            )}
          </AnimatePresence>
          <IconButton
            onClick={() => {
              setBetween(
                Number(slicesVal == "" ? 0 : slicesVal) + 1,
                "1",
                "12",
                setSlicesVal,
                false
              );
            }}
          >
            <IoIosAddCircle />
          </IconButton>
          <TextField
            {...register("no_of_slices", {
              required: { value: true, message: "This field is required" },
              shouldUnregister: true,
              valueAsNumber: true,
              min: { value: 1, message: "Value must be between 1 and 12" },
              max: { value: 12, message: "Value must be between 1 and 12" },
            })}
            type="number"
            variant="outlined"
            aria-label="number of slices"
            inputProps={{
              step: "any",
              inputMode: "numeric",
              value: `${slicesVal}`,
            }}
            onChange={(e) => {
              setBetween(e.currentTarget.value, "", "12", setSlicesVal, false);
            }}
          />
          <IconButton
            onClick={() =>
              setBetween(
                Number(slicesVal == "" ? 0 : slicesVal) - 1,
                "1",
                "12",
                setSlicesVal,
                false
              )
            }
          >
            <IoIosRemoveCircle />
          </IconButton>
        </div>
        <InputLabel id="simple-select-outlined-label">
          Diameter of pizza (1-60) *
        </InputLabel>
        <div className="w-full h-full relative py-2 flex flex-row justify-center items-center">
          <AnimatePresence>
            {errors?.diameter && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-min z-10 right-auto left-auto top-auto bottom-0 bg-slate-800 px-1 absolute text-sm text-red-400"
              >
                {errors?.diameter?.message}
              </motion.p>
            )}
          </AnimatePresence>
          <IconButton
            onClick={() =>
              setBetween(
                Number(diameterVal == "" ? 0 : diameterVal) + 10,
                "1",
                "60",
                setDiameterVal,
                true
              )
            }
          >
            <IoIosAddCircle />
          </IconButton>
          <TextField
            {...register("diameter", {
              required: { value: true, message: "This field is required" },
              shouldUnregister: true,
              valueAsNumber: true,
              min: { value: 1.0, message: "Must be greater than 1" },
              max: { value: 60.0, message: "Must be smaller than 60" },
              validate: {
                num: (val: any) => {
                  return (
                    Number.isInteger(val) ||
                    val.toString().split(".")[1]?.length <= 2 ||
                    "Only 2 decimal points allowed"
                  );
                },
              },
            })}
            type="number"
            variant="outlined"
            aria-label="pizza diameter"
            className="overflow-hidden"
            inputProps={{
              step: "0.01",
              value: `${diameterVal}`,
            }}
            onChange={(e) => {
              setBetween(e.currentTarget.value, "", "12", setDiameterVal, true);
            }}
          />
          <IconButton
            onClick={() =>
              setBetween(
                Number(diameterVal == "" ? 0 : diameterVal) - 1,
                "1",
                "60",
                setDiameterVal,
                true
              )
            }
          >
            <IoIosRemoveCircle />
          </IconButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PizzaOptions;
