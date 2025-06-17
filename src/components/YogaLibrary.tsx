
import { useState } from 'react';
import { Search, Filter, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { yogaPoses, categories, difficulties, YogaPose } from '@/data/yogaPoses';

const YogaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);

  const filteredPoses = yogaPoses.filter(pose => {
    const matchesSearch = pose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pose.sanskritName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pose.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || pose.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  if (selectedPose) {
    return (
      <div className="flex-1 bg-white">
        <div className="bg-yoga-gradient p-6 text-white">
          <button 
            onClick={() => setSelectedPose(null)}
            className="mb-4 text-white/80 hover:text-white"
          >
            ← Back to Library
          </button>
          <h1 className="text-2xl font-bold">{selectedPose.name}</h1>
          {selectedPose.sanskritName && (
            <p className="text-white/80 italic">{selectedPose.sanskritName}</p>
          )}
        </div>

        <div className="p-6 max-w-lg mx-auto">
          {/* Video Placeholder */}
          <div className="bg-gray-100 rounded-2xl aspect-video mb-6 flex items-center justify-center">
            <div className="text-center">
              <Play className="w-12 h-12 text-yoga-forest mx-auto mb-2" />
              <p className="text-gray-600">Video Demonstration</p>
              <p className="text-sm text-gray-500">Duration: {selectedPose.duration}s</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Badge variant="secondary">{selectedPose.category}</Badge>
            <Badge variant={
              selectedPose.difficulty === 'Beginner' ? 'default' :
              selectedPose.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
            }>
              {selectedPose.difficulty}
            </Badge>
          </div>

          <p className="text-gray-600 mb-6">{selectedPose.description}</p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-yoga-forest mb-2">Benefits</h3>
              <ul className="space-y-1">
                {selectedPose.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-600 text-sm">• {benefit}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-yoga-forest mb-2">Instructions</h3>
              <ol className="space-y-1">
                {selectedPose.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-600 text-sm">
                    {index + 1}. {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-semibold text-yoga-forest mb-2">Modifications</h3>
              <ul className="space-y-1">
                {selectedPose.modifications.map((modification, index) => (
                  <li key={index} className="text-gray-600 text-sm">• {modification}</li>
                ))}
              </ul>
            </div>
          </div>

          <Button className="w-full mt-8 bg-yoga-forest hover:bg-yoga-sage text-white">
            Add to Routine
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <div className="bg-yoga-gradient p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">Pose Library</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <Input
            placeholder="Search poses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/20 border-0 text-white placeholder:text-white/60"
          />
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {/* Filters */}
        <div className="mb-6">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-yoga-forest hover:bg-yoga-sage' : ''}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(difficulty => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={selectedDifficulty === difficulty ? 'bg-yoga-forest hover:bg-yoga-sage' : ''}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Pose Grid */}
        <div className="space-y-4">
          {filteredPoses.map(pose => (
            <div
              key={pose.id}
              onClick={() => setSelectedPose(pose)}
              className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{pose.name}</h3>
                  {pose.sanskritName && (
                    <p className="text-sm text-gray-500 italic">{pose.sanskritName}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{pose.duration}s</div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pose.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">{pose.category}</Badge>
                  <Badge 
                    variant={
                      pose.difficulty === 'Beginner' ? 'default' :
                      pose.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                    }
                    className="text-xs"
                  >
                    {pose.difficulty}
                  </Badge>
                </div>
                <Play className="w-5 h-5 text-yoga-forest" />
              </div>
            </div>
          ))}
        </div>

        {filteredPoses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No poses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YogaLibrary;
