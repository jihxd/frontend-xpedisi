'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import $axios from '@/lib/axios'
import { setCookie } from 'cookies-next'
import { toast } from 'sonner'

const TestConnectionCard = () => {
  const [endpoint, setEndpoint] = useState(process.env.NEXT_PUBLIC_API_URL)

  const updateEndpoint = async () => {
    setCookie('endpoint_process', endpoint)
    toast.success('Endpoint updated')
  }

  const testConnection = async () => {
    try {
      const response = await $axios.get('/')
      console.log('testConnection response: ', response)
    } catch (error) {
      console.log('testConnection error: ', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Endpoint</CardTitle>
        <CardDescription>Set new endpoint process</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <Input
            placeholder="https://"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
          <Button variant="outline" onClick={updateEndpoint}>
            Save
          </Button>
        </div>

        <Button className="mt-5 w-full" onClick={testConnection}>
          Test Connection
        </Button>
      </CardContent>
    </Card>
  )
}

export default TestConnectionCard
