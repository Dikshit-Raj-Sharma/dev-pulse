import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ username, setUsername, handleSearch, loading }) {
  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter Username"
          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search Profile"}
      </button>
    </form>
  );
}
export default SearchBar;