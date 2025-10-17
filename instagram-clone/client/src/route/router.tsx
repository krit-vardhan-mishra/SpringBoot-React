import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home-page/home-page'
import SideBar from '../components/side-bar'
import CreatePage from '../pages/create-page/create-page'
import ExplorePage from '../pages/explore-page/explore-page'
import MessagePage from '../pages/message-page/message-page'
import NotificationsPage from '../pages/notifications-page/notifications-page'
import ProfilePage from '../pages/profile-page/profile-page'
import ReelsPage from '../pages/reels-page/reels-page'
import SearchPage from '../pages/search-page/search-page'

const Router = () => {
    return (
        <div>
            <div className='flex'>
                <div className='w-[20%] border border-slate-500'>
                    <SideBar />
                </div>
                <div className='w-full'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/explore' element={<ExplorePage />} />
                        <Route path='/messages' element={<MessagePage />} />
                        <Route path='/notifications' element={<NotificationsPage />} />
                        <Route path='/reels' element={<ReelsPage />} />
                        <Route path='/create' element={<CreatePage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/search' element={<SearchPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Router