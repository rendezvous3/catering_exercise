import React, { useContext, useMemo } from 'react';
import { SelectedItemsContext } from '../App';

const MenuItem = ({ item, list }) => {
  const selectedItemsContext = useContext(SelectedItemsContext);
  const { selectedItems, dispatch } = selectedItemsContext;
  const handleClick = (item) => {
    let payload = {};
    payload[item.idx] = item;
    let action = {
      type: 'ADD',
      payload,
    };
    if (list === 'cart')
      action = {
        type: 'REMOVE',
        payload: item.idx,
      };
    dispatch(action);
  };

  let selected = false;
  if (selectedItems[item.idx]) selected = true;

  const ItemMemoized = useMemo(() => {
    return item ? (
      <div className={selected ? 'menu-item-selected' : 'menu-item'}>
        <span>{`${item.Name}`}</span>{' '}
        <span>
          {`$${item.Price}`}{' '}
          {list === 'menu' ? (
            <button onClick={() => handleClick(item, list)} disabled={selected}>
              {item.selected ? 'Added' : 'Add'}
            </button>
          ) : (
            <button onClick={() => handleClick(item, list)}>Remove</button>
          )}
        </span>
      </div>
    ) : null;
  }, [selected]);

  return <React.Fragment>{ItemMemoized}</React.Fragment>;
};

export default MenuItem;
