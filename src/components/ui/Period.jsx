import React from 'react';
import { toIsoMonth } from '../../data/developerData';

// "Aug 2026 — present" with machine-readable <time datetime="2026-08"> on each known date.
const Period = ({ item }) => {
  const [startLabel, endLabel] = item.period.split(' — ');
  const start = toIsoMonth(item.start);
  const end = toIsoMonth(item.end);

  return (
    <>
      {start ? <time dateTime={start}>{startLabel}</time> : startLabel}
      {' — '}
      {end ? <time dateTime={end}>{endLabel}</time> : endLabel}
    </>
  );
};

export default Period;
