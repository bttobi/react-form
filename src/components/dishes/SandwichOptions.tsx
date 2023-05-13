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
        <div className="w-full h-full relative py-2 flex flex-col justify-center items-center">
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
            aria-label="slices_of_bread"
            placeholder="Slices of bread *"
            className="overflow-hidden"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SandwichOptions;
