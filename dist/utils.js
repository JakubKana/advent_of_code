import { fileURLToPath } from 'url';
import path from 'path';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export { filename, dirname };
//# sourceMappingURL=utils.js.map