import { motion } from "framer-motion";
import HeroImage from "../../../assets/images/hero.jpg"
import { FaArrowRight } from "react-icons/fa";

type Props = {}

export default function HeroPage({ }: Props) {
    return (
        <div className="container mx-auto flex flex-col">
            <div className="flex justify-center mt-20">
                <div className="w-2/5">
                    <div className="w-4/5 h-full mx-auto flex items-center">
                        <div className="flex flex-col gap-y-5">
                            <span className="text-2xl font-semibold tracking-wide">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, facere perspiciatis! Aut blanditiis eius, eveniet exercitationem officia neque reiciendis. Tempora.
                            </span>
                            <div className="my-auto">
                                <button
                                >
                                    <motion.div
                                        className="bg-primaryText text-text hover:bg-divider hover:text-primaryText rounded-2xl flex my-auto px-5 pb-2 pt-1.5 text-xl group"
                                        initial={{ scale: 0 }}
                                        animate={{ rotate: 360, scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 1,
                                        }}
                                    >
                                        GET STARTED
                                        <span className="my-auto pl-2 text-lg pt-1 transition-transform group-hover:translate-x-3 duration-300 ">
                                            <FaArrowRight />
                                        </span>
                                    </motion.div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end w-3/5">
                    <img
                        src={HeroImage}
                        alt="hero"
                    />
                </div>
            </div>
        </div>
    )
}