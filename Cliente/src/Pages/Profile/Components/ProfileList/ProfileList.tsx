import Box from "@mui/material/Box/Box"
import ListItem from "@mui/material/ListItem/ListItem"
import Typography from "@mui/material/Typography/Typography"
import Divider from '@mui/material/Divider';
import React from "react";
import List from "@mui/material/List/List";

interface IProfileList {
    dataList?: {
        name: string | undefined,
        data: any | undefined,
    }[]
}

const ProfileList: React.FC<IProfileList> = ({ dataList }) => {

    return (
        <>
            {Array.isArray(dataList) ? (
                dataList.map((list, index) => (
                    <List key={index}>
                        <ListItem sx={{ marginTop: index == 0 ? "-1rem" : "none" }} key={index} id={String(index)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
                                <Typography variant="subtitle2">{list.name}</Typography >
                                <Typography variant="body1"><strong>{list.data}</strong></Typography>
                            </Box>
                        </ListItem>
                        {index !== dataList.length - 1 && <Divider component="li" />}
                    </List>
                ))
            ) : (<div>No hay elementos</div>)}

        </>
    )
}

export default ProfileList
