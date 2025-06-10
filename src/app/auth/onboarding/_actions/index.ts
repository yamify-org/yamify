'use server'

import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import prisma from '@/libs/prisma'
import { workspaceModule } from '@/server/module/workspace.module';
import { kube } from '@/server/module/kube.module';
import { yamModule } from '@/server/module/yam.module';

interface OnbordindData {
    workspaceName: string;
    createYam: boolean;
}

export const completeOnboarding = async ({workspaceName, createYam}: OnbordindData) => {
  const { userId } = await auth()
  const user = await currentUser()

  if (!user || !userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  const { id, emailAddresses, firstName, lastName } = user
      const namespace = workspaceName
      let workspaceId
  
      try {
        await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          id: id,
          clerkId: id,
          email: emailAddresses[0].emailAddress,
          name: `${firstName} ${lastName}`,
        },
      })
      }catch(e){
        console.log(e)
        if(e instanceof Error){
          console.log(e.message)
        }
        return new Response('Error creating user', { status: 500 })
      }

      try {
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

    if(createYam){
      try {
      const yam = await yamModule.service.createAndStoreVCluster(namespace, 
        namespace,
        workspaceId
      )
      console.log('Yam created for workspace', yam)
    } catch(e) {
      console.log(e)
      if(e instanceof Error){
        console.log(e.message)
      }
      return new Response('Error creating yam', { status: 500 })
    }
    }

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    })
    return { message: res.publicMetadata }
  } catch (err) {
    if(err instanceof Error){
      console.log(err.message)
    }
    return { error: 'There was an error onboarding the user.' }
  }
}