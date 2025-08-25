#!/usr/bin/env node

/**
 * Generic Node.js app server template for uprootiny.dev subprojects
 * Serves static files and provides API endpoints
 */

const express = require('express');
const path = require('path');
const { exec } = require('child_process');

// Configuration from environment or defaults
const PORT = process.env.PORT || 3002;
const STATIC_DIR = process.env.STATIC_DIR || path.join(__dirname, 'public');
const PROJECT_NAME = process.env.PROJECT_NAME || path.basename(__dirname);

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(STATIC_DIR));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    project: PROJECT_NAME,
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Build trigger
app.post('/api/rebuild', (req, res) => {
  const buildScript = path.join(__dirname, 'build.sh');
  exec(`bash ${buildScript}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        stderr: stderr
      });
    } else {
      res.json({
        success: true,
        output: stdout,
        message: `${PROJECT_NAME} rebuilt successfully`
      });
    }
  });
});

// Project manifest
app.get('/api/manifest', (req, res) => {
  try {
    const manifestPath = path.join(__dirname, 'manifest.json');
    const manifest = require(manifestPath);
    res.json(manifest);
  } catch (error) {
    res.status(404).json({
      error: 'No manifest.json found',
      project: PROJECT_NAME
    });
  }
});

// Catch-all for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(STATIC_DIR, 'index.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 ${PROJECT_NAME} server running on http://127.0.0.1:${PORT}`);
  console.log(`📁 Serving static files from: ${STATIC_DIR}`);
});

module.exports = app;