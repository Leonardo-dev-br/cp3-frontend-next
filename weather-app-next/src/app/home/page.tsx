"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../app/components/layout/Layout";
import { useUserContext } from "../../context/UserContext";
import { Header } from "../components/header/Header";

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
  const router = useRouter();
  const { userName } = useUserContext(); // Usando o hook customizado
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityData, setCityData] = useState<ClimateData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);

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
    const cityCode = router.query.cityCode ? Number(router.query.cityCode) : 244;
    loadCity(cityCode);
    loadForecast(cityCode);
  }, [router.query]);

  return (
    <Layout>
      <Header title="Inicio" userName={userName} />

      <div>
        {isLoading ? (
          <p>Carregando</p>
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
