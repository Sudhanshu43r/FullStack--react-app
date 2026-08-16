CREATE TABLE IF NOT EXISTS generated_pokemon(
    id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(100),
  powers JSONB,
  characteristics TEXT,
  image_url TEXT,  -- File path: /images/pokemon-{timestamp}-{random}.png
  doodle_source TEXT,  -- Original doodle (base64, not displayed in gallery)
  like_count INTEGER NOT NULL DEFAULT 0,
  action_images JSONB DEFAULT '{}'::jsonb  -- {powerName: "/images/action-{timestamp}-{random}.png"}
)