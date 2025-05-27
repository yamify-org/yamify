'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { yamModule } from '@/server/module/yam.module';
import { workspaceModule } from '@/server/module/workspace.module';
import { kube } from '@/server/module/kube.module';

interface CreateYamData {
    workspace: string;
    workspaceId: string;
    yam: string;
}

export const createYamAction = async ({workspace, workspaceId, yam}: CreateYamData) => {
  const { userId } = await auth()
  const user = await currentUser()

  if (!user || !userId) {
    return { message: 'No Logged In User' }
  }

  try {
    const createYam = await yamModule.service.createAndStoreVCluster(yam, 
      workspace,
      workspaceId
    )
    console.log('Yam created for workspace', createYam)

  } catch(e) {
    console.log(e)
    if(e instanceof Error){
      console.log(e.message)
    }
    return new Response('Error creating yam', { status: 500 })
  }
}

interface CreateWorkspaceData {
  namespace: string;
  createYam: boolean;
}

export const createWorkspaceAction = async ({namespace, createYam}: CreateWorkspaceData) => {
  const { userId } = await auth()
  const user = await currentUser()
  let workspaceId

  if (!user || !userId) {
    return { message: 'No Logged In User' }
  }

  try{
    const workspace = await workspaceModule.service.create({
      name: namespace,
      userId,
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
}

interface CreateWordpressData {
  namespace: string;
}

export const deployWordpressAction = async ({namespace}: CreateWordpressData) => {
  const { userId } = await auth()
  const user = await currentUser()

  if (!user || !userId) {
    return { message: 'No Logged In User' }
  }

  try {
    const kubeconfig = await kube.retrieveKubeconfig(namespace, namespace);
    const createWordpressDeployment = await kube.deployWordpress(kubeconfig, `wordpress-${namespace}`, `wordpress-${namespace}`);
    console.log('Wordpress deployment created', createWordpressDeployment)

  } catch(e) {
    console.log(e)
    if(e instanceof Error){
      console.log(e.message)
    }
    return new Response('Error creating wordpress deployment', { status: 500 })
  }
}