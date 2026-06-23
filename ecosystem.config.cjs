module.exports = {
  apps: [
    {
      name: 'fifthcusp-web',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 1,
      exec_mode: 'fork',
      env: { NODE_ENV: 'production' },
      max_memory_restart: '500M',
      time: true,
    },
  ],
}
