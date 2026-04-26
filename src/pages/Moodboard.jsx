import { useState,useEffect } from "react";
import { Header } from "../components/Header";
import Accordion from "../components/Accordion";
import CreateMoodboardModal from "../components/CreateMoodboardModal";

export default function Moodboard({ moodboards, setMoodboards })
{
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateMoodboard = (newMoodboard) => {
        const newId = Math.max(...moodboards.map(b => b.id), 0) + 1;  
        console.log(newId)
        setMoodboards([
            ...moodboards,
            {
                id: newId,
                title: newMoodboard.title,
                looks: 0,
                photos: [],
                color: newMoodboard.color
            }
        ]);
        setIsModalOpen(false);
    };

    return(
       
        <>
             <div className="min-h-screen bg-[#141414] font-sans">   
             <Header/> 
             <section className="px-8 mt-8">
                 <div className="flex flex-row items-center justify-between mb-8">
                     <h1 className="text-white text-2xl font-semibold">My moodboards</h1>
                     <button 
                         onClick={() => setIsModalOpen(true)}
                         className="bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-rose-600 transition-colors"
                     >
                         + New board
                     </button>
                 </div>
                 <Accordion 
                     moodboards={moodboards}
                     onCreateClick={() => setIsModalOpen(true)}
                 />
             </section>

           </div>
           <CreateMoodboardModal 
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               onCreate={(newMoodboard) => handleCreateMoodboard(newMoodboard)}
           />
        </>
    )
}





