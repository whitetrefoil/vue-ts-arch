import { parallel, series, task } from 'gulp';

import './dev-server';
import './pre-check';
import './stubapi';

task('serve', series('preCheck', parallel('devServer', 'stubapi')));
