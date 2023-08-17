import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

type PegaCategoria = {
  id: string,
  name: string,
};

function Home() {
  const [categorias, setCategorias] = useState<PegaCategoria[]>([]);

  useEffect(() => {
    const pegaApi = async () => {
      const data = await getCategories();
      setCategorias(data);
    };
    pegaApi();
  }, []);
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
      <p
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    </div>
  );
}
export default Home;
