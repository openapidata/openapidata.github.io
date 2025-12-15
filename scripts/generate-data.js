/**
 * OPEN API DATA GENERATOR
 * Generates massive datasets in JSON, XML, CSV, YAML, NDJSON, and BSON.
 * Run this before 'next build'.
 */

const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const { js2xml } = require('xml-js');
const { Parser } = require('json2csv');
const yaml = require('js-yaml');
const { BSON } = require('bson');

// --- CONFIGURATION ---
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'api', 'v1');
const COUNTS = {
  users: 100,      // Number of users
  posts: 500,      // Number of posts
  comments: 2000,  // Number of comments
  todos: 300,
  photos: 500
};

// --- DATA GENERATORS ---

const generateUsers = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    address: {
      street: faker.location.street(),
      suite: faker.location.secondaryAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      geo: {
        lat: faker.location.latitude(),
        lng: faker.location.longitude()
      }
    },
    phone: faker.phone.number(),
    website: faker.internet.domainName(),
    company: {
      name: faker.company.name(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.buzzPhrase()
    }
  }));
};

const generatePosts = (count, users) => {
  return Array.from({ length: count }).map((_, i) => ({
    userId: faker.helpers.arrayElement(users).id,
    id: i + 1,
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2)
  }));
};

const generateComments = (count, posts) => {
  return Array.from({ length: count }).map((_, i) => ({
    postId: faker.helpers.arrayElement(posts).id,
    id: i + 1,
    name: faker.lorem.sentence(5),
    email: faker.internet.email(),
    body: faker.lorem.paragraph()
  }));
};

const generateTodos = (count, users) => {
  return Array.from({ length: count }).map((_, i) => ({
    userId: faker.helpers.arrayElement(users).id,
    id: i + 1,
    title: faker.lorem.sentence(),
    completed: faker.datatype.boolean()
  }));
};

const generatePhotos = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    albumId: faker.number.int({ min: 1, max: 100 }),
    id: i + 1,
    title: faker.lorem.words(3),
    url: faker.image.urlLoremFlickr({ width: 600, height: 600 }),
    thumbnailUrl: faker.image.urlLoremFlickr({ width: 150, height: 150 })
  }));
};

// --- FORMAT CONVERTERS ---

const saveFile = (filename, content, isBinary = false) => {
  const filePath = path.join(OUTPUT_DIR, filename);
  if (isBinary) {
    fs.writeFileSync(filePath, content);
  } else {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  console.log(`✓ Generated: ${filename}`);
};

const generateFormats = (key, data) => {
  // 1. JSON
  saveFile(`${key}.json`, JSON.stringify(data, null, 2));
  
  // 2. Minified JSON
  saveFile(`${key}.min.json`, JSON.stringify(data));

  // 3. XML
  const xmlData = js2xml({ [key]: { item: data } }, { compact: true, spaces: 2, ignoreComment: true });
  saveFile(`${key}.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n${xmlData}`);

  // 4. CSV
  try {
    // Flatten objects for CSV if necessary or let json2csv handle it
    const parser = new Parser();
    const csv = parser.parse(data);
    saveFile(`${key}.csv`, csv);
  } catch (err) {
    console.error(`Error generating CSV for ${key}`, err);
  }

  // 5. YAML
  const yamlData = yaml.dump(data);
  saveFile(`${key}.yaml`, yamlData);

  // 6. NDJSON / JSON Lines
  const ndjson = data.map(item => JSON.stringify(item)).join('\n');
  saveFile(`${key}.ndjson`, ndjson);

  // 7. BSON
  try {
    // BSON requires a root document, usually. We'll serialize the array wrapped in an object or just the array if supported.
    // Wrapping in an object { data: [...] } is safer for BSON tools.
    const bsonData = BSON.serialize({ data: data });
    saveFile(`${key}.bson`, bsonData, true);
  } catch (err) {
    console.error(`Error generating BSON for ${key}`, err);
  }
};

// --- MAIN EXECUTION ---

const main = () => {
  console.log('🚀 Starting Data Generation...');
  
  if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Generating Users...');
  const users = generateUsers(COUNTS.users);
  generateFormats('users', users);

  console.log('Generating Posts...');
  const posts = generatePosts(COUNTS.posts, users);
  generateFormats('posts', posts);

  console.log('Generating Comments...');
  const comments = generateComments(COUNTS.comments, posts);
  generateFormats('comments', comments);

  console.log('Generating Todos...');
  const todos = generateTodos(COUNTS.todos, users);
  generateFormats('todos', todos);

  console.log('Generating Photos...');
  const photos = generatePhotos(COUNTS.photos);
  generateFormats('photos', photos);

  console.log('Generating GraphQL Schema...');
  const schema = `
    type User { id: ID!, name: String!, username: String!, email: String! }
    type Post { id: ID!, title: String!, body: String!, userId: ID! }
    type Comment { id: ID!, name: String!, email: String!, body: String!, postId: ID! }
    type Query {
      users: [User]
      posts: [Post]
      comments: [Comment]
    }
  `;
  saveFile('schema.graphql', schema);

  console.log('✅ Data Generation Complete! Files are in public/api/v1/');
};

main();
