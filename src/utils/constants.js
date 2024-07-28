import {
  gifIcon,
  imageIcon,
  messageIcon,
  videoIcon,
  textIcon,
  hashtagIcon,
  atTheRateIcon,
  phoneIcon,
  dateIcon,
  ratingIcon,
  buttonIcon,
} from "../assets/icons";

const BASE_URI = "https://form-bot-backend.onrender.com/api/v1";
const TOKEN = localStorage.getItem("token");
const BUBBLE_TYPES = [
  {
    icon: messageIcon,
    label: "Text",
    type: "bubble_text",
  },
  {
    icon: imageIcon,
    label: "Image",
    type: "image",
  },
  {
    icon: videoIcon,
    label: "Video",
    type: "video",
  },
  {
    icon: gifIcon,
    label: "GIF",
    type: "gif",
  },
];

const INPUT_TYPES = [
  {
    icon: textIcon,
    label: "Text",
    type: "input_text",
  },
  {
    icon: hashtagIcon,
    label: "Number",
    type: "number",
  },
  {
    icon: atTheRateIcon,
    label: "Email",
    type: "email",
  },
  {
    icon: phoneIcon,
    label: "Phone",
    type: "phone",
  },
  {
    icon: dateIcon,
    label: "Date",
    type: "date",
  },
  {
    icon: ratingIcon,
    label: "Rating",
    type: "rating",
  },
  {
    icon: buttonIcon,
    label: "Button",
    type: "button",
  },
];

const THEME_OPTIONS = ["Light", "Dark", "Teal"];

export { BASE_URI, TOKEN, BUBBLE_TYPES, INPUT_TYPES, THEME_OPTIONS };
