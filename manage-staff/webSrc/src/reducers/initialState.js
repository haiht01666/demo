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
    diachi: '165 Thái Hà, Đống Đa, Hà Nội',
    dienthoai: '0985584989',
    email: 'admin@dfgvn.online'
  },
  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  }
};
