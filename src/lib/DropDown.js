import React from 'react';
import './DropDown.css';

export default function DropDown({ options }) {
  const [isDropped, setDropped] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [ddOptions, setDDOptions] = React.useState(options);

  return (
    <div>
      <div
        style={{
          border: '1px solid lightgray',
          borderRadius: '0.3em',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '0.5rem',
            borderBottom: isDropped ? '1px solid lightgray' : 0,
            background: 'lightgray',
          }}
          onClick={e => {
            setDropped(true);
            e.currentTarget.contentEditable = true;
            setDDOptions(options);
          }}
          onInput={e => {
            if (e.currentTarget.innerText) {
              setDDOptions(filterOptions(options, e.currentTarget.innerText));
            }
          }}
          contentEditable={selectedOption ? false : isDropped ? true : false}
        >
          {selectedOption
            ? selectedOption
            : isDropped
            ? null
            : 'Select an Option'}
        </div>
        {isDropped ? (
          <div>
            {ddOptions.map(o => (
              <div
                onClick={e => {
                  setSelectedOption(e.currentTarget.innerText);
                  setDropped(false);
                }}
                className='options'
                key={btoa(Math.random() * Math.random() + '')}
              >
                {o}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function filterOptions(array = [], target) {
  const filteredArray = [];
  array.forEach(item =>
    item.includes(target) ? filteredArray.push(item) : null
  );

  return filteredArray;
}