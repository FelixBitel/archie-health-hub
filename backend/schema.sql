-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pets table (1:1 relationship with users)
CREATE TABLE IF NOT EXISTS pets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  breed VARCHAR(255),
  age INTEGER,
  weight DECIMAL(5,2),
  status VARCHAR(500),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create health_logs table (1:N relationship with users)
CREATE TABLE IF NOT EXISTS health_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- walk, medication, weight, health, mood, appetite, bathroom
  date DATE NOT NULL,
  time TIME,
  notes TEXT,
  weight DECIMAL(5,2),
  energy VARCHAR(50), -- high, medium, low
  severity VARCHAR(50), -- mild, moderate, severe
  side_effects VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table (1:N relationship with users)
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  priority VARCHAR(50), -- high, medium, low
  due_date DATE,
  category VARCHAR(50), -- health, medication, activity, food, shopping, other
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create meals table (1:N relationship with users)
CREATE TABLE IF NOT EXISTS meals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  portions DECIMAL(5,2),
  frequency VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create recipes table (1:N relationship with users)
CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  ingredients TEXT NOT NULL,
  instructions TEXT,
  difficulty VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_pets_user_id ON pets(user_id);
CREATE INDEX idx_health_logs_user_id ON health_logs(user_id);
CREATE INDEX idx_health_logs_date ON health_logs(date);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_meals_user_id ON meals(user_id);
CREATE INDEX idx_recipes_user_id ON recipes(user_id);
CREATE INDEX idx_users_email ON users(email);

-- Insert demo user for testing
INSERT INTO users (email, password, name) VALUES 
  ('demo@example.com', '$2a$10$YLK0zVpG5rvQ2rVQQQ5fzOZLkVAQQQQQQQQQQQQQQQQQQQQQQ', 'Demo User')
ON CONFLICT (email) DO NOTHING;
