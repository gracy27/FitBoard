import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export function Header()
{
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

    useEffect(() => {
        const interval = setInterval(() => {
            const email = localStorage.getItem('userEmail');
            setUserEmail(email);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const initialName = userEmail && userEmail.length > 0 ? userEmail.charAt(0).toUpperCase() : '';
   
    const navigate = useNavigate();
    return(
    <>
    <div className="bg-black flex justify-between">
        <div className="text-pink-500">FitBoard</div>
        <div className="flex  gap-[2rem]">
            <span className="text-white cursor-pointer" onClick={() => navigate('/discover')}>Discover</span>
            <span className="text-white cursor-pointer" onClick={() => navigate('/wardrobe')}>Wardrobe</span>
            <span className="text-white">Moodboards</span>
        </div>
        <div>
            <span className="flex flex-col items-center w-6 h-6 bg-pink-200 rounded-full">{initialName}</span>
        </div>

    </div>
    
    </>
    )
}
