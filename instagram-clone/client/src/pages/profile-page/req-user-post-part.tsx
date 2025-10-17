import { useState } from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { RiVideoAddLine } from "react-icons/ri";
import ReqUserPostCard from "./req-user-post-card";

const ReqUserPostPart = () => {

    const [activeTab, setActiveTab] = useState<string>("Post");


    const tabs = [
        { tab: "Post", icon: <AiOutlineTable />, activeTab: "" },
        { tab: "Reels", icon: <RiVideoAddLine />, activeTab: "" },
        { tab: "Saved", icon: <BiBookmark />, activeTab: "" },
        { tab: "Tagged", icon: <AiOutlineUser />, activeTab: "" },
    ]

    return (
        <div>
            <div className="flex space-x-14 border-t relative">
                {tabs.map(({ tab, icon }) =>
                    <div onClick={() => setActiveTab(tab)} className={`flex items-center cursor-pointer py-2 text-sm ${activeTab === tab ? "border-t border-black" : "opacity-60"}`}>
                        <p>{icon}</p>
                        <p className="ml-1">{tab}</p>
                    </div>
                )}
            </div>
            <div>
                <div className="flex flex-wrap">
                    {[1,1,1,1,1].map((item) => <ReqUserPostCard key={item} />)}
                </div>
            </div>
        </div>
    )
}

export default ReqUserPostPart;