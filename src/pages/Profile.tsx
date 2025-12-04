import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { useAnimateIn } from '@/lib/animations';
import ProjectRoadmap from '@/components/ProjectRoadmap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';

const Profile = () => {
  const showContent = useAnimateIn(false, 300);
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    avatar_url: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        avatar_url: profile.avatar_url || '',
      });
    }
  }, [profile]);
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleSaveProfile = async () => {
    try {
      await updateProfile.mutateAsync(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };
  
  const handleCancelEdit = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        avatar_url: profile.avatar_url || '',
      });
    }
    setIsEditing(false);
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <AnimatedTransition show={showContent} animation="slide-up">
        <div className="mb-8">
          {!isEditing ? (
            <Card className="w-full mb-8">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-light">
                      {(profile?.full_name || user?.email || '?').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                
                <div>
                  <CardTitle>{profile?.full_name || 'Your Name'}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-1" />
                    {profile?.email || user?.email}
                  </CardDescription>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleEditProfile}
                  className="ml-auto"
                >
                  Edit Profile
                </Button>
              </CardHeader>
            </Card>
          ) : (
            <Card className="w-full mb-8">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar URL</Label>
                    <Input 
                      id="avatar" 
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                <Button onClick={handleSaveProfile} disabled={updateProfile.isPending}>
                  {updateProfile.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Project Roadmap</h1>
            <p className="text-muted-foreground mt-2">
              Track your project journey from start to completion and collect reviews
            </p>
          </div>
          
          <ProjectRoadmap />
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default Profile;
