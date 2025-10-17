import ProfileUserDetails from "./profile-user-details";
import ReqUserPostPart from "./req-user-post-part";

const ProfilePage = () => {
  return (
    <div className="px-10">
      <div>
        <ProfileUserDetails />
      </div>
      <div>
        <ReqUserPostPart />
      </div>
    </div>
  )
}

export default ProfilePage;