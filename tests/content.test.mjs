import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { loadContent, validateContent } from '../src/load-content.js'

const names = ['es', 'en', 'tarifas', 'horarios']
const source = Object.fromEntries(await Promise.all(names.map(async name =>
  [name, JSON.parse(await readFile(`public/data/${name}.json`, 'utf8'))],
)))

test('All four editable JSON files are copied unchanged to production', async () => {
  for (const name of names) {
    assert.equal(await readFile(`dist/data/${name}.json`, 'utf8'), await readFile(`public/data/${name}.json`, 'utf8'))
  }
  assert.equal(validateContent(source), source)
})

test('The browser entry does not bundle a copy of the editable content', async () => {
  const files = (await readdir('dist/assets')).filter(file => file.endsWith('.js'))
  for (const file of files) {
    const script = await readFile(`dist/assets/${file}`, 'utf8')
    for (const copy of [source.es, source.en]) {
      assert.ok(!script.includes(copy.pages.porqueBrazada.story.paragraphs[0]), `${file} bundles language copy`)
    }
    assert.ok(!script.includes(source.horarios.groups['Clases en tierra'].items['1'].description), `${file} bundles schedules`)
    assert.ok(!script.includes(source.tarifas.groups.Hidroterapia.items['1'].price), `${file} bundles prices`)
  }
})

test('Runtime loading fetches all files without browser caching and accepts subsequent FTP changes', async () => {
  const calls = []
  const changed = structuredClone(source)
  changed.es.navigation.home = 'Inicio actualizado'
  changed.en.navigation.home = 'Updated home'
  changed.tarifas.groups.Matrícula.items['1'].price = '$ 999.000'
  changed.horarios.groups.Jornada.items['1'].description = 'Horario actualizado'
  let published = source
  const fetcher = async (url, options) => {
    const name = url.match(/^\/data\/(es|en|tarifas|horarios)\.json\?v=\d+$/)?.[1]
    assert.ok(name, url)
    assert.equal(options.cache, 'no-store')
    assert.ok(options.signal instanceof AbortSignal)
    calls.push(name)
    return { ok: true, json: async () => structuredClone(published[name]) }
  }
  assert.deepEqual(await loadContent(fetcher), source)
  published = changed
  assert.deepEqual(await loadContent(fetcher), changed)
  assert.deepEqual(calls, [...names, ...names])
})

test('Runtime loading reports HTTP, network and malformed-JSON failures instead of using stale content', async () => {
  await assert.rejects(loadContent(async () => ({ ok: false, status: 404 })), /HTTP 404/)
  await assert.rejects(loadContent(async () => { throw new Error('Connection lost') }), /Connection lost/)
  await assert.rejects(loadContent(async () => ({
    ok: true,
    json: async () => { throw new SyntaxError('Unexpected token') },
  })), /Could not read \/data\/es.json as JSON/)
})

test('Invalid locale and pricing/schedule structures are rejected with actionable field paths', () => {
  for (const [edit, message] of [
    [data => { data.es.metadata.language = 'en' }, /es.json.metadata.language/],
    [data => { data.en.pages = [] }, /en.json.pages/],
    [data => { data.tarifas.groups.Matrícula.items['1'].price = 999 }, /tarifas.json.groups.Matrícula.items.1.price/],
    [data => { data.horarios.groups.Jornada.items = null }, /horarios.json.groups.Jornada.items/],
  ]) {
    const invalid = structuredClone(source)
    edit(invalid)
    assert.throws(() => validateContent(invalid), message)
  }
})
