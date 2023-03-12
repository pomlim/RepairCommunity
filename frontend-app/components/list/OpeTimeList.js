import moment from 'moment';

const getDayStrFromDate = (date) => {
  return date.toLocaleString('en-us', { weekday: 'short' }).toLowerCase();
};

const getTimeStrFromDate = (date) => {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const getOpeTimeText = (operatedTimes) => {
  const today = new Date();
  const todayDay = getDayStrFromDate(today);
  const curTime = getTimeStrFromDate(today);

  const todayOpen = operatedTimes.find(
    (operatedTime) => operatedTime.attributes.day === todayDay
  );

  if (
    todayOpen &&
    todayOpen.attributes.startTime <= curTime &&
    todayOpen.attributes.endTime > curTime
  ) {
    var endTime = new moment(
      todayOpen.attributes.endTime,
      'HH:mm:ss'
    ).format('LT');

    return `เปิดอยู่ ปิด ${endTime}`;
  }

  // today not found or already close
  let orderedDayInWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const todayIndex = orderedDayInWeek.findIndex((day) => day === todayDay);
  if (todayIndex !== orderedDayInWeek.length - 1) {
    orderedDayInWeek = [
      ...orderedDayInWeek.slice(todayIndex + 1),
      ...orderedDayInWeek.slice(0, todayIndex + 1)
    ];
  }

  let outputText = '';
  orderedDayInWeek.every((day) => {
    const foundDay = operatedTimes.find(
      (operatedTime) => operatedTime.attributes.day === day
    );
    if (foundDay) {
      var startTime = new moment(
        foundDay.attributes.startTime,
        'HH:mm:ss'
      ).format('LT');
      outputText = `ปิดอยู่ เปิด ${startTime}`;
      return false;
    }
    return true;
  });
  return outputText;
};

const OpeTimeList = (ope) => {
  return ope ? getOpeTimeText(ope) : 'ไม่ระบุ';
};

export default OpeTimeList;
