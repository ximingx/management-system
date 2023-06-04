import { dayjs } from "element-plus";
import utc from "dayjs/plugin/utc";

export function formatUTC(utcString: string) {
  dayjs.extend(utc);
  return dayjs.utc(utcString).utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
}
