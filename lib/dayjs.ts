import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

dayjs.extend(timezone);

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.tz.setDefault("America/Sao_Paulo");
dayjs.extend(updateLocale);

export const timeTo = (minutes: number) => {
  return dayjs(Date.now()).to(dayjs().add(minutes, "minutes"));
};
