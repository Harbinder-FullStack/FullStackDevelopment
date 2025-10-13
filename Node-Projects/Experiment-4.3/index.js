// app.js
import express, { json } from 'express';
import listEndpoints from 'express-list-endpoints';
import seatRoutes from './routes.js';

const app = express();
app.use(json());
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});


// Mount routes
app.use('/', seatRoutes);

// Health check
app.get('/health', (_, res) => res.json({ ok: true }));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
    console.table(listEndpoints(seatRoutes));  // Pretty print as table
});
