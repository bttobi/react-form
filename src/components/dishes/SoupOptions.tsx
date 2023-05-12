import { TextField } from "@mui/material";
import { motion } from "framer-motion";

const SoupOptions: React.FC<{ register: any; errors: any }> = ({
  register,
  errors,
}) => {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
    >
      {errors?.spiciness_scale && (
        <p className="text-red-400 text-center">
          {errors?.spiciness_scale?.message}
        </p>
      )}
      <TextField
        {...register("spiciness_scale", {
          required: { value: true, message: "This field is required" },
          shouldUnregister: true,
          valueAsNumber: true,
          min: { value: 1, message: "Must be greater than 1" },
          max: { value: 10, message: "Must be smaller than 10" },
        })}
        type="number"
        variant="outlined"
        aria-label="spiciness_scale"
        placeholder="Spiciness scale"
      />
    </motion.div>
  );
};

export default SoupOptions;
