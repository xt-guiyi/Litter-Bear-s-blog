/*
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-23 10:36:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-23 13:59:47
 */
import Ajv, { DefinedError, Schema } from 'ajv'
// import addFormats from 'ajv-formats'
import addKeywords from 'ajv-keywords'
import addErrors from 'ajv-errors'

const ajv = new Ajv({ allErrors: true })
addKeywords(ajv, ['regexp'])
// addFormats(ajv, ['uri'])
addErrors(ajv)

export default function useFormValidator (schema: Schema, data: Record<string, unknown>) {
  const validate = ajv.compile(schema)
  if (!validate(data)) {
    return (validate.errors) as DefinedError[]
  }
}
