const OpeTimeList = ({ ope }) => {
  const curDate = new Date();
  const nextDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const nextDayStr = nextDate
    .toLocaleString('en-us', { weekday: 'short' })
    .toLowerCase();
  const curDayStr = curDate
    .toLocaleString('en-us', { weekday: 'short' })
    .toLowerCase();
  const curTime = `${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}`;

  const OutputOpeTime = ({ foundOpeTimeObj }) => {
    if (foundOpeTimeObj.length !== 0) {
      const curOpes = foundOpeTimeObj.find(
        (curOpe) => curOpe.attributes.day === curDayStr
      );
      if (
        curOpes.attributes.startTime <= curTime &&
        curOpes.attributes.endTime > curTime
      ) {
        return `เปิดอยู่ ปิด ${curOpes.attributes.endTime}`;
      } else {
        const nextOpes = foundOpeTimeObj.find(
          (nextOpe) => nextOpe.attributes.day === nextDayStr
        );
        return `ปิดอยู่ เปิด ${nextOpes.attributes.startTime}`;
      }
    } else {
      return 'ไม่ระบุ';
    }
  };

  return (
    <div>
      <ui>
        <OutputOpeTime foundOpeTimeObj={ope} />
      </ui>
    </div>
  );
};

export default OpeTimeList;