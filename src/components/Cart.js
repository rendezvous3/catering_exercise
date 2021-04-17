import React, { useContext } from 'react';
import { SelectedItemsContext } from '../App';

const Cart = () => {
  const selectedItemsContext = useContext(SelectedItemsContext);
  const { selectedItems, dispatch } = selectedItemsContext;

  const calcTotal = () => {
    const total = Object.keys(selectedItems).reduce(
      (acc, curr) => acc + selectedItems[curr].Price,
      0
    );
    return Math.round(total * 100) / 100;
  };

  return (
    <div className='Cart'>
      <h3>{`Items Selected (${Object.keys(selectedItems).length})`}</h3>
      <p>Total Price: ${calcTotal()}</p>
      {selectedItems && Object.keys(selectedItems).length ? (
        <div>
          <h2>Items</h2>
          {Object.keys(selectedItems).map((key, index) => (
            // <MenuItem item={selectedItems[key]} key={index} list={'cart'} />
            <div
              className={
                selectedItems[key].selected ? 'menu-item-selected' : 'menu-item'
              }
              key={selectedItems[key].idx}
            >
              <span>{`${selectedItems[key].Name}`}</span>{' '}
              <span>
                {`$${selectedItems[key].Price}`}{' '}
                <button
                  onClick={() =>
                    dispatch({
                      type: 'REMOVE',
                      payload: selectedItems[key].idx,
                    })
                  }
                >
                  Remove
                </button>
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
