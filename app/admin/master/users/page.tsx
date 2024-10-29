import { getUsers } from '@/services/users/service'
import UsersTable from './_components/paket-table'
import PageLayout from '@/components/shared/page-layout'
import UsersActions from './_components/paket-actions'

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>
}

const MasterUsersPage = async () => {
  const data = await getUsers()

  return (
    <PageLayout title="Paket" action={<UsersActions />}>
      <UsersTable rows={data} pageCount={1} rowCount={data.length} />
    </PageLayout>
  )
}

export default MasterUsersPage
