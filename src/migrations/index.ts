import * as migration_20260724_005630_add_merch_global_and_intro_text from './20260724_005630_add_merch_global_and_intro_text'
import * as migration_20260818_003440 from './20260818_003440'
import * as migration_20260924_012623 from './20260924_012623'
import * as migration_20261007_234345_add_merch_content_global from './20261007_234345_add_merch_content_global'
import * as migration_20261118_081432_add_membership_global from './20261118_081432_add_membership_global'
import * as migration_20261119_212851_add_site_settings from './20261119_212851_add_site_settings'

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
    up: migration_20261007_234345_add_merch_content_global.up,
    down: migration_20261007_234345_add_merch_content_global.down,
    name: '20261007_234345_add_merch_content_global',
  },
  {
    up: migration_20261118_081432_add_membership_global.up,
    down: migration_20261118_081432_add_membership_global.down,
    name: '20261118_081432_add_membership_global',
  },
  {
    up: migration_20261119_212851_add_site_settings.up,
    down: migration_20261119_212851_add_site_settings.down,
    name: '20261119_212851_add_site_settings',
  },
]
