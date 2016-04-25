export function config($logProvider, $compileProvider, toastrConfig) {
  'ngInject';
  // 启用日志
  $logProvider.debugEnabled(true);

  // 安全的图片请求
  // var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
  // var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)
  //   + '|chrome-extension:'
  //   +currentImgSrcSanitizationWhitelist.toString().slice(-1);
  // $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
