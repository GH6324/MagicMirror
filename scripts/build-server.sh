# Build Server
python -m nuitka --standalone \
  --include-data-files="src-python/models/*.onnx=models/" \
  --output-dir=out src-python/server.py

# Zip Files
node scripts/zip-server.js