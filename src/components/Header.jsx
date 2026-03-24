import { useState, useEffect } from 'react';

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
   
    
    return(
    <>
    <div className="bg-black flex justify-between">
        <div className="text-pink-500">FitBoard</div>
        <div className="flex  gap-[2rem]">
            <span className="text-white">Discover</span>
            <span className="text-white" >Wardrobe</span>
            <span className="text-white">Moodboards</span>
        </div>
        <div>
            <span className="flex flex-col items-center w-6 h-6 bg-pink-200 rounded-full">{initialName}</span>
        </div>

    </div>
    
    </>
    )
}
