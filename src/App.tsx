import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { PrototypesSection } from './components/PrototypesSection';
import { ProfileSettings } from './pages/ProfileSettings';
import { LandingPage } from './pages/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { useAuth } from './components/auth/AuthContext';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const { user } = useAuth();

  const handleGetStarted = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header onAuthClick={() => setIsAuthModalOpen(true)} />
        <Routes>
          <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
          <Route path="/prototypes" element={<PrototypesSection />} />
          <Route 
            path="/profile/settings" 
            element={user ? <ProfileSettings /> : <LandingPage onGetStarted={handleGetStarted} />} 
          />
        </Routes>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;