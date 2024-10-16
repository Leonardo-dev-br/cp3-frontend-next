import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "../../context/UserContext"; // Ajuste o caminho conforme necessário

// Placeholder para o Layout e Header
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const Header = ({ title, userName }: { title: string; userName: string }) => (
  <header>
    <h1>{title}</h1>
    <p>Bem-vindo, {userName}</p>
  </header>
);

export default function Home() {
  const router = useRouter(); // Substitui o useLocation do react-router-dom
  const { userName } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityData, setCityData] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  const dateFormat = (data: string) => {
    return new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" });
  };

  const loadCity = async (cityCode: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}`
      );
      const data = await response.json();
      setCityData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadForecast = async (cityCode: number) => {
    const params = {
      code: cityCode,
      days: 6,
    };

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${params.code}/${params.days}`
      );

      const data = await response.json();
      setForecast(data.clima);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Verifica se existe algum estado passado via query params
    const cityCode = router.query.cityCode ? Number(router.query.cityCode) : 244;
    
    // Se cityCode não for passado, usa um valor padrão
    loadCity(cityCode);
    loadForecast(cityCode);
  }, [router.query.cityCode]); // Depende dos parâmetros da URL

  return (
    <Layout>
      <Header title="Inicio" userName={userName} />

      <div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <h2>
              {cityData?.cidade}/{cityData?.estado}
            </h2>
            <p>
              Min<span>{cityData?.clima[0].min}</span>/ Max
              <span>{cityData?.clima[0].max}</span>
            </p>
            <p>{cityData?.clima[0].condicao_desc}</p>
          </div>
        )}
      </div>
      <div>
        {forecast.map((item) => (
          <div key={item.data}>
            <span>{dateFormat(item.data)}</span>
            <span>{item.condicao}</span>
            <span>Min: {item.min}&#176;</span>
            <span>Max: {item.max}&#176;</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}
