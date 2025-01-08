/*
  # Add social media profile fields

  1. New Fields
    - github_url: GitHub profile URL
    - youtube_url: YouTube channel URL
    - twitter_url: Twitter/X profile URL
    - linkedin_url: LinkedIn profile URL
  
  2. Validation
    - Add URL format validation for each field
    - GitHub: Must match github.com/username pattern
    - YouTube: Must match youtube.com channel patterns
    - Twitter: Must match twitter.com or x.com patterns
    - LinkedIn: Must match linkedin.com/in or /company patterns
*/

-- Add social media profile columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS github_url text,
ADD COLUMN IF NOT EXISTS youtube_url text,
ADD COLUMN IF NOT EXISTS twitter_url text,
ADD COLUMN IF NOT EXISTS linkedin_url text;

-- Add URL format validation
ALTER TABLE profiles
ADD CONSTRAINT github_url_format CHECK (
  github_url IS NULL OR 
  github_url ~ '^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$'
),
ADD CONSTRAINT youtube_url_format CHECK (
  youtube_url IS NULL OR 
  youtube_url ~ '^https?:\/\/(www\.)?(youtube\.com\/(c\/|channel\/|user\/)?|youtu\.be\/)[A-Za-z0-9_-]+\/?'
),
ADD CONSTRAINT twitter_url_format CHECK (
  twitter_url IS NULL OR 
  twitter_url ~ '^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/?$'
),
ADD CONSTRAINT linkedin_url_format CHECK (
  linkedin_url IS NULL OR 
  linkedin_url ~ '^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$'
);