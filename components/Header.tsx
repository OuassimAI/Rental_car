import React from 'react';

interface HeaderProps {
  currentView: 'customer' | 'admin';
  onToggleView: () => void;
  onOpenChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onToggleView, onOpenChat }) => {
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 border-b border-gray-700">
          <div className="flex items-center space-x-3">
             <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <span className="text-2xl font-bold tracking-wider">Prestige Rentals</span>
          </div>
          <div className="flex items-center space-x-6">
            {currentView === 'customer' && (
              <nav className="hidden md:flex items-center space-x-8">
                <button onClick={() => handleNavClick('fleet')} className="text-gray-300 hover:text-white transition-colors">Fleet</button>
                <button onClick={() => handleNavClick('services')} className="text-gray-300 hover:text-white transition-colors">Services</button>
                <button onClick={onOpenChat} className="text-gray-300 hover:text-white transition-colors">Contact</button>
              </nav>
            )}
            <button 
              onClick={onToggleView}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
            >
              {currentView === 'customer' ? 'Admin View' : 'Customer View'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;