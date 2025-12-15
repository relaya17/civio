import { Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface HelpTooltipProps {
  readonly title: string;
  readonly explanation: string;
}

export function HelpTooltip({ title, explanation }: HelpTooltipProps) {
  return (
    <Tooltip
      title={
        <div>
          <strong>{title}</strong>
          <br />
          {explanation}
        </div>
      }
      arrow
      placement="top"
    >
      <IconButton size="small" sx={{ p: 0.5, ml: 0.5 }}>
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
