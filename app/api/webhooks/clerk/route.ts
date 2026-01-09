import { ClerkUserWebhookData, createOrUpdateUser, deleteUser } from '@/app/server/actions/user.actions'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    const eventType = evt.type
    const data = evt.data

    if(eventType === 'user.created' || eventType === 'user.updated') {
        await createOrUpdateUser(data as ClerkUserWebhookData)
    }

    if(eventType === 'user.deleted') {
        await deleteUser(data.id as string)
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}