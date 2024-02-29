import { Grid, Typography } from "@mui/material";

export default function () {
  return (
    <Grid
      container
      item
      xs={12}
      bgcolor={"#184E77"}
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
