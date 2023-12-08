import { useTime, useTransform, motion } from "framer-motion";
import { SiProbot } from "react-icons/si";
import { Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { loginSelector, logout } from "../../../store/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { GoStack } from "react-icons/go";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { useAppDispatch } from "../../../store/store";

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
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link
                    to='/order'
                    rel="noopener noreferrer"
                    className="flex flex-row gap-x-3"
                >
                    <span className="my-auto pt-0.5">
                        <GoStack />
                    </span>
                    order
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link
                    to='/profile'
                    rel="noopener noreferrer"
                    className="flex flex-row gap-x-3"
                >
                    <span className="my-auto pt-0.5">
                        <GiPlagueDoctorProfile />
                    </span>
                    profile
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <span
                    onClick={() => dispatch(logout(navigate))}
                    className="flex flex-row gap-x-3"
                >
                    <div className="my-auto pt-0.5">
                        <IoLogOutOutline />
                    </div>
                    logout
                </span>
            ),
        },
    ]

    return (
        <nav className="bg-darkPrimary h-20">
            <div className="container mx-auto flex flex-row justify-between">
                <div
                    className="cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <Logo />
                </div>
                {loginReducer.result &&
                    <div className="my-auto">
                        <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                            <Avatar size={44} icon={<UserOutlined />} />
                        </Dropdown>
                    </div>
                }
            </div>
        </nav>
    )
}