
import { useState } from 'react';
import { Play, Clock, User, Plus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Routine {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  ageGroup: string;
  poses: string[];
  tags: string[];
}

const preBuiltRoutines: Routine[] = [
  {
    id: '1',
    name: 'Morning Energizer',
    description: 'Start your day with gentle stretches to awaken your body and mind.',
    duration: 15,
    difficulty: 'Beginner',
    ageGroup: 'All Ages',
    poses: ['Mountain Pose', 'Downward Facing Dog', 'Warrior I', 'Tree Pose'],
    tags: ['Morning', 'Energy', 'Quick']
  },
  {
    id: '2',
    name: 'Evening Wind Down',
    description: 'Gentle poses to help you relax and prepare for restful sleep.',
    duration: 20,
    difficulty: 'Beginner',
    ageGroup: 'All Ages',
    poses: ['Child\'s Pose', 'Seated Forward Fold', 'Cobra Pose'],
    tags: ['Evening', 'Relaxation', 'Sleep']
  },
  {
    id: '3',
    name: 'Core Strength Builder',
    description: 'Focus on building core strength and stability.',
    duration: 25,
    difficulty: 'Intermediate',
    ageGroup: 'Adults',
    poses: ['Mountain Pose', 'Warrior I', 'Triangle Pose', 'Cobra Pose'],
    tags: ['Strength', 'Core', 'Fitness']
  },
  {
    id: '4',
    name: 'Senior Gentle Flow',
    description: 'Safe and gentle movements perfect for maintaining flexibility.',
    duration: 30,
    difficulty: 'Beginner',
    ageGroup: '65+',
    poses: ['Mountain Pose', 'Child\'s Pose', 'Seated Forward Fold'],
    tags: ['Senior', 'Gentle', 'Flexibility']
  }
];

const Routines = () => {
  const [selectedTab, setSelectedTab] = useState<'prebuild' | 'custom' | 'create'>('prebuild');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderPreBuiltRoutines = () => (
    <div className="space-y-4">
      {preBuiltRoutines.map(routine => (
        <Card key={routine.id} className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{routine.name}</h3>
              <p className="text-gray-600 text-sm">{routine.description}</p>
            </div>
            <Button size="sm" className="bg-yoga-forest hover:bg-yoga-sage">
              <Play className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {routine.duration} min
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="w-4 h-4 mr-1" />
              {routine.ageGroup}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={getDifficultyColor(routine.difficulty)}>
              {routine.difficulty}
            </Badge>
            {routine.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            <span className="font-medium">{routine.poses.length} poses:</span>
            <span className="ml-1">{routine.poses.join(', ')}</span>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCustomRoutines = () => (
    <div className="text-center py-12">
      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Custom Routines Yet</h3>
      <p className="text-gray-600 mb-6">Create your first custom routine to get started.</p>
      <Button 
        onClick={() => setSelectedTab('create')}
        className="bg-yoga-forest hover:bg-yoga-sage"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Routine
      </Button>
    </div>
  );

  const renderCreateRoutine = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-yoga-cream">
        <h3 className="text-lg font-semibold mb-4">Quick Routine Builder</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option>All Ages</option>
              <option>Youth (13-17)</option>
              <option>Adults (18-64)</option>
              <option>Seniors (65+)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option>10 minutes</option>
              <option>15 minutes</option>
              <option>20 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
              <option>60 minutes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Level</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <Button className="w-full bg-yoga-forest hover:bg-yoga-sage">
          Generate Routine
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Manual Routine Builder</h3>
        <p className="text-gray-600 mb-4">
          Select poses from the library to create your custom routine.
        </p>
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Poses from Library
        </Button>
      </Card>
    </div>
  );

  return (
    <div className="flex-1 bg-white">
      <div className="bg-yoga-gradient p-6 text-white">
        <h1 className="text-2xl font-bold">Yoga Routines</h1>
        <p className="text-white/80">Discover and create your perfect practice</p>
      </div>

      <div className="p-4 max-w-lg mx-auto">
        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setSelectedTab('prebuild')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'prebuild'
                ? 'bg-white text-yoga-forest shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Pre-built
          </button>
          <button
            onClick={() => setSelectedTab('custom')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'custom'
                ? 'bg-white text-yoga-forest shadow-sm'
                : 'text-gray-600'
            }`}
          >
            My Routines
          </button>
          <button
            onClick={() => setSelectedTab('create')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              selectedTab === 'create'
                ? 'bg-white text-yoga-forest shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Create
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'prebuild' && renderPreBuiltRoutines()}
        {selectedTab === 'custom' && renderCustomRoutines()}
        {selectedTab === 'create' && renderCreateRoutine()}
      </div>
    </div>
  );
};

export default Routines;
