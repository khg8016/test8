import React, { useState } from 'react';
import { useProfile } from '../../contexts/ProfileContext';
import { supabase } from '../../lib/supabase';
import { SocialMediaInput } from './SocialMediaInput';
import { AvatarUpload } from './AvatarUpload';
import type { UserProfile, ProfileFormData } from '../../types/user';
import toast from 'react-hot-toast';

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { refreshProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    display_id: profile.display_id || '',
    full_name: profile.full_name || '',
    bio: profile.bio || '',
    website: profile.website || '',
    github_url: profile.github_url || '',
    youtube_url: profile.youtube_url || '',
    twitter_url: profile.twitter_url || '',
    linkedin_url: profile.linkedin_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_id: formData.display_id,
          full_name: formData.full_name,
          bio: formData.bio,
          website: formData.website,
          github_url: formData.github_url || null,
          youtube_url: formData.youtube_url || null,
          twitter_url: formData.twitter_url || null,
          linkedin_url: formData.linkedin_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      await refreshProfile();
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AvatarUpload
        currentAvatarUrl={profile.avatar_url}
        onUploadSuccess={() => refreshProfile()}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          User Level
        </label>
        <input
          type="text"
          value={profile.user_level}
          disabled
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Display ID
        </label>
        <div className="mt-1 relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 dark:text-gray-400">
            @
          </span>
          <input
            type="text"
            value={formData.display_id}
            onChange={(e) => setFormData({ ...formData, display_id: e.target.value })}
            pattern="[a-z0-9_]+"
            maxLength={15}
            className="pl-7 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Only lowercase letters, numbers, and underscores allowed
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Website
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Social Media Profiles
        </h3>
        
        <SocialMediaInput
          type="github"
          value={formData.github_url}
          onChange={(value) => setFormData({ ...formData, github_url: value })}
          placeholder="https://github.com/username"
        />

        <SocialMediaInput
          type="youtube"
          value={formData.youtube_url}
          onChange={(value) => setFormData({ ...formData, youtube_url: value })}
          placeholder="https://youtube.com/c/channelname"
        />

        <SocialMediaInput
          type="twitter"
          value={formData.twitter_url}
          onChange={(value) => setFormData({ ...formData, twitter_url: value })}
          placeholder="https://twitter.com/username"
        />

        <SocialMediaInput
          type="linkedin"
          value={formData.linkedin_url}
          onChange={(value) => setFormData({ ...formData, linkedin_url: value })}
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                   hover:bg-blue-700 rounded-md disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}