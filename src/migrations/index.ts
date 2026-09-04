import * as migration_20260724_005630_add_merch_global_and_intro_text from './20260724_005630_add_merch_global_and_intro_text'
import * as migration_20260818_003440 from './20260818_003440'
import * as migration_20260818_020412 from './20260818_020412'

export const migrations = [
  {
    up: migration_20260724_005630_add_merch_global_and_intro_text.up,
    down: migration_20260724_005630_add_merch_global_and_intro_text.down,
    name: '20260724_005630_add_merch_global_and_intro_text',
  },
  {
    up: migration_20260818_003440.up,
    down: migration_20260818_003440.down,
    name: '20260818_003440',
  },
  {
    up: migration_20260818_020412.up,
    down: migration_20260818_020412.down,
    name: '20260818_020412',
  },
]
