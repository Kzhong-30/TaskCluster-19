import { parse, type PropItem } from 'react-docgen-typescript'
import { resolve } from 'path'

interface ExtractedProp {
  name: string
  type: string
  defaultValue: string | undefined
  required: boolean
  description: string
}

export function extractProps(componentPath: string): ExtractedProp[] {
  try {
    const absolutePath = resolve(process.cwd(), componentPath)

    const docs = parse(absolutePath, {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    })

    return docs.flatMap((doc) =>
      Object.values(doc.props).map((prop: PropItem) => ({
        name: prop.name,
        type: prop.type.name,
        defaultValue: prop.defaultValue?.value?.replace?.(/'/g, ''),
        required: prop.required,
        description: prop.description,
      })),
    )
  } catch {
    return []
  }
}
