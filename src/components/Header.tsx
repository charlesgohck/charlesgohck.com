import Link from "next/link"

export default function Header() {
    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-sm bg-base-100 rounded-box w-52">
                        <li><Link href="/">About</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                    </ul>
                </div>
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                    <li><Link href="/">About</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                </ul>
            </div>
        </div>
    )
}