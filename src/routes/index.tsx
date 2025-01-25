import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex p-4 w-full h-screen md:flex-row flex-col items-center justify-center">
      <h3>Registrate en sabana club ahora</h3>
    </div>
  )
}
