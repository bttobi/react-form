import { TextField } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const SandwichOptions: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-4"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
      >
        {errors?.slices_of_bread && (
          <p className="text-red-400 text-center">
            {errors?.slices_of_bread?.message}
          </p>
        )}
        <TextField
          {...register("slices_of_bread", {
            required: { value: true, message: "This field is required" },
            shouldUnregister: true,
            valueAsNumber: true,
            min: { value: 1, message: "Must be greater than 1" },
            max: { value: 6, message: "Must be smaller than 6" },
          })}
          type="number"
          variant="outlined"
          aria-label="slices_of_bread"
          placeholder="Slices of bread"
          className="overflow-hidden"
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SandwichOptions;
