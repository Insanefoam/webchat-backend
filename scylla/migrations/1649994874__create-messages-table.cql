CREATE TABLE messages (
    id VARCHAR,
    content VARCHAR,
    date TIMESTAMP,
    chat_room_id VARCHAR,
    sender_id VARCHAR,
    created_at TIMESTAMP,
    
    PRIMARY KEY((chat_room_id, date), created_at)
);