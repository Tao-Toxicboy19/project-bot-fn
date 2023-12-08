import { useTime, useTransform, motion } from "framer-motion";
import { SiProbot } from "react-icons/si";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { loginSelector } from "../../../store/slices/loginSlice";

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
    const loginReducer = useSelector(loginSelector)

    return (
        <nav className="bg-darkPrimary h-20">
            <div className="container mx-auto flex flex-row justify-between">
                <Logo />
                {loginReducer.result &&
                    <div className="my-auto">
                        <Avatar size={44} icon={<UserOutlined />} />
                    </div>
                }
            </div>
        </nav>
    )
}