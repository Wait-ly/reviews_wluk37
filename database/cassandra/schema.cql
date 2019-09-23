CREATE KEYSPACE IF NOT EXISTS reviews 
WITH REPLICATION = {
  'class': 'SimpleStrategy', 
  'replication_factor': 1
};

DROP TABLE IF EXISTS reviews.reviews;

CREATE TABLE reviews.reviews (
  review_id UUID,
  restaurant_id INT,
  user_name TEXT,
  review TEXT,
  overall SMALLINT,
  food SMALLINT,
  service SMALLINT,
  ambience SMALLINT,
  value SMALLINT,
  noise TEXT,
  recommendation BOOLEAN,
  date date,
  location TEXT,
  vip_status BOOLEAN,
  initials TEXT,
  icon_color TEXT,
  PRIMARY KEY (restaurant_id, review_id)
);

-- SELECT COUNT(*) FROM user_name;
-- SELECT * FROM restaurant_name;