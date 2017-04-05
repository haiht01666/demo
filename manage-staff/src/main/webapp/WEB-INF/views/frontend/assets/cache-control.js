/**
 * Created by JetBrains WebStorm.
 * User: LamPT
 * Date: 12/9/15
 * Time: 9:15 AM
 * To change this template use File | Settings | File Templates.
 */
// Check if a new cache is available on page load.
window.applicationCache.addEventListener('updateready', function (e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
//        // Browser downloaded a new app cache.
//        showAlertAppText('TPBank eBank có phiên bản mới! Quý khách có muốn tải lại ngay?', CONST_STR.get('BANNER_ALERT_MOBILE_BTN_OK'), CONST_STR.get('BANNER_ALERT_MOBILE_BTN_CANCEL'));
//        document.addEventListener('alertAppConfirmOK', selectionOK, false);
//        document.addEventListener('alertAppConfirmCancel', selectionCancel, false);
        window.location.reload();
    } else {
        console.log('Manifest didn\'t changed. Nothing new to server.');
    }
}, false);

function selectionOK() {
    window.location.reload();
}
function selectionCancel() {
    document.removeEventListener('alertAppConfirmOK', selectionOK, false);
    document.removeEventListener('alertAppConfirmCancel', selectionCancel, false);
}