import Link from "next/link";


export default function Menu(){
    return(
        <>
            <nav>
                <ul>
                    <li><Link href="">Inicio</Link></li>
                    <li><Link href="">Busca</Link></li>
                    <li><Link href="">Favoritos</Link></li>
                    <li><Link href="">Perfil</Link></li>
                </ul>
            </nav>
        </>
    )
}