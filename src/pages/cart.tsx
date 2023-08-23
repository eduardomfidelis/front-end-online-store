function CartPage() {
  const getProductStorage = localStorage.getItem('carrinho');

  if (getProductStorage && JSON.parse(getProductStorage).length > 0) {
    const parseProducts = JSON.parse(getProductStorage);
    return (
      parseProducts.map((product: any) => (
        <div key={ product.id }>
          <p data-testid="shopping-cart-product-name">{ product.title}</p>
          <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
          <p>{product.quantity * product.price }</p>
        </div>
      ))
    );
  }
  return (
    <div className="shopping-cart">
      <h2>Carrinho de Compras</h2>
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    </div>
  );
}

export default CartPage;
