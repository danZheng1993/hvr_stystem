import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { SearchBar } from 'react-native-elements';

const CityList= [ 
	{"searchStr": "阿坝"},
	{"searchStr": "阿拉善"},
	{"searchStr": "阿里"},
	{"searchStr": "安康"},
	{"searchStr": "安庆"},
	{"searchStr": "鞍山"},
	{"searchStr": "安顺"},
	{"searchStr": "安阳"},
	{"searchStr": "澳门"},
	{"searchStr": "北京"},
	{"searchStr": "白银"},
	{"searchStr": "保定"},
	{"searchStr": "宝鸡"},
	{"searchStr": "保山"},
	{"searchStr": "包头"},
	{"searchStr": "巴中"},
	{"searchStr": "北海"},
	{"searchStr": "蚌埠"},
	{"searchStr": "本溪"},
	{"searchStr": "毕节"},
	{"searchStr": "滨州"},
	{"searchStr": "百色"},
	{"searchStr": "亳州"},
	{"searchStr": "重庆"},
	{"searchStr": "成都"},
	{"searchStr": "长沙"},
	{"searchStr": "长春"},
	{"searchStr": "沧州"},
	{"searchStr": "常德"},
	{"searchStr": "昌都"},
	{"searchStr": "长治"},
	{"searchStr": "常州"},
	{"searchStr": "巢湖"},
	{"searchStr": "潮州"},
	{"searchStr": "承德"},
	{"searchStr": "郴州"},
	{"searchStr": "赤峰"},
	{"searchStr": "池州"},
	{"searchStr": "崇左"},
	{"searchStr": "楚雄"},
	{"searchStr": "滁州"},
	{"searchStr": "朝阳"},
	{"searchStr": "大连"},
	{"searchStr": "东莞"},
	{"searchStr": "大理"},
	{"searchStr": "丹东"},
	{"searchStr": "大庆"},
	{"searchStr": "大同"},
	{"searchStr": "大兴安岭"},
	{"searchStr": "德宏"},
	{"searchStr": "德阳"},
	{"searchStr": "德州"},
	{"searchStr": "定西"},
	{"searchStr": "迪庆"},
	{"searchStr": "东营"},
	{"searchStr": "鄂尔多斯"},
	{"searchStr": "恩施"},
	{"searchStr": "鄂州"},
	{"searchStr": "福州"},
	{"searchStr": "防城港"},
	{"searchStr": "佛山"},
	{"searchStr": "抚顺"},
	{"searchStr": "抚州"},
	{"searchStr": "阜新"},
	{"searchStr": "阜阳"},
	{"searchStr": "广州"},
	{"searchStr": "赣州"},
	{"searchStr": "桂林"},
	{"searchStr": "贵阳"},
	{"searchStr": "甘南"},
	{"searchStr": "甘孜"},
	{"searchStr": "广安"},
	{"searchStr": "广元"},
	{"searchStr": "果洛"},
	{"searchStr": "贵港"},
	{"searchStr": "杭州"},
	{"searchStr": "哈尔滨"},
	{"searchStr": "合肥"},
	{"searchStr": "海口"},
	{"searchStr": "海东"},
	{"searchStr": "海北"},
	{"searchStr": "海南"},
	{"searchStr": "海西"},
	{"searchStr": "邯郸"},
	{"searchStr": "汉中"},
	{"searchStr": "鹤壁"},
	{"searchStr": "河池"},
	{"searchStr": "鹤岗"},
	{"searchStr": "黑河"},
	{"searchStr": "衡水"},
	{"searchStr": "衡阳"},
	{"searchStr": "河源"},
	{"searchStr": "贺州"},
	{"searchStr": "红河"},
	{"searchStr": "淮安"},
	{"searchStr": "淮北"},
	{"searchStr": "怀化"},
	{"searchStr": "淮南"},
	{"searchStr": "黄冈"},
	{"searchStr": "黄南"},
	{"searchStr": "黄山"},
	{"searchStr": "黄石"},
	{"searchStr": "惠州"},
	{"searchStr": "葫芦岛"},
	{"searchStr": "呼伦贝尔"},
	{"searchStr": "湖州"},
	{"searchStr": "菏泽"},
	{"searchStr": "济南"},
	{"searchStr": "佳木斯"},
	{"searchStr": "吉安"},
	{"searchStr": "江门"},
	{"searchStr": "焦作"},
	{"searchStr": "嘉兴"},
	{"searchStr": "嘉峪关"},
	{"searchStr": "揭阳"},
	{"searchStr": "吉林"},
	{"searchStr": "金昌"},
	{"searchStr": "晋城"},
	{"searchStr": "景德镇"},
	{"searchStr": "荆门"},
	{"searchStr": "荆州"},
	{"searchStr": "金华"},
	{"searchStr": "济宁"},
	{"searchStr": "晋中"},
	{"searchStr": "锦州"},
	{"searchStr": "九江"},
	{"searchStr": "酒泉"},
	{"searchStr": "昆明"},
	{"searchStr": "开封"},
	{"searchStr": "兰州"},
	{"searchStr": "拉萨"},
	{"searchStr": "来宾"},
	{"searchStr": "莱芜"},
	{"searchStr": "廊坊"},
	{"searchStr": "乐山"},
	{"searchStr": "凉山"},
	{"searchStr": "连云港"},
	{"searchStr": "聊城"},
	{"searchStr": "辽阳"},
	{"searchStr": "辽源"},
	{"searchStr": "丽江"},
	{"searchStr": "临沧"},
	{"searchStr": "临汾"},
	{"searchStr": "临夏"},
	{"searchStr": "临沂"},
	{"searchStr": "林芝"},
	{"searchStr": "丽水"},
	{"searchStr": "六安"},
	{"searchStr": "六盘水"},
	{"searchStr": "柳州"},
	{"searchStr": "陇南"},
	{"searchStr": "龙岩"},
	{"searchStr": "娄底"},
	{"searchStr": "漯河"},
	{"searchStr": "洛阳"},
	{"searchStr": "泸州"},
	{"searchStr": "吕梁"},
	{"searchStr": "马鞍山"},
	{"searchStr": "茂名"},
	{"searchStr": "眉山"},
	{"searchStr": "梅州"},
	{"searchStr": "绵阳"},
	{"searchStr": "牡丹江"},
	{"searchStr": "南京"},
	{"searchStr": "南昌"},
	{"searchStr": "南宁"},
	{"searchStr": "南充"},
	{"searchStr": "南平"},
	{"searchStr": "南通"},
	{"searchStr": "南阳"},
	{"searchStr": "那曲"},
	{"searchStr": "内江"},
	{"searchStr": "宁德"},
	{"searchStr": "怒江"},
	{"searchStr": "盘锦"},
	{"searchStr": "攀枝花"},
	{"searchStr": "平顶山"},
	{"searchStr": "平凉"},
	{"searchStr": "萍乡"},
	{"searchStr": "莆田"},
	{"searchStr": "濮阳"},
	{"searchStr": "青岛"},
	{"searchStr": "黔东南"},
	{"searchStr": "黔南"},
	{"searchStr": "黔西南"},
	{"searchStr": "庆阳"},
	{"searchStr": "清远"},
	{"searchStr": "秦皇岛"},
	{"searchStr": "钦州"},
	{"searchStr": "齐齐哈尔"},
	{"searchStr": "泉州"},
	{"searchStr": "曲靖"},
	{"searchStr": "衢州"},
	{"searchStr": "日喀则"},
	{"searchStr": "日照"},
	{"searchStr": "上海"},
	{"searchStr": "深圳"},
	{"searchStr": "苏州"},
	{"searchStr": "沈阳"},
	{"searchStr": "石家庄"},
	{"searchStr": "三门峡"},
	{"searchStr": "三明"},
	{"searchStr": "三亚"},
	{"searchStr": "商洛"},
	{"searchStr": "商丘"},
	{"searchStr": "上饶"},
	{"searchStr": "山南"},
	{"searchStr": "汕头"},
	{"searchStr": "汕尾"},
	{"searchStr": "韶关"},
	{"searchStr": "绍兴"},
	{"searchStr": "邵阳"},
	{"searchStr": "十堰"},
	{"searchStr": "朔州"},
	{"searchStr": "四平"},
	{"searchStr": "绥化"},
	{"searchStr": "遂宁"},
	{"searchStr": "随州"},
	{"searchStr": "娄底"},
	{"searchStr": "宿迁"},
	{"searchStr": "宿州"},
	{"searchStr": "天津"},
	{"searchStr": "太原"},
	{"searchStr": "泰安"},
	{"searchStr": "泰州"},
	{"searchStr": "唐山"},
	{"searchStr": "天水"},
	{"searchStr": "铁岭"},
	{"searchStr": "铜川"},
	{"searchStr": "通化"},
	{"searchStr": "通辽"},
	{"searchStr": "铜陵"},
	{"searchStr": "铜仁"},
	{"searchStr": "台湾"},
	{"searchStr": "武汉"},
	{"searchStr": "乌鲁木齐"},
	{"searchStr": "无锡"},
	{"searchStr": "威海"},
	{"searchStr": "潍坊"},
	{"searchStr": "文山"},
	{"searchStr": "温州"},
	{"searchStr": "乌海"},
	{"searchStr": "芜湖"},
	{"searchStr": "乌兰察布"},
	{"searchStr": "武威"},
	{"searchStr": "梧州"},
	{"searchStr": "厦门"},
	{"searchStr": "西安"},
	{"searchStr": "西宁"},
	{"searchStr": "襄樊"},
	{"searchStr": "湘潭"},
	{"searchStr": "湘西"},
	{"searchStr": "咸宁"},
	{"searchStr": "咸阳"},
	{"searchStr": "孝感"},
	{"searchStr": "邢台"},
	{"searchStr": "新乡"},
	{"searchStr": "信阳"},
	{"searchStr": "新余"},
	{"searchStr": "忻州"},
	{"searchStr": "西双版纳"},
	{"searchStr": "宣城"},
	{"searchStr": "许昌"},
	{"searchStr": "徐州"},
	{"searchStr": "香港"},
	{"searchStr": "锡林郭勒"},
	{"searchStr": "兴安"},
	{"searchStr": "银川"},
	{"searchStr": "雅安"},
	{"searchStr": "延安"},
	{"searchStr": "延边"},
	{"searchStr": "盐城"},
	{"searchStr": "阳江"},
	{"searchStr": "阳泉"},
	{"searchStr": "扬州"},
	{"searchStr": "烟台"},
	{"searchStr": "宜宾"},
	{"searchStr": "宜昌"},
	{"searchStr": "宜春"},
	{"searchStr": "营口"},
	{"searchStr": "益阳"},
	{"searchStr": "永州"},
	{"searchStr": "岳阳"},
	{"searchStr": "榆林"},
	{"searchStr": "运城"},
	{"searchStr": "云浮"},
	{"searchStr": "玉树"},
	{"searchStr": "玉溪"},
	{"searchStr": "玉林"},
	{"searchStr": "杂多县"},
	{"searchStr": "赞皇县"},
	{"searchStr": "枣强县"},
	{"searchStr": "枣阳市"},
	{"searchStr": "枣庄"},
	{"searchStr": "泽库县"},
	{"searchStr": "增城市"},
	{"searchStr": "曾都区"},
	{"searchStr": "泽普县"},
	{"searchStr": "泽州县"},
	{"searchStr": "札达县"},
	{"searchStr": "扎赉特旗"},
	{"searchStr": "扎兰屯市"},
	{"searchStr": "扎鲁特旗"},
	{"searchStr": "扎囊县"},
	{"searchStr": "张北县"},
	{"searchStr": "张店区"},
	{"searchStr": "章贡区"},
	{"searchStr": "张家港"},
	{"searchStr": "张家界"},
	{"searchStr": "张家口"},
	{"searchStr": "漳平市"},
	{"searchStr": "漳浦县"},
	{"searchStr": "章丘市"},
	{"searchStr": "樟树市"},
	{"searchStr": "张湾区"},
	{"searchStr": "彰武县"},
	{"searchStr": "漳县"},
	{"searchStr": "张掖"},
	{"searchStr": "漳州"},
	{"searchStr": "长子县"},
	{"searchStr": "湛河区"},
	{"searchStr": "湛江"},
	{"searchStr": "站前区"},
	{"searchStr": "沾益县"},
	{"searchStr": "诏安县"},
	{"searchStr": "召陵区"},
	{"searchStr": "昭平县"},
	{"searchStr": "肇庆"},
	{"searchStr": "昭通"},
	{"searchStr": "赵县"},
	 ]

	 
export default class Location extends Component {
  
	constructor(props, context) {
	  super(props, context);
  
	  this.state = {
      rowHeight : 40,
      searchStr: '',
	  };
	}

	handleChoose = (location) => {
		const {navigation, route} = this.props
    const { chooseLocation } = route.params || {}
		if (chooseLocation) {
			chooseLocation(location)
		}
		navigation.goBack()
  }
  
  handleReset = () => {
    const {navigation, route} = this.props
    const { resetLocation } = route.params || {}
		if (resetLocation) {
			resetLocation();
		}
		navigation.goBack()
  }

  // custom render row
  renderRow = ({ item }) => {
    const {rowHeight, searchStr} = this.state
    const stringArray = [];
    if (searchStr.length > 0) {
      let orgString = item.searchStr;
      while(orgString.length > 0) {
        const indexOf = orgString.indexOf(searchStr);
        console.log({ indexOf });
        if (indexOf > -1) {
          let part = orgString.slice(0, indexOf);
          stringArray.push({
            text: part,
            highlight: false,
          });
          orgString = orgString.slice(indexOf);
          part = orgString.slice(0, searchStr.length);
          stringArray.push({
            text: searchStr,
            highlight: true,
          });
          orgString = orgString.slice(searchStr.length);
        } else {
          stringArray.push({
            text: orgString,
            highlight: false,
          });
          console.log({ stringArray });
          break;
        }
      }
    } else {
      stringArray.push({
        text: item.searchStr,
        highlight: false,
      });
    }
    return (
      <TouchableOpacity onPress={() => this.handleChoose(item.searchStr)}>
        <View style={{flex: 1, marginLeft: 20, height: rowHeight, justifyContent: 'center'}}>
          <Text>
            {stringArray.map((part, idx) => (
              <Text
                style={part.highlight ? styles.highlightText : styles.normalText}
                key={`text_part_${idx}`}
              >
                {part.text}
              </Text>
            ))}
          </Text>
          {/* <HighlightableText
            matcher={item.matcher}
            text={item.searchStr}
            textColor="#000"
            hightlightTextColor="#0069c0"
          /> */}
        </View>
      </TouchableOpacity>
    )
  }

  // render empty view when datasource is empty
  renderEmpty = () => {
    return (
      <View style={styles.emptyDataSource}>
        <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> No Content </Text>
      </View>
    )
  }

  // render empty result view when search result is empty
  renderEmptyResult = () => {
    const { searchStr } = this.state;
    return (
      <View style={styles.emptySearchResult}>
        <Text style={{color: '#979797', fontSize: 18, paddingTop: 20}}> <Text
          style={{color: '#171a23', fontSize: 18}}
        >{searchStr} </Text>没有结果
        </Text>
        <Text
          style={{
            color: '#979797',
            fontSize: 18,
            alignItems: 'center',
            paddingTop: 10
          }}
        >
          请尝试使用其他关键字
        </Text>
      </View>
    )
  }

  handleChangeText = (text) => {
    this.setState({ searchStr: text });
  }

  render () {
    const {route} = this.props
    const { location } = route.params || {}
    const {rowHeight, searchStr} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <SearchBar
              value={searchStr}
              onChangeText={this.handleChangeText}
              lightTheme
            />
          </View>
          {location !== '北京' && (
            <TouchableOpacity style={styles.resetButton} onPress={this.handleReset}>
              <Text style={styles.resetButtonText}>重置位置</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={CityList.filter((item) => item.searchStr.includes(searchStr))}
          renderItem={this.renderRow}
          ListEmptyComponent={this.renderEmptyResult}
          keyExtractor={(item, idx) => `city_${idx}`}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#efefef',
	  flexDirection: 'column',
	  justifyContent: 'flex-start'
  },
  header: {
    flexDirection: 'row',
  },
  searchBar: {
    flex: 1,
  },
  resetButton: {
    paddingHorizontal: 16,
    backgroundColor: 'rgb(226, 232, 237)',
    alignItems: 'center',
    justifyContent: 'center',
  },
	welcome: {
	  fontSize: 20,
	  textAlign: 'center',
	  margin: 10
	},
	instructions: {
	  textAlign: 'center',
	  color: '#333333',
	  marginBottom: 5
	},
	emptyDataSource: {
	  flex: 1,
	  alignItems: 'center',
	  flexDirection: 'column',
	  justifyContent: 'flex-start',
	  marginTop: 50
	},
	emptySearchResult: {
	  flex: 1,
	  alignItems: 'center',
	  flexDirection: 'column',
	  justifyContent: 'flex-start',
	  marginTop: 50
  },
  highlightText: {
    color: '#0069c0',
    fontWeight: '500',
  },
  normalText: {
    color: '#000',
  }
})