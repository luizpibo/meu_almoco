import Link from "next/link"

const buttons = [
    { link: "/", text: "texto" },
    { link: "/", text: "texto" },
    { link: "/", text: "texto" },
    { link: "/", text: "texto" },
]

export default function NavBar() {
    return (
        <nav className="fixed w-full py-4 flex justify-between rounded-b-lg bg-white shadow-lg text-white">
            <div className="text-2xl">
                Logo
            </div>
            <div className="flex gap-4">
                {buttons.map((buttom, Index) => {
                    return (
                        <Link
                            id={`${Index}`}
                            href={buttom.link}
                            className="py-3 ">
                            {buttom.text}
                        </Link>
                    )
                })}
            </div>

        </nav>
    )
}
