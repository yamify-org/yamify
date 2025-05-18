import { deploymentRepository } from '../repository/deployment.repository';
import { execa } from 'execa';

export const deploymentService = {
  list: async (opts: { workspaceId: string; yamId?: string }) => {
    if (opts.yamId) {
      return deploymentRepository.listByYam(opts.yamId);
    } else {
      return deploymentRepository.listByWorkspace(opts.workspaceId);
    }
  },

  create: async (params: {
    name: string;
    type: string;
    namespace: string;
    chart: string;
    valuesYaml: string;
    workspaceId: string;
    yamId?: string;
  }) => {
    // Persist the deployment record
    const record = await deploymentRepository.create(params);

    // Add Helm repository and update
    await execa('helm', ['repo', 'add', record.name, record.chart]);
    await execa('helm', ['repo', 'update']);

    // Install or upgrade the Helm release
    await execa(
      'helm',
      [
        'upgrade',
        '--install',
        record.name,
        record.chart,
        '--namespace',
        record.namespace,
        '--values',
        '-',
      ],
      { input: record.valuesYaml }
    );

    return record;
  },

  remove: async (opts: { id: string; name: string; namespace: string }) => {
    // Uninstall the Helm release
    await execa('helm', ['uninstall', opts.name, '--namespace', opts.namespace]);
    // Remove the deployment record from the database
    return deploymentRepository.delete(opts.id);
  },
};
