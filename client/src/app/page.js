"use client";

import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '@/utils/api';
import TodoItem from '@/components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await createTodo(newTodo);
      setTodos([response.data, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const response = await updateTodo(id, updates);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 py-6 sm:py-10 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-6 sm:mb-10 text-center px-2">
          <div className="inline-block mb-3 sm:mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl border border-white/30 mx-auto">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-2 sm:mb-3 drop-shadow-lg">
            TaskFlow
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium drop-shadow px-4">
            Organize your life, one task at a time ✨
          </p>

          {/* Stats */}
          {totalCount > 0 && (
            <div className="mt-4 sm:mt-6 inline-flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20">
              <div className="text-white/90">
                <span className="font-bold text-xl sm:text-2xl">{completedCount}</span>
                <span className="text-xs sm:text-sm ml-1">/ {totalCount}</span>
              </div>
              <div className="text-white/80 text-xs sm:text-sm font-medium">tasks completed</div>
            </div>
          )}
        </header>

        {/* Add Task Section - Fixed Bottom on Mobile, Card on Desktop */}
        <div className="fixed bottom-0 left-0 right-0 p-3 pb-6 bg-white/20 backdrop-blur-2xl border-t border-white/20 z-50 md:static md:bg-transparent md:backdrop-blur-none md:border-0 md:p-0 md:z-auto md:mb-8">
          <div className="md:bg-white/10 md:backdrop-blur-xl md:rounded-3xl md:shadow-2xl md:overflow-hidden md:border md:border-white/20">
            <div className="md:p-8">
              <form onSubmit={handleAddTodo} className="flex gap-3 max-w-4xl mx-auto md:max-w-none">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="w-full px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl border-0 bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 md:focus:ring-white/50 text-base md:text-lg font-medium shadow-lg transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newTodo.trim()}
                  className="px-4 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl md:rounded-2xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2 aspect-square md:aspect-auto"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden md:inline text-lg">Add Task</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tasks List - Added padding bottom for mobile bar */}
        <div className="space-y-3 pb-24 md:pb-0">
          {loading ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-white border-t-transparent"></div>
              <p className="text-white/90 text-base sm:text-lg mt-4 font-medium">Loading your tasks...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 mx-2 sm:mx-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white text-xl sm:text-2xl font-bold mb-2 px-4">All clear!</p>
              <p className="text-white/80 text-base sm:text-lg px-4">Add your first task to get started</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo._id}
                className="animate-slideIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TodoItem
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
