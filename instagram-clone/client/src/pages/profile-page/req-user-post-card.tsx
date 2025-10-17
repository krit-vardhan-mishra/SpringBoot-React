import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import './req-user-post-card.css';

const ReqUserPostCard = () => {
  return (
    <div className="p-2">
        <div className="post w-60 h-60">
            <img className="cursor-pointer" src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="post image" />
            <div className="overlay">
                <div className="overlay-text flex justify-between">
                    <div>
                        <AiFillHeart /> <span>100</span>
                    </div>
                    <div><FaComment /> <span>50</span></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReqUserPostCard;

