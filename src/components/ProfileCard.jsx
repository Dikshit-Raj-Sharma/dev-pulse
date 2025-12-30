import React from "react";

const ProfileCard = ({ userData }) => {
  if (!userData) return null;

  return (
<div className="h-full p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-top-4 flex flex-col justify-between">      {/* Top Section: Avatar and Name */}
      <div className="flex items-center gap-4">
        <img
          src={userData.avatar_url}
          alt={userData.name}
          className="w-20 h-20 rounded-full border-2 border-white shadow-md"
        />
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {userData.name || userData.login}
          </h2>
          <p className="text-blue-600 font-medium">@{userData.login}</p>
        </div>
      </div>

      {/* Bio Section - Added this for completeness */}
      {userData.bio && (
        <p className="mt-4 text-sm text-slate-600 leading-relaxed italic">
          "{userData.bio}"
        </p>
      )}

      {/* Stats Grid - Now moved below and centered */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Repos
          </p>
          <p className="text-lg font-bold text-slate-900">
            {userData.public_repos}
          </p>
        </div>
        <div className="text-center border-x border-slate-200">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Followers
          </p>
          <p className="text-lg font-bold text-slate-900">
            {userData.followers}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Following
          </p>
          <p className="text-lg font-bold text-slate-900">
            {userData.following}
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <a
        href={userData.html_url}
        target="_blank"
        rel="noreferrer"
        className="block w-full text-center mt-6 text-sm font-semibold text-blue-600 hover:underline"
      >
        View GitHub Profile →
      </a>
    </div>
  );
};

export default ProfileCard;
