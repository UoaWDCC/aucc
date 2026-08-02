import * as migration_20260724_005630_add_merch_global_and_intro_text from './20260724_005630_add_merch_global_and_intro_text'

export const migrations = [
  {
    up: migration_20260724_005630_add_merch_global_and_intro_text.up,
    down: migration_20260724_005630_add_merch_global_and_intro_text.down,
    name: '20260724_005630_add_merch_global_and_intro_text',
  },
]
