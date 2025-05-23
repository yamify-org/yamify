import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import prisma from '@/libs/prisma'
import { workspaceModule } from '@/server/module/workspace.module';
import { kube } from '@/server/module/kube.module';
import { yamModule } from '@/server/module/yam.module';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const secret = process.env.SIGNING_SECRET
  if (!secret) return new Response('Missing secret', { status: 500 })

  const wh = new Webhook(secret)
  const body = await req.text()
  const headerPayload = await headers()

  const event = wh.verify(body, {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  }) as WebhookEvent

  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name, username } = event.data
    const namespace = `${username}-yamify`
    let workspaceId

    try {
      await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        id: id,
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
      },
    })
    }catch(e){
      console.log(e)
      if(e instanceof Error){
        console.log(e.message)
      }
      return new Response('Error creating user', { status: 500 })
    }

    // create a worspace for the user
    try{
      const workspace = await workspaceModule.service.create({
        name: namespace,
        userId: id,
      })
      console.log('Workspace created for user', workspace)
      workspaceId = workspace.id
    } catch(e) {
      console.log(e)
      if(e instanceof Error){
        console.log(e.message)
      }
      return new Response('Error creating workspace', { status: 500 })
    }

    // create ingress for the user
    try {
      const response = await kube.createNamespaceIngress(namespace)
      console.log('Ingress created for workspace', response)
    } catch(e) {
      console.log(e)
      if(e instanceof Error){
        console.log(e.message)
      }
      return new Response('Error creating ingress', { status: 500 })
    }

    try {
      const yam = await yamModule.service.createAndStoreVCluster(namespace, 
        namespace,
        workspaceId
      )
      console.log('Yam created for workspace', yam)

      const kubeconfig = await kube.retrieveKubeconfig(namespace, namespace);
      const url = await kube.deployCodeServer(kubeconfig, 'codeserver-1', 'codeserver-1');

      console.log(`Code Server is ready at: ${url}`);
    } catch(e) {
      console.log(e)
      if(e instanceof Error){
        console.log(e.message)
      }
      return new Response('Error creating yam', { status: 500 })
    }
  }

  return new Response('OK')
}