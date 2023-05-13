import { TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const PizzaOptions: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="pizza-options grid gap-4"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        <div className="w-full h-full relative py-2 flex flex-col justify-center items-center">
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
            aria-label="no_of_slices"
            placeholder="Number of slices *"
          />
        </div>
        <div className="w-full h-full relative py-2 flex flex-col justify-center items-center">
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
          <TextField
            {...register("diameter", {
              required: { value: true, message: "This field is required" },
              shouldUnregister: true,
              valueAsNumber: true,
              min: { value: 1, message: "Must be greater than 1" },
              max: { value: 60, message: "Must be smaller than 60" },
            })}
            type="number"
            variant="outlined"
            aria-label="diameter"
            placeholder="Diameter of the pizza *"
            step="any"
            className="overflow-hidden"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PizzaOptions;
