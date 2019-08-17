import axios from 'axios'



 $.ajaxSetup({
    beforeSend: function () {

    },
    complete: function (XMLHttpRequest,textStatus) {

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {

    },
    success:function(data, textStatus){
 this.$message.error('网络错误');
    }

});
export default axios