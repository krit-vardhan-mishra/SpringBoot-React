import { TbCircleDashed } from "react-icons/tb"

const ProfileUserDetails = () => {
    return (
        <div className="py-10 w-full">
            <div className="flex items-center">
                <div className="w-[15%]">
                    <img src="https://cdn.pixabay.com/photo/2024/10/18/10/37/shop-9130001_640.jpg" className="w-32 h-32 rounded-full" />
                </div>
                <div className="space-y-5">
                    <div className="flex space-x-10 items-center">
                        <p>username</p>
                        <button>Edit Profile</button>
                        <TbCircleDashed />
                    </div>
                    <div className="flex space-x-10">
                        <div>
                            <span className="font-semibold mr-2">10</span>
                            <span>posts</span>
                        </div>
                        <div>
                            <span className="font-semibold mr-2">5</span>
                            <span>follower</span>
                        </div>
                        <div>
                            <span className="font-semibold mr-2">7</span>
                            <span>following</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">Username</p>
                        <p className="font-thing text-sm">Bio: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit officia, voluptatem vero deserunt porro ex. Quia, incidunt officia? Id praesentium unde adipisci eius, sed ipsa tenetur, recusandae, deserunt ipsam dicta reprehenderit minima necessitatibus. Aliquam natus aspernatur alias esse sequi reprehenderit velit vero, beatae illo officia?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserDetails;