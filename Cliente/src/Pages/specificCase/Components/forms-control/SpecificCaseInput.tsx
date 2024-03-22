import React, { ChangeEvent, useEffect, useState } from "react";

import useTheme from "@mui/material/styles/useTheme";
import { Field, FieldProps, ErrorMessage } from "formik";
import TextField, { TextFieldProps } from "@mui/material/TextField/TextField";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import Box from "@mui/material/Box/Box";
import { useMediaQuery } from "@mui/material";
import { getAllCaseData } from "../../StateManagement/ZustandSpecificCaseManagement";
import { getAllConsultationData } from "../../StateManagement/ZustandConsultationManagement";
import { getAllSurgeryData } from "../../StateManagement/ZustandSurgeryManagement";

interface InputProps<T> extends Omit<TextFieldProps, "variant"> {
  label?: React.ReactNode;
  name?: string;
  placeHolder?: string;
  initialValue?: string;
  zustandCallback?: (name: string, value: T) => void;
}

const SPCaseInput: React.FC<InputProps<any>> = ({
  label,
  name = "",
  initialValue = "",
  placeHolder,
  zustandCallback,
  ...rest
}) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<any>) => {
    const newValue = e.target.value;
    const newValueFormatted: any = newValue.trim();
    setValue(newValue);
    //console.log(getAllCaseData());
    //console.log(getAllConsultationData())
    //console.log(getAllSurgeryData())

    if (zustandCallback != undefined) {
      console.log(name);
      zustandCallback(name, newValueFormatted);
    }
  };

  useEffect(() => {
    if(zustandCallback != undefined)
    {
        zustandCallback(name, initialValue);
    }
  }, []);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={isMediumScreen ? "29.25rem" : "18.75rem"}
      pb="-2rem"
    >
      <Field id={name} name={name}>
        {({ field, form }: FieldProps) => (
          <React.Fragment>
            <TextField
              label={label}
              id={name}
              placeholder={placeHolder ? `${placeHolder}` : ""}
              variant="outlined"
              color="primary"
              fullWidth
              type="text"
              value={value}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              error={Boolean(form.errors[name] && form.touched[name])}
              {...rest}
              sx={{
                "& .MuiInputBase-root": {
                  height: "auto",
                },
                mt: "1.5rem",
              }}
            />
            <ErrorMessage name={name}>
              {(msg) => (
                <FormHelperText style={{ color: "red" }}>{msg}</FormHelperText>
              )}
            </ErrorMessage>
          </React.Fragment>
        )}
      </Field>
    </Box>
  );
};

export default SPCaseInput;
