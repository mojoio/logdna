import { expect, tap } from '@pushrocks/tapbundle';
import * as logdna from '../ts/index'

tap.test('first test', async () => {
  console.log(logdna.standardExport)
})

tap.start()
