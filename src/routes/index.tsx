import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-4 w-full min-h-screen">
      <h3>Registrate en sabana club ahora</h3>
    </div>
  )
}
