import { uploadFile as uploadFileAPI } from '@shared/api'

const uploadFile = async (file: File, contractId: number) => {
  const response = await uploadFileAPI(file, contractId)
  return response.id
}

export default uploadFile
