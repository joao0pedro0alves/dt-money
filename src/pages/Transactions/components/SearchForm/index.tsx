import { MagnifyingGlass } from 'phosphor-react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { SearchFormContainer } from './styles'
import { useContextSelector } from 'use-context-selector'

const searchFormValidationSchema = z.object({
  query: z.string(),
})

type SearchFormData = z.infer<typeof searchFormValidationSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactions,
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchFormValidationSchema),
  })

  async function handleSearchTransactions(data: SearchFormData) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
