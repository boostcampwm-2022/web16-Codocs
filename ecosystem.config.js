module.exports = {
  apps: [
    {
      name: 'api',
      cwd: './backend/api',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'socket',
      cwd: './backend/socket',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'compiler',
      cwd: './backend/compiler',
      script: 'npm',
      args: 'start',
    },
    {
      name: 'frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'start',
    },
  ],
};
