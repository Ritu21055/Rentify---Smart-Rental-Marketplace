import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from "./routes/productRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js";

// Fail immediately when the database is down instead of buffering commands for 10s.
mongoose.set('bufferCommands', false);

const app = express();

app.use(cors());
app.use(express.json());

function redactMongoMessage(message = '') {
    return String(message).replace(/mongodb(?:\+srv)?:\/\/\S+/gi, 'mongodb://[redacted]');
}

function describeMongoTarget(uri) {
    try {
        const parsed = new URL(uri);
        const protocol = parsed.protocol.replace(':', '');
        const database = decodeURIComponent(parsed.pathname.replace(/^\//, '').split('/')[0] || '');
        if (protocol !== 'mongodb' && protocol !== 'mongodb+srv') {
            return null;
        }
        if (!parsed.hostname || !parsed.username || !parsed.password) {
            return null;
        }
        return {
            protocol,
            host: parsed.hostname,
            database: database || '(none)',
        };
    } catch {
        return null;
    }
}

function requireDatabase(req, res, next) {
    if (mongoose.connection.readyState === 1) {
        return next();
    }

    return res.status(503).json({
        message: 'Database is unavailable. The server could not connect to MongoDB.',
    });
}

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/users", requireDatabase, userRoutes);
app.use("/api/products", requireDatabase, productRoutes);
app.use("/api/bookings", requireDatabase, bookingRoutes);

async function connectDatabase() {
    const uri = process.env.MONGO_URI?.trim();

    if (!uri) {
        console.error('MongoDB connection failed: MONGO_URI is not set.');
        return false;
    }

    const target = describeMongoTarget(uri);
    if (!target) {
        console.error('MongoDB connection failed: MONGO_URI is malformed. Expected a mongodb:// or mongodb+srv:// connection string with a username, password, host, and database name.');
        return false;
    }

    console.log(`Connecting to MongoDB (protocol: ${target.protocol}, host: ${target.host}, database: ${target.database})`);

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log(`MongoDB connected (host: ${mongoose.connection.host}, database: ${mongoose.connection.name})`);
        return true;
    } catch (err) {
        console.error('MongoDB connection failed:', redactMongoMessage(err.message));
        return false;
    }
}

async function start() {
    const connected = await connectDatabase();
    if (!connected) {
        console.error('Starting API without a database connection. Database routes will return 503 until MongoDB is reachable.');
    }

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`server running on port ${port}`));
}

start();
