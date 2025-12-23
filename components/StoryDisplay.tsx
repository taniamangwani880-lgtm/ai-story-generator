
import React from 'react';
import { GeneratedStory } from '../types';

interface StoryDisplayProps {
  story: GeneratedStory;
  onReset: () => void;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-amber-50 border-b border-amber-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="serif-text text-3xl md:text-4xl font-bold text-stone-800 leading-tight">
            {story.title}
          </h1>
          <p className="text-stone-500 text-sm mt-1 uppercase tracking-widest font-medium">
            A MuseAI Original
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="p-3 rounded-full bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors shadow-sm"
            title="Print Story"
          >
            <i className="fa-solid fa-print"></i>
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-full bg-stone-800 text-white font-semibold hover:bg-stone-900 transition-colors shadow-lg flex items-center gap-2"
          >
            <i className="fa-solid fa-rotate-left"></i>
            New Story
          </button>
        </div>
      </div>

      <div className="p-8 md:p-12 lg:p-16">
        <div className="serif-text text-xl text-stone-700 leading-relaxed whitespace-pre-wrap selection:bg-amber-200">
          {story.content}
        </div>

        {story.authorNote && (
          <div className="mt-12 p-6 bg-stone-50 rounded-xl border border-stone-200 italic text-stone-500">
            <span className="font-bold text-stone-700 not-italic block mb-2 underline decoration-amber-500 underline-offset-4">Author's Note</span>
            {story.authorNote}
          </div>
        )}
      </div>
      
      <div className="bg-stone-50 p-6 text-center text-stone-400 text-sm border-t border-stone-100 italic">
        "Stories are the only thing that survive us."
      </div>
    </div>
  );
};
