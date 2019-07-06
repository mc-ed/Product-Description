module.exports = {
    apps: [{
      name: 'lowes',
      script: './server/index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-225-6-113.us-east-2.compute.amazonaws.com',
        key: '~/ssh/Lowes-mock.pem',
        ref: 'origin/master',
        repo: 'git@github.com:mc-ed/Product-Description.git',
        path: '~/description',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }