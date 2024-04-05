import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";

function NoRecords() {
    return (
        <Box
            sx={{
                padding: "0px 24px",
                display: "flex",
                justifyContent: 'center',
            }}

        ><Typography variant="h5" fontSize={40}>
                No Hay Registros
            </Typography>
        </Box>
    )
}

export default NoRecords