import moment from 'moment';

const OpeTimeDetail = ({ ope }) => {
  const outputOpeObj = [];
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const sortOpeObj = (opeObjs, day) => {
    return opeObjs.find((opeObj) => {
      return opeObj.attributes.day === day;
    });
  };
  const sortedOpeObjs = days.map((day) => {
    return sortOpeObj(ope, day);
  });

  sortedOpeObjs.forEach((sortedOpeObj) => {
    if (sortedOpeObj) {
      let foundFlg = false;
      outputOpeObj.forEach((record) => {
        if (
          record.startTime === sortedOpeObj.attributes.startTime &&
          record.endTime === sortedOpeObj.attributes.endTime
        ) {
          record.days = [...record.days, sortedOpeObj.attributes.day];
          foundFlg = true;
        }
      });

      if (!foundFlg) {
        outputOpeObj.push({
          days: [sortedOpeObj.attributes.day],
          startTime: sortedOpeObj.attributes.startTime,
          endTime: sortedOpeObj.attributes.endTime
        });
      }
    }
  });
  const daysEngToThai = {
    mon: 'จันทร์',
    tue: 'อังคาร',
    wed: 'พุธ',
    thu: 'พฤหัส',
    fri: 'ศุกร์',
    sat: 'เสาร์',
    sun: 'อาทิตย์'
  };

  const Detail = ({ opeDay }) => {
    let dayStr = '';
    if (opeDay.days.length > 1) {
      dayStr =
        daysEngToThai[opeDay.days[0]] +
        ' - ' +
        daysEngToThai[opeDay.days[opeDay.days.length - 1]];
    } else {
      dayStr = daysEngToThai[opeDay.days[0]];
    }
    var startTimeStr = new moment(opeDay.startTime, 'HH:mm:ss').format('LT');
    var endTimeStr = new moment(opeDay.endTime, 'HH:mm:ss').format('LT');

    return (
      <>
        {opeDay ? (
          <li className="flex-column">
            <div className="text-xs font-kanit">{dayStr}</div>
            <div className="text-base font-kanit">
              {startTimeStr} - {endTimeStr}
            </div>
          </li>
        ) : (
          ''
        )}
      </>
    );
  };

  return (
    <div>
      <ul className="grid items-center content-center grid-cols-4 gap-4 ">
        {outputOpeObj.map((tmpObj, index) => {
          return <Detail key={index} opeDay={tmpObj} />;
        })}
      </ul>
    </div>
  );
};

export default OpeTimeDetail;
