import { useTime, useTransform, motion } from "framer-motion";
import { SiProbot } from "react-icons/si";
import { FaArrowRight } from "react-icons/fa";

function Logo() {
    const time = useTime();
    const rotate = useTransform(time, [0, 50000], [0, 360], { clamp: false });
    return (
        <div className="flex flex-row gap-x-5">
            <div className="py-2">
                <motion.div style={{ rotate }} className="w-16 h-16 bg-red-200 rounded-xl flex justify-center items-center bg-accent">
                    <div className='text-5xl text-text'>
                        <SiProbot />
                    </div>
                </motion.div>
            </div>
            <div className="my-auto">
                <span className="text-3xl font-bold text-text tracking-widest">Bot Trade</span>
            </div>
        </div>
    )
}


type Props = {}

export default function Header({ }: Props) {

    return (
        <nav className="bg-darkPrimary h-20">
            <div className="container mx-auto flex flex-row justify-between">
                <Logo />

                <div className="my-auto">
                    {/* <button className="bg-primaryText text-text rounded-2xl font-bold flex my-auto px-5 pb-2 pt-1.5 text-lg hover:bg-divider duration-200 hover:text-primaryText group">
                        LOGIN
                        <span className="my-auto pl-2 text-lg transition-transform group-hover:translate-x-3 duration-300 ">
                            <FaArrowRight />
                        </span>
                    </button> */}
                </div>
            </div>
        </nav>
    )
}