import Box from "@mui/material/Box/Box"
import List from "@mui/material/List/List"
import ListItem from "@mui/material/ListItem/ListItem"
import Typography from "@mui/material/Typography/Typography"
import { Link, useNavigate, useParams } from "react-router-dom"

interface IDataListaFormater {
    formatData: any[]
    isNavigate?: Boolean,
}



const ListFormater: React.FC<IDataListaFormater> = ({ formatData, isNavigate = false }) => {

    const navigate = useNavigate();

    const handleLinkClick = (route: string | number) => {
        navigate(`/pacientes/${route}`);
    };

    return (
        <>
            {Array.isArray(formatData) ? (
                formatData.map((item, index) => (
                    <List key={index}>
                        <ListItem sx={{ marginTop: index == 0 ? "-1rem" : "-1.8rem" }} key={index} id={String(index)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
                                {isNavigate ?
                                    <Typography variant="body1">
                                        <strong>{
                                            <Link to={`/pacientes/${item}`} onClick={() => handleLinkClick(item)}>{item}</Link>
                                        }</strong>
                                    </Typography>
                                    :
                                    <Typography variant="body1">
                                        <strong>{item}</strong>
                                    </Typography>}
                            </Box>
                        </ListItem>
                    </List>
                ))
            ) : (<div>No hay elementos</div>)}

        </>
    )
}

export default ListFormater