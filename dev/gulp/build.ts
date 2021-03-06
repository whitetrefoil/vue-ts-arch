import del                from 'del';
import log                from 'fancy-log';
import * as fs            from 'fs-extra';
import gulp               from 'gulp';
import webpack, { Stats } from 'webpack';
import config             from '../config';
import devConfig          from '../webpack/dev';
import prodConfig         from '../webpack/prod';
import './pre-check';

gulp.task('build', gulp.series('preCheck', done => {

  const webpackConfig = process.env.NODE_ENV === 'development'
    ? devConfig
    : prodConfig;

  del([config.outputByEnv('')])
    .then(() => {
      webpack(webpackConfig, (err: Error, stats: Stats) => {
        if (err != null) {
          throw err;
        }
        // Base on 'minimal' + filter ts-loader transpileOnly related warnings.
        // See: https://github.com/webpack/webpack/blob/30882ca548625e6d1e54323ff5c61795c6ab4bda/lib/Stats.js#L1397
        log('[webpack]:\n', stats.toString({
          all           : false,
          modules       : true,
          maxModules    : 0,
          errors        : true,
          warnings      : true,
          warningsFilter: /export .* was not found in/,
          chunks        : true,
          chunkModules  : false,
          chunkOrigins  : false,
          colors        : true,
        }));
        fs.ensureDirSync('test_results');
        // fs.writeJsonSync('test_results/stats.json', stats.toJson({
        //   warningsFilter: /export .* was not found in/,
        // }));
        gulp.src(config.source('data/**'))
          .pipe(gulp.dest(config.output('data/')))
          .on('end', () => {
            done();
          });
      });
    });
}));
