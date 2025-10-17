
import { IoReorderThreeOutline } from "react-icons/io5"
import { AiOutlineHome, AiFillHome, AiOutlineSearch, AiOutlineCompass, AiFillCompass, AiOutlineMessage, AiFillMessage, AiOutlineHeart, AiFillHeart, AiOutlinePlusCircle, AiFillPlusCircle } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { RiVideoLine, RiVideoFill } from "react-icons/ri"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SideBar = () => {
    const menuIcons = [
        { title: 'Home', active: <AiFillHome size={30} className="text-2xl mr-5" />, icon: <AiOutlineHome size={30} className="text-2xl mr-5" /> },
        { title: 'Search', active: <AiOutlineSearch size={30} className="text-2xl mr-5" />, icon: <AiOutlineSearch size={30} className="text-2xl mr-5" /> },
        { title: 'Explore', active: <AiFillCompass size={30} className="text-2xl mr-5" />, icon: <AiOutlineCompass size={30} className="text-2xl mr-5" /> },
        { title: 'Messages', active: <AiFillMessage size={30} className="text-2xl mr-5" />, icon: <AiOutlineMessage size={30} className="text-2xl mr-5" /> },
        { title: 'Notifications', active: <AiFillHeart size={30} className="text-2xl mr-5" />, icon: <AiOutlineHeart size={30} className="text-2xl mr-5" /> },
        { title: 'Reels', active: <RiVideoFill size={30} className="text-2xl mr-5" />, icon: <RiVideoLine size={30} className="text-2xl mr-5" /> },
        { title: 'Create', active: <AiFillPlusCircle size={30} className="text-2xl mr-5" />, icon: <AiOutlinePlusCircle size={30} className="text-2xl mr-5" /> },
        { title: 'Profile', active: <CgProfile size={30} className="text-2xl mr-5" />, icon: <CgProfile size={30} className="text-2xl mr-5" /> },
    ]

    const [activeTab, setActiveTab] = useState<string>('Home');
    const navigate = useNavigate();

    const handleTabClick = (title: string) => () => {
        setActiveTab(title)
        navigate(`/${title.toLowerCase()}`)
    }

    return (
        <div className="sticky top-0 ml-5 h-[100vh]">
            <div className="flex flex-col justify-between h-full px-10">
                <div>
                    <div className="pt-10">
                        <img src='https://i.imgur.com/zqpwkLQ.png' alt='instagram-text' className='w-40' />
                    </div>
                    <div className="mt-10">
                        {menuIcons.map(({ title, icon, active }) => (
                            <div onClick={handleTabClick(title)} className="flex items-center mb-5 cursor-pointer text-lg">
                                {activeTab === title ? active : icon}
                                <p className={activeTab === title ? 'font-bold' : 'font-semibold'}>{title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center cursor-pointer pb-10">
                    <IoReorderThreeOutline size={30} />
                    <p className="ml-5">More</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar