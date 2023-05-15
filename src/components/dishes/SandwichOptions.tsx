import { useState } from "react";
import { TextField, InputLabel, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import setBetween from "../../functions/setBetween";

const SandwichOptions: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  const [slicesVal, setSlicesVal] = useState<string>("1");
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <InputLabel id="simple-select-outlined-label">
          Number of bread slices (1-6) *
        </InputLabel>
        <div className="w-full h-full relative py-2 flex flex-row justify-center items-center">
          <AnimatePresence>
            {errors?.slices_of_bread && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-min z-10 right-auto left-auto top-auto bottom-0 bg-slate-800 px-1 absolute text-sm text-red-400"
              >
                {errors?.slices_of_bread?.message}
              </motion.p>
            )}
          </AnimatePresence>
          <IconButton
            onClick={() =>
              setBetween(
                Number(slicesVal == "" ? 0 : slicesVal) + 1,
                "1",
                "6",
                setSlicesVal,
                false
              )
            }
          >
            <IoIosAddCircle />
          </IconButton>
          <TextField
            {...register("slices_of_bread", {
              required: { value: true, message: "This field is required" },
              shouldUnregister: true,
              valueAsNumber: true,
              min: { value: 1, message: "Value must be between 1 and 6" },
              max: { value: 6, message: "Value must be between 1 and 6" },
            })}
            type="number"
            variant="outlined"
            aria-label="slices of bread"
            inputProps={{
              step: "any",
              inputMode: "numeric",
              value: `${slicesVal}`,
            }}
            onChange={(e) =>
              setBetween(e.currentTarget.value, "", "6", setSlicesVal, false)
            }
            className="overflow-hidden"
          />
          <IconButton
            onClick={() =>
              setBetween(
                Number(slicesVal == "" ? 0 : slicesVal) - 1,
                "1",
                "6",
                setSlicesVal,
                false
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

export default SandwichOptions;
