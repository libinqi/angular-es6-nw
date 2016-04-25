export class MainController {
  constructor($timeout, webDevTec, toastr) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1461036980259;
    this.toastr = toastr;
    this.webDevTec = webDevTec;

    this.activate($timeout, webDevTec);
  }

  activate($timeout, webDevTec) {
    this.getWebDevTec(webDevTec);
    $timeout(() => {
      this.classAnimation = 'rubberBand';
    }, 4000);
  }

  getWebDevTec(webDevTec) {
    var self = this;
    webDevTec.getTec(function (data) {
      if (data.length > 0) {
        angular.forEach(data, (awesomeThing) => {
          awesomeThing.rank = Math.random();
          self.awesomeThings.push(awesomeThing);
        });
      }
    });
  }

  showToastr() {
    this.getWebDevTec(this.webDevTec);
    // this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    // this.classAnimation = '';
  }
}
