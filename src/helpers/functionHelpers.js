import { useMediaQuery } from "@material-ui/core";
import esLocale from "date-fns/locale/es";
import { format } from "date-fns";

<<<<<<< HEAD
export default IsDesktopHandler = (size) => {
=======
const IsDesktopHandler = (size) => {
>>>>>>> 9b5fb64f28bc29ae436c76e160f3a031eb9e288c
    let media = null;

    switch (size) {
        case "sm":
            media = "(min-width: 576px)";
            break;
        case "md":
            media = "(min-width: 768px)";
            break;
        case "lg":
            media = "(min-width: 992px)";
            break;
        case "xl":
            media = "(min-width: 1200px)";
            break;
        default:
            media = "(min-width: 992px)";
    }

    const matches = useMediaQuery(media, {
        defaultMatches: true,
    });

    return matches;
};

export default IsDesktopHandler;
