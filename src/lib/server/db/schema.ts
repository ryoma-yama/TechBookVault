import {
	pgTable,
	serial,
	text,
	varchar,
	date,
	integer,
	char,
	primaryKey
} from 'drizzle-orm/pg-core';

export const books = pgTable('books', {
	id: serial('id').primaryKey(),
	googleId: varchar('google_id', { length: 100 }).notNull(),
	isbn13: char('isbn_13', { length: 13 }).notNull(),
	title: varchar('title', { length: 255 }).notNull(),
	publisher: varchar('publisher', { length: 255 }).notNull(),
	publishedDate: date('published_date').notNull(),
	description: text('description').notNull()
});

export const authors = pgTable('authors', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull()
});

export const bookAuthors = pgTable(
	'book_authors',
	{
		bookId: integer('book_id')
			.notNull()
			.references(() => books.id),
		authorId: integer('author_id')
			.notNull()
			.references(() => authors.id)
	},
	(table) => ({
		pk: primaryKey({ name: 'book_authors_pk', columns: [table.bookId, table.authorId] })
	})
);

export const officeBooks = pgTable('office_books', {
	id: serial('id').primaryKey(),
	bookId: integer('book_id')
		.notNull()
		.references(() => books.id),
	acquiredDate: date('acquired_date').notNull(),
	discardedDate: date('discarded_date')
});
