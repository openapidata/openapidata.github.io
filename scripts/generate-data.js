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
  users: 100,
  posts: 500,
  comments: 2000,
  todos: 300,
  photos: 500,
  products: 200,
  orders: 150,
  carts: 50,
  post_categories: 10,
  product_categories: 15,
  notes: 100,
  payments: 150
};

// --- DATA GENERATORS ---

const generateUsers = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(['admin', 'user', 'editor']),
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

const generatePostCategories = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: faker.lorem.word(),
    slug: faker.lorem.slug(),
    description: faker.lorem.sentence()
  }));
};

const generatePosts = (count, users, categories) => {
  return Array.from({ length: count }).map((_, i) => ({
    userId: faker.helpers.arrayElement(users).id,
    id: i + 1,
    categoryId: faker.helpers.arrayElement(categories).id,
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    tags: [faker.lorem.word(), faker.lorem.word()],
    reactions: faker.number.int({ min: 0, max: 100 })
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

const generateProductCategories = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: faker.commerce.department(),
    image: faker.image.urlLoremFlickr({ category: 'business' })
  }));
};

const generateProducts = (count, categories) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.helpers.arrayElement(categories).name,
    image: faker.image.urlLoremFlickr({ category: 'products' }),
    rating: {
      rate: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      count: faker.number.int({ min: 1, max: 500 })
    }
  }));
};

const generateOrders = (count, users, products) => {
  return Array.from({ length: count }).map((_, i) => {
    const orderProducts = faker.helpers.arrayElements(products, faker.number.int({ min: 1, max: 5 }));
    const total = orderProducts.reduce((sum, p) => sum + p.price, 0);
    
    return {
      id: i + 1,
      userId: faker.helpers.arrayElement(users).id,
      date: faker.date.recent(),
      products: orderProducts.map(p => ({
        productId: p.id,
        quantity: faker.number.int({ min: 1, max: 3 })
      })),
      total: parseFloat(total.toFixed(2)),
      status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    };
  });
};

const generateCarts = (count, users, products) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    userId: faker.helpers.arrayElement(users).id,
    date: faker.date.recent(),
    products: faker.helpers.arrayElements(products, 3).map(p => ({
      productId: p.id,
      quantity: faker.number.int({ min: 1, max: 5 })
    }))
  }));
};

const generatePayments = (count, orders) => {
  return Array.from({ length: count }).map((_, i) => {
    const order = faker.helpers.arrayElement(orders);
    return {
      id: i + 1,
      orderId: order.id,
      method: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer']),
      amount: order.total,
      currency: 'USD',
      status: faker.helpers.arrayElement(['succeeded', 'failed', 'pending']),
      transactionId: faker.string.uuid()
    };
  });
};

const generateNotes = (count, users) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    userId: faker.helpers.arrayElement(users).id,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(1),
    date: faker.date.recent(),
    tags: [faker.lorem.word(), faker.color.human()]
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

  // Base Resources
  const users = generateUsers(COUNTS.users);
  generateFormats('users', users);

  const postCategories = generatePostCategories(COUNTS.post_categories);
  generateFormats('post_categories', postCategories);

  const productCategories = generateProductCategories(COUNTS.product_categories);
  generateFormats('product_categories', productCategories);

  // Dependent Resources
  const posts = generatePosts(COUNTS.posts, users, postCategories);
  generateFormats('posts', posts);

  const comments = generateComments(COUNTS.comments, posts);
  generateFormats('comments', comments);

  const products = generateProducts(COUNTS.products, productCategories);
  generateFormats('products', products);

  const carts = generateCarts(COUNTS.carts, users, products);
  generateFormats('carts', carts);

  const orders = generateOrders(COUNTS.orders, users, products);
  generateFormats('orders', orders);

  const payments = generatePayments(COUNTS.payments, orders);
  generateFormats('payments', payments);

  const notes = generateNotes(COUNTS.notes, users);
  generateFormats('notes', notes);

  const todos = generateTodos(COUNTS.todos, users);
  generateFormats('todos', todos);

  const photos = generatePhotos(COUNTS.photos);
  generateFormats('photos', photos);

  // Generate GraphQL Schema
  const schema = `
    type User { id: ID!, name: String!, username: String!, email: String!, role: String! }
    type Post { id: ID!, title: String!, body: String!, userId: ID!, categoryId: ID! }
    type Comment { id: ID!, name: String!, email: String!, body: String!, postId: ID! }
    type Product { id: ID!, title: String!, price: Float!, category: String!, rating: Rating }
    type Rating { rate: Float, count: Int }
    type Order { id: ID!, userId: ID!, total: Float!, status: String! }
    type Query {
      users: [User]
      posts: [Post]
      comments: [Comment]
      products: [Product]
      orders: [Order]
    }
  `;
  saveFile('schema.graphql', schema);

  console.log('✅ Data Generation Complete! Files are in public/api/v1/');
};

main();