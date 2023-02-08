const { getImageFileList, writeFile, copyDir } = require('./utils/index')
const generateUtils = require('./utils/generate')
const imagePathList = require('./config')

imagePathList.forEach((item) => {
  const imageList = getImageFileList(item.path)

  const artalk = generateUtils.artalk(imageList, item)
  writeFile(`artalk`, item.path, JSON.stringify(artalk))
  copyDir(`${item.path}`, `${item.path}`)
})
