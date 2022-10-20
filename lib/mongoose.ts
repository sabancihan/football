import  mongoose  from 'mongoose';

const uri = process.env.MONGODB_URI as string; // your mongodb connection string
const options = {}

let client;
let clientPromise: Promise<any>;

declare global {
  var _mongoosePromise: Promise<any>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose.connect(uri, options);
  }
  clientPromise = global._mongoosePromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = mongoose.connect(uri, options);
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
