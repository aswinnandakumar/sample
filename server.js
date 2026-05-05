const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOSTNAME = 'localhost';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Default to index.html for root path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // Prevent directory traversal
    const realPath = path.resolve(filePath);
    const realDir = path.resolve(__dirname);
    
    if (!realPath.startsWith(realDir)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }

    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Check if file exists
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // If not found, try index.html
            if (req.url !== '/' && !ext) {
                filePath = path.join(__dirname, 'index.html');
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('404 Not Found');
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.end(data);
                    }
                });
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('404 Not Found');
            }
            return;
        }

        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('500 Server Error');
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'no-cache');
            res.end(data);
        });
    });
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`
╔════════════════════════════════════════╗
║   💰 Expense Tracker Server Running    ║
╠════════════════════════════════════════╣
║                                        ║
║  🌐 Open: http://${HOSTNAME}:${PORT}    ║
║                                        ║
║  Press Ctrl+C to stop the server      ║
║                                        ║
╚════════════════════════════════════════╝
    `);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.error('Try running: netstat -ano | findstr :3000 (Windows)');
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('\n✋ Server stopping...');
    server.close(() => {
        console.log('👋 Server stopped');
        process.exit(0);
    });
});
