import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  integer,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ─────────────────────────────────────────────────────────────────
// GEBRUIKERS & ROLLEN
// ─────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  // admin = volledig beheer | editor = content beheer | viewer = alleen lezen
  role: varchar('role', { length: 50 }).default('editor').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─────────────────────────────────────────────────────────────────
// AGENDA (evenementen / activiteiten in de kalender)
// ─────────────────────────────────────────────────────────────────

export const agendaItems = pgTable('agenda_items', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  timeStart: varchar('time_start', { length: 10 }),
  timeEnd: varchar('time_end', { length: 10 }),
  location: varchar('location', { length: 500 }).default('Het Alems Kerkje, Sint Odradastraat 12, Alem'),
  imageUrl: varchar('image_url', { length: 1000 }),
  published: boolean('published').default(false).notNull(),
  featured: boolean('featured').default(false).notNull(),
  authorId: integer('author_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─────────────────────────────────────────────────────────────────
// ARTIKELEN (nieuws, verhalen, aankondigingen)
// ─────────────────────────────────────────────────────────────────

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  // nieuws | verhaal | aankondiging
  category: varchar('category', { length: 100 }).default('nieuws'),
  imageUrl: varchar('image_url', { length: 1000 }),
  published: boolean('published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  authorId: integer('author_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─────────────────────────────────────────────────────────────────
// ACTIVITEITEN (verhuurtypes: huwelijk, concert, cursus, etc.)
// ─────────────────────────────────────────────────────────────────

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  imageUrl: varchar('image_url', { length: 1000 }),
  published: boolean('published').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─────────────────────────────────────────────────────────────────
// SPONSOREN
// ─────────────────────────────────────────────────────────────────

export const sponsors = pgTable('sponsors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  logoUrl: varchar('logo_url', { length: 1000 }),
  websiteUrl: varchar('website_url', { length: 1000 }),
  // gold | silver | standard
  tier: varchar('tier', { length: 50 }).default('standard').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─────────────────────────────────────────────────────────────────
// SITE-INSTELLINGEN (key-value store voor beheerbare content)
// ─────────────────────────────────────────────────────────────────

export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  value: text('value'),
  label: varchar('label', { length: 255 }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// ─────────────────────────────────────────────────────────────────
// CONTACTFORMULIER BERICHTEN
// ─────────────────────────────────────────────────────────────────

export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 500 }),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ─────────────────────────────────────────────────────────────────
// RELATIONS
// ─────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  agendaItems: many(agendaItems),
}))

export const articlesRelations = relations(articles, ({ one }) => ({
  author: one(users, { fields: [articles.authorId], references: [users.id] }),
}))

export const agendaItemsRelations = relations(agendaItems, ({ one }) => ({
  author: one(users, { fields: [agendaItems.authorId], references: [users.id] }),
}))

// ─────────────────────────────────────────────────────────────────
// TYPESCRIPT TYPES (afgeleid van schema)
// ─────────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type AgendaItem = typeof agendaItems.$inferSelect
export type NewAgendaItem = typeof agendaItems.$inferInsert

export type Article = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert

export type Activity = typeof activities.$inferSelect
export type NewActivity = typeof activities.$inferInsert

export type Sponsor = typeof sponsors.$inferSelect
export type ContactMessage = typeof contactMessages.$inferSelect
