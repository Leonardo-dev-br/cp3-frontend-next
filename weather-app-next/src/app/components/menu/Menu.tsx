import Link from "next/link";


export const Menu = () => {
    return(
        <>
            <nav>
                <ul>
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/search-weather">Busca</Link></li>
                    <li><Link href="/favorites">Favoritos</Link></li>
                    <li><Link href="/profile">Perfil</Link></li>
                </ul>
            </nav>
        </>
    );
};