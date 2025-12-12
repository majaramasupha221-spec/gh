"use client";

import { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleUpdate = () => {
        if (editText.trim()) {
            onUpdate(todo._id, { text: editText });
            setIsEditing(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        } else if (e.key === 'Escape') {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    const toggleComplete = () => {
        onUpdate(todo._id, { completed: !todo.completed });
    };

    return (
        <div className={`group relative bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#2A428C]/10 overflow-hidden ${todo.completed ? 'opacity-75 bg-slate-50' : ''
            }`}>
            {/* Colored accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 transition-all duration-300 ${todo.completed
                    ? 'bg-[#10B981]' // Green for completed
                    : 'bg-[#FFEF4D]' // Sandy Yellow for active
                }`}></div>

            <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 pl-4 sm:pl-6">
                {/* Custom Checkbox - Touch optimized */}
                <button
                    onClick={toggleComplete}
                    className="flex-shrink-0 relative touch-manipulation"
                    aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                    <div className={`w-8 h-8 sm:w-7 sm:h-7 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${todo.completed
                            ? 'bg-[#10B981] border-[#10B981] scale-110'
                            : 'border-[#2A428C]/30 hover:border-[#FFEF4D] active:scale-110 bg-white'
                        }`}>
                        {todo.completed && (
                            <svg className="w-5 h-5 sm:w-5 sm:h-5 text-white animate-scaleIn" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                </button>

                {/* Task Text */}
                <div className="flex-1 min-w-0">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onBlur={handleUpdate}
                            className="w-full px-3 py-2.5 sm:py-2 text-base sm:text-lg font-bold text-[#2A428C] bg-[#FFEF4D]/10 border-2 border-[#FFEF4D] rounded-xl focus:outline-none transition-colors"
                            autoFocus
                        />
                    ) : (
                        <p
                            onClick={() => !todo.completed && setIsEditing(true)}
                            className={`text-base sm:text-lg font-bold cursor-pointer transition-all duration-300 break-words ${todo.completed
                                    ? 'line-through text-gray-400'
                                    : 'text-[#2A428C] hover:text-[#2A428C]/80'
                                }`}
                        >
                            {todo.text}
                        </p>
                    )}
                </div>

                {/* Action Buttons - Always visible on mobile, hover on desktop */}
                <div className="flex items-center gap-1.5 sm:gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    {!isEditing && !todo.completed && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2.5 sm:p-2 text-[#2A428C]/40 hover:text-[#2A428C] active:text-[#2A428C] hover:bg-[#FFEF4D]/20 active:bg-[#FFEF4D]/30 rounded-lg transition-all touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                            title="Edit task"
                            aria-label="Edit task"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    )}

                    <button
                        onClick={() => onDelete(todo._id)}
                        className="p-2.5 sm:p-2 text-gray-400 hover:text-red-600 active:text-red-700 hover:bg-red-50 active:bg-red-100 rounded-lg transition-all touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                        title="Delete task"
                        aria-label="Delete task"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-scaleIn {
                    animation: scaleIn 0.2s ease-out;
                }
                /* Improve touch targets on mobile */
                @media (max-width: 640px) {
                    .touch-manipulation {
                        -webkit-tap-highlight-color: transparent;
                    }
                }
            `}</style>
        </div>
    );
}
