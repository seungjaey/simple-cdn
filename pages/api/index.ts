// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { resolve } from 'path'
import { readFile } from 'fs/promises'
import mime from 'mime-types'
import sharp, {FormatEnum} from 'sharp'
import type { NextApiRequest, NextApiResponse } from 'next'

const STATIC_FILE_DIR_NAME = 'public'

type QueryParamKeyType = 'path' | 'format' | 'width' | 'height' | string

const checkEmptyString = (input: string) => input === ''
const checkValidFormat = (format: string) => format === 'png'
    || format === 'jpeg'
    || format === 'jpg'
    || format === 'heic'
    || format === 'webp'
    || format === 'avif'

const getDefaultQueryParam = (param: string | string[] | undefined): string => {
  if (!param) {
    return ''
  }
  if (param instanceof Array) {
    return param[0]
  }
  return param
}

type OriginalQueryParameterType = Partial<{
  [key: string]: string | string[];
}>;

const handleError = (res: NextApiResponse, status: number, message: string) => res.status(status).json(message)

type GetQueryParamResult = Record<QueryParamKeyType, string>;
const getQueryParams = (query: OriginalQueryParameterType): GetQueryParamResult => {
  return Object.fromEntries(
    ['path', 'width', 'height', 'format'].map(key => {
      return [key, getDefaultQueryParam(query[key])]
    })
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method } = req
  if (method !== 'GET') {
    return handleError(res, 404, 'NOT_SUPPORTED')
  }
  const { path, width, height, format } = getQueryParams(query)

  const targetImageFilePath = resolve(STATIC_FILE_DIR_NAME, path)
  if (!targetImageFilePath) {
    return handleError(res, 404, 'IMAGE_NOT_FOUND')
  }

  const imageFile = await readFile(targetImageFilePath)
  if (!imageFile) {
    return handleError(res, 404, 'IMAGE_NOT_FOUND_2_EMPTY')
  }

  const contentType = mime.contentType(path)
  if (!contentType) {
    return handleError(res, 404, `IMAGE_NOT_SUPPORT : ${path} ${contentType}`)
  }

  const originalFileExtension = mime.extension(contentType)

  const sharpInstance = await sharp(imageFile)

  if (
    checkEmptyString(format)
    || !checkValidFormat(format)
  ) {
    return handleError(res, 500, 'FORMAT NOT SUPPORTED')
  } else {
    sharpInstance.toFormat(format as keyof FormatEnum)
  }

  const [pWidth, pHeight] = [parseInt(width), parseInt(height)]
  if (
    isNaN(pWidth)
    || isNaN(pHeight)
    || pWidth === 0
    || pHeight === 0
  ) {
    return handleError(res, 500, 'INVALID_RE_SIZE_OPTIONS')
  } else {
    sharpInstance.resize(pWidth, pHeight)
  }

  const metaData = await sharpInstance.metadata()


  res.setHeader('Content-Type', mime.contentType(metaData.format as string) as string)
  res.send(sharpInstance)
  res.status(200)
  // res.status(200).json({ name: 'John Doe' })
}
