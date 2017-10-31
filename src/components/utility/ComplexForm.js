import React from 'react';
import Location from './Location';

const ComplexForm = ({ handleSumbit, handleChange, handleLocationChange, handleAutocomplete, data, addLocation }) => {
  return (
    <form onSubmit={handleSumbit}>
      <input name="title" value={data.title} placeholder="title" onChange={handleChange} />
      {data.locations.map((location, i) =>
        <Location
          key={i}
          {...location}
          index={i}
          handleLocationChange={handleLocationChange}
          handleAutocomplete={handleAutocomplete}
        />)}
      <button type="button" onClick={addLocation}>+</button>
    </form>
  );
};

export default ComplexForm;
