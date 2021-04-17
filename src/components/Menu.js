import React from 'react';
import MenuItem from './MenuItem';

const Menu = ({
  restaurantName,
  appetizers,
  entrees,
  desserts,
  itemsCount,
}) => {
  return (
    <div className='menu'>
      <h3>{restaurantName} </h3>
      <p>{`${itemsCount} items on the menu`}</p>
      {appetizers.length ? (
        <div>
          <h2>Appetizers</h2>
          {appetizers.map((app, index) => (
            <MenuItem item={app} key={index} list={'menu'} />
          ))}
        </div>
      ) : null}
      {entrees.length ? (
        <div>
          <h2>Entrees</h2>
          {entrees.map((entree, index) => (
            <MenuItem item={entree} key={index} list={'menu'} />
          ))}
        </div>
      ) : null}
      {desserts.length ? (
        <div>
          <h2>Desserts</h2>
          {desserts.map((dessert, index) => (
            <MenuItem item={dessert} key={index} list={'menu'} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(Menu);
