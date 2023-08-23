import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AddCart } from '../services/StorageFunctions';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navegate = useNavigate();
  console.log(id);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProductsDetails = async () => {
      const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchProductsDetails();
  }, [id]);

  const handleClick = () => {
    navegate('/carrinho');
  };

  if (!product) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <span data-testid="product-detail-name">{product.title}</span>
      <img
        data-testid="product-detail-image"
        src={ product.thumbnail }
        alt={ product.title }
      />
      <span data-testid="product-detail-price">{product.price}</span>

      <button
        data-testid="shopping-cart-button"
        onClick={ handleClick }
      >
        Ir para o carrinho
      </button>
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => AddCart(product) }
      >
        Adicionar ao carrinho

      </button>
    </div>
  );
}
export default ProductDetails;
