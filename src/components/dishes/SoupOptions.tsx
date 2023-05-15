import { useState } from "react";
import { TextField, InputLabel, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import setBetween from "../../functions/setBetween";

const SoupOptions: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  const [spicinessVal, setSpicinessVal] = useState<string>("1");
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <InputLabel id="simple-select-outlined-label">
          Spiciness scale (1-10) *
        </InputLabel>
        <div className="w-full h-full relative py-2 flex flex-row justify-center items-center">
          {errors?.spiciness_scale && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-min z-10 right-auto left-auto top-auto bottom-0 bg-slate-800 px-1 absolute text-sm text-red-400"
            >
              {errors?.spiciness_scale?.message}
            </motion.p>
          )}
          <IconButton
            onClick={() =>
              setBetween(
                Number(spicinessVal == "" ? 0 : spicinessVal) + 1,
                "1",
                "10",
                setSpicinessVal
              )
            }
          >
            <IoIosAddCircle />
          </IconButton>
          <TextField
            {...register("spiciness_scale", {
              required: { value: true, message: "This field is required" },
              shouldUnregister: true,
              valueAsNumber: true,
              min: { value: 1, message: "Value must be between 1 and 10" },
              max: { value: 10, message: "Value must be between 1 and 10" },
            })}
            type="number"
            variant="outlined"
            aria-label="spiciness scale"
            inputProps={{
              step: "any",
              inputMode: "numeric",
              value: `${spicinessVal}`,
            }}
            onChange={(e) =>
              setBetween(e.currentTarget.value, "", "10", setSpicinessVal)
            }
          />
          <IconButton
            onClick={() =>
              setBetween(
                Number(spicinessVal == "" ? 0 : spicinessVal) - 1,
                "1",
                "10",
                setSpicinessVal
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

export default SoupOptions;
