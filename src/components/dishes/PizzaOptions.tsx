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
        {errors?.no_of_slices && (
          <p className="text-red-400 text-center">
            {errors?.no_of_slices?.message}
          </p>
        )}
        <TextField
          {...register("no_of_slices", {
            required: { value: true, message: "This field is required" },
            shouldUnregister: true,
            valueAsNumber: true,
            min: { value: 1, message: "Must be greater than 1" },
            max: { value: 12, message: "Must be smaller than 12" },
          })}
          type="number"
          variant="outlined"
          aria-label="no_of_slices"
          placeholder="Number of slices"
        />
        {errors?.diameter && (
          <p className="text-red-400 text-center">
            {errors?.diameter?.message}
          </p>
        )}
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
          placeholder="Diameter of the pizza"
          step="any"
          className="overflow-hidden"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PizzaOptions;
