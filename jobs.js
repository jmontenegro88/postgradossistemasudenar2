const { CronJob } = require('cron')
const chalk = require('chalk')
const { models } = require('./server/models')

async function purgeTokenBlacklist() {
  await models.blacklist_token.purge()
  console.info(chalk.blue('Token blacklist purged'))
}

const jobs = {
  purgeTokenBlacklist: new CronJob({
    cronTime: '00 00 00 * * *',
    onTick: purgeTokenBlacklist,
    runOnInit: true,
    start: true,
  }),
}

function loadLocalJobs() {
  if (jobs.local) {
    for (const job of Object.values(jobs.local)) {
      if (job instanceof CronJob) {
        job.stop()
      }
    }

    delete jobs.local
    console.info(chalk.blue('Previous local jobs stopped'))
  }

  try {
    delete require.cache[require.resolve('./.jobs.local')]
    jobs.local = require('./.jobs.local')
    console.info(chalk.blue('Local jobs loaded'))
  } catch (err) {}
}

loadLocalJobs()
process.stdin.on('data', data => {
  if (/^jobs$/m.test(data)) {
    loadLocalJobs()
  }
})

module.exports = jobs
