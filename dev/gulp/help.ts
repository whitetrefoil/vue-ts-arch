import { task } from 'gulp';
import config   from '../config';

task('help', done => {
  console.error(config.argv.help);
  done();
});
