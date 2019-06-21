import { parallel, task } from 'gulp';

import './backend';
import './dev-server';
import './pre-check';

task('integration', parallel('devServer', 'backend'));
