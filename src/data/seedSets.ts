import { WordSet } from '../domain/types';
import en from './sets/en';
import de from './sets/de';
import zh from './sets/zh';
import es from './sets/es';
import fr from './sets/fr';
import ja from './sets/ja';

// Aggregated starter dictionaries. Each language lives in its own file under
// ./sets/{code}.ts so sub-agents can expand them independently without conflicts.
export const SEED_SETS: WordSet[] = [...en, ...de, ...zh, ...es, ...fr, ...ja];

export default SEED_SETS;
