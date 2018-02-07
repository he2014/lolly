import Mock from 'mockjs';
const LoginUsers = [{
  id: 1,
  username: 'admin',
  password: '123456',
  avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
  name: '张某某'
}];

const Users = [];
const tableOpTion = [{
    value: Mock.mock(Mock.Random.csentence(2, 3)),
    label: "全部",
    isHide: true,
    list: []
  },
  {
    value: Mock.mock(Mock.Random.csentence(2, 3)),
    label: "用户ID",
    isHide: true,
    list: ["请输入用户ID"]
  },
  {
    value: Mock.mock(Mock.Random.csentence(2, 3)),
    label: "账号",
    isHide: true,
    list: ["请输入用户账号"]
  },
  {
    value: Mock.mock(Mock.Random.csentence(2, 3)),
    label: "昵称",
    isHide: true,
    list: ["请输入用户昵称"]
  },
  {
    value: Mock.mock(Mock.Random.csentence(2, 3)),
    label: "用户编号",
    isHide: true,
    list: ["请输入用户编号"]
  },
  {
    value: Mock.mock(Mock.Random.csentence(2, 3)),
    label: "首页推荐",
    isHide: true,
    list: ["直播推荐", "置顶推荐"]
  },
  {
    value: Mock.mock(Mock.Random.csentence(2, 3)),
    label: "列表推荐",
    isHide: true,
    list: ["推荐", "不推荐"]
  }
];
let arrs = [];
const userImage = [];
for (var i = 0; i < 8; i++) {
  userImage.push(Mock.mock({
    "pic": Mock.Random.image('100x100', '#409EFF', 'Hello'),
    "id": Mock.Random.natural(1000, 5999),
    bool: Mock.Random.natural(1, 2),
    money: Mock.Random.natural(100, 3399)
  }))
}
for (var i = 0; i < 6; i++) {
  arrs.push(Mock.Random.image('100x100', '#409EFF', 'Hello'))
}
for (let i = 0; i < 248; i++) {
  Users.push(Mock.mock({
    userId: Mock.Random.natural(1000, 5999),
    pic: arrs,
    name: Mock.Random.cname(),
    derection: "PGC",
    size: "邮箱注册",
    time: Mock.Random.now(),
    bool: Mock.Random.natural(1, 2),
    value: "",
    id: Mock.Random.guid(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: "30%",
    sex: Mock.Random.integer(0, 1),
    lang: "en",
    zhaung: Mock.Random.natural(1, 2),
    giftNum: Mock.Random.natural(1000, 10000000),
    yue: Mock.Random.natural(1000, 10000000),
    guan: Mock.Random.natural(1000, 10000000),
    unbind: Mock.Random.natural(1000, 100000),

  }));
}
const gitfNumber = [];
for (var t = 0; t < 30; t++) {
  gitfNumber.push(Mock.mock({
    time: Mock.Random.datetime('yyyy-MM-dd'),
    videoNum: Mock.Random.natural(1000, 10000000),
    videoTime: Mock.Random.natural(1000, 10000000),
    giftNum: Mock.Random.natural(1000, 10000000),
    photoNum: Mock.Random.natural(1000, 10000000),
    allNum: Mock.Random.natural(1000, 10000000)

  }))
}
const gitfList = [];
for (var s = 0; s < 20; s++) {
  gitfList.push(Mock.mock({
    time: Mock.Random.datetime('yyyy-MM-dd'),
    gname: "火箭",
    pic: Mock.Random.image('40x40', '#666', 'gift'),
    giftNum: Mock.Random.natural(1000, 100000),
    zhaung: Mock.Random.natural(1, 2),
    gid: Mock.Random.natural(1000, 10000),
    shop: Mock.Random.word(15, 30),
    type: Mock.Random.natural(1, 2),
    reValue: Mock.Random.natural(1000, 10000),
    paly: "google play",
    target: "ios/android",
    lang: "en",
    time2: Mock.Random.datetime('yyyy-MM-dd'),
    title: "fsduisios",
    content: "weroopreo具有同和交通图库房管理法规落实到了对方考虑 prpeoo",
    diff: "h5",
    push: "ios"

  }))
}

const IMList = [];
for (var s = 0; s < 100; s++) {
  let n = null;
  let m = Mock.Random.natural(1, 2);
  if (m === 1) {
    n = Mock.Random.word(5, 80)
  } else {
    n = Mock.Random.image('100x100', '#409EFF', 'Hello')
  }
  IMList.push(Mock.mock({
    userId: Mock.Random.natural(1000, 599999),
    pic: arrs,
    target: Mock.Random.natural(100, 100000),
    succeed: Mock.Random.natural(100, 100000),
    content: n,
    cTime: Mock.Random.datetime(),
    sTime: Mock.Random.datetime(),
    type: m,
  }))
}
const Sensitive = [];
for (var s = 0; s < 50; s++) {
  Sensitive.push(Mock.mock({
    userId: Mock.Random.natural(1000, 599999),
    content: Mock.Random.word(5, 50),
    cTime: Mock.Random.datetime(),
    language: "英语"
  }))
}

export {
  LoginUsers,
  Users,
  tableOpTion,
  userImage,
  gitfNumber,
  gitfList,
  IMList,
  Sensitive
};
