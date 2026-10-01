import * as migration_20260724_005630_add_merch_global_and_intro_text from './20260724_005630_add_merch_global_and_intro_text'
import * as migration_20260818_003440 from './20260818_003440'
import * as migration_20260924_012623 from './20260924_012623'
import * as migration_20261001_112357 from './20261001_112357'
import * as migration_20261001_113525 from './20261001_113525'

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
    up: migration_20260924_012623.up,
    down: migration_20260924_012623.down,
    name: '20260924_012623',
  },
  {
    up: migration_20261001_112357.up,
    down: migration_20261001_112357.down,
    name: '20261001_112357',
  },
  {
    up: migration_20261001_113525.up,
    down: migration_20261001_113525.down,
    name: '20261001_113525',
  },
]
