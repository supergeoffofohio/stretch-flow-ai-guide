
export interface YogaPose {
  id: string;
  name: string;
  sanskritName?: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in seconds
  description: string;
  benefits: string[];
  instructions: string[];
  modifications: string[];
  videoUrl: string; // placeholder for video demonstration
}

export const yogaPoses: YogaPose[] = [
  {
    id: '1',
    name: 'Mountain Pose',
    sanskritName: 'Tadasana',
    category: 'Standing',
    difficulty: 'Beginner',
    duration: 30,
    description: 'A foundational standing pose that promotes good posture and balance.',
    benefits: ['Improves posture', 'Strengthens legs', 'Increases awareness'],
    instructions: [
      'Stand with feet hip-width apart',
      'Distribute weight evenly on both feet',
      'Lengthen spine and relax shoulders',
      'Breathe deeply and hold'
    ],
    modifications: ['Use wall support if needed', 'Stand on yoga block for height'],
    videoUrl: '/videos/mountain-pose.mp4'
  },
  {
    id: '2',
    name: 'Downward Facing Dog',
    sanskritName: 'Adho Mukha Svanasana',
    category: 'Inversion',
    difficulty: 'Beginner',
    duration: 45,
    description: 'An energizing pose that stretches the entire body while building strength.',
    benefits: ['Stretches hamstrings', 'Strengthens arms', 'Calms the mind'],
    instructions: [
      'Start in tabletop position',
      'Tuck toes under and lift hips up',
      'Straighten legs and arms',
      'Create inverted V shape'
    ],
    modifications: ['Use blocks under hands', 'Bend knees slightly', 'Use wall for support'],
    videoUrl: '/videos/downward-dog.mp4'
  },
  {
    id: '3',
    name: 'Warrior I',
    sanskritName: 'Virabhadrasana I',
    category: 'Standing',
    difficulty: 'Beginner',
    duration: 40,
    description: 'A powerful standing pose that builds strength and confidence.',
    benefits: ['Strengthens legs', 'Opens hips', 'Improves balance'],
    instructions: [
      'Step left foot back 3-4 feet',
      'Turn left foot out 45 degrees',
      'Bend right knee over ankle',
      'Raise arms overhead'
    ],
    modifications: ['Use blocks under hands', 'Narrow stance for balance'],
    videoUrl: '/videos/warrior-1.mp4'
  },
  {
    id: '4',
    name: 'Child\'s Pose',
    sanskritName: 'Balasana',
    category: 'Restorative',
    difficulty: 'Beginner',
    duration: 60,
    description: 'A gentle resting pose that helps calm the mind and relax the body.',
    benefits: ['Relieves stress', 'Stretches hips', 'Calms nervous system'],
    instructions: [
      'Kneel on floor with big toes touching',
      'Sit back on heels',
      'Fold forward extending arms',
      'Rest forehead on mat'
    ],
    modifications: ['Place pillow under forehead', 'Use bolster for support'],
    videoUrl: '/videos/childs-pose.mp4'
  },
  {
    id: '5',
    name: 'Tree Pose',
    sanskritName: 'Vrksasana',
    category: 'Balance',
    difficulty: 'Intermediate',
    duration: 30,
    description: 'A balancing pose that improves focus and strengthens the legs.',
    benefits: ['Improves balance', 'Strengthens legs', 'Increases focus'],
    instructions: [
      'Stand in Mountain Pose',
      'Shift weight to left foot',
      'Place right foot on inner left thigh',
      'Bring palms together at heart center'
    ],
    modifications: ['Use wall for support', 'Place foot on calf instead'],
    videoUrl: '/videos/tree-pose.mp4'
  },
  {
    id: '6',
    name: 'Cobra Pose',
    sanskritName: 'Bhujangasana',
    category: 'Backbend',
    difficulty: 'Beginner',
    duration: 30,
    description: 'A gentle backbend that strengthens the spine and opens the chest.',
    benefits: ['Strengthens spine', 'Opens chest', 'Improves posture'],
    instructions: [
      'Lie face down on mat',
      'Place palms under shoulders',
      'Press into hands to lift chest',
      'Keep hips grounded'
    ],
    modifications: ['Use forearms for support', 'Place blanket under hips'],
    videoUrl: '/videos/cobra-pose.mp4'
  },
  {
    id: '7',
    name: 'Triangle Pose',
    sanskritName: 'Trikonasana',
    category: 'Standing',
    difficulty: 'Intermediate',
    duration: 35,
    description: 'A fundamental standing pose that stretches the sides of the body.',
    benefits: ['Stretches sides', 'Strengthens legs', 'Improves digestion'],
    instructions: [
      'Stand with feet wide apart',
      'Turn right foot out 90 degrees',
      'Reach right hand toward floor',
      'Extend left arm toward ceiling'
    ],
    modifications: ['Use block under bottom hand', 'Rest hand on shin instead'],
    videoUrl: '/videos/triangle-pose.mp4'
  },
  {
    id: '8',
    name: 'Seated Forward Fold',
    sanskritName: 'Paschimottanasana',
    category: 'Seated',
    difficulty: 'Intermediate',
    duration: 45,
    description: 'A calming forward fold that stretches the back body and promotes introspection.',
    benefits: ['Stretches hamstrings', 'Calms mind', 'Aids digestion'],
    instructions: [
      'Sit with legs extended',
      'Inhale and lengthen spine',
      'Exhale and fold forward',
      'Reach for feet or shins'
    ],
    modifications: ['Use strap around feet', 'Bend knees slightly', 'Sit on blanket'],
    videoUrl: '/videos/seated-forward-fold.mp4'
  }
];

export const categories = ['All', 'Standing', 'Seated', 'Backbend', 'Inversion', 'Balance', 'Restorative'];
export const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
