const { parse } = require('react-docgen-typescript')
const path = require('path')
const fs = require('fs')

const components = [
  { key: 'button', path: 'components/Button/Button.tsx' },
  { key: 'input', path: 'components/Input/Input.tsx' },
  { key: 'card', path: 'components/Card/Card.tsx' },
]

const result = {}

for (const { key, path: componentPath } of components) {
  const absolutePath = path.resolve(process.cwd(), componentPath)

  try {
    const docs = parse(absolutePath, {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    })

    result[key] = docs.flatMap((doc) =>
      Object.values(doc.props).map((prop) => ({
        name: prop.name,
        type: prop.type.name,
        defaultValue: prop.defaultValue?.value != null ? String(prop.defaultValue.value) : undefined,
        required: prop.required,
        description: prop.description,
      })),
    )

    console.log(`✓ Extracted props for "${key}" (${result[key].length} props)`)
  } catch (err) {
    console.error(`✗ Failed to extract props for "${key}":`, err.message)
    result[key] = []
  }
}

const outputPath = path.resolve(process.cwd(), 'src/data/props-extracted.json')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))

console.log(`\nProps data written to ${outputPath}`)
