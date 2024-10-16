import Menu from "../components/menu/Menu"

interface Clima {
    data: string;        // Data da previsão
    condicao: string;    // Condição do clima (ex: 'c' para 'Chuva')
    condicao_desc: string; // Descrição da condição do clima
    min: number;         // Temperatura mínima
    max: number;         // Temperatura máxima
    indice_uv: number;   // Índice UV
}

interface Previsao {
    cidade: string;      // Nome da cidade
    estado: string;      // Sigla do estado
    atualizado_em: string; // Data de atualização
    clima: Clima[];      // Array de previsões
}



export default async function ClimaSP(){
    const cityCode = 244;
    const response = await fetch(`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}`);
   

    if(!response.ok){
        throw new Error('Erro ao buscar dados do clima');
    }

    const data: Previsao = await response.json();
    console.log(data);

    const {cidade, estado, clima} =  data;

    return(
        <>  
            <Menu/>
            <header>
                <h1>Inicio</h1>
            </header>
            <main>
                <h2>{`${cidade}/{${estado}`}</h2>
                {clima.map((cidade: Clima) =>(
                    <div key={cidade.data}>
                        <p>{cidade.condicao_desc}</p>
                        <p>Min {cidade.min}</p>
                        <p>Max {cidade.max}</p>
                        <p>{cidade.data}</p>
                    </div>
                ))}
            </main>
        </>
    );
}