import { Stack, TextField, Divider, Button, Box, IconButton  } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { FaCode } from "react-icons/fa6";
import { PiCodeBlock } from "react-icons/pi";
import { IoText } from "react-icons/io5";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import { LuTerminalSquare } from "react-icons/lu";
import AddIcon from "@mui/icons-material/Add";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const MessageInput = ({ newMessage, setNewMessage}) => {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: "16px",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "white",
        }}
      >
        <IconButton
          onClick={() => setOpenAddUserPopup(true)}
          sx={{ marginRight: "10px"  }}
        >
          <AddIcon />
        </IconButton>

        <Stack
          sx={{
            width: "100%",
            borderRadius: "10px",
            border: isInputFocus
              ? "1px rgba(0,0,0,0.2) solid"
              : "1px rgba(0,0,0,0.1) solid",
            overflow: "hidden",
            backgroundColor: "white",
          }}
          direction={"column"}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        >
          <Stack
            id="edit_text-box-text_formating-tools"
            direction={"row"}
            gap={1.5}
            justifyContent={"flex-start"}
            alignItems={"center"}
            sx={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            height={"40px"}
            padding={"0 10px"}
          >
            <FormatBoldIcon sx={iconStyles(isInputFocus)} />
            <FormatItalicIcon sx={iconStyles(isInputFocus)} />
            <StrikethroughSIcon sx={iconStyles(isInputFocus)} />
            <Divider orientation="vertical" variant="middle" flexItem />
            <InsertLinkIcon sx={iconStyles(isInputFocus)} />
            <Divider orientation="vertical" flexItem variant="middle" />
            <FormatListNumberedIcon sx={iconStyles(isInputFocus)} />
            <FormatListBulletedIcon sx={iconStyles(isInputFocus)} />
            <Divider orientation="vertical" flexItem variant="middle" />
            <ViewHeadlineIcon sx={iconStyles(isInputFocus)} />
            <Divider orientation="vertical" flexItem variant="middle" />
            <FaCode color={iconColor(isInputFocus)} fontSize={"18px"} />
            <PiCodeBlock color={iconColor(isInputFocus)} fontSize={"18px"} />
          </Stack>

          <TextField
            variant="outlined"
            value={newMessage}
            sx={textFieldStyles}
            onKeyDown={handleKeyPress}
            multiline
            maxRows={22}
            minRows={1}
            autoComplete="off"
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            height={"37px"}
            padding={0.6}
            alignItems={"center"}
          >
            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} gap={0.5}>
              {[
                { icon: <AddIcon sx={{ fontSize: "18px" }} />, id: "add" },
                { icon: <IoText fontSize={"30px"} />, id: "text" },
                { icon: <SentimentSatisfiedAltIcon sx={{ fontSize: "18px" }} />, id: "emoji" },
                { icon: <AlternateEmailIcon sx={{ fontSize: "18px" }} />, id: "email" },
                { icon: <VideocamOutlinedIcon sx={{ fontSize: "21px" }} />, id: "video" },
                { icon: <KeyboardVoiceOutlinedIcon sx={{ fontSize: "20px" }} />, id: "voice" },
                { icon: <LuTerminalSquare sx={{ fontSize: "21px" }} />, id: "terminal" },
              ].map((item) => (
                <Button
                  key={item.id}
                  sx={buttonStyles}
                >
                  {item.icon}
                </Button>
              ))}
            </Stack>
            <Button
              onClick={handleSendMessage}
              sx={{
                ...buttonStyles,
                backgroundColor: "rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.2)",
                },
              }}
            >
              <SendRoundedIcon sx={{ fontSize: "18px" }} />
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

// Helper styles
const iconStyles = (isInputFocus) => ({
  color: isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)",
  fontSize: "21px",
});

const iconColor = (isInputFocus) => (isInputFocus ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)");

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    fontSize: "15px",
    fontFamily: "lato",
    color: "rgba(0,0,0,0.6)",
    padding: "0 15px",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(0,0,0,0.8)",
    fontFamily: "lato",
    fontWeight: 400,
    fontSize: "15px",
  },
  minHeight: "40px",
  overflow: "auto",
};

const buttonStyles = {
  textTransform: "none",
  color: "rgba(0,0,0,0.45)",
  borderRadius: "8px",
  height: "30px",
  width: "30px",
  minWidth: "30px",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
};

export default MessageInput;
