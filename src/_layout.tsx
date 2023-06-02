import { TransactionsContextProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/Transactions'

export function RootLayout() {
  return (
    <TransactionsContextProvider>
      <Transactions />
    </TransactionsContextProvider>
  )
}
