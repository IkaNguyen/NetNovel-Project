const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Sử dụng PORT từ biến môi trường nếu có

// --- Kết nối tới MongoDB ---
mongoose.connect('mongodb://localhost:27017/Manga')
    .then(() => console.log('MongoDB connected successfully to Manga database.'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        // Cân nhắc thoát ứng dụng nếu không kết nối được DB
        // process.exit(1);
    });

// --- Tạo Schema và Model cho Comic Item ---
const ComicSchema = new mongoose.Schema({
  title: String,
  author: String,
  genres: [String],
  coverImage: String,     // ✅ THÊM VÀO
  description: String,    // ✅ THÊM VÀO
  chapters: [
    {
      chapter_number: Number,
      title: String,
      pages: [String],
      release_date: Date,
      _id: false
    }
  ],
  status: String
}, { timestamps: true });


const Comic = mongoose.model('Comic', ComicSchema, 'index');

// --- Middleware ---
app.use(cors()); // Cho phép Cross-Origin Resource Sharing
app.use(express.json()); // Middleware để parse JSON request bodies (thay thế cho bodyParser.json())
app.use(express.urlencoded({ extended: true })); // Middleware để parse URL-encoded request bodies

// --- API Endpoints ---

// GET: Lấy danh sách tất cả truyện
app.get("/index", async (req, res) => {
    try {
        const comics = await Comic.find();
        if (!comics || comics.length === 0) {
            return res.status(404).json({ message: 'No comics found.' });
        }
        res.json(comics);
    } catch (error) {
        console.error("Error fetching comics:", error);
        res.status(500).json({ message: 'Error fetching comics', error: error.message });
    }
});

// GET: Lấy một truyện cụ thể bằng ID
app.get("/index/:id", async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) {
            return res.status(404).json({ message: 'Comic not found with id: ' + req.params.id });
        }
        res.json(comic);
    } catch (error) {
        console.error(`Error fetching comic with id ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') { // Xử lý lỗi nếu ID không đúng định dạng ObjectId
             return res.status(400).json({ message: 'Invalid comic ID format' });
        }
        res.status(500).json({ message: 'Error fetching comic', error: error.message });
    }
});


// POST: Thêm truyện mới
app.post("/index", async (req, res) => {
    try {
        // Kiểm tra các trường bắt buộc (ví dụ: title)
        if (!req.body.title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newComic = new Comic(req.body);
        await newComic.save();
        res.status(201).json(newComic); // 201 Created là status code phù hợp hơn
    } catch (error) {
        console.error("Error adding comic:", error);
        // Phân biệt lỗi validation và lỗi server
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).json({ message: 'Error adding comic', error: error.message });
    }
});

// PUT: Cập nhật truyện bằng ID
app.put("/index/:id", async (req, res) => {
    try {
        const updatedComic = await Comic.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Trả về document đã được cập nhật
            runValidators: true // Chạy validators của Schema khi cập nhật
        });
        if (!updatedComic) {
            return res.status(404).json({ message: 'Comic not found with id: ' + req.params.id });
        }
        res.json(updatedComic);
    } catch (error) {
        console.error(`Error updating comic with id ${req.params.id}:`, error);
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ message: 'Invalid comic ID format' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).json({ message: 'Error updating comic', error: error.message });
    }
});

// DELETE: Xóa truyện bằng ID
app.delete("/index/:id", async (req, res) => {
    try {
        const deletedComic = await Comic.findByIdAndDelete(req.params.id);
        if (!deletedComic) {
            return res.status(404).json({ message: 'Comic not found with id: ' + req.params.id + ' for deletion.' });
        }
        res.json({ message: "Comic deleted successfully", deletedComic });
    } catch (error) {
        console.error(`Error deleting comic with id ${req.params.id}:`, error);
         if (error.kind === 'ObjectId') {
             return res.status(400).json({ message: 'Invalid comic ID format' });
        }
        res.status(500).json({ message: 'Error deleting comic', error: error.message });
    }
});
// API để xóa chương bằng index
// API để xóa chương bằng index
app.delete("/index/:comicId/chapter/:chapterIndex", async (req, res) => {
    try {
        const { comicId, chapterIndex } = req.params;
        const comic = await Comic.findById(comicId);
        
        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }

        if (chapterIndex >= comic.chapters.length || chapterIndex < 0) {
            return res.status(400).json({ message: 'Invalid chapter index' });
        }

        // Xóa chương tại chapterIndex
        comic.chapters.splice(chapterIndex, 1);  // Xóa chương tại chỉ số chapterIndex
        await comic.save(); // Lưu lại thay đổi vào cơ sở dữ liệu

        res.json({ message: 'Chapter deleted successfully', comic });
    } catch (error) {
        console.error('Error deleting chapter:', error);
        res.status(500).json({ message: 'Error deleting chapter', error: error.message });
    }
});

// GET: Tìm kiếm truyện theo tiêu đề
app.get('/search', async (req, res) => {
    const { q } = req.query;
  
    try {
      if (!q) {
        return res.status(400).json({ message: 'Missing search query (q)' });
      }
  
      // Tìm truyện có tiêu đề chứa từ khóa (không phân biệt chữ hoa/thường)
      const regex = new RegExp(q, 'i');
      const results = await Comic.find({ title: { $regex: regex } });
  
      res.json(results);
    } catch (error) {
      console.error('Error searching comics:', error);
      res.status(500).json({ message: 'Error searching comics', error: error.message });
    }
  });
  
// --- Bắt đầu server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.stack);
    res.status(500).send('Something broke!');
});