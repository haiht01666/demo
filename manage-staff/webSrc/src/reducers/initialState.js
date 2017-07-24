export default {
  products: {
    searchProducts:{
      data: [],
      numberPage: 1,
      currentPage : 1,
    },
    topProducts: [],
    data: [],
    numberPage: 1,
    currentPage: 1,
  },
  productDetail: {},
  news: {
   topNews: [],
   data:[],
   numberPage: 1,
  },
  newsDetail: {},
  categories: [],
  lienhe:{
    congty: 'DFG',
    diachi: 'Tòa nhà Capital Garden số 87 ngõ 102 Trường Chinh, phường Phương Mai quận Đống Đa TP Hà Nội',
    dienthoai: '+84 438 727 666',
    email: 'dfg.company.vn@gmail.com'
  },
  customerComment: [
    {
      urlImg : "http://princesswhite.vn/upload/baiviet/128003091695017354088132625915184443863102n-3523.jpg",
      nameCustomer: "CÔ NGỌC ÁNH",
      comment: `Từ ngày con gái tặng tui sản phẩm trị nám của Princess White, da tôi cải thiện rõ rệt.
                                Giờ tôi rất tự tin khi ra ngoài.`
    },
    {
      urlImg : "http://princesswhite.vn/upload/baiviet/120382569945320639016512436427115511577675n-2739.jpg",
      nameCustomer: "MỸ HÂN",
      comment: `Mình bị dị ứng với rất nhiều dòng mỹ phẩm chăm sóc da. Tuy nhiên được bạn bè giới thiệu
                                mình đã dùng thử mỹ phẩm PRINCESS WHITE NICE DAY, ...`
    },
    {
      urlImg : "http://princesswhite.vn/upload/baiviet/1204681116540228915209124119800741839464641n-5658.jpg",
      nameCustomer: "KIỀU LINH",
      comment: `Thơm lắm, không lộ vân và không bết dính. Quá tiện lợi khi sử dụng sản phẩm.`
    },
  ],
  common:{
    pathname: '',
    language:'vi',
    message: {},
    introduce : '',
    contact: '',
    banner: [],
    count : 0,
  },
  viMessage : {
    login: 'ĐĂNG NHẬP',
    index: 'TRANG CHỦ',
    intro: 'GIỚI THIỆU',
    product: 'SẢN PHẨM',
    news: 'TIN TỨC',
    contact: 'LIÊN HỆ',
    comment: 'Ý KIẾN KHÁCH HÀNG',
    beautyConsultant: 'TƯ VẤN SỨC KHỎE - LÀM ĐẸP',
    mainProducts: 'SẢN PHẨM CHỦ ĐẠO',
    productInfo: 'Thông tin sản phẩm',
    highlightsFeatures: 'Đặc điểm nổi bật',
    productTitle: 'Sản phẩm',
    contactCompany: 'GIỚI THIỆU CÔNG TY',
    contactInfo: 'Thông TIN LIÊN HỆ',








    address: 'Địa chỉ',
    phone: 'Điện thoại',
    otherNews: 'Thông tin khác'
  },
  enMessage: {
    login: 'Login',
    index: 'HOME',
    intro: 'INTRODUCE',
    product: 'PRODUCTS',
    news: 'NEWS',
    contact: 'CONTACT',
    comment: 'CUSTOMER COMMENT',
    beautyConsultant: 'Beauty Consultant',
    mainProducts: 'MAIN PRODUCTS',
    productInfo: 'Product Infomation',
    highlightsFeatures: 'Highlights Features',
    productTitle: 'Product',
    contactCompany: 'Contact Detail',
    contactInfo: 'CONTACT INFO',
    address: 'Adress',
    phone: 'phone',
    otherNews: 'More News'
  }
};
