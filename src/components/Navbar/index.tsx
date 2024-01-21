
import Image from "next/image";
import Link from "next/link"
import Logo from "../../../public/logo.png";

const Navbar = () => {
  return (
    <header className="flex flex-row justify-around items-center py-4 px-2 sticky top-0 bg-white">
         <Link href="/">
          <Image src={Logo} alt="Logo" width={40} height={0} />
        </Link>

        <nav>
          <ul className="max-md:hidden font-bold flex flex-row items-center gap-6 text-lg text-blue-900">
            <li>
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
    </header>
  )
}
export default Navbar;