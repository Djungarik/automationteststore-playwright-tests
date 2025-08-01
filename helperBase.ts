export class HelperBase {
  getTodaysDateWithCurrentTime() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const currentTime = `${hours}${minutes}${seconds}`;

    const todaysDateAndTime = `${year}${month}${day}${currentTime}`;

    return todaysDateAndTime;
  }

  getEmailWithTodaysDateAndTime(baseEmail: string, additionalText?: string) {
    const todaysDateAndTime = this.getTodaysDateWithCurrentTime();
    const [prefix, domain] = baseEmail.split("@");
    const email = additionalText
      ? `${todaysDateAndTime}_${additionalText}_${prefix}@${domain}`
      : `${todaysDateAndTime}_${prefix}@${domain}`;

    return email;
  }
}
