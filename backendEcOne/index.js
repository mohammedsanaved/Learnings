const express = require('express');
const pool = require('./db');
const jwt = require('jsonwebtoken');
const app = express();

const bcrypt = require('bcrypt');
const asyncHandler = require('./utils/asyncHandler');
const JWT_SECRET = require('./config');

const authenticate = require('./middleware/authenticate');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// health check route instead of a startup-time query
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.post(
  '/auth/register',
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: 'Username, email, and password are required' });
    }
    // try {
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   const result = await pool.query(
    //     `
    //     INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, email, password
    //   `,
    //     [username, email, hashedPassword],
    //   );
    //   res.setHeader('Content-Type', 'application/json');

    //   const user = result.rows[0];
    //   console.log('User created:', user);
    //   res.status(201).json(user);
    // } catch (err) {
    //   console.error('Error creating user:', err);
    //   if (err.code === '23505') {
    //     const field = err.detail?.includes('username') ? 'username' : 'email';
    //     return res.status(409).json({ error: `${field} already exists` });
    //   }
    //   console.error(err);
    //   res.status(500).json({ error: 'Internal server error' });
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `
        INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, email, password 
      `,
      [username, email, hashedPassword],
    );
    res.setHeader('Content-Type', 'application/json');

    const user = result.rows[0];
    console.log('User created:', user);
    res.status(201).json(user);
  }),
);

app.post(
  '/auth/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [
        email,
      ]);
      console.log('Login query result:', result);
      const user = result.rows[0];

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        token,
        user: { userId: user.id, email: user.email, username: user.username },
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }),
);

app.get(
  '/users',
  asyncHandler(async (req, res) => {
    // try {
    //   const result = await pool.query('SELECT * FROM users');
    //   res.setHeader('Content-Type', 'application/json');
    //   res.status(200).json(result.rows);
    // } catch (err) {
    //   res.status(500).json({ error: err.message });
    // }
    const result = await pool.query('SELECT * FROM users');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result.rows);
  }),
);

app.post(
  '/products',
  asyncHandler(async (req, res) => {
    const { name, description, price, userId } = req.body;

    const result = await pool.query(
      `
        INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING id, name, description, price, user_id 
      `,
      [name, description, price, userId],
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(result.rows[0]);

    // try {
    //   const result = await pool.query(
    //     `
    //     INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING id, name, description, price, user_id
    //   `,
    //     [name, description, price, userId],
    //   );
    //   res.setHeader('Content-Type', 'application/json');
    //   res.status(201).json(result.rows[0]);
    // } catch (err) {
    //   res.status(500).json({ error: err.message });
    // }
  }),
);

app.get(
  '/products',
  authenticate,
  asyncHandler(async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM products`);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }),
);
app.delete(
  '/products/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM products WHERE id = $1 RETURNING *`,
      [id],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.log('Deleted product:', result.rows[0]);
    res.status(200).json(result.rows[0]);
  }),
);

app.get(
  '/products/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(`SELECT * FROM products WHERE id = $1`, [
        id,
      ]);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }),
);

app.get(
  '/products-test',
  authenticate,
  asyncHandler(async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT * FROM products WHERE price >= $1 ORDER BY created_at ASC LIMIT $2 OFFSET $3`,
        [100, 2, 0],
      );
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }),
);
app.get('/products-dynamic', async (req, res) => {
  const { price } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM products WHERE price >= $1 ORDER BY created_at ASC LIMIT $2 OFFSET $3`,
      [price, 3, 0],
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get(
  '/products-dynamic-offset',
  asyncHandler(async (req, res) => {
    //   const { price, offset, limit } = req.query;
    const page = parseInt(req.query.offset) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const price = parseFloat(req.query.price) || 0;
    const offset = (page - 1) * limit;
    // try {
    //   const result = await pool.query(
    //     `SELECT * FROM products WHERE price >= $1 ORDER BY created_at ASC LIMIT $2 OFFSET $3`,
    //     [price, limit, offset],
    //   );
    //   res.setHeader('Content-Type', 'application/json');
    //   res.status(200).json(result.rows);
    // } catch (error) {
    //   res.status(500).json({ error: error.message });
    // }
    const result = await pool.query(
      `SELECT * FROM products WHERE price >= $1 ORDER BY created_at ASC LIMIT $2 OFFSET $3`,
      [price, limit, offset],
    );
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result.rows);
  }),
);
app.get('/products-dynamic-optional-filter', async (req, res) => {
  const { description, minPrice, maxPrice } = req.query;
  const conditions = [];
  const values = [];
  let i = 1;

  if (description) {
    conditions.push(`description ILIKE $${i}`);
    values.push(`%${description}%`);
    i++;
  }
  if (minPrice) {
    conditions.push(`price >= $${i}`);
    values.push(minPrice);
    i++;
  }
  if (maxPrice) {
    conditions.push(`price <= $${i}`);
    values.push(maxPrice);
    i++;
  }
  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT * FROM products ${whereClause} ORDER BY created_at ASC;
  `;
  console.log(query, values);
  try {
    const result = await pool.query(query, values);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// app.put(
//   '/products/:id',
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { name, description, price } = req.body;
//     console.log(req.body === undefined, '----------------------req.body');
//     if (!name || !description || !price) {
//       return res
//         .status(400)
//         .json({ error: 'Name, description, and price are required' });
//     }
//     res.setHeader('Content-Type', 'application/json');
//     console.log(name, description, price, id, '----------------------');
//     const result = await pool.query(
//       `UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *`,
//       [name, description, price, id],
//     );
//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(result.rows[0]);
//   }),
// );
app.put(
  '/products/:id',
  asyncHandler(async (req, res) => {
    console.log('======================');
    console.log('METHOD:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('CONTENT TYPE:', req.headers['content-type']);
    console.log('BODY:', req.body);
    console.log('======================');

    res.setHeader('Content-Type', 'application/json');

    const { id } = req.params;
    if (!req.body) {
      return res.status(400).json({
        error: 'Request body is required',
      });
    }

    const { name, description, price } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({
        error: 'Name, description, and price are required',
      });
    }

    const result = await pool.query(
      `UPDATE products
       SET name = $1, description = $2, price = $3
       WHERE id = $4
       RETURNING *`,
      [name, description, price, id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }

    res.status(200).json(result.rows[0]);
  }),
);
app.listen(3000, () => console.log(`Server running on port 3000`));
