import { useMediaQuery } from "@material-ui/core";
import esLocale from "date-fns/locale/es";
import { format } from "date-fns";

const IsDesktopHandler = (size) => {
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

const dateFormatIso8601 = (date) => {
    const dateFormat = new Date(date).toISOString();
    const dateNewFormat = dateFormat.substring(0, 10);
    const [yy, mm, dd] = dateNewFormat.split(/-/g);
    return `${yy}-${mm}-${dd}`;
};

export { IsDesktopHandler, dateFormatIso8601 };
