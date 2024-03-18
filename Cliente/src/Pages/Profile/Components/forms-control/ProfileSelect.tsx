import React, { useEffect, useState } from "react";
import Select, {
  SelectChangeEvent,
  SelectProps,
} from "@mui/material/Select/Select";
import { Field, FieldProps, ErrorMessage } from "formik";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import useTheme from "@mui/material/styles/useTheme";
// import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import useDataRegisterStore from "../../../Register/ZustandRegisterManagement";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import { useMediaQuery } from "@mui/material";

interface ISelect extends Omit<SelectProps, "variant"> {
  label?: React.ReactNode;
  name?: string;
  initialValue?: string;
  selectObject?: {
    key: string | number;
    value: string | number;
  }[];
}

const ProfileSelect: React.FC<ISelect> = ({
  label,
  name = "name",
  selectObject,
  initialValue = "",
  ...rest
}) => {
  const { setRegisterData, getRegisterData } = useDataRegisterStore();
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    const state = getRegisterData(name);
    if (!state) {
      setRegisterData(name, "");
    }
  }, [name, setRegisterData]);

  useEffect(() => {
    setRegisterData(name, initialValue);
  }, []);

  const handleChange = (e: SelectChangeEvent<any>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setRegisterData(name, newValue || initialValue);
  };

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Field id={name} name={name}>
        {({ field, form }: FieldProps) => (
          <React.Fragment>
            <InputLabel shrink sx={{ margin: "0.2rem 0 -1rem 0.5rem" }}>
              {label}
            </InputLabel>
            <Select
              id={name}
              name={field.name}
              variant="outlined"
              fullWidth
              displayEmpty
              value={value}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              {...rest}
              error={Boolean(form.errors[name] && form.touched[name])}
              sx={{
                height: "3rem",
                fontSize: "0.9rem",
                mt: "0.5rem",
                maxWidth: isMediumScreen ? "29.25rem" : "18.75rem",
              }}
            >
              <MenuItem key="" value="" disabled defaultValue="sel">
                Seleccione una opcion
              </MenuItem>
              {Array.isArray(selectObject) ? (
                selectObject.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.key}
                  </MenuItem>
                ))
              ) : (
                <MenuItem key="" value="" disabled>
                  <span>No hay nada</span>
                </MenuItem>
              )}
            </Select>
            <ErrorMessage name={name}>
              {(msg) => (
                <FormHelperText style={{ color: "red" }}>{msg}</FormHelperText>
              )}
            </ErrorMessage>
          </React.Fragment>
        )}
      </Field>
    </>
  );
};

export default ProfileSelect;
