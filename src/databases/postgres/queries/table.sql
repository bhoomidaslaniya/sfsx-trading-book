CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE stocks (
  ticker_id UUID DEFAULT uuid_generate_v4() NOT NULL,
  ticker VARCHAR(10) UNIQUE NOT NULL
  is_deleted BOOLEAN DEFAULT false,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ticker_id)
);

CREATE TABLE Orders (
	order_id UUID DEFAULT uuid_generate_v4() NOT NULL,
    ticker_id TEXT,
    Time VARCHAR(10),
    Trader VARCHAR(10),
    side VARCHAR(4) CHECK (side IN ('buy', 'sell')) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    number_of_shares INT NOT NULL,
    status VARCHAR(8),
	  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticker_id) REFERENCES stocks(ticker_id),
    PRIMARY KEY (order_id)
)

