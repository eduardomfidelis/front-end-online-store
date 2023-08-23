export const AddCart = (product: any) => {
  const itemCart = localStorage.getItem('carrinho');

  if (itemCart) {
    const parseCartItem = JSON.parse(itemCart);
    const acharCartItem = parseCartItem.find((item: any) => item.id === product.id);
    const indexOfCartItem = parseCartItem.indexOf((item: any) => item.id === product.id);

    if (acharCartItem) {
      acharCartItem.quantity += 1;
      parseCartItem[indexOfCartItem] = acharCartItem;
      localStorage.setItem('carrinho', JSON.stringify(parseCartItem));
    } else {
      product.quantity = 1;
      parseCartItem.push(product);
      localStorage.setItem('carrinho', JSON.stringify(parseCartItem));
    }
  } else {
    product.quantity = 1;
    localStorage.setItem('carrinho', JSON.stringify([product]));
  }
};
