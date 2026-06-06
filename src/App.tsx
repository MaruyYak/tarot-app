import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeScreen } from '@/screens/HomeScreen'
import { QuestionScreen } from '@/screens/QuestionScreen'
import { SpreadScreen } from '@/screens/SpreadScreen'
import { DrawScreen } from '@/screens/DrawScreen'
import { ReadingScreen } from '@/screens/ReadingScreen'
import { HistoryScreen } from '@/screens/HistoryScreen'
import { ReadingDetailScreen } from '@/screens/ReadingDetailScreen'
import { ProfileScreen } from '@/screens/ProfileScreen'
import { DailyScreen } from '@/screens/DailyScreen'
import { useProfileStore } from '@/store/profileStore'

const router = createBrowserRouter([
  { path: '/', element: <HomeScreen /> },
  { path: '/daily', element: <DailyScreen /> },
  { path: '/reading/question', element: <QuestionScreen /> },
  { path: '/reading/spread', element: <SpreadScreen /> },
  { path: '/reading/draw', element: <DrawScreen /> },
  { path: '/reading/result', element: <ReadingScreen /> },
  { path: '/history', element: <HistoryScreen /> },
  { path: '/history/:id', element: <ReadingDetailScreen /> },
  { path: '/profile', element: <ProfileScreen /> },
])

export default function App() {
  const theme = useProfileStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <RouterProvider router={router} />
}
