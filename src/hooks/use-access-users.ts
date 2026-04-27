import useLocalStorageModule from 'use-local-storage'

type UseLocalStorage = typeof useLocalStorageModule

const useLocalStorage = (
  (useLocalStorageModule as unknown as { default?: UseLocalStorage }).default ??
  useLocalStorageModule
) as UseLocalStorage

export type AccessUser = {
  id: number
  name: string
  email: string
  password: string
}

export type CreateAccessUserInput = Omit<AccessUser, 'id'>
export type UpdateAccessUserInput = Partial<CreateAccessUserInput>

const initialUsers: AccessUser[] = [
  {
    id: 1,
    name: 'Admin Studio',
    email: 'admin@studio.com',
    password: 'admin123',
  },
  {
    id: 2,
    name: 'Caio Sena',
    email: 'caio@studio.com',
    password: 'caio123',
  },
]

export function useAccessUsers() {
  const [users, setUsers] = useLocalStorage<AccessUser[]>(
    'access-users-crud',
    initialUsers,
  )
  const [currentUserId, setCurrentUserId] = useLocalStorage<number | null>(
    'access-current-user-id',
    null,
  )

  const currentUser = users.find((user) => user.id === currentUserId) ?? null

  function createUser(input: CreateAccessUserInput) {
    const nextId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1

    setUsers((prev) => [...(prev ?? []), { id: nextId, ...input }])
  }

  function updateUser(id: number, updates: UpdateAccessUserInput) {
    setUsers((prev) =>
      (prev ?? []).map((user) =>
        user.id === id ? { ...user, ...updates } : user,
      ),
    )
  }

  function deleteUser(id: number) {
    setUsers((prev) => (prev ?? []).filter((user) => user.id !== id))
    if (currentUserId === id) {
      setCurrentUserId(null)
    }
  }

  function login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail && item.password === password,
    )

    if (!user) return false

    setCurrentUserId(user.id)
    return true
  }

  function logout() {
    setCurrentUserId(null)
  }

  return {
    users,
    currentUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout,
  }
}
