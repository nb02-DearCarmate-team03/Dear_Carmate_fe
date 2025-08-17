import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useConfirmModal from '@ui/shared/modal/confirm-modal/useConfirmModal'
import { editContract } from '@shared/api'
import {
  AxiosErrorData,
  ContractDocumentRegisterFormInput,
  ContractType,
} from '@shared/types'

const useRegisterContractDocuments = () => {
  const queryClient = useQueryClient()
  const { openConfirmModal } = useConfirmModal()

  const mutation = useMutation<
    ContractType,
    AxiosError<AxiosErrorData>,
    ContractDocumentRegisterFormInput,
    unknown
  >({
    mutationFn: async (inputData) => {

      const { contractId, ...dataToUpdate } = inputData

      if (!contractId || typeof contractId !== 'number') {
        throw new Error('유효한 계약 ID가 없습니다.')
      }

      return await editContract(contractId, dataToUpdate)
    },
    onSuccess: () => {
      openConfirmModal({
        text: '계약서 추가에 성공했습니다.',
      })
      queryClient.invalidateQueries({ queryKey: ['contractDocuments'] })
    },
    onError: (error) => {
      const text =
        error?.response?.data?.message || '계약서 추가에 실패했습니다.'
      openConfirmModal({
        text,
      })
    },
  })

  return mutation
}

export default useRegisterContractDocuments
