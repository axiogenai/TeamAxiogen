const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const ffmpegPath = ffmpeg.path;
console.log('Using FFmpeg from:', ffmpegPath);

const projectRoot = path.resolve(__dirname, '..');
const FRAMES_PER_VIDEO = 300;

const videos = [
  { input: path.join(projectRoot, 'public/video/background1.mp4'), outputDir: path.join(projectRoot, 'public/frames/background1') },
  { input: path.join(projectRoot, 'public/video/background2.mp4'), outputDir: path.join(projectRoot, 'public/frames/background2') },
];

// Get video duration using ffmpeg
function getDuration(inputPath) {
  return new Promise((resolve, reject) => {
    execFile(ffmpegPath, ['-i', inputPath], { encoding: 'utf8' }, (err, stdout, stderr) => {
      const output = stderr || stdout || '';
      const match = output.match(/Duration:\s*(\d+):(\d+):(\d+)\.(\d+)/);
      if (match) {
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const seconds = parseInt(match[3]);
        const centiseconds = parseInt(match[4]);
        resolve(hours * 3600 + minutes * 60 + seconds + centiseconds / 100);
      } else {
        reject(new Error('Could not parse duration from: ' + output.substring(0, 500)));
      }
    });
  });
}

// Extract frames using ffmpeg
function extractFrames(inputPath, outputDir, fps) {
  return new Promise((resolve, reject) => {
    // Create output dir
    fs.mkdirSync(outputDir, { recursive: true });

    const outputPattern = path.join(outputDir, 'frame_%03d.webp');

    const args = [
      '-i', inputPath,
      '-vf', `fps=${fps}`,
      '-c:v', 'libwebp',
      '-quality', '75',
      '-compression_level', '4',
      '-preset', 'photo',
      outputPattern,
      '-y'
    ];

    console.log(`\nExtracting frames from ${path.basename(inputPath)}...`);
    console.log(`  FPS: ${fps}, Output: ${outputDir}`);

    const proc = execFile(ffmpegPath, args, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err && err.code !== 0) {
        console.error('FFmpeg error:', stderr?.substring(0, 500));
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Rename frames to be 0-indexed (ffmpeg starts at 1)
function renameFrames(outputDir, expectedCount) {
  const files = fs.readdirSync(outputDir)
    .filter(f => f.startsWith('frame_') && f.endsWith('.webp'))
    .sort();
  
  console.log(`  Found ${files.length} frames in ${path.basename(outputDir)}`);

  // Rename from 1-indexed to 0-indexed
  for (let i = 0; i < files.length; i++) {
    const oldPath = path.join(outputDir, files[i]);
    const newName = `frame_${String(i).padStart(3, '0')}.webp`;
    const newPath = path.join(outputDir, newName);
    if (oldPath !== newPath) {
      // Use a temp name to avoid collisions
      const tmpPath = path.join(outputDir, `_tmp_${i}.webp`);
      fs.renameSync(oldPath, tmpPath);
    }
  }
  // Second pass: rename from temp to final
  const tmpFiles = fs.readdirSync(outputDir).filter(f => f.startsWith('_tmp_')).sort();
  for (const tmpFile of tmpFiles) {
    const idx = parseInt(tmpFile.replace('_tmp_', '').replace('.webp', ''));
    const finalName = `frame_${String(idx).padStart(3, '0')}.webp`;
    fs.renameSync(path.join(outputDir, tmpFile), path.join(outputDir, finalName));
  }

  const finalFiles = fs.readdirSync(outputDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp'));
  console.log(`  Final frame count: ${finalFiles.length} (expected: ${expectedCount})`);
}

async function main() {
  console.log('=== Frame Extraction Script ===\n');

  for (const video of videos) {
    try {
      const duration = await getDuration(video.input);
      console.log(`\n${path.basename(video.input)}: Duration = ${duration.toFixed(2)}s`);

      // Calculate FPS to get exactly FRAMES_PER_VIDEO frames
      const fps = FRAMES_PER_VIDEO / duration;
      console.log(`  Target: ${FRAMES_PER_VIDEO} frames → FPS = ${fps.toFixed(4)}`);

      await extractFrames(video.input, video.outputDir, fps.toFixed(4));
      renameFrames(video.outputDir, FRAMES_PER_VIDEO);

      console.log(`  ✅ Done: ${path.basename(video.input)}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${path.basename(video.input)}:`, err.message);
    }
  }

  console.log('\n=== All extractions complete ===');
}

main();
