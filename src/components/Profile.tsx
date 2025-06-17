import { useState } from 'react';
import { User, Settings, Music, Bell, Shield, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const [musicIntegration, setMusicIntegration] = useState(false);

  return (
    <div className="flex-1 bg-white">
      <div className="bg-yoga-gradient p-6 text-white">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Yoga Practitioner</h1>
            <p className="text-white/80">Member since 2024</p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-4">
        {/* Stats */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Practice Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yoga-forest">12</div>
              <div className="text-sm text-gray-600">Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yoga-forest">3.5</div>
              <div className="text-sm text-gray-600">Avg Hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yoga-forest">45</div>
              <div className="text-sm text-gray-600">Poses Learned</div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <div className="font-medium">Notifications</div>
                  <div className="text-sm text-gray-600">Practice reminders and alerts</div>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Music className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <div className="font-medium">Music Integration</div>
                  <div className="text-sm text-gray-600">Connect with Spotify/Apple Music</div>
                </div>
              </div>
              <Switch 
                checked={musicIntegration} 
                onCheckedChange={setMusicIntegration}
              />
            </div>
          </div>
        </Card>

        {/* Music Integration */}
        {musicIntegration && (
          <Card className="p-4 bg-yoga-cream">
            <h3 className="font-semibold mb-4">Music Integration</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Music className="w-5 h-5 mr-2" />
                Connect Spotify
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Music className="w-5 h-5 mr-2" />
                Connect Apple Music
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Play your favorite playlists during practice sessions.
            </p>
          </Card>
        )}

        {/* Other Options */}
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Shield className="w-5 h-5 mr-3" />
            Privacy & Security
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="w-5 h-5 mr-3" />
            Help & Support
          </Button>
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>ZenFlow Yoga v1.0.0</p>
          <p>Made with ❤️ for your practice</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
