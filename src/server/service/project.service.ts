import { projectRepository } from '../repository/project.repository';
import { execa } from 'execa';

export const projectService = {
  list: async (opts: { yamId: string }) => {
    return projectRepository.listByYam(opts.yamId);
  },

  create: async (params: {
    name: string;
    type: string;
    namespace: string;
    chart: string;
    valuesYaml: string;
    workspaceId: string;
    yamId: string;
  }) => {
    // Persist the project record
    const record = await projectRepository.create(params);

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
    // Remove the project record from the database
    return projectRepository.delete(opts.id);
  },
};
