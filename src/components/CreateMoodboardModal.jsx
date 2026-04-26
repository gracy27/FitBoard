import { useState } from "react";

export default function CreateMoodboardModal({ isOpen, onClose, onCreate }) {
    const [moodboardName, setMoodboardName] = useState("");
    const [selectedColor, setSelectedColor] = useState("bg-rose-200");

    const colors = [
        { name: "Rose", value: "bg-rose-200" },
        { name: "Teal", value: "bg-teal-200" },
        { name: "Purple", value: "bg-purple-200" },
        { name: "Blue", value: "bg-blue-200" },
        { name: "Green", value: "bg-green-200" },
        { name: "Yellow", value: "bg-yellow-200" }
    ];

    const handleCreate = () => {
        if (moodboardName.trim()) {
            onCreate({
                title: moodboardName,
                color: selectedColor
            });
            setMoodboardName("");
            setSelectedColor("bg-rose-200");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleCreate();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#282828] rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-white text-xl font-semibold mb-4">Create New Moodboard</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                        Moodboard Name
                    </label>
                    <input
                        type="text"
                        value={moodboardName}
                        onChange={(e) => setMoodboardName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="e.g., Summer vibes"
                        className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-rose-500 focus:outline-none"
                        autoFocus
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                        Color
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {colors.map((color) => (
                            <button
                                key={color.value}
                                onClick={() => setSelectedColor(color.value)}
                                className={`${color.value} h-12 rounded-lg border-2 ${
                                    selectedColor === color.value
                                        ? "border-white"
                                        : "border-transparent"
                                } transition-all hover:opacity-80`}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={!moodboardName.trim()}
                        className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
