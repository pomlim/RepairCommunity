const OpeTimeDetail = ({ ope }) => {
  const listObj = [];
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const sortOpe = (opeObjs, day) => {
    return opeObjs.find((e) => {
      return e.attributes.day === day;
    });
  };
  const allObjs = days.map((day) => {
    return sortOpe(ope, day);
  });

  allObjs.forEach((element) => {
    if (element) {
      let found = false;
      listObj.forEach((record) => {
        if (record.startTime === element.attributes.startTime) {
          record.days = [...record.days, element.attributes.day];
          found = true;
        }
      });

      if (!found) {
        listObj.push({
          days: [element.attributes.day],
          startTime: element.attributes.startTime,
          endTime: element.attributes.endTime
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
      <ui>
        {listObj.map((tmpObj, index) => {
          return <Detail key={index} opeDay={tmpObj} />;
        })}
      </ui>
    </div>
  );
};

export default OpeTimeDetail;
