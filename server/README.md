# Transit Pass Server

Express.js server with MongoDB integration for the Odisha Form-Y Transit Pass system.

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file with MongoDB connection string:
   ```
   MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/"
   PORT=3000
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or with nodemon (auto-reload):
   ```bash
   npm run dev
   ```

## API Endpoints

### Create Transit Pass
- **POST** `/api/transit-pass/create`
- Request body: Form data (book, fromDT, toDT, dest, route, permit, etc.)
- Response: Created pass object with ID

### Get All Transit Passes
- **GET** `/api/transit-pass/all`
- Response: Array of all transit passes

### Get Transit Pass by ID
- **GET** `/api/transit-pass/:id`
- Response: Single transit pass object

### Update Transit Pass
- **PUT** `/api/transit-pass/:id`
- Request body: Updated fields
- Response: Updated transit pass object

### Delete Transit Pass
- **DELETE** `/api/transit-pass/:id`
- Response: Deleted pass object

### Health Check
- **GET** `/api/health`
- Response: Server status

## Database Schema

```javascript
{
  passNo: String,
  book: String,
  fromDateTime: Date,
  toDateTime: Date,
  circle: String,
  quarry: String,
  licensee: String,
  destination: String,
  route: String,
  mineral: String,
  permitNo: String,
  permitDate: Date,
  quantity: String,
  vehicle: String,
  length: String,
  breadth: String,
  height: String,
  cubicContent: String,
  grossWeight: String,
  tareWeight: String,
  mineralWeight: String,
  createdAt: Date,
  updatedAt: Date
}
```
