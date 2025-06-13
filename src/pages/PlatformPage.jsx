// src/pages/PlatformPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes
import Sidebar from '../components/SidebarPlatform';
import MainContent from '../components/MainContent';
import FriendsList from '../components/FriendList';
import CatalogPage from './CatalogPage';
import LibraryPage from './LibraryPage';
import UserProfilePage from './UserProfilePage';
import FriendsPage from './FriendsPage';
import DownloadsPage from './DownloadsPage';
import BuysPage from './BuysPage';
import WishlistPage from './WishlistPage';
import BatePaposPage from './BatePaposPage'; // 1. Importe a página
import TrendingPage from './TrendingPage';
import GuiasPlatformPage from './GuiasPlatformPage';

function PlatformPage() {
  return (
    <div className="flex bg-[#181a20] text-white min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto custom-scrollbar">
        <Routes>
          <Route index element={<MainContent />} />
          <Route path="em-alta" element={<TrendingPage />} />
          <Route path="category" element={<CatalogPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="profile/:username" element={<UserProfilePage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="bate-papos" element={<BatePaposPage />} />
          <Route path="guias" element={<GuiasPlatformPage />} /> {/* 2. Adicione a nova rota */}
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="buys" element={<BuysPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Routes>
      </main>
      <aside className="hidden lg:block w-72 bg-[#1f2128] p-4 border-l border-gray-700/50">
        <FriendsList />
      </aside>
    </div>
  );
}

export default PlatformPage;