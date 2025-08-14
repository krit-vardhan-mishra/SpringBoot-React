import { ToastContainer, Bounce } from 'react-toastify';

function ToastWrapper() {
    const getCurrentTheme = () => {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    };

    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={getCurrentTheme()}
            transition={Bounce}
        />
    );
}

export default ToastWrapper;;