import { TextField } from "@mui/material";

const PizzaOptions: React.FC<{ register: any }> = ({ register }) => {
  return (
    <div className="flex flex-col gap-4">
      <TextField
        {...register("no_of_slices", {
          required: true,
          shouldUnregister: true,
        })}
        required
        type="number"
        variant="outlined"
        aria-label="no_of_slices"
        placeholder="Number of slices"
      />
      <TextField
        {...register("diameter", {
          required: true,
          shouldUnregister: true,
        })}
        required
        type="number"
        variant="outlined"
        aria-label="diameter"
        placeholder="Diameter of the pizza"
        step="any"
        className="w-full"
      />
    </div>
  );
};

export default PizzaOptions;
