import { Grid, Typography } from "@mui/material";
import { globalTheme } from "../../theme/globalTheme";

export default function () {
  return (
    <Grid
      container
      item
      xs={12}
      bgcolor={globalTheme.palette.FSH.main}
      color={"#FFFFFF"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"0.5rem 2.375rem"}
    >
      <Typography>SatoruScript Software Company</Typography>
      <Typography>© 2020 SatoruScript. All rights reserved.</Typography>
    </Grid>
  );
}
