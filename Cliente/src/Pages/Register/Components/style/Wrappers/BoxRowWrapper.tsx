import { Box } from "@mui/material"
import { ReactNode } from "react"

interface IBoxRW{
    children:ReactNode
}

const BoxRowWrapper: React.FC<IBoxRW> = ({children}) => {
    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                '& > *': { //hijos directos
                    maxWidth: { xs: '100vw', md: '14rem' },
                    marginBottom: { xs: '0.625rem', md: 0 },
                    marginRight: { xs: 0, md: '0.938rem' },
                    flex: 1,
                },
            }}
        >
            {children}
        </Box>
    )
}

export default BoxRowWrapper;