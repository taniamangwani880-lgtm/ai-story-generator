
import React, { useState, useCallback } from 'react';
import { StoryParams, GeneratedStory, AppState } from './types';
import { StoryForm } from './components/StoryForm';
import { StoryDisplay } from './components/StoryDisplay';
import { generateStory } from './geminiService';

const App: React.FC = () => {
  const [params, setParams] = useState<StoryParams>({
    genre: 'Fantasy',
    characterName: '',
    setting: '',
    tone: 'Hopeful',
    length: 'Medium'
  });

  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setState(AppState.GENERATING);
    setError(null);
    
    try {
      const result = await generateStory(params);
      setStory(result);
      setState(AppState.SUCCESS);
      // Scroll to top to see the title
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected magic failure occurred.");
      setState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setStory(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-amber-100">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg shadow-amber-200">
              <i className="fa-solid fa-feather-pointed text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900 leading-none">MuseAI</h1>
              <span className="text-xs text-stone-500 font-medium tracking-tighter uppercase">Intelligent Storyteller</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-500 text-sm">
            <a href="#" className="hover:text-stone-900 transition-colors">Library</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Writers</a>
            <span className="w-px h-4 bg-stone-300"></span>
            <span className="font-medium text-amber-600">v1.2.0</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {state === AppState.IDLE && (
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-8 text-center">
          <h2 className="serif-text text-5xl md:text-6xl font-bold text-stone-800 mb-6 leading-tight">
            Unleash Your <span className="text-amber-600 italic">Imagination</span>
          </h2>
          <p className="text-stone-500 text-xl max-w-2xl mx-auto mb-10">
            Tell us a character, a setting, and a mood. We'll weave a narrative masterpiece just for you.
          </p>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 mt-8">
        {state === AppState.ERROR && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 flex items-center gap-3 shadow-sm animate-pulse">
            <i className="fa-solid fa-circle-exclamation text-xl"></i>
            <p>{error}</p>
          </div>
        )}

        {state === AppState.IDLE || state === AppState.GENERATING || state === AppState.ERROR ? (
          <StoryForm 
            params={params} 
            setParams={setParams} 
            onSubmit={handleGenerate} 
            isLoading={state === AppState.GENERATING}
          />
        ) : (
          story && <StoryDisplay story={story} onReset={handleReset} />
        )}
      </main>

      {/* Loading Overlay Messages */}
      {state === AppState.GENERATING && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-8 relative">
             <div className="absolute inset-0 bg-amber-400 blur-2xl opacity-20 animate-pulse"></div>
             <div className="bg-white p-6 rounded-3xl shadow-2xl relative border border-stone-100">
               <i className="fa-solid fa-book-open-reader text-5xl text-amber-600 animate-bounce"></i>
             </div>
          </div>
          <h3 className="serif-text text-3xl font-bold text-stone-800 mb-2">Penning your masterpiece...</h3>
          <p className="text-stone-500 max-w-sm">
            Our AI is currently sketching characters and building worlds. This takes about 20-30 seconds of pure creativity.
          </p>
          <div className="mt-8 flex gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-[bounce_1s_infinite_100ms]"></span>
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-[bounce_1s_infinite_300ms]"></span>
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-[bounce_1s_infinite_500ms]"></span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-stone-200 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-stone-500 text-sm">
          <div>
            <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-feather text-amber-600"></i> MuseAI
            </h4>
            <p>Empowering storytellers through cutting-edge generative intelligence. Every story is a unique collaboration between human intent and machine creativity.</p>
          </div>
          <div>
            <h4 className="font-bold text-stone-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-600 transition-colors">About the AI</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">Terms of Magic</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-800 mb-4">Get Involved</h4>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-amber-600 transition-colors"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="hover:text-amber-600 transition-colors"><i className="fa-brands fa-discord"></i></a>
              <a href="#" className="hover:text-amber-600 transition-colors"><i className="fa-brands fa-github"></i></a>
            </div>
            <p className="mt-4">Join our community of 10,000+ writers.</p>
          </div>
        </div>
        <div className="mt-12 text-center text-stone-400 text-xs">
          © {new Date().getFullYear()} MuseAI Labs. All rights reserved. Powered by Gemini.
        </div>
      </footer>
    </div>
  );
};

export default App;
