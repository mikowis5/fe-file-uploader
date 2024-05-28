import { Atom, atom } from 'jotai';
import { FileData } from './Components/Files/FileData';

export const usernameAtom = atom('');
export const emailAtom = atom('');
export const filesAtom = atom([]);
export const uploadingFilesAtom = atom([]);
