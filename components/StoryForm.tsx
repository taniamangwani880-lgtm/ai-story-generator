
import React from 'react';
import { StoryParams, Genre, Tone, StoryLength } from '../types';

interface StoryFormProps {
  params: StoryParams;
  setParams: React.Dispatch<React.SetStateAction<StoryParams>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const genres: Genre[] = ['Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Mystery', 'Adventure', 'Comedy', 'Inspirational'];
const tones: Tone[] = ['Dark', 'Funny', 'Emotional', 'Scary', 'Hopeful', 'Mysterious', 'Inspirational'];
const lengths: StoryLength[] = ['Short', 'Medium', 'Long'];

export const StoryForm: React.FC<StoryFormProps> = ({ params, setParams, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-stone-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-stone-800">
        <i className="fa-solid fa-feather-pointed text-amber-600"></i>
        Draft Your Concept
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1">Genre</label>
            <select
              name="genre"
              value={params.genre}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            >
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1">Main Character</label>
            <input
              type="text"
              name="characterName"
              placeholder="e.g. Ayesha, Silas Vane"
              value={params.characterName}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-1">Setting (Time & Place)</label>
          <input
            type="text"
            name="setting"
            placeholder="e.g. Abandoned hospital at night, 2077 Mars Colony"
            value={params.setting}
            onChange={handleChange}
            className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1">Tone</label>
            <select
              name="tone"
              value={params.tone}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            >
              {tones.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1">Story Length</label>
            <select
              name="length"
              value={params.length}
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            >
              {lengths.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading || !params.characterName || !params.setting}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg
            ${isLoading || !params.characterName || !params.setting 
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed' 
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200 hover:shadow-amber-300'
            }`}
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Consulting the Muses...
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              Generate Story
            </>
          )}
        </button>
      </div>
    </div>
  );
};
