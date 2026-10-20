const files = ['es', 'en', 'tarifas', 'horarios']

function requireObject(value, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${path} must be a JSON object`)
  }
}

function requireString(value, path) {
  if (typeof value !== 'string') throw new Error(`${path} must be a string`)
}

export function validateContent(data) {
  for (const language of ['es', 'en']) {
    const copy = data[language]
    requireObject(copy, `${language}.json`)
    for (const key of ['metadata', 'navigation', 'services', 'shared', 'pages']) {
      requireObject(copy[key], `${language}.json.${key}`)
    }
    if (copy.metadata.language !== language) {
      throw new Error(`${language}.json.metadata.language must be "${language}"`)
    }
  }
  for (const name of ['tarifas', 'horarios']) {
    requireObject(data[name], `${name}.json`)
    requireObject(data[name].groups, `${name}.json.groups`)
    if (name === 'tarifas') requireString(data[name].year, 'tarifas.json.year')
    for (const [key, group] of Object.entries(data[name].groups)) {
      const path = `${name}.json.groups.${key}`
      requireObject(group, path)
      const fields = name === 'tarifas' ? ['backgroundColor', 'textColor'] : ['backdrop']
      for (const field of fields) requireString(group[field], `${path}.${field}`)
      if (group.title !== undefined) requireString(group.title, `${path}.title`)
      requireObject(group.items, `${path}.items`)
      for (const [id, item] of Object.entries(group.items)) {
        requireObject(item, `${path}.items.${id}`)
        const fields = name === 'tarifas' ? ['description', 'price', 'quantity'] : ['description']
        for (const field of fields) requireString(item[field], `${path}.items.${id}.${field}`)
      }
    }
  }
  return data
}

export async function loadContent(fetcher = fetch) {
  const version = Date.now()
  const entries = await Promise.all(files.map(async name => {
    const url = `/data/${name}.json?v=${version}`
    const response = await fetcher(url, { cache: 'no-store', signal: AbortSignal.timeout(15000) })
    if (!response.ok) throw new Error(`Could not load /data/${name}.json (HTTP ${response.status})`)
    try {
      return [name, await response.json()]
    } catch (cause) {
      throw new Error(`Could not read /data/${name}.json as JSON`, { cause })
    }
  }))
  return validateContent(Object.fromEntries(entries))
}
