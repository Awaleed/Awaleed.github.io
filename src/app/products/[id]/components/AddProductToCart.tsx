import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@mui/material/Input";
import { Product } from "@/models/category";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";

interface IFormInput {
  firstName: string;
  lastName: string;
  iceCreamType: { label: string; value: string };
}

export default function AddProductToCart({ product }: { product: Product }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      iceCreamType: {},
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            placeholder="الاسم الاول"
            label="الاسم الاول"
            InputLabelProps={{}}
            {...field}
          />
        )}
      />
      <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">حجم الذبيحة</InputLabel>

            <Select
              {...field}
              label="حجم الذبيحة"
              labelId="demo-simple-select-label"
              sx={{borderRadius: '999px'}}
            >
              {product.prices.map((size) => (
                <MenuItem key={size.id} value={size.id}>
                  {/* size name and price with space between */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width='100%'
                  >
                    <span>{size.name}</span>
                    <span>{size.price} ريال</span>
                    

                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <input type="submit" />
    </form>
  );
}
