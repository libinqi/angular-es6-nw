/* global malarkey:false, moment:false */

import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock,ormLift} from './index.run';
import {MainController} from '../app/controllers/main';
import {GithubContributorService} from '../app/services/githubContributor';
import {WebDevTecService} from '../app/services/webDevTec';
import {NavbarDirective} from '../app/components/navbar/navbar.directive';
import {MalarkeyDirective} from '../app/components/malarkey/malarkey.directive';

angular.module('app', ['ngResource', 'ui.router', 'toastr','jqwidgets'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .run(ormLift)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
