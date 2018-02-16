export function GetLocalDateTime() {
  const dt = new Date();
  // tslint:disable:variable-name
  const current_date = dt.getDate();
  const current_month = dt.getMonth() + 1;
  const current_year = dt.getFullYear();
  const current_hrs = dt.getHours();
  const current_mins = dt.getMinutes();
  const current_secs = dt.getSeconds();

  // Add 0 before date, month, hrs, mins or secs if they are less than 0
  const current_date_str = current_date < 10 ? '0' + current_date : current_date;
  const current_month_str = current_month < 10 ? '0' + current_month : current_month;
  const current_hrs_str = current_hrs < 10 ? '0' + current_hrs : current_hrs;
  const current_mins_str = current_mins < 10 ? '0' + current_mins : current_mins;
  const current_secs_str = current_secs < 10 ? '0' + current_secs : current_secs;

  // Current datetime
  // String such as 2016-07-16T19:20:30
  return current_year + '-' + current_month_str + '-' + current_date_str + 'T' + current_hrs_str + ':' + current_mins_str + ':' + current_secs_str;
}
