import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { AddCart } from '../services/StorageFunctions';

type PegaCategoria = {
  id: string,
  name: string,
};

type Produto = {
  id: string,
  thumbnail: string,
  title: string,
  price: number,

};

function Home() {
  const [categorias, setCategorias] = useState<PegaCategoria[]>([]);
  const [inputSearch, setInputSearch] = useState('');
  const [products, setProducts] = useState<Produto[]>([]);
  const [noResults, SetNoResults] = useState(false);

  useEffect(() => {
    const pegaApi = async () => {
      const data = await getCategories();
      setCategorias(data);
    };
    pegaApi();
  }, []);

  const handleSeachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const handleSearchButton = async () => {
    const data = await getProductsFromCategoryAndQuery('', inputSearch);

    if (data.results.length > 0) {
      setProducts(data.results);
      SetNoResults(false);
    } else {
      setProducts([]);
      SetNoResults(true);
    }
  };

  const handleCategoryClick = async (category: string) => {
    const infoProduct = await getProductsFromCategoryAndQuery(category as string);
    setProducts(infoProduct.results);
  };
  return (
    <div>
      {categorias.map((categoria) => (
        <label
          data-testid="category"
          key={ categoria.id }
          htmlFor={ categoria.id }
        >
          <input
            type="radio"
            name="category"
            id={ categoria.id }
            onClick={ () => handleCategoryClick(categoria.id) }
          />
          {categoria.name}
        </label>
      ))}
      <input
        type="text"
        data-testid="query-input"
        value={ inputSearch }
        onChange={ handleSeachChange }
      />
      <button
        data-testid="query-button"
        onClick={ handleSearchButton }
      >
        Buscar

      </button>

      <Link to="/carrinho" data-testid="shopping-cart-button">
        Ir para o Carrinho
      </Link>

      <p
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      {noResults ? (
        <span>Nenhum produto foi encontrado</span>
      ) : (
        <div>
          {products.map((product) => (
            <div key={ product.id } data-testid="product">
              <span>{ product.title }</span>
              <img src={ product.thumbnail } alt={ product.title } />
              <span>{ product.price }</span>
              <button
                data-testid="product-add-to-cart"
                onClick={ () => AddCart(product) }
              >
                Adicionar ao Carrinho

              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
