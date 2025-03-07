-- SQL schema for the Lighthouse Bible Platform

-- Table to store user information
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store Bible content
CREATE TABLE bible_content (
    id SERIAL PRIMARY KEY,
    book VARCHAR(100) NOT NULL,
    chapter INT NOT NULL,
    verse_number INT NOT NULL,
    text TEXT NOT NULL,
    UNIQUE (book, chapter, verse_number)
);

-- Table to store user bookmarks
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book VARCHAR(100) NOT NULL,
    chapter INT NOT NULL,
    verse_number INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, book, chapter, verse_number)
);

-- Table to store user notes
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book VARCHAR(100) NOT NULL,
    chapter INT NOT NULL,
    verse_number INT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster queries
CREATE INDEX idx_bible_content_book_chapter ON bible_content (book, chapter);
CREATE INDEX idx_bookmarks_user_id ON bookmarks (user_id);
CREATE INDEX idx_notes_user_id ON notes (user_id);
