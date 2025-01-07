import fs from 'fs';


// Create function that copy assets from each folder in src to dist folder according to the folder name
export const copyAssets = () => {
    const src = './src';
    const dist = './dist';
    const folders = fs.readdirSync(src);
    folders.forEach(folder => {
        if (fs.statSync(`${src}/${folder}`).isDirectory()) {
            fs.readdirSync(`${src}/${folder}`).forEach(file => {
                if (file.endsWith('.txt')) {
                    if(fs.existsSync(`${dist}/${folder}`) === false) {
                        fs.mkdirSync(`${dist}/${folder}`);
                    }
                    fs.copyFileSync(`${src}/${folder}/${file}`, `${dist}/${folder}/${file}`);
                }
            });
        }
    });
}


copyAssets();