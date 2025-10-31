import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { orange, grey, purple } from "@mui/material/colors";
import { SUPPLY_FILTERS, DEMAND_FILTERS } from "@/src/constants/partners";

interface TrendFilterSectionProps {
    supply: string[];
    demand: string[];
    onChangeSupply: (values: string[]) => void;
    onChangeDemand: (values: string[]) => void;
}

export default function TrendFilterSection({
    supply,
    demand,
    onChangeSupply,
    onChangeDemand,
}: TrendFilterSectionProps) {
    const toggle = (list: string[], label: string, onChange: (values: string[]) => void) => {
        const next = list.includes(label)
            ? list.filter((v) => v !== label)
            : [...list, label];
        onChange(next);
    };
    return (
        <Box
            sx={{
                width: 192,
                bgcolor: "#fff",
                position: "sticky",
                top: 80,
                alignSelf: "flex-start",
                overflowY: "auto",
                py: 1,
                '& .emoji': {
                    width: 24,
                    textAlign: 'center',
                    mr: 1,
                },
                  "@media (max-width: 768px)": {
                    width: '100%',
                    px: 2,
                  }
            }}
        >
            {/* 수요자 아코디언 */}
            <Accordion
                disableGutters
                defaultExpanded
                sx={{
                    boxShadow: "none",
                    "&::before": { display: "none" },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: grey[600] }} />}
                    sx={{
                        px: 0,
                        py: 1,
                        minHeight: 32,
                        "& .MuiAccordionSummary-content": {
                            m: 0,
                        },
                    }}
                >
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: grey[700] }}>
                        수요자
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 0,
                        pt: 1,
                        pb: 2,
                    }}
                >
                    <FormGroup>
                        {DEMAND_FILTERS.map((item) => (
                            <FormControlLabel
                                key={item.key}
                                control={
                                    <Checkbox
                                        checked={demand.includes(item.label)}
                                        onChange={() => toggle(demand, item.label, onChangeDemand)}
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            mr: 1,
                                            "&.Mui-checked": { color: grey[900] },
                                        }}
                                    />
                                }
                                label={<><span className='emoji'>{item.emoji}</span>{item.label}</>}
                                sx={{
                                    mx: 0,
                                    height: 32,
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: 14,
                                        color: demand.includes(item.label)
                                            ? grey[900]
                                            : grey[600],
                                        fontWeight: demand.includes(item.label) ? 700 : 400,
                                    },
                                }}
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            {/* 공급자 아코디언 */}
            <Accordion
                disableGutters
                defaultExpanded
                sx={{
                    boxShadow: "none",
                    "&::before": { display: "none" },
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: grey[600] }} />}
                    sx={{
                        px: 0,
                        py: 1,
                        minHeight: 32,
                        "& .MuiAccordionSummary-content": {
                            m: 0,
                        },
                    }}
                >
                    <Typography sx={{ fontSize: 15, fontWeight: 700, color: grey[700] }}>
                        공급자
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        px: 0,
                        pt: 1,
                        pb: 2,
                    }}
                >
                    <FormGroup>
                        {SUPPLY_FILTERS.map((item) => (
                            <FormControlLabel
                                key={item.key}
                                control={
                                    <Checkbox
                                        checked={supply.includes(item.label)}
                                        onChange={() => toggle(supply, item.label, onChangeSupply)}
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            mr: 1,
                                            "&.Mui-checked": { color: grey[900] },
                                        }}
                                    />
                                }
                                label={<><span className='emoji'>{item.emoji}</span>{item.label}</>}
                                sx={{
                                    mx: 0,
                                    height: 32,
                                    "& .MuiFormControlLabel-label": {
                                        fontSize: 14,
                                        color: supply.includes(item.label)
                                            ? grey[900]
                                            : grey[600],
                                        fontWeight: supply.includes(item.label) ? 700 : 400,
                                    },
                                }}
                            />
                        ))}
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
