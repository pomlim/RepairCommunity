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
    return `เปิดอยู่ ปิด ${curOpes.attributes.endTime}`;
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
      outputText = `ปิดอยู่ เปิด ${foundDay.attributes.day} ${foundDay.attributes.startTime}`;
      return false;
    }
    return true;
  });
  return outputText;
};

const OpeTimeList = ({ ope }) => {
  return (
    <div>
      <ul>{ope ? getOpeTimeText(ope) : 'ไม่ระบุ'}</ul>
    </div>
  );
};

export default OpeTimeList;
