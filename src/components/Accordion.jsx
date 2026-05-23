
import { useState } from "react";
import { useSelector } from "react-redux";
import State from "../store/store";
export default function Accordion({ moodboards, onCreateClick }) {
    const [openBoardId, setOpenBoardId] = useState(null);
    const looks = useSelector(state => state.moodboards.looks);
    const toggleAccordion = (boardId) => {
        setOpenBoardId(openBoardId === boardId ? null : boardId);
    };

    return (
        <>
            <div className="space-y-4 mb-8">
                {moodboards.map((board) => (
                    <div key={board.id}>
                        <div className="flex items-center justify-between bg-[#282828] rounded-lg p-4 hover:bg-[#333333] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`${board.color} w-16 h-16 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600`}>
                                    {board.photos && board.photos.length > 0 ? (
                                        <img 
                                            src={board.photos[0].urls.small} 
                                            alt="board"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        "img"
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">{board.title}</h3>
                                    <p className="text-gray-400 text-sm">{looks} looks</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => toggleAccordion(board.id)}
                                className="text-rose-500 border border-rose-500 px-5 py-1 rounded-full text-sm font-medium hover:bg-rose-500 hover:text-white transition-colors"
                            >
                                View
                            </button>
                        </div>
                        
                        {openBoardId === board.id && (
                            <div className="bg-[#1a1a1a] p-4 rounded-b-lg border-t border-[#3a3a3a]">
                                {board.photos && board.photos.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-4">
                                        {board.photos.map((photo) => (
                                            <div key={photo.id} className="rounded-lg overflow-hidden">
                                                <img 
                                                    src={photo.urls.small} 
                                                    alt={photo.alt_description}
                                                    className="w-full h-40 object-cover hover:scale-105 transition-transform"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">No looks in this moodboard yet</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* <div 
                onClick={onCreateClick}
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer"
            >
                <p className="text-gray-400">+ Create a new moodboard</p>
            </div> */}
        </>
    )
}