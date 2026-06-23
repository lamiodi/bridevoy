import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = 'public';

const tasks = [
    {
        label: 'Meet BrideVoy intro image',
        input: 'ChatGPT Image May 25, 2026, 03_13_14 PM.png',
        output: 'meet-bridevoy.webp',
        transform: (image) => image.webp({ quality: 80 }),
    },
    {
        label: 'Signature image',
        input: 'Jun 7, 2026, 10_08_21 AM.png',
        output: 'signature.webp',
        transform: (image) => image.webp({ quality: 90 }),
    },
];

async function runTask(task) {
    const inputPath = path.join(PUBLIC_DIR, task.input);
    const outputPath = path.join(PUBLIC_DIR, task.output);

    if (!fs.existsSync(inputPath)) {
        console.warn(`Skipping ${task.label}: source file not found (${task.input})`);
        return;
    }

    console.log(`Optimizing ${task.label}...`);
    await task.transform(sharp(inputPath)).toFile(outputPath);
}

async function optimize() {
    try {
        console.log('Starting image optimization...');
        for (const task of tasks) {
            await runTask(task);
        }
        console.log('Image optimization complete!');
    } catch (err) {
        console.error('Error during image optimization:', err);
        process.exitCode = 1;
    }
}

optimize();
