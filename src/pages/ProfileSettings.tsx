import React from 'react';
import { ProfileForm } from '../components/profile/ProfileForm';
import { useProfile } from '../contexts/ProfileContext';

export function ProfileSettings() {
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
              <div className="space-y-6">
                <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile Settings
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
          <ProfileForm profile={profile} />
        </div>
      </div>
    </div>
  );
}