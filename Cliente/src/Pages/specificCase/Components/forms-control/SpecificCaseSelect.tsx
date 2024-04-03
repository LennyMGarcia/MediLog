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
import { Dayjs } from "dayjs";
import { globalTheme } from "../../../../theme/globalTheme";

interface ISelect<T> extends Omit<SelectProps, "variant"> {
  label?: React.ReactNode;
  name?: string;
  initialValue?: string;
  selectObject?: {
    key: string | number;
    value: string | number;
  }[],
  setOfZustandCallback?: (name: string, value: T) => void;
  getOfZustandCallback?: (name: string | Dayjs) => T;
}

const SPCaseSelect: React.FC<ISelect<any>> = ({
  label,
  name = "name",
  selectObject,
  initialValue = "",
  setOfZustandCallback,
  getOfZustandCallback,
  ...rest
}) => {

  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    let state;
    if (getOfZustandCallback != undefined) {
        state = getOfZustandCallback(name)
      }
    
    if (!state) {
        if(setOfZustandCallback != undefined){
         setOfZustandCallback(name, "");
        }
    }
  }, [name, setOfZustandCallback]);

  useEffect(() => {
    if(setOfZustandCallback != undefined)
    {
        setOfZustandCallback(name, initialValue);
    }
  }, []);

  const handleChange = (e: SelectChangeEvent<any>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if(setOfZustandCallback != undefined)
    {
        setOfZustandCallback(name, newValue || initialValue)
    }
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
                '& .MuiSelect-outlined': {
                  borderColor: "white", // Color del borde al pasar el ratón
                },
                '&.Mui-focused': {
                  borderColor: globalTheme.palette.primary.main, // Color del borde cuando está enfocado
                },
                '&.Mui-disabled': {
                  color: globalTheme.font.primary.main, // Color del texto cuando está deshabilitado
                },
                '& .MuiSelect-select': {
                  color: globalTheme.font.primary.main,
                  borderColor:globalTheme.font.primary.main,
                },
                '& .Mui-disabled': {
                  color: globalTheme.font.primary.main, // Color del texto cuando está deshabilitado
                },
                "&.MuiOutlinedInput-root": {
                  borderColor: "white", // Color del borde normal
                },
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

export default SPCaseSelect;