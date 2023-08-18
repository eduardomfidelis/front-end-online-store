import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

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
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=&q=${inputSearch}`);
    const data = await response.json();

    if (data.results.length > 0) {
      setProducts(data.results);
      SetNoResults(false);
    } else {
      setProducts([]);
      SetNoResults(true);
    }
  };
  return (
    <div>
      { categorias.map((categoria) => (
        <label
          data-testid="category"
          key={ categoria.id }
          htmlFor=""
        >
          <input
            type="radio"
          />
          { categoria.name }
        </label>
      )) }
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
              <img src={ product.thumbnail } alt={ product.title } />
              <span>{product.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
