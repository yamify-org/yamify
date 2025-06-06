'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { yamModule } from '@/server/module/yam.module';
import { workspaceModule } from '@/server/module/workspace.module';
import { kube } from '@/server/module/kube.module';
import { projectModule } from '@/server/module/project.module';

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

interface DeployCodeServerProjectData {
  name: string;
  namespace: string;
  yamId: string;
  workspaceId: string;
}

export const deployCodeServerProjectAction = async ({name, namespace, yamId, workspaceId}: DeployCodeServerProjectData) => {
  const { userId } = await auth()
  const user = await currentUser()

  if (!user || !userId) {
    return { error: 'No Logged In User' }
  }

  try {
    const project = await projectModule.service.create({
      name,
      type: 'code-server',
      namespace,
      workspaceId,
      yamId
    });

    console.log('Code Server project created:', project)
    return { success: true, project }

  } catch(e) {
    console.log(e)
    if(e instanceof Error){
      console.log(e.message)
      return { error: e.message }
    }
    return { error: 'Error deploying Code Server' }
  }
}

interface DeployWordpressProjectData {
  name: string;
  namespace: string;
  yamId: string;
  workspaceId: string;
}

export const deployWordpressProjectAction = async ({name, namespace, yamId, workspaceId}: DeployWordpressProjectData) => {
  const { userId } = await auth()
  const user = await currentUser()

  if (!user || !userId) {
    return { error: 'No Logged In User' }
  }

  try {
    const project = await projectModule.service.create({
      name,
      type: 'wordpress',
      namespace,
      workspaceId,
      yamId
    });

    console.log('WordPress project created:', project)
    return { success: true, project }

  } catch(e) {
    console.log(e)
    if(e instanceof Error){
      console.log(e.message)
      return { error: e.message }
    }
    return { error: 'Error deploying WordPress' }
  }
}
