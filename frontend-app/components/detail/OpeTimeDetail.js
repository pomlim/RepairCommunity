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
        if (record.startTime === sortedOpeObj.attributes.startTime) {
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

  const Detail = ({ opeDay }) => {
    let dayStr = '';
    if (opeDay.days.length > 1) {
      dayStr = opeDay.days[0] + '-' + opeDay.days.at(-1);
    } else {
      dayStr = opeDay.days[0];
    }
    return (
      <>
        {opeDay ? (
          <li>
            <div>{dayStr}</div>
            <div>{opeDay.startTime}</div>
            <div>{opeDay.endTime}</div>
          </li>
        ) : (
          ''
        )}
      </>
    );
  };

  return (
    <div>
      <ul>
        {outputOpeObj.map((tmpObj, index) => {
          return <Detail key={index} opeDay={tmpObj} />;
        })}
      </ul>
    </div>
  );
};

export default OpeTimeDetail;
