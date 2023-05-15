import { TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const PizzaOptions: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full pizza-options flex flex-col justify-center items-center gap-4"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <div className="w-full h-full relative pb-5 flex flex-row justify-center items-center">
          <AnimatePresence>
            {errors?.no_of_slices && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-min z-10 left-4 top-auto bottom-0 absolute text-sm text-red-400"
              >
                {errors?.no_of_slices?.message}
              </motion.p>
            )}
          </AnimatePresence>
          <TextField
            label="Pizza slices 🍕 (1-12) *"
            InputLabelProps={{ shrink: true }}
            {...register("no_of_slices", {
              required: { value: true, message: "This field is required" },
              shouldUnregister: true,
              valueAsNumber: true,
              min: { value: 1, message: "Value must be between 1 and 12" },
              max: { value: 12, message: "Value must be between 1 and 12" },
              validate: {
                decimal: (val: any) =>
                  parseInt(val) == val || "Must be a whole number",
              },
            })}
            type="number"
            variant="outlined"
            aria-label="number of slices"
            inputProps={{
              step: "1",
              inputMode: "numeric",
              min: 1,
              max: 12,
              defaultValue: 1,
            }}
            className="w-full"
          />
        </div>
        <div className="w-full h-full pb-5 relative flex flex-row justify-center items-center">
          <AnimatePresence>
            {errors?.diameter && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-min text-center z-10 left-4 top-auto bottom-0 absolute text-sm text-red-400"
              >
                {errors?.diameter?.message}
              </motion.p>
            )}
          </AnimatePresence>
          <TextField
            label="Diameter of pizza 📐 (1-60) "
            InputLabelProps={{ shrink: true }}
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
            inputProps={{
              step: "any",
              inputMode: "numeric",
              min: 1.0,
              max: 60.0,
              defaultValue: 1.0,
            }}
            className="w-full"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PizzaOptions;
