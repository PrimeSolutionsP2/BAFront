import Image from 'next/image'
import logo from '../public/images/baLogo.webp'

export default function Header(){
    return(
        <header className="bg-white shadow">
            <Image src={logo} alt="baLogo" />
        </header>
    )
}