import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type IProps = {
  question: string;
  answer: string;
  defaultExpanded?: boolean;
};

export default function AccordionNormal({
  question,
  answer,
  defaultExpanded,
}: IProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      sx={{
        border: "1px solid #EAECF0",
        borderRadius: "8px",
        boxShadow: "none",
        marginBottom: "10px",
      }}
      expanded={expanded}
      onChange={handleChange}
      defaultExpanded={defaultExpanded}
      style={{
        minWidth: 48,
      }}
    >
      <AccordionSummary
        expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          display: "flex",
          // width: "557px",
          height: "85px",
          // padding: "16px",
          // flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          background: "#FFF",
          color: "#333",
          textAlign: "start",
          //   fontFamily: "Open Sans",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          borderRadius: "30px",
        }}
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            color: "#A0A0A0",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
          }}
        >
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}