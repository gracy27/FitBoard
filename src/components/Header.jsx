import { useState, useEffect } from 'react';
import { logout } from '../utils/Logout';
import { useNavigate } from 'react-router-dom';
export function Header() {
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
    const[userName, setUserName] = useState(localStorage.getItem('userName'));
    const navigate = useNavigate();

    useEffect(() => {
       
        const handleStorageChange = () => {
            const email = localStorage.getItem('userEmail');
            setUserEmail(email);
            const name = localStorage.getItem('userName');
            setUserName(name);
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
                        
    const initialName = userName  &&  userName!=='null' ? userName.charAt(0).toUpperCase() : userEmail.charAt(0).toUpperCase() ;
    // something ? value : value1
    return (
        <header className="bg-[#0a0a0a] border-b border-gray-800 py-4 px-6 mb-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                        FitBoard
                    </span>
                </div>

                <nav className="flex gap-8 items-center">
                    <span onClick={() => navigate('/discover')} className="text-gray-300 text-sm hover:text-rose-400 transition-colors cursor-pointer font-medium">
                        Discover
                    </span>
                    <span onClick={() => navigate('/wardrobe')} className="text-gray-300 text-sm hover:text-rose-400 transition-colors cursor-pointer font-medium">
                        Wardrobe
                    </span>
                    <span  className="text-gray-300 text-sm hover:text-rose-400 transition-colors cursor-pointer font-medium">
                        Moodboards
                    </span>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full text-white font-semibold text-sm hover:shadow-lg hover:shadow-pink-500/50 transition-all cursor-pointer">
                        {initialName}
                    </div>
                    <button
                        onClick={() => logout(navigate)}
                        className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-transparent text-gray-300 border border-gray-600 hover:border-rose-400 hover:text-rose-400"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
