

export default async function BuscacityCodeParams({params: {cityCode}}){
    const response = await fetch(`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${cityCode}`);

    console.log(response)
    
    return(
        <div>
            {/* <Menu /> */}
            <h1>Busca com parametros</h1>
            <p>Resultado da busca pelo cityCode: {cityCode}</p>
        </div>
    )
}