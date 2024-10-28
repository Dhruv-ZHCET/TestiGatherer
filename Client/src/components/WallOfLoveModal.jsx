import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, Info, Copy } from 'lucide-react';

const WallOfLoveModal = ({ isOpen, onClose }) => {
  const [showBasic, setShowBasic] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('Vertical');
  const [scrollSpeed, setScrollSpeed] = useState('Normal');
  const [settings, setSettings] = useState({
    removeTestimonialBranding: false,
    darkTheme: false,
    hideDate: false,
    hideSourceIcons: false,
    showHeartAnimation: false,
    pauseOnHover: true
  });

  if (!isOpen) return null;

  const updateSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const embedCode = `<iframe
    src="https://embed-v2.testimonial.to/w/https-medium-app-5wjn-vercel-app-tag-all-light-animated"
    frameborder="0"
    scrolling="yes"
    width="100%"
    height="800px">
  </iframe>`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg w-[600px] max-h-[90vh] overflow-y-auto text-gray-800" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-4 border-b flex items-center gap-3">
          <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded-md">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Embed a Wall of Love</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step Indicator */}
          <div className="mb-6">
            <p className="text-purple-600 font-medium">Step 2</p>
            <h3 className="text-xl font-semibold mb-2">Customize your Wall of Love</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-600">Masonry - animated</span>
            </div>
          </div>

          {/* Preview Area */}
          <div className="border rounded-lg mb-6">
            <div className="p-4 bg-gray-50">
              <pre className="text-sm text-gray-600 whitespace-pre-wrap break-all">
                {embedCode}
              </pre>
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-6">
            <button 
              className={`px-4 py-2 rounded-md transition ${showBasic ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              onClick={() => setShowBasic(true)}
            >
              Basic
            </button>
            <button 
              className={`px-4 py-2 rounded-md transition flex items-center gap-2 ${!showBasic ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              onClick={() => setShowBasic(false)}
            >
              More customization
            </button>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            {/* Scroll Direction */}
            <div>
              <label className="block mb-2 font-medium">Scroll direction:</label>
              <div className="relative w-40">
                <select
                  value={scrollDirection}
                  onChange={(e) => setScrollDirection(e.target.value)}
                  className="w-full p-2 pr-8 border rounded-md appearance-none bg-white cursor-pointer"
                >
                  <option>Vertical</option>
                  <option>Horizontal</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.removeTestimonialBranding}
                  onChange={() => updateSetting('removeTestimonialBranding')}
                  className="rounded border-gray-300"
                />
                <span>Remove Testimonial branding</span>
                <Info className="w-4 h-4 text-gray-400" />
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.darkTheme}
                  onChange={() => updateSetting('darkTheme')}
                  className="rounded border-gray-300"
                />
                <span>Dark theme</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.hideDate}
                  onChange={() => updateSetting('hideDate')}
                  className="rounded border-gray-300"
                />
                <span>Hide the date</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.hideSourceIcons}
                  onChange={() => updateSetting('hideSourceIcons')}
                  className="rounded border-gray-300"
                />
                <span>Hide source icons</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showHeartAnimation}
                  onChange={() => updateSetting('showHeartAnimation')}
                  className="rounded border-gray-300"
                />
                <span>Show heart animation</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pauseOnHover}
                  onChange={() => updateSetting('pauseOnHover')}
                  className="rounded border-gray-300"
                />
                <span>Pause animation on mouse hover</span>
              </label>
            </div>

            {/* Scroll Speed */}
            <div>
              <label className="block mb-2 font-medium">Scroll speed:</label>
              <div className="relative w-40">
                <select
                  value={scrollSpeed}
                  onChange={(e) => setScrollSpeed(e.target.value)}
                  className="w-full p-2 pr-8 border rounded-md appearance-none bg-white cursor-pointer"
                >
                  <option>Normal</option>
                  <option>Slow</option>
                  <option>Fast</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between">
          <button 
            onClick={onClose}
            className="px-6 py-2 border rounded-md hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button 
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center gap-2"
            onClick={() => navigator.clipboard.writeText(embedCode)}
          >
            <Copy className="w-4 h-4" />
            Copy code
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallOfLoveModal;