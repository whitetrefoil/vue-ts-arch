import gulp    from 'gulp';
import stubapi from '../../stubapi';
import config  from '../config';

gulp.task('stubapi', done => {
  stubapi(config.serverPort + 1);
});
