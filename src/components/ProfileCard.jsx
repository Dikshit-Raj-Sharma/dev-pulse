import React from "react";

const ProfileCard = ({ userData }) => {
  if (!userData) return;
  return (
    <div className="mt-8 bg-slate-50 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Top Section: Avatar and Name */}
      <div className="flex item-center gap-4">
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
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <p className="text-xs text-slate-500 uppercase font-semibold">
              Repos
            </p>
            <p className="text-lg font-bold">{userData.public_repos}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
