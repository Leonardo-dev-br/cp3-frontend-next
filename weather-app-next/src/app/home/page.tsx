"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "../../app/components/layout/Layout";
import { useUserContext } from "../../context/UserContext"; 
import { useVerifyLogin } from "../../helpers/useVerifyLogin";

interface ClimateData {
  cidade: string;
  estado: string;
  clima: {
    min: number;
    max: number;
    condicao_desc: string;
  }[];
}

interface ForecastItem {
  data: string;
  condicao: string;
  min: number;
  max: number;
}

export default function Home() {
  useVerifyLogin(); // Chama a verificação de login
  const router = useRouter();
  const { userName, cityCode } = useUserContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cityData, setCityData] = useState<ClimateData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);

  const dateFormat = (data: string) => {
    return new Date(data).toLocaleDateString("pt-br", { timeZone: "UTC" });
  };

  const loadCity = async (cityCode: number) => {
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
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}/6`
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
    const inicialCity = cityCode || 244; // Use cityCode do UserContext ou um valor padrão
    loadCity(inicialCity);
    loadForecast(inicialCity);
  }, [cityCode]);

  return (
    <Layout>
      <header>
        {/* Cabeçalho aqui */}
      </header>

      <div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : cityData ? (
          <div>
            <h2>
              {cityData.cidade}/{cityData.estado}
            </h2>
            <p>
              Min: <span>{cityData.clima[0].min}</span> / Max: 
              <span>{cityData.clima[0].max}</span>
            </p>
            <p>{cityData.clima[0].condicao_desc}</p>
          </div>
        ) : (
          <p>Dados da cidade não disponíveis.</p>
        )}
      </div>

      <div>
        {forecast.length > 0 ? (
          forecast.map((item) => (
            <div key={item.data}>
              <span>{dateFormat(item.data)}</span>
              <span>{item.condicao}</span>
              <span>Min: {item.min}&#176;</span>
              <span>Max: {item.max}&#176;</span>
            </div>
          ))
        ) : (
          <p>Previsão não disponível.</p>
        )}
      </div>
    </Layout>
  );
}
