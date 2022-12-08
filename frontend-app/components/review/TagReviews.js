import React from 'react';

const TagReviews = ({ reviewTags, handleTagClicked }) => {
  const checkValue = (e) => {
    handleTagClicked(parseInt(e.target.value), e.target.checked);
  };

  return (
    <ul className="reviewTag-list">
      {reviewTags.map((tag, index) => {
        return (
          <li key={index}>
            <div className="toppings-list-item">
              <div className="left-section">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={tag.attributes.name}
                  value={tag.id}
                  checked={tag.selected}
                  onChange={checkValue}
                />
                <label> {tag.attributes.name}</label>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TagReviews;
