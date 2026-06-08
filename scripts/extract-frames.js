/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const ffmpegPath = ffmpeg.path;
console.log('Using FFmpeg from:', ffmpegPath);

const projectRoot = path.join(__dirname, '..');
const videos = [
  {
    input: path.join(projectRoot, 'public', 'videos', 'background1.mp4'),
    outputDir: path.join(projectRoot, 'public', 'frames', 'background1'),
    name: 'background1'
  },
  {
    input: path.join(projectRoot, 'public', 'videos', 'background2.mp4'),
    outputDir: path.join(projectRoot, 'public', 'frames', 'background2'),
    name: 'background2'
  }
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function runFFmpeg(args) {
  return new Promise((resolve, reject) => {
    execFile(ffmpegPath, args, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function extractAndClean(video) {
  console.log(`\n--- Processing ${video.name} ---`);
  ensureDir(video.outputDir);

  // Clear existing files in output dir first
  const existingFiles = fs.readdirSync(video.outputDir);
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(video.outputDir, file));
  }

  // Extract frames at 30 fps (10 seconds * 30 fps = 300 frames)
  // We scale background2 to 1920 width, background1 to 1280 (match their source resolutions for max fidelity)
  const isBg2 = video.name === 'background2';
  const scaleFilter = isBg2 ? 'scale=1920:-1' : 'scale=1280:-1';
  
  console.log('Extracting frames via FFmpeg...');
  const tempPattern = path.join(video.outputDir, 'temp_%04d.webp');
  
  await runFFmpeg([
    '-i', video.input,
    '-vf', `fps=30,${scaleFilter}`,
    '-c:v', 'libwebp',
    '-quality', '75', // 75 is a great balance of size and quality for WebP
    '-y',
    tempPattern
  ]);

  // Read the generated temp files
  let files = fs.readdirSync(video.outputDir)
    .filter(f => f.startsWith('temp_'))
    .sort();

  console.log(`FFmpeg generated ${files.length} frames.`);

  // Ensure we have exactly 300 frames
  const TARGET_COUNT = 300;
  if (files.length > TARGET_COUNT) {
    // If we have extra frames, delete the last few
    console.log(`Deleting ${files.length - TARGET_COUNT} extra frame(s)...`);
    while (files.length > TARGET_COUNT) {
      const extraFile = files.pop();
      fs.unlinkSync(path.join(video.outputDir, extraFile));
    }
  } else if (files.length < TARGET_COUNT) {
    // If we have fewer than 300 frames, duplicate the last frame
    console.log(`Duplicating last frame to reach ${TARGET_COUNT}...`);
    const lastFile = files[files.length - 1];
    const lastFilePath = path.join(video.outputDir, lastFile);
    let count = files.length;
    while (count < TARGET_COUNT) {
      const newName = `temp_${String(count + 1).padStart(4, '0')}.webp`;
      fs.copyFileSync(lastFilePath, path.join(video.outputDir, newName));
      files.push(newName);
      count++;
    }
  }

  // Now rename them sequentially to 0-indexed: frame_000.webp through frame_299.webp
  console.log('Renaming to 0-indexed seq (frame_000.webp - frame_299.webp)...');
  for (let i = 0; i < TARGET_COUNT; i++) {
    const oldName = files[i];
    const newName = `frame_${String(i).padStart(3, '0')}.webp`;
    fs.renameSync(
      path.join(video.outputDir, oldName),
      path.join(video.outputDir, newName)
    );
  }

  console.log(`Done! ${video.name} has exactly 300 frames.`);
}

async function main() {
  try {
    for (const video of videos) {
      await extractAndClean(video);
    }
    console.log('\nAll frame extractions completed successfully!');
  } catch (err) {
    console.error('Extraction failed:', err);
    process.exit(1);
  }
}

main();
